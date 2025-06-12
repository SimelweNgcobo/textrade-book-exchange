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
  try {
    // Add timeout and better error handling
    const { data, error } = (await Promise.race([
      supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false }),
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error("Notification fetch timeout")),
          10000,
        ),
      ),
    ])) as any;

    if (error) {
      console.error("Error fetching notifications:", error);

      // Handle specific error types
      if (error.message?.includes("Failed to fetch")) {
        console.warn(
          "Connection issue while fetching notifications - returning empty array",
        );
        return [];
      }

      throw error;
    }

    return (data || []).map((notification) => ({
      id: notification.id,
      userId: notification.user_id,
      title: notification.title,
      message: notification.message,
      type: notification.type as "info" | "warning" | "success" | "error",
      read: notification.read,
      createdAt: notification.created_at,
    }));
  } catch (error) {
    console.error("Error in getNotifications:", error);

    // Log connection health for debugging
    if (import.meta.env.DEV && error?.message?.includes("fetch")) {
      import("../utils/connectionHealthCheck").then(
        ({ logConnectionHealth }) => {
          logConnectionHealth();
        },
      );
    }

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
