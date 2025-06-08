import { supabase } from "@/integrations/supabase/client";
import { logError } from "@/utils/errorUtils";

export interface Activity {
  id: string;
  user_id: string;
  type:
    | "purchase"
    | "sale"
    | "listing_created"
    | "listing_updated"
    | "listing_deleted"
    | "wishlist_added"
    | "wishlist_removed"
    | "rating_given"
    | "rating_received"
    | "profile_updated"
    | "login"
    | "search"
    | "book_viewed";
  title: string;
  description: string;
  metadata?: {
    book_id?: string;
    book_title?: string;
    price?: number;
    target_user_id?: string;
    target_user_name?: string;
    rating?: number;
    search_query?: string;
    category?: string;
    [key: string]: any;
  };
  created_at: string;
}

export interface ActivitySummary {
  total_activities: number;
  recent_activities: Activity[];
  activity_by_type: { [key: string]: number };
  last_active: string;
}

export class ActivityService {
  /**
   * Enhanced error logging with detailed information
   */
  private static logDetailedError(context: string, error: any) {
    console.error(`[ActivityService] ${context}:`, {
      error,
      errorType: typeof error,
      errorMessage: error?.message,
      errorCode: error?.code,
      errorDetails: error?.details,
      errorHint: error?.hint,
      fullError: JSON.stringify(error, null, 2),
    });

    logError(`ActivityService - ${context}`, error);
  }

  /**
   * Test if notifications table is accessible
   */
  private static async testNotificationsTable(): Promise<{
    accessible: boolean;
    error?: any;
  }> {
    try {
      console.log("🧪 Testing notifications table accessibility...");

      const { data, error } = await supabase
        .from("notifications")
        .select("id")
        .limit(1);

      if (error) {
        console.error("❌ Notifications table test failed:", error);
        return { accessible: false, error };
      }

      console.log("✅ Notifications table is accessible");
      return { accessible: true };
    } catch (error) {
      console.error("❌ Exception testing notifications table:", error);
      return { accessible: false, error };
    }
  }

  /**
   * Log a new activity for a user with enhanced error handling
   */
  static async logActivity(
    userId: string,
    type: Activity["type"],
    title: string,
    description: string,
    metadata?: Activity["metadata"],
  ): Promise<{ success: boolean; error?: string; details?: any }> {
    try {
      console.log("📝 Attempting to log activity:", {
        userId,
        type,
        title,
        description,
        metadata,
      });

      // Validate required parameters
      if (!userId || !type || !title || !description) {
        const error = "Missing required parameters for activity logging";
        console.error("❌ Validation failed:", {
          userId,
          type,
          title,
          description,
        });
        return { success: false, error };
      }

      // Test notifications table first
      const tableTest = await this.testNotificationsTable();
      if (!tableTest.accessible) {
        this.logDetailedError(
          "Notifications table test failed",
          tableTest.error,
        );
        return {
          success: false,
          error: "Notifications table is not accessible",
          details: tableTest.error,
        };
      }

      // Try to insert into activities table first (this will likely fail, but we check)
      console.log("🔄 Attempting to insert into activities table...");
      const { error: activitiesError } = await supabase
        .from("activities")
        .insert({
          user_id: userId,
          type,
          title,
          description,
          metadata: metadata || {},
          created_at: new Date().toISOString(),
        });

      if (activitiesError) {
        // Check if it's a "table doesn't exist" error
        if (
          activitiesError.code === "42P01" ||
          activitiesError.message?.includes("does not exist")
        ) {
          console.log(
            "📋 Activities table not found, using notifications fallback...",
          );

          // Fallback to notifications table
          // Note: notifications table doesn't have metadata column, so we encode it in the message
          const encodedMetadata = metadata
            ? ` [META:${JSON.stringify(metadata)}]`
            : "";
          const notificationData = {
            user_id: userId,
            title: `Activity: ${title}`,
            message: `${description}${encodedMetadata} [TYPE:${type}]`,
            type: "activity",
            created_at: new Date().toISOString(),
          };

          console.log(
            "📝 Inserting into notifications table:",
            notificationData,
          );

          const { error: notifError } = await supabase
            .from("notifications")
            .insert(notificationData);

          if (notifError) {
            this.logDetailedError(
              "Failed to log activity in notifications",
              notifError,
            );
            return {
              success: false,
              error: "Failed to log activity in notifications table",
              details: notifError,
            };
          }

          console.log("✅ Activity logged successfully via notifications");
          return { success: true };
        } else {
          // Some other error with activities table
          this.logDetailedError(
            "Unexpected error with activities table",
            activitiesError,
          );
          return {
            success: false,
            error: "Unexpected error with activities table",
            details: activitiesError,
          };
        }
      }

      console.log("✅ Activity logged successfully in activities table");
      return { success: true };
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
   * Get user activities with fallback to notifications
   */
  static async getUserActivities(
    userId: string,
    limit: number = 50,
    type?: Activity["type"],
  ): Promise<Activity[]> {
    try {
      console.log("📖 Fetching user activities for:", userId);

      if (!userId) {
        console.warn("⚠️ No userId provided for getUserActivities");
        return [];
      }

      // Try to get from activities table first
      console.log("🔄 Checking activities table...");
      let query = supabase
        .from("activities")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (type) {
        query = query.eq("type", type);
      }

      const { data: activities, error } = await query;

      if (error) {
        if (
          error.code === "42P01" ||
          error.message?.includes("does not exist")
        ) {
          console.log("📋 Activities table not found, using notifications...");
        } else {
          this.logDetailedError("Error fetching activities", error);
          // Continue to fallback
        }
      }

      if (activities && activities.length > 0) {
        console.log(
          `✅ Found ${activities.length} activities in activities table`,
        );
        return activities;
      }

      // Fallback to notifications
      console.log("🔄 Falling back to notifications table...");

      let notifQuery = supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .eq("type", "activity")
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
        // Parse encoded metadata and type from message
        const message = notif.message || "";
        let cleanDescription = message;
        let parsedMetadata = {};
        let activityType = "profile_updated";

        // Extract type
        const typeMatch = message.match(/\[TYPE:([^\]]+)\]$/);
        if (typeMatch) {
          activityType = typeMatch[1];
          cleanDescription = cleanDescription.replace(
            /\s*\[TYPE:[^\]]+\]$/,
            "",
          );
        }

        // Extract metadata
        const metaMatch = message.match(/\[META:([^\]]+)\]/);
        if (metaMatch) {
          try {
            parsedMetadata = JSON.parse(metaMatch[1]);
            cleanDescription = cleanDescription.replace(
              /\s*\[META:[^\]]+\]/,
              "",
            );
          } catch (e) {
            console.warn(
              "Failed to parse metadata from notification:",
              metaMatch[1],
            );
          }
        }

