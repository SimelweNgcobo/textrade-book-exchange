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
   * Log a new activity for a user
   */
  static async logActivity(
    userId: string,
    type: Activity["type"],
    title: string,
    description: string,
    metadata?: Activity["metadata"],
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.from("activities").insert({
        user_id: userId,
        type,
        title,
        description,
        metadata: metadata || {},
        created_at: new Date().toISOString(),
      });

      if (error) {
        // If activities table doesn't exist, store in notifications instead
        if (error.code === "42P01") {
          console.log(
            "Activities table not found, storing in notifications...",
          );

          const { error: notifError } = await supabase
            .from("notifications")
            .insert({
              user_id: userId,
              title: `Activity: ${title}`,
              message: description,
              type: "activity",
              metadata: {
                activity_type: type,
                ...metadata,
              },
              created_at: new Date().toISOString(),
            });

          if (notifError) {
            logError("Failed to log activity in notifications", notifError);
            return { success: false, error: notifError.message };
          }

          return { success: true };
        }

        logError("Failed to log activity", error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      logError("Exception logging activity", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
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
      // Try to get from activities table first
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

      if (error && error.code !== "42P01") {
        logError("Error fetching activities", error);
        return [];
      }

      if (activities && activities.length > 0) {
        return activities;
      }

      // Fallback to notifications
      console.log("No activities found, falling back to notifications...");

      let notifQuery = supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .eq("type", "activity")
        .order("created_at", { ascending: false })
        .limit(limit);

      const { data: notifications, error: notifError } = await notifQuery;

      if (notifError) {
        logError("Error fetching activity notifications", notifError);
        return [];
      }

      // Convert notifications to activities
      return (notifications || []).map((notif) => ({
        id: notif.id,
        user_id: notif.user_id,
        type: notif.metadata?.activity_type || "profile_updated",
        title: notif.title.replace("Activity: ", ""),
        description: notif.message,
        metadata: notif.metadata || {},
        created_at: notif.created_at,
      }));
    } catch (error) {
      logError("Exception fetching user activities", error);
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
      logError("Exception getting activity summary", error);
      return {
        total_activities: 0,
        recent_activities: [],
        activity_by_type: {},
        last_active: new Date().toISOString(),
      };
    }
  }

  /**
   * Auto-log common activities
   */
  static async logBookView(userId: string, bookId: string, bookTitle: string) {
    return this.logActivity(
      userId,
      "book_viewed",
      `Viewed "${bookTitle}"`,
      `User viewed the book "${bookTitle}"`,
      { book_id: bookId, book_title: bookTitle },
    );
  }

  static async logBookListing(
    userId: string,
    bookId: string,
    bookTitle: string,
    price: number,
  ) {
    return this.logActivity(
      userId,
      "listing_created",
      `Listed "${bookTitle}" for sale`,
      `Listed "${bookTitle}" for R${price}`,
      { book_id: bookId, book_title: bookTitle, price },
    );
  }

  static async logBookPurchase(
    userId: string,
    bookId: string,
    bookTitle: string,
    price: number,
    sellerId: string,
  ) {
    return this.logActivity(
      userId,
      "purchase",
      `Purchased "${bookTitle}"`,
      `Purchased "${bookTitle}" for R${price}`,
      { book_id: bookId, book_title: bookTitle, price, seller_id: sellerId },
    );
  }

  static async logBookSale(
    userId: string,
    bookId: string,
    bookTitle: string,
    price: number,
    buyerId: string,
  ) {
    return this.logActivity(
      userId,
      "sale",
      `Sold "${bookTitle}"`,
      `Sold "${bookTitle}" for R${price}`,
      { book_id: bookId, book_title: bookTitle, price, buyer_id: buyerId },
    );
  }

  static async logWishlistAdd(
    userId: string,
    bookId: string,
    bookTitle: string,
  ) {
    return this.logActivity(
      userId,
      "wishlist_added",
      `Added "${bookTitle}" to wishlist`,
      `Added "${bookTitle}" to your wishlist`,
      { book_id: bookId, book_title: bookTitle },
    );
  }

  static async logRating(
    userId: string,
    targetUserId: string,
    targetUserName: string,
    rating: number,
    comment?: string,
  ) {
    return this.logActivity(
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
  }

  static async logProfileUpdate(userId: string) {
    return this.logActivity(
      userId,
      "profile_updated",
      "Updated profile",
      "Updated profile information",
    );
  }

  static async logSearch(userId: string, query: string, resultCount: number) {
    return this.logActivity(
      userId,
      "search",
      `Searched for "${query}"`,
      `Searched for "${query}" and found ${resultCount} results`,
      { search_query: query, result_count: resultCount },
    );
  }

  static async logLogin(userId: string) {
    return this.logActivity(
      userId,
      "login",
      "Logged in",
      "Successfully logged into the platform",
    );
  }
}
