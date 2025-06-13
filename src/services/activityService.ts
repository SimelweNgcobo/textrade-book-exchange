
import { supabase } from "@/integrations/supabase/client";

export class ActivityService {
  static async logProfileUpdate(userId: string): Promise<void> {
    try {
      // For now, just log to console since we don't have an activity table
      console.log(`Profile updated for user: ${userId}`);
      
      // Could add notification instead
      const { error } = await supabase.from("notifications").insert({
        user_id: userId,
        title: "Profile Updated",
        message: "Your profile has been successfully updated",
        type: "success",
        read: false,
      });

      if (error) {
        console.warn("Failed to create profile update notification:", error);
      }
    } catch (error) {
      console.error("Error logging profile update activity:", error);
    }
  }
}
