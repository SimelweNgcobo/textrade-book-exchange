import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { isAdminUser } from "@/services/admin/adminAuthService";
import {
  logError,
  getErrorMessage,
  retryWithExponentialBackoff,
  withTimeout,
  isNetworkError,
} from "@/utils/errorUtils";

export interface Profile {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  status: string;
  profile_picture_url?: string;
  bio?: string;
}

export const loginUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login error:", {
      message: error.message,
      code: error.name || error.code,
      details: error.details || error.hint,
    });
    throw error;
  }

  console.log("Login successful for:", email);
  return data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
      emailRedirectTo: `${window.location.origin}/verify`,
    },
  });

  if (error) {
    console.error("Registration error:", {
      message: error.message,
      code: error.name || error.code,
      details: error.details || error.hint,
    });
    throw error;
  }

  console.log("Registration successful for:", email);
  return data;
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Logout error:", {
      message: error.message,
      code: error.name || error.code,
      details: error.details || error.hint,
    });
    throw error;
  }
  console.log("Logout successful");
};

export const fetchUserProfileQuick = async (
  user: User,
): Promise<Profile | null> => {
  try {
    console.log("🔄 Quick profile fetch for user:", user.id);

    // Use enhanced retry logic for network resilience
    const result = await retryWithExponentialBackoff(
      async () => {
        return await withTimeout(
          supabase
            .from("profiles")
            .select(
              "id, name, email, status, profile_picture_url, bio, is_admin",
            )
            .eq("id", user.id)
            .single(),
          6000, // 6 second timeout for quick fetch
          "Quick profile fetch timed out",
        );
      },
      {
        maxRetries: 2,
        baseDelay: 500,
        retryCondition: (error) => isNetworkError(error),
      },
    );

    const { data: profile, error: profileError } = result as any;

    if (profileError) {
      if (profileError.code === "PGRST116") {
        console.log(
          "ℹ️ Profile not found in quick fetch, will create in background",
        );
        return null; // Return null so fallback is used
      }

      logError("Quick profile fetch error", profileError);
      return null; // Use fallback on any error
    }

    if (!profile) {
      console.log("ℹ️ No profile data returned, using fallback");
      return null; // Use fallback profile
    }

    // Quick admin check without background updates
    const adminEmails = ["AdminSimnLi@gmail.com", "adminsimnli@gmail.com"];
    const userEmail = profile.email || user.email || "";
    const isAdmin =
      profile.is_admin === true ||
      adminEmails.includes(userEmail.toLowerCase());

    const profileData = {
      id: profile.id,
      name:
        profile.name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "User",
      email: profile.email || user.email || "",
      isAdmin,
      status: profile.status || "active",
      profile_picture_url: profile.profile_picture_url,
      bio: profile.bio,
    };

    console.log("✅ Quick profile fetch successful");
    return profileData;
  } catch (error) {
    logError("Quick profile fetch failed", error);
    console.log("⚠️ Quick profile fetch failed, using fallback");
    return null; // Return null to use fallback
  }
};

export const fetchUserProfile = async (user: User): Promise<Profile | null> => {
  try {
    console.log("🔄 Fetching full profile for user:", user.id);

    // Enhanced retry logic with better error handling
    const result = await retryWithExponentialBackoff(
      async () => {
        return await withTimeout(
          supabase
            .from("profiles")
            .select(
              "id, name, email, status, profile_picture_url, bio, is_admin",
            )
            .eq("id", user.id)
            .single(),
          10000, // 10 second timeout for full fetch
          "Full profile fetch timed out",
        );
      },
      {
        maxRetries: 2,
        baseDelay: 500,
        maxDelay: 5000,
        retryCondition: (error) => isNetworkError(error),
      },
    );

    const { data: profile, error: profileError } = result;

    if (profileError) {
      logError("Error fetching profile", profileError);

      if (profileError.code === "PGRST116") {
        console.log("Profile not found, creating new profile...");
        return await createUserProfile(user);
      }

      throw new Error(
        getErrorMessage(profileError, "Failed to fetch user profile"),
      );
    }

    if (!profile) {
      console.log("No profile found, creating new profile...");
      return await createUserProfile(user);
    }

    // Check admin status - first check the profile flag, then fallback to email check
    let isAdmin = false;

    if (profile.is_admin === true) {
      isAdmin = true;
      console.log("✅ Admin status from profile flag:", isAdmin);
    } else {
      // Quick email-based admin check without additional database calls
      const adminEmails = ["AdminSimnLi@gmail.com", "adminsimnli@gmail.com"];
      const userEmail = profile.email || user.email || "";
      isAdmin = adminEmails.includes(userEmail.toLowerCase());

      if (isAdmin) {
        console.log("✅ Admin status from email check:", isAdmin);
        // Update admin flag in background (non-blocking)
        supabase
          .from("profiles")
          .update({ is_admin: true })
          .eq("id", user.id)
          .then(() => console.log("✅ Admin flag updated in background"))
          .catch(() =>
            console.warn("⚠️ Failed to update admin flag in background"),
          );
      }
    }

    console.log(
      "Profile loaded successfully:",
      profile.name,
      "isAdmin:",
      isAdmin,
    );

    return {
      id: profile.id,
      name:
        profile.name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "User",
      email: profile.email || user.email || "",
      isAdmin,
      status: profile.status || "active",
      profile_picture_url: profile.profile_picture_url,
      bio: profile.bio,
    };
  } catch (error) {
    logError("Error in fetchUserProfile", error);
    throw new Error(getErrorMessage(error, "Failed to load user profile"));
  }
};

export const createUserProfile = async (user: User): Promise<Profile> => {
  try {
    console.log("Creating profile for user:", user.id);

    // Check if user should be admin based on email
    const adminEmails = ["AdminSimnLi@gmail.com", "adminsimnli@gmail.com"];
    const userEmail = user.email || "";
    const isAdmin = adminEmails.includes(userEmail.toLowerCase());

    const profileData = {
      id: user.id,
      name: user.user_metadata?.name || user.email?.split("@")[0] || "User",
      email: user.email || "",
      status: "active",
      is_admin: isAdmin, // Set admin flag during creation
    };

    // Use retry logic for profile creation as well
    const result = await retryWithExponentialBackoff(async () => {
      return await supabase
        .from("profiles")
        .insert([profileData])
        .select("id, name, email, status, profile_picture_url, bio, is_admin")
        .single();
    });

    const { data: newProfile, error: createError } = result;

    if (createError) {
      logError("Error creating profile", createError);
      throw new Error(
        getErrorMessage(createError, "Failed to create user profile"),
      );
    }

    console.log(
      "Profile created successfully:",
      newProfile.name,
      "Admin:",
      isAdmin,
    );

    return {
      id: newProfile.id,
      name: newProfile.name,
      email: newProfile.email,
      isAdmin: newProfile.is_admin || false, // Use the admin status from database
      status: newProfile.status,
      profile_picture_url: newProfile.profile_picture_url,
      bio: newProfile.bio,
    };
  } catch (error) {
    logError("Error in createUserProfile", error);
    throw new Error(getErrorMessage(error, "Failed to create user profile"));
  }
};
