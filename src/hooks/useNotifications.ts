import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getNotifications } from "@/services/notificationService";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type Notification = Database["public"]["Tables"]["notifications"]["Row"];

interface NotificationHookReturn {
  unreadCount: number;
  totalCount: number;
  notifications: Notification[];
  isLoading: boolean;
  refreshNotifications: () => Promise<void>;
}

export const useNotifications = (): NotificationHookReturn => {
  const { user, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshNotifications = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setNotifications([]);
      return;
    }

    setIsLoading(true);
    try {
      const userNotifications = await getNotifications(user.id);
      setNotifications(
        Array.isArray(userNotifications) ? userNotifications : [],
      );
    } catch (error) {
      console.error("Error refreshing notifications:", error);
      setNotifications([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    refreshNotifications();
  }, [refreshNotifications]);

  // Set up real-time subscription for notifications
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    try {
      const channel = supabase
        .channel("notifications")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            refreshNotifications().catch((error) => {
              console.error(
                "Error refreshing notifications from subscription:",
                error,
              );
            });
          },
        )
        .subscribe();

      return () => {
        try {
          supabase.removeChannel(channel);
        } catch (error) {
          console.error("Error removing notification channel:", error);
        }
      };
    } catch (error) {
      console.error("Error setting up notification subscription:", error);
    }
  }, [user, isAuthenticated, refreshNotifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const totalCount = notifications.length;

  return {
    unreadCount,
    totalCount,
    notifications,
    isLoading,
    refreshNotifications,
  };
};
