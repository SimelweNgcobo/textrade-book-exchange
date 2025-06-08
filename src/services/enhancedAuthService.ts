import { supabase } from "@/integrations/supabase/client";
import { logError, getErrorMessage } from "@/utils/errorUtils";

export interface LoginResult {
  success: boolean;
  data?: any;
  error?: any;
  requiresVerification?: boolean;
  userExists?: boolean;
  message: string;
  actionRequired?:
    | "verify_email"
    | "reset_password"
    | "register"
    | "contact_support";
}

export interface VerificationCheckResult {
  userExists: boolean;
  emailConfirmed: boolean;
  error?: any;
}

export class EnhancedAuthService {
  /**
   * Check if a user exists and if their email is confirmed
   */
  static async checkUserVerificationStatus(
    email: string,
  ): Promise<VerificationCheckResult> {
    try {
      console.log("🔍 Checking user verification status for:", email);

      // First, try to get user info from the profiles table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, email")
        .eq("email", email)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        // Error other than "not found"
        logError("Error checking user profile", profileError);
        return {
          userExists: false,
          emailConfirmed: false,
          error: profileError,
        };
      }

      if (!profile) {
        console.log("❌ User not found in profiles table");
        return {
          userExists: false,
          emailConfirmed: false,
        };
      }

      console.log("✅ User found in profiles table");

      // Since we can't access admin functions from the client side,
      // we'll make an educated guess based on the login attempt
      // If user exists in profiles but login fails with invalid credentials,
      // it's likely an unverified email or wrong password
      return {
        userExists: true,
        emailConfirmed: false, // We'll determine this from the login attempt
      };
    } catch (error) {
      logError("Error checking user verification status", error);
      return {
        userExists: false,
        emailConfirmed: false,
        error,
      };
    }
  }

  /**
   * Enhanced login with better error detection and user guidance
   */
  static async enhancedLogin(
    email: string,
    password: string,
  ): Promise<LoginResult> {
    try {
      console.log("🔐 Attempting enhanced login for:", email);

      // First attempt the login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (!error && data.session) {
        console.log("✅ Login successful");
        return {
          success: true,
          data,
          message: "Login successful!",
        };
      }

      // If there's an error, analyze it
      if (error) {
        console.log("❌ Login error occurred:", error);

        // Check if this is an "invalid credentials" error
        if (
          error.message?.includes("Invalid login credentials") ||
          error.code === "invalid_credentials"
        ) {
          console.log("🔍 Invalid credentials error - checking user status...");

          // Check if user exists and verification status
          const verificationCheck =
            await this.checkUserVerificationStatus(email);

          if (!verificationCheck.userExists) {
            return {
              success: false,
              error,
              userExists: false,
              message:
                "No account found with this email address. Please register first.",
              actionRequired: "register",
            };
          }

          // User exists - check if it might be an email verification issue
          // We'll try to differentiate between unverified email and wrong password
          // by attempting to send a password reset email
          const isLikelyUnverified = await this.checkIfLikelyUnverified(email);

          if (isLikelyUnverified) {
            return {
              success: false,
              error,
              userExists: true,
              requiresVerification: true,
              message:
                "Your email address may not be verified yet. Please check your email and click the verification link, or try resending the verification email.",
              actionRequired: "verify_email",
            };
          }

          // User exists and is likely verified, so it's probably a wrong password
          return {
            success: false,
            error,
            userExists: true,
            requiresVerification: false,
            message:
              "Incorrect password. Please check your password and try again, or reset your password if you've forgotten it.",
            actionRequired: "reset_password",
          };
        }

        // Handle other specific error types
        if (error.message?.includes("Email not confirmed")) {
          return {
            success: false,
            error,
            userExists: true,
            requiresVerification: true,
            message:
              "Please verify your email address before logging in. Check your email for the verification link.",
            actionRequired: "verify_email",
          };
        }

        if (error.message?.includes("User not found")) {
          return {
            success: false,
            error,
            userExists: false,
            message:
              "No account found with this email address. Please register first.",
            actionRequired: "register",
          };
        }

        if (error.message?.includes("Too many requests")) {
          return {
            success: false,
            error,
            message:
              "Too many login attempts. Please wait a few minutes before trying again.",
            actionRequired: "contact_support",
          };
        }

        // Generic error
        return {
          success: false,
          error,
          message: `Login failed: ${error.message}. Please try again or contact support.`,
          actionRequired: "contact_support",
        };
      }

      // No error but no session (shouldn't happen)
      return {
        success: false,
        message: "Login failed for an unknown reason. Please try again.",
        actionRequired: "contact_support",
      };
    } catch (exception) {
      logError("Exception during enhanced login", exception);
      return {
        success: false,
        error: exception,
        message: `Login failed: ${getErrorMessage(exception)}. Please try again.`,
        actionRequired: "contact_support",
      };
    }
  }

  /**
   * Resend verification email for unverified users
   */
  static async resendVerificationEmail(
    email: string,
  ): Promise<{ success: boolean; message: string; error?: any }> {
    try {
      console.log("📧 Resending verification email to:", email);

      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/verify`,
        },
      });

      if (error) {
        logError("Error resending verification email", error);
        return {
          success: false,
          message: `Failed to resend verification email: ${error.message}`,
          error,
        };
      }

      console.log("✅ Verification email sent successfully");
      return {
        success: true,
        message:
          "Verification email sent! Please check your inbox and spam folder.",
      };
    } catch (exception) {
      logError("Exception while resending verification email", exception);
      return {
        success: false,
        message: `Failed to resend verification email: ${getErrorMessage(exception)}`,
        error: exception,
      };
    }
  }

  /**
   * Get user-friendly action suggestions based on login result
   */
  static getActionSuggestions(result: LoginResult): Array<{
    label: string;
    action: string;
    type: "primary" | "secondary" | "warning";
  }> {
    const suggestions = [];

    switch (result.actionRequired) {
      case "verify_email":
        suggestions.push(
          {
            label: "Resend Verification Email",
            action: "resend_verification",
            type: "primary" as const,
          },
          {
            label: "Check Spam Folder",
            action: "check_spam",
            type: "secondary" as const,
          },
          {
            label: "Register Again",
            action: "register",
            type: "secondary" as const,
          },
        );
        break;

      case "reset_password":
        suggestions.push(
          {
            label: "Reset Password",
            action: "reset_password",
            type: "primary" as const,
          },
          {
            label: "Try Again",
            action: "try_again",
            type: "secondary" as const,
          },
        );
        break;

      case "register":
        suggestions.push(
          {
            label: "Create Account",
            action: "register",
            type: "primary" as const,
          },
          {
            label: "Try Different Email",
            action: "try_again",
            type: "secondary" as const,
          },
        );
        break;

      case "contact_support":
        suggestions.push(
          {
            label: "Contact Support",
            action: "contact_support",
            type: "primary" as const,
          },
          {
            label: "Try Again Later",
            action: "try_again",
            type: "secondary" as const,
          },
        );
        break;

      default:
        suggestions.push({
          label: "Try Again",
          action: "try_again",
          type: "primary" as const,
        });
    }

    return suggestions;
  }
}
