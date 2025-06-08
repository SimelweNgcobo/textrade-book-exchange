import { supabase } from "@/integrations/supabase/client";
import { logError, getErrorMessage } from "@/utils/errorUtils";

export const isAdminUser = async (userId: string): Promise<boolean> => {
  try {
    console.log("🔍 Checking admin status for user:", userId);

    if (!userId) {
      console.log("❌ No userId provided for admin check");
      return false;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("email")
      .eq("id", userId)
      .eq("email", "AdminSimnLi@gmail.com")
      .single();

    if (error) {
      // Use proper error logging
      logError("Admin status check database error", error);

      // If it's a "not found" error, that's expected for non-admin users
      if (error.code === "PGRST116") {
        console.log(
          "✅ User is not admin (profile not found with admin email)",
        );
        return false;
      }

      // For other errors, log but still return false
      console.warn("⚠️ Database error during admin check, assuming non-admin");
      return false;
    }

    const isAdmin = !!data;
    console.log(`✅ Admin check result for ${userId}:`, isAdmin);
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
