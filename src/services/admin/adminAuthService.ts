import { supabase } from "@/integrations/supabase/client";
import { logError, getErrorMessage } from "@/utils/errorUtils";
import { verifyAdminStatus } from "@/utils/adminVerification";

export const isAdminUser = async (userId: string): Promise<boolean> => {
  try {
    console.log("🔍 Checking admin status for user:", userId);

    if (!userId) {
      console.log("❌ No userId provided for admin check");
      return false;
    }

    // Don't use .single() since we expect 0 rows for non-admin users
    // Instead, check if any rows are returned
    const { data, error } = await supabase
      .from("profiles")
      .select("email")
      .eq("id", userId)
      .eq("email", "AdminSimnLi@gmail.com");

    if (error) {
      // Only log actual database errors, not "no rows found"
      if (error.code !== "PGRST116") {
        logError("Admin status check database error", error);
        console.warn(
          "⚠️ Database error during admin check, assuming non-admin",
        );
      } else {
        console.log(
          "📝 Admin check: No admin profile found (expected for non-admin users)",
        );
      }
      return false;
    }

    // Check if any rows were returned (data will be an array)
    const isAdmin = data && data.length > 0;
    console.log(`✅ Admin check result for ${userId}:`, isAdmin);

    if (isAdmin) {
      console.log("🔐 Admin user detected:", userId);
    } else {
      console.log("👤 Regular user (not admin):", userId);
    }

    return isAdmin;
  } catch (error) {
    logError("Exception during admin status check", error);
    console.warn("⚠️ Exception during admin check, assuming non-admin");
    return false;
  }
};

export const logAdminAction = async (
  adminId: string,
  actionType: string,
  targetId?: string,
  targetType?: string,
  description?: string,
) => {
  try {
    // Since admin_actions table doesn't exist, we'll log to notifications instead
    const { error } = await supabase.from("notifications").insert({
      user_id: adminId,
      title: `Admin Action: ${actionType}`,
      message:
        description ||
        `Admin performed ${actionType} on ${targetType}: ${targetId}`,
      type: "admin_action",
    });

    if (error) {
      console.error("Error logging admin action:", error);
    }
  } catch (error) {
    console.error("Error in admin action logging:", error);
  }
};
