import { supabase } from "@/integrations/supabase/client";

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  read: boolean;
  createdAt: string;
}

export interface NotificationInput {
  userId: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  read: boolean;
}

export const getNotifications = async (
  userId: string,
): Promise<Notification[]> => {
  if (!userId) {
    console.warn("getNotifications called without userId");
    return [];
  }

  try {
    // Shorter timeout for better UX - 5 seconds
    const { data, error } = (await Promise.race([
      supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Connection timeout")), 5000),
      ),
    ])) as any;

    if (error) {
      console.warn("Database error fetching notifications:", error.message);

      // Handle specific error types gracefully
      if (error.message?.includes("Failed to fetch")) {
        console.warn(
          "Network issue while fetching notifications - returning empty array",
        );
        return [];
      }

      // For database errors, return empty array instead of throwing
      return [];
    }

    if (!data || !Array.isArray(data)) {
      console.warn("Invalid notification data received:", data);
      return [];
    }

    return data.map((notification) => ({
      id: notification.id,
      userId: notification.user_id,
      title: notification.title,
      message: notification.message,
      type: notification.type as "info" | "warning" | "success" | "error",
      read: notification.read,
      createdAt: notification.created_at,
    }));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    // Don't spam console with timeout errors in production
    if (import.meta.env.DEV) {
      console.warn("Notification fetch failed:", errorMessage);

      // Log connection health for debugging timeouts
      if (errorMessage.includes("timeout") || errorMessage.includes("fetch")) {
        import("../utils/connectionHealthCheck").then(
          ({ logConnectionHealth }) => {
            logConnectionHealth();
          },
        );
      }
    }

    // Always return empty array instead of throwing
    return [];
  }
};

export const addNotification = async (
  notification: NotificationInput,
): Promise<void> => {
  try {
    const { error } = await supabase.from("notifications").insert([
      {
        user_id: notification.userId,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        read: notification.read,
      },
    ]);

    if (error) {
      console.error("Error adding notification:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error in addNotification:", error);
    throw error;
  }
};

export const markNotificationAsRead = async (
  notificationId: string,
): Promise<void> => {
  try {
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", notificationId);

    if (error) {
      console.error("Error marking notification as read:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error in markNotificationAsRead:", error);
    throw error;
  }
};

export const deleteNotification = async (
  notificationId: string,
): Promise<void> => {
  try {
    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", notificationId);

    if (error) {
      console.error("Error deleting notification:", error);
      throw error;
    }
  } catch (error) {
    console.error("Error in deleteNotification:", error);
    throw error;
  }
};

// Keep the old export name for backward compatibility
export const clearNotification = deleteNotification;
