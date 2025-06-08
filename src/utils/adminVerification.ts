import { supabase } from "@/integrations/supabase/client";

/**
 * Simple, lightweight admin verification
 * This function is designed to be error-free and not log false errors
 */
export const verifyAdminStatus = async (userId: string): Promise<boolean> => {
  try {
    if (!userId) {
      return false;
    }

    // Simple query without .single() to avoid PGRST116 errors
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", userId)
      .eq("email", "AdminSimnLi@gmail.com")
      .limit(1);

    // If there's an error, assume not admin
    if (error) {
      return false;
    }

    // Return true if any rows found
    return data && data.length > 0;
  } catch {
    // Any exception means not admin
    return false;
  }
};

/**
 * Check if an email is the admin email
 */
export const isAdminEmail = (email: string): boolean => {
  return email === "AdminSimnLi@gmail.com";
};

/**
 * Get admin user ID if exists
 */
export const getAdminUserId = async (): Promise<string | null> => {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", "AdminSimnLi@gmail.com")
      .limit(1);

    if (error || !data || data.length === 0) {
      return null;
    }

    return data[0].id;
  } catch {
    return null;
  }
};

/**
 * Test admin functionality
 */
export const testAdminFunctions = async (userId: string) => {
  console.log("🧪 Testing admin functions for user:", userId);

  const startTime = Date.now();
  const isAdmin = await verifyAdminStatus(userId);
  const endTime = Date.now();

  console.log(
    `✅ Admin verification result: ${isAdmin} (took ${endTime - startTime}ms)`,
  );

  return {
    userId,
    isAdmin,
    duration: endTime - startTime,
    timestamp: new Date().toISOString(),
  };
};
