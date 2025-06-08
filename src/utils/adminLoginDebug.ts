import { supabase } from "@/integrations/supabase/client";
import { verifyAdminStatus } from "./adminVerification";

/**
 * Debug utility to test admin login functionality
 */
export const debugAdminLogin = async (
  email: string = "AdminSimnLi@gmail.com",
) => {
  console.log("🔍 Admin Login Debug for:", email);

  try {
    // 1. Check if profile exists with admin email
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", email)
      .single();

    console.log("1. Profile lookup result:", {
      found: !!profile,
      error: profileError?.message,
      profileData: profile
        ? {
            id: profile.id,
            email: profile.email,
            name: profile.name,
            status: profile.status,
          }
        : null,
    });

    if (!profile) {
      console.log(
        "❌ No profile found with admin email. Admin user may not be registered.",
      );
      return {
        success: false,
        issue: "No profile found with admin email",
        solution: "Admin user needs to register first",
      };
    }

    // 2. Test admin verification
    const isAdmin = await verifyAdminStatus(profile.id);
    console.log("2. Admin verification result:", isAdmin);

    // 3. Check auth user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    console.log("3. Current auth user:", {
      isLoggedIn: !!user,
      userId: user?.id,
      email: user?.email,
      error: userError?.message,
    });

    // 4. If logged in as admin, check if profile matches
    if (user && user.email === email) {
      const profileMatches = user.id === profile.id;
      console.log("4. Profile ID match:", profileMatches);

      if (!profileMatches) {
        console.log(
          "❌ Auth user ID does not match profile ID - data inconsistency",
        );
        return {
          success: false,
          issue: "Auth user ID does not match profile ID",
          solution:
            "Database inconsistency - admin user may need to be recreated",
        };
      }
    }

    return {
      success: true,
      adminEmail: email,
      profileExists: true,
      profileId: profile.id,
      isAdmin,
      isCurrentUser: user?.email === email,
    };
  } catch (error) {
    console.error("❌ Admin debug failed:", error);
    return {
      success: false,
      issue: "Debug test failed",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

/**
 * Test admin login process
 */
export const testAdminLogin = async (
  email: string = "AdminSimnLi@gmail.com",
  password: string,
) => {
  console.log("🧪 Testing admin login process...");

  try {
    // First run debug to check current state
    const debugResult = await debugAdminLogin(email);
    console.log("Pre-login debug:", debugResult);

    if (!password) {
      console.log("❌ Password required for login test");
      return { success: false, issue: "Password required" };
    }

    // Attempt login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("❌ Login failed:", error.message);
      return {
        success: false,
        issue: "Login failed",
        error: error.message,
      };
    }

    if (data.session && data.user) {
      console.log("✅ Login successful");

      // Re-run admin verification after login
      const postLoginAdmin = await verifyAdminStatus(data.user.id);
      console.log("Post-login admin status:", postLoginAdmin);

      return {
        success: true,
        message: "Admin login successful",
        userId: data.user.id,
        email: data.user.email,
        isAdmin: postLoginAdmin,
      };
    }

    return {
      success: false,
      issue: "Login succeeded but no session created",
    };
  } catch (error) {
    console.error("❌ Admin login test failed:", error);
    return {
      success: false,
      issue: "Login test failed",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

/**
 * Quick admin status check for current user
 */
export const quickAdminCheck = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { isLoggedIn: false, isAdmin: false };
    }

    const isAdmin = await verifyAdminStatus(user.id);

    return {
      isLoggedIn: true,
      userId: user.id,
      email: user.email,
      isAdmin,
    };
  } catch (error) {
    console.error("Quick admin check failed:", error);
    return { isLoggedIn: false, isAdmin: false, error };
  }
};
