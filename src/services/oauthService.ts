import { supabase } from "@/integrations/supabase/client";
import type { Provider } from "@supabase/supabase-js";

/**
 * OAuth service for handling third-party authentication
 */
export class OAuthService {
  /**
   * Get the redirect URL for OAuth flows
   * Defaults to current origin for development and production
   */
  private static getRedirectUrl(): string {
    const isDevelopment = process.env.NODE_ENV === "development";
    const developmentUrl = "http://localhost:8080";
    const productionUrl = "https://rebookedsolutions.co.za";

    // Use the current origin if available, otherwise fallback to predefined URLs
    if (typeof window !== "undefined") {
      return window.location.origin;
    }

    return isDevelopment ? developmentUrl : productionUrl;
  }

  /**
   * Initiate OAuth sign-in with a provider
   * @param provider - OAuth provider (google, github, etc.)
   * @param redirectTo - Optional path to redirect to after successful auth
   */
  static async signInWithProvider(
    provider: Provider,
    redirectTo: string = "/",
  ) {
    try {
      const redirectUrl = `${this.getRedirectUrl()}${redirectTo}`;

      console.log(
        `Initiating ${provider} OAuth with redirect URL:`,
        redirectUrl,
      );

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        console.error(`${provider} OAuth error:`, error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error(`Error initiating ${provider} OAuth:`, error);
      throw error;
    }
  }

  /**
   * Parse OAuth parameters from URL hash fragment
   * @param hash - URL hash string (without #)
   */
  static parseOAuthHash(hash: string) {
    const params = new URLSearchParams(hash);

    return {
      access_token: params.get("access_token"),
      refresh_token: params.get("refresh_token"),
      expires_in: params.get("expires_in"),
      token_type: params.get("token_type"),
      type: params.get("type"),
      error: params.get("error"),
      error_description: params.get("error_description"),
      error_code: params.get("error_code"),
    };
  }

  /**
   * Validate OAuth tokens
   * @param tokens - OAuth tokens object
   */
  static validateOAuthTokens(tokens: {
    access_token: string | null;
    refresh_token: string | null;
  }): boolean {
    return !!(tokens.access_token && tokens.refresh_token);
  }

  /**
   * Clean up OAuth hash from URL
   */
  static cleanupOAuthHash(): void {
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }

  /**
   * Set Supabase session with OAuth tokens
   * @param access_token - OAuth access token
   * @param refresh_token - OAuth refresh token
   */
  static async setOAuthSession(access_token: string, refresh_token: string) {
    try {
      const { data, error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (error) {
        console.error("Error setting OAuth session:", error);
        throw error;
      }

      console.log("OAuth session set successfully");
      return data;
    } catch (error) {
      console.error("Failed to set OAuth session:", error);
      throw error;
    }
  }
}

export default OAuthService;