        return {
          id: notif.id,
          user_id: notif.user_id,
          type: activityType,
          title: notif.title?.replace("Activity: ", "") || "Unknown Activity",
          description: cleanDescription,
          metadata: parsedMetadata,
          created_at: notif.created_at,
        };
      });
    } catch (error) {
      this.logDetailedError("Exception fetching user activities", error);
      return [];
    }
  }

  /**
   * Get activity summary for a user
   */
  static async getActivitySummary(userId: string): Promise<ActivitySummary> {
    try {
      const activities = await this.getUserActivities(userId, 100);

      const activityByType = activities.reduce(
        (acc, activity) => {
          acc[activity.type] = (acc[activity.type] || 0) + 1;
          return acc;
        },
        {} as { [key: string]: number },
      );

      return {
        total_activities: activities.length,
        recent_activities: activities.slice(0, 20),
        activity_by_type: activityByType,
        last_active: activities[0]?.created_at || new Date().toISOString(),
      };
    } catch (error) {
      this.logDetailedError("Exception getting activity summary", error);
      return {
        total_activities: 0,
        recent_activities: [],
        activity_by_type: {},
        last_active: new Date().toISOString(),
      };
    }
  }

  /**
   * Debug function to test activity logging
   */
  static async debugActivityLogging(userId: string): Promise<any> {
    console.log("🔍 Starting activity logging debug for user:", userId);

    const results = {
      timestamp: new Date().toISOString(),
      userId,
      tests: [],
    };

    try {
      // Test 1: Check notifications table
      console.log("Test 1: Checking notifications table...");
      const tableTest = await this.testNotificationsTable();
      results.tests.push({
        name: "Notifications Table Access",
        success: tableTest.accessible,
        error: tableTest.error,
        details: "Testing if notifications table is accessible",
      });

      // Test 2: Simple activity logging
      console.log("Test 2: Simple activity logging...");
      const simpleLogResult = await this.logActivity(
        userId,
        "login",
        "Debug Test Login",
        "Testing activity logging functionality",
      );
      results.tests.push({
        name: "Simple Activity Log",
        success: simpleLogResult.success,
        error: simpleLogResult.error,
        details: simpleLogResult.details,
      });

      // Test 3: Activity with metadata
      console.log("Test 3: Activity with metadata...");
      const metadataLogResult = await this.logActivity(
        userId,
        "book_viewed",
        "Debug Test Book View",
        "Testing activity logging with metadata",
        { book_id: "test-123", book_title: "Test Book", test: true },
      );
      results.tests.push({
        name: "Activity Log with Metadata",
        success: metadataLogResult.success,
        error: metadataLogResult.error,
        details: metadataLogResult.details,
      });

      // Test 4: Fetch activities
      console.log("Test 4: Fetching activities...");
      const activities = await this.getUserActivities(userId, 10);
      results.tests.push({
        name: "Fetch User Activities",
        success: true,
        details: `Found ${activities.length} activities`,
        data: activities.slice(0, 3), // Only include first 3 for debugging
      });
    } catch (error) {
      this.logDetailedError("Exception during debug", error);
      results.tests.push({
        name: "Debug Exception",
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        details: error,
      });
    }

    console.log("🔍 Debug completed:", results);
    return results;
  }

  /**
   * Auto-log common activities with enhanced error handling
   */
  static async logBookView(userId: string, bookId: string, bookTitle: string) {
    const result = await this.logActivity(
      userId,
      "book_viewed",
      `Viewed "${bookTitle}"`,
      `User viewed the book "${bookTitle}"`,
      { book_id: bookId, book_title: bookTitle },
    );

    if (!result.success) {
      console.warn("Failed to log book view:", result.error);
    }

    return result;
  }

  static async logBookListing(
    userId: string,
    bookId: string,
    bookTitle: string,
    price: number,
  ) {
    const result = await this.logActivity(
      userId,
      "listing_created",
      `Listed "${bookTitle}" for sale`,
      `Listed "${bookTitle}" for R${price}`,
      { book_id: bookId, book_title: bookTitle, price },
    );

    if (!result.success) {
      console.warn("Failed to log book listing:", result.error);
    }

    return result;
  }

  static async logBookPurchase(
    userId: string,
    bookId: string,
    bookTitle: string,
    price: number,
    sellerId: string,
  ) {
    const result = await this.logActivity(
      userId,
      "purchase",
      `Purchased "${bookTitle}"`,
      `Purchased "${bookTitle}" for R${price}`,
      { book_id: bookId, book_title: bookTitle, price, seller_id: sellerId },
    );

    if (!result.success) {
      console.warn("Failed to log book purchase:", result.error);
    }

    return result;
  }

  static async logBookSale(
    userId: string,
    bookId: string,
    bookTitle: string,
    price: number,
    buyerId: string,
  ) {
    const result = await this.logActivity(
      userId,
      "sale",
      `Sold "${bookTitle}"`,
      `Sold "${bookTitle}" for R${price}`,
      { book_id: bookId, book_title: bookTitle, price, buyer_id: buyerId },
    );

    if (!result.success) {
      console.warn("Failed to log book sale:", result.error);
    }

    return result;
  }

  static async logWishlistAdd(
    userId: string,
    bookId: string,
    bookTitle: string,
  ) {
    const result = await this.logActivity(
      userId,
      "wishlist_added",
      `Added "${bookTitle}" to wishlist`,
      `Added "${bookTitle}" to your wishlist`,
      { book_id: bookId, book_title: bookTitle },
    );

    if (!result.success) {
      console.warn("Failed to log wishlist add:", result.error);
    }

    return result;
  }

  static async logRating(
    userId: string,
    targetUserId: string,
    targetUserName: string,
    rating: number,
    comment?: string,
  ) {
    const result = await this.logActivity(
      userId,
      "rating_given",
      `Rated ${targetUserName} ${rating} stars`,
      `Gave ${rating} star rating to ${targetUserName}${comment ? ': "' + comment + '"' : ""}`,
      {
        target_user_id: targetUserId,
        target_user_name: targetUserName,
        rating,
        comment,
      },
    );

    if (!result.success) {
      console.warn("Failed to log rating:", result.error);
    }

    return result;
  }

  static async logProfileUpdate(userId: string) {
    const result = await this.logActivity(
      userId,
      "profile_updated",
      "Updated profile",
      "Updated profile information",
    );

    if (!result.success) {
      console.warn("Failed to log profile update:", result.error);
    }

    return result;
  }

  static async logSearch(userId: string, query: string, resultCount: number) {
    const result = await this.logActivity(
      userId,
      "search",
      `Searched for "${query}"`,
      `Searched for "${query}" and found ${resultCount} results`,
      { search_query: query, result_count: resultCount },
    );

    if (!result.success) {
      console.warn("Failed to log search:", result.error);
    }

    return result;
  }

  static async logLogin(userId: string) {
    const result = await this.logActivity(
      userId,
      "login",
      "Logged in",
      "Successfully logged into the platform",
    );

    if (!result.success) {
      console.warn("Failed to log login:", result.error);
    }

    return result;
  }
}
