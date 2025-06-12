import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "@/services/notificationService";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type Notification = Database["public"]["Tables"]["notifications"]["Row"];

const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAYS = [5000, 15000, 30000]; // Progressive retry delays

interface NotificationHookReturn {
  unreadCount: number;
  totalCount: number;
  notifications: Notification[];
  isLoading: boolean;
  hasError: boolean;
  lastError?: string;
  refreshNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useNotifications = (): NotificationHookReturn => {
  const { user, isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [lastError, setLastError] = useState<string | undefined>();
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const retryCountRef = useRef(0);
  const isInitialLoadRef = useRef(true);
  const subscriptionRef = useRef<{ unsubscribe: () => void } | null>(null);
  const refreshingRef = useRef(false); // Prevent concurrent refreshes

  const clearError = useCallback(() => {
    setHasError(false);
    setLastError(undefined);
    retryCountRef.current = 0;
  }, []);

  const refreshNotifications = useCallback(
    async (isRetry = false) => {
      if (!isAuthenticated || !user) {
        setNotifications([]);
        setHasError(false);
        return;
      }

      // Prevent concurrent refresh calls
      if (refreshingRef.current) {
        return;
      }

      try {
        refreshingRef.current = true;

        if (!isRetry && isInitialLoadRef.current) {
          setIsLoading(true);
          isInitialLoadRef.current = false;
        }

        console.log("🔄 Refreshing notifications...");

        const data = await getNotifications(user.id);
        if (data) {
          // Deduplicate notifications by ID and timestamp
          const uniqueNotifications = data.filter(
            (notification, index, self) => {
              const isDuplicate =
                self.findIndex(
                  (n) =>
                    n.id === notification.id ||
                    (n.title === notification.title &&
                      n.message === notification.message &&
                      Math.abs(
                        new Date(n.created_at).getTime() -
                          new Date(notification.created_at).getTime(),
                      ) < 10000),
                ) !== index;
              return !isDuplicate;
            },
          );

          setNotifications(uniqueNotifications);
          console.log(
            `✅ Loaded ${uniqueNotifications.length} unique notifications`,
          );
          if (uniqueNotifications.length !== data.length) {
            console.log(
              `ℹ️ Removed ${data.length - uniqueNotifications.length} duplicate notifications`,
            );
          }
        }

        setHasError(false);
        setLastError(undefined);
        retryCountRef.current = 0;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        console.warn("⚠️ Notification refresh failed:", errorMessage);

        setHasError(true);
        setLastError(errorMessage);

        // Retry logic for network errors only
        const isNetworkError =
          errorMessage.includes("Failed to fetch") ||
          errorMessage.includes("network") ||
          errorMessage.includes("timeout");

        if (isNetworkError && retryCountRef.current < MAX_RETRY_ATTEMPTS) {
          const delay = RETRY_DELAYS[retryCountRef.current] || 30000;
          retryCountRef.current++;

          console.log(
            `ℹ️ Retrying notification fetch in ${delay}ms (attempt ${retryCountRef.current}/${MAX_RETRY_ATTEMPTS})`,
          );

          retryTimeoutRef.current = setTimeout(() => {
            refreshNotifications(true);
          }, delay);
        }
      } finally {
        setIsLoading(false);
        refreshingRef.current = false;
      }
    },
    [user?.id, isAuthenticated],
  );

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);

      // Update local state
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification,
        ),
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  }, []);

  const deleteNotif = useCallback(async (notificationId: string) => {
    try {
      await deleteNotification(notificationId);

      // Update local state
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== notificationId),
      );
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  }, []);

  // Initial load and auth state changes
  useEffect(() => {
    if (isAuthenticated && user) {
      refreshNotifications();
    } else {
      setNotifications([]);
      setHasError(false);
      setLastError(undefined);
      retryCountRef.current = 0;
      isInitialLoadRef.current = true;

      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    }
  }, [user?.id, isAuthenticated, refreshNotifications]);

  // Set up real-time subscription for notifications
  useEffect(() => {
    if (!isAuthenticated || !user) {
      // Clean up existing subscription
      if (subscriptionRef.current) {
        try {
          supabase.removeChannel(subscriptionRef.current);
        } catch (error) {
          console.error("Error removing notification channel:", error);
        }
        subscriptionRef.current = null;
      }
      return;
    }

    try {
      // Clean up previous subscription if it exists
      if (subscriptionRef.current) {
        try {
          supabase.removeChannel(subscriptionRef.current);
        } catch (error) {
          console.error("Error removing previous notification channel:", error);
        }
      }

      // Create a unique channel name with timestamp to avoid conflicts
      const channelName = `notifications_${user.id}_${Date.now()}`;

      const channel = supabase
        .channel(channelName)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${user.id}`,
          },
          () => {
            // Debounce refresh to prevent rapid-fire updates
            if (retryTimeoutRef.current) {
              clearTimeout(retryTimeoutRef.current);
            }

            retryTimeoutRef.current = setTimeout(() => {
              refreshNotifications();
            }, 1000); // 1 second debounce
          },
        )
        .subscribe();

      subscriptionRef.current = channel;
    } catch (error) {
      console.error("Error setting up notification subscription:", error);
    }
  }, [user?.id, isAuthenticated, refreshNotifications]);

  // Cleanup retry timeout and subscription on unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
      }
      if (subscriptionRef.current) {
        try {
          supabase.removeChannel(subscriptionRef.current);
        } catch (error) {
          console.error(
            "Error removing notification channel on unmount:",
            error,
          );
        }
        subscriptionRef.current = null;
      }
    };
  }, []);

  // Performance optimization: memoize computed values
  const unreadCount = notifications.filter((n) => !n.read).length;
  const totalCount = notifications.length;

  return {
    notifications,
    unreadCount,
    totalCount,
    isLoading,
    hasError,
    lastError,
    refreshNotifications,
    markAsRead,
    deleteNotification: deleteNotif,
    clearError,
  };
};
