import { supabase } from "@/integrations/supabase/client";

// Define activity types
export type ActivityType = 
  | "profile_updated" 
  | "purchase" 
  | "sale" 
  | "listing_created" 
  | "login";

export interface Activity {
  id: string;
  user_id: string;
  type: ActivityType;
  title: string;
  description: string;
  metadata?: Record<string, any>;
  created_at: string;
}

// Silent activities that don't need notifications
const SILENT_ACTIVITY_TYPES = new Set<ActivityType>([
  "login"
]);

export class ActivityService {
  /**
   * Log a profile update activity
   */
  static async logProfileUpdate(userId: string): Promise<void> {
    try {
      if (!userId) {
        console.warn("❌ No userId provided for profile update logging");
        return;
      }

      // Log to console
      console.log(`📝 Profile updated for user: ${userId}`);
      
      // Create notification for profile update
      const { error } = await supabase.from("notifications").insert({
        user_id: userId,
        title: "Profile Updated",
        message: "Your profile has been successfully updated",
        type: "success",
        read: false,
      });

      if (error) {
        console.warn("Failed to create profile update notification:", error);
      } else {
        console.log("✅ Profile update notification created");
      }
    } catch (error) {
      console.error("Error logging profile update activity:", error);
    }
  }

  /**
   * Generic activity logging method
   */
  static async logActivity(
    userId: string,
    type: ActivityType,
    title: string,
    description: string,
    metadata?: Record<string, any>
  ): Promise<{ success: boolean; error?: string; details?: any }> {
    try {
      // Validate required parameters
      if (!userId || !type || !title || !description) {
        const error = "Missing required parameters for activity logging";
        console.warn("❌ Activity validation failed:", {
          userId: !!userId,
          type: !!type,
          title: !!title,
          description: !!description,
        });
        return { success: false, error };
      }

      // For silent activities, we can create a simple log without notification
      if (SILENT_ACTIVITY_TYPES.has(type)) {
        console.log(`📝 Silent activity logged: ${type} - ${title}`);
        return { success: true };
      }

      // For important activities, create a notification
      try {
        const { error: notificationError } = await supabase
          .from("notifications")
          .insert({
            user_id: userId,
            title: `Activity: ${title}`,
            message: description,
            type: this.getNotificationTypeForActivity(type),
            read: false,
          });

        if (notificationError) {
          throw notificationError;
        }

        console.log(`✅ Activity notification created: ${type} - ${title}`);
        return { success: true };
      } catch (notificationError) {
        this.logDetailedError(
          "Failed to create activity notification",
          notificationError,
        );
        return {
          success: false,
          error: "Failed to create activity notification",
          details: notificationError,
        };
      }
    } catch (error) {
      this.logDetailedError("Exception during activity logging", error);
      return {
        success: false,
        error: "Exception occurred during activity logging",
        details: error,
      };
    }
  }

  /**
   * Get user activities by reading from notifications table
   */
  static async getUserActivities(
    userId: string,
    limit: number = 50,
    type?: ActivityType,
  ): Promise<Activity[]> {
    try {
      if (!userId) {
        console.warn("⚠️ No userId provided for getUserActivities");
        return [];
      }

      // Try to get activities from a dedicated activities table first
      try {
        let activitiesQuery = supabase
          .from("activities")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(limit);

        if (type) {
          activitiesQuery = activitiesQuery.eq("type", type);
        }

        const { data: activities, error } = await activitiesQuery;

        if (!error && activities && activities.length > 0) {
          console.log(
            `✅ Found ${activities.length} activities from activities table`,
          );
          return activities.map((activity) => ({
            id: activity.id,
            user_id: activity.user_id,
            type: activity.type,
            title: activity.title,
            description: activity.description,
            metadata: activity.metadata,
            created_at: activity.created_at,
          }));
        }
      } catch (activitiesError) {
        // Activities table might not exist, fall back to notifications
        console.log(
          "Activities table not available, falling back to notifications",
        );
      }

      // Fallback: Get activities from notifications table
      console.log("🔄 Fetching activities from notifications table...");

      const notifQuery = supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .like("title", "Activity:%")
        .order("created_at", { ascending: false })
        .limit(limit);

      const { data: notifications, error: notifError } = await notifQuery;

      if (notifError) {
        this.logDetailedError(
          "Error fetching activity notifications",
          notifError,
        );
        return [];
      }

      console.log(
        `✅ Found ${notifications?.length || 0} activities in notifications table`,
      );

      // Convert notifications to activities
      return (notifications || []).map((notif) => {
        const message = notif.message || "";
        let activityType: ActivityType = "profile_updated";
        let cleanDescription = message;
        let parsedMetadata = {};

        // Try to extract metadata if encoded in message
        const metaMatch = message.match(/\[META:(.+?)\]$/);
        if (metaMatch) {
          try {
            parsedMetadata = JSON.parse(metaMatch[1]);
            cleanDescription = cleanDescription.replace(/\s*\[META:.+?\]$/, "");
          } catch (e) {
            // Ignore parsing errors
          }
        }

        // Extract activity type from title
        const title = notif.title || "";
        const titleMatch = title.match(/^Activity:\s*(.+)$/);
        const cleanTitle = titleMatch ? titleMatch[1] : title;

        // Determine activity type based on title/message content
        if (
          cleanTitle.toLowerCase().includes("purchase") ||
          cleanDescription.toLowerCase().includes("bought")
        ) {
          activityType = "purchase";
        } else if (
          cleanTitle.toLowerCase().includes("sale") ||
          cleanDescription.toLowerCase().includes("sold")
        ) {
          activityType = "sale";
        } else if (cleanTitle.toLowerCase().includes("listing")) {
          activityType = "listing_created";
        } else if (cleanTitle.toLowerCase().includes("profile")) {
          activityType = "profile_updated";
        } else if (cleanTitle.toLowerCase().includes("login")) {
          activityType = "login";
        }

        return {
          id: notif.id,
          user_id: notif.user_id,
          type: activityType,
          title: cleanTitle,
          description: cleanDescription,
          metadata:
            Object.keys(parsedMetadata).length > 0 ? parsedMetadata : undefined,
          created_at: notif.created_at,
        };
      });
    } catch (error) {
      this.logDetailedError("Error fetching user activities", error);
      return [];
    }
  }

  /**
   * Helper method to get notification type for activity
   */
  private static getNotificationTypeForActivity(activityType: ActivityType): string {
    const typeMap: Record<ActivityType, string> = {
      profile_updated: "success",
      purchase: "info",
      sale: "success",
      listing_created: "info",
      login: "info",
    };
    return typeMap[activityType] || "info";
  }

  /**
   * Helper method for detailed error logging
   */
  private static logDetailedError(message: string, error: any): void {
    console.error(`❌ ${message}:`, {
      error: error?.message || error,
      stack: error?.stack,
      details: error?.details || error?.hint,
      timestamp: new Date().toISOString(),
    });
  }
}