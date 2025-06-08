import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { getNotifications } from "@/services/notificationService";
import { supabase } from "@/integrations/supabase/client";

interface NotificationHookReturn {
  unreadCount: number;
  totalCount: number;
  notifications: any[];
  isLoading: boolean;
  refreshNotifications: () => Promise<void>;
}

export const useNotifications = (): NotificationHookReturn => {
  const { user, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshNotifications = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setNotifications([]);
      return;
    }

    setIsLoading(true);
    try {
      const userNotifications = await getNotifications(user.id);
      setNotifications(userNotifications);
    } catch (error) {
      console.error("Error refreshing notifications:", error);
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
          refreshNotifications();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
