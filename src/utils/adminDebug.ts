import { supabase } from "@/integrations/supabase/client";
import { isAdminUser } from "@/services/admin/adminAuthService";
import { logError, getErrorMessage } from "@/utils/errorUtils";

interface AdminDebugResult {
  success: boolean;
  userId: string;
  steps: Array<{
    step: string;
    success: boolean;
    data?: any;
    error?: string;
    timestamp: string;
  }>;
  finalResult?: boolean;
  error?: string;
}

/**
 * Comprehensive admin status debugging function
 */
export const debugAdminStatus = async (
  userId: string,
): Promise<AdminDebugResult> => {
  const result: AdminDebugResult = {
    success: false,
    userId,
    steps: [],
  };

  const addStep = (step: string, success: boolean, data?: any, error?: any) => {
    result.steps.push({
      step,
      success,
      data,
      error: error ? getErrorMessage(error) : undefined,
      timestamp: new Date().toISOString(),
    });
  };

  try {
    console.log("🔍 Starting comprehensive admin status debug for:", userId);

    // Step 1: Validate input
    addStep("Validate userId input", !!userId, { userId });
    if (!userId) {
      result.error = "No userId provided";
      return result;
    }

    // Step 2: Check if profiles table is accessible
    try {
      const { data: profilesTableTest, error: tableError } = await supabase
        .from("profiles")
        .select("id")
        .limit(1);

      addStep(
        "Check profiles table access",
        !tableError,
        { rowCount: profilesTableTest?.length },
        tableError,
      );

      if (tableError) {
        throw new Error(
          `Profiles table not accessible: ${getErrorMessage(tableError)}`,
        );
      }
    } catch (error) {
      addStep("Check profiles table access", false, null, error);
      result.error = `Table access failed: ${getErrorMessage(error)}`;
      return result;
    }

    // Step 3: Check if user profile exists
    try {
      const { data: userProfile, error: userError } = await supabase
        .from("profiles")
        .select("id, email")
        .eq("id", userId)
        .single();

      addStep("Check user profile exists", !userError, userProfile, userError);

      if (userError && userError.code !== "PGRST116") {
        throw new Error(
          `User profile check failed: ${getErrorMessage(userError)}`,
        );
      }
    } catch (error) {
      addStep("Check user profile exists", false, null, error);
      // Continue anyway, as this might be expected
    }

    // Step 4: Check admin email configuration
    const adminEmail = "AdminSimnLi@gmail.com";
    addStep("Admin email configuration", true, { adminEmail });

    // Step 5: Direct admin query
    try {
      const { data: adminQuery, error: adminError } = await supabase
        .from("profiles")
        .select("id, email")
        .eq("id", userId)
        .eq("email", adminEmail)
        .single();

      addStep("Direct admin query", !adminError, adminQuery, adminError);

      if (adminError && adminError.code !== "PGRST116") {
        throw new Error(`Admin query failed: ${getErrorMessage(adminError)}`);
      }

      const directResult = !!adminQuery;
      addStep("Direct admin result", true, { isAdmin: directResult });
    } catch (error) {
      addStep("Direct admin query", false, null, error);
    }

    // Step 6: Test isAdminUser function
    try {
      const adminResult = await isAdminUser(userId);
      addStep("isAdminUser function", true, { isAdmin: adminResult });
      result.finalResult = adminResult;
      result.success = true;
    } catch (error) {
      addStep("isAdminUser function", false, null, error);
      result.error = `isAdminUser function failed: ${getErrorMessage(error)}`;
    }

    console.log("✅ Admin status debug complete:", result);
    return result;
  } catch (error) {
    console.error("❌ Admin status debug failed:", error);
    result.error = `Debug process failed: ${getErrorMessage(error)}`;
    addStep("Debug process", false, null, error);
    return result;
  }
};

/**
 * Simple admin status check with detailed logging
 */
export const safeAdminCheck = async (userId: string): Promise<boolean> => {
  try {
    console.log("🔒 Safe admin check starting for:", userId);

    if (!userId) {
      console.log("❌ Safe admin check: No userId provided");
      return false;
    }

    const result = await isAdminUser(userId);
    console.log("✅ Safe admin check result:", result);
    return result;
  } catch (error) {
    console.error("❌ Safe admin check failed:", error);
    logError("Safe admin check", error);
    return false;
  }
};

/**
 * Log admin check with context
 */
export const logAdminCheck = (
  context: string,
  userId: string,
  result: boolean,
) => {
  console.log(
    `🔍 Admin Check [${context}]: User ${userId} -> ${result ? "ADMIN" : "NOT ADMIN"}`,
  );
};
