import { useState, useEffect, useCallback, useRef } from "react";
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
  hasError: boolean;
  refreshNotifications: () => Promise<void>;
}

export const useNotifications = (): NotificationHookReturn => {
  const { user, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const refreshNotifications = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setNotifications([]);
      setHasError(false);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    try {
      const userNotifications = await getNotifications(user.id);

      // Check if we got data (getNotifications returns empty array on error)
      if (Array.isArray(userNotifications)) {
        setNotifications(userNotifications);
        setHasError(false);

        // Clear any pending retry
        if (retryTimeoutRef.current) {
          clearTimeout(retryTimeoutRef.current);
          retryTimeoutRef.current = null;
        }
      } else {
        // Unexpected data format
        setHasError(true);
        setNotifications([]);
      }
    } catch (error) {
      // This should rarely happen now since getNotifications handles errors internally
      if (import.meta.env.DEV) {
        console.warn("Unexpected error in refreshNotifications:", error);
      }
      setHasError(true);
      setNotifications([]);

      // Retry after 30 seconds if there's an error
      if (!retryTimeoutRef.current) {
        retryTimeoutRef.current = setTimeout(() => {
          if (isAuthenticated && user) {
            refreshNotifications();
          }
        }, 30000);
      }
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

  // Cleanup retry timeout on unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
    };
  }, []);

  return {
    unreadCount,
    totalCount,
    notifications,
    isLoading,
    hasError,
    refreshNotifications,
  };
};
