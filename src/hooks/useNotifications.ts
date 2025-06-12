import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  getNotifications,
  clearNotificationCache,
} from "@/services/notificationService";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type Notification = Database["public"]["Tables"]["notifications"]["Row"];

interface NotificationHookReturn {
  unreadCount: number;
  totalCount: number;
  notifications: Notification[];
  isLoading: boolean;
  hasError: boolean;
  lastError?: string;
  refreshNotifications: () => Promise<void>;
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

  const MAX_RETRY_ATTEMPTS = 3;
  const RETRY_DELAYS = [5000, 15000, 30000]; // Progressive retry delays

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
        setLastError(undefined);
        return;
      }

      // Only show loading on initial load or manual refresh (not on retries)
      if (!isRetry || isInitialLoadRef.current) {
        setIsLoading(true);
      }

      try {
        const userNotifications = await getNotifications(user.id);

        // Check if we got valid data
        if (Array.isArray(userNotifications)) {
          setNotifications(userNotifications);
          setHasError(false);
          setLastError(undefined);
          retryCountRef.current = 0;
          isInitialLoadRef.current = false;

          // Clear any pending retry
          if (retryTimeoutRef.current) {
            clearTimeout(retryTimeoutRef.current);
            retryTimeoutRef.current = null;
          }
        } else {
          throw new Error("Invalid data format received");
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";

        if (import.meta.env.DEV) {
          console.warn("Error in refreshNotifications:", errorMessage);
        }

        setHasError(true);
        setLastError(errorMessage);

        // Implement progressive retry with exponential backoff
        if (
          retryCountRef.current < MAX_RETRY_ATTEMPTS &&
          !retryTimeoutRef.current
        ) {
          const delay =
            RETRY_DELAYS[retryCountRef.current] ||
            RETRY_DELAYS[RETRY_DELAYS.length - 1];

          retryTimeoutRef.current = setTimeout(() => {
            retryTimeoutRef.current = null;
            retryCountRef.current++;

            if (isAuthenticated && user) {
              refreshNotifications(true);
            }
          }, delay);
        }

        // Keep existing notifications if we have them (don't clear on error)
        // This provides better UX by showing stale data rather than empty state
      } finally {
        setIsLoading(false);
      }
    },
    [user, isAuthenticated],
  );

  // Initial load effect
  useEffect(() => {
    if (isAuthenticated && user) {
      refreshNotifications();
    } else {
      // Clear state when user logs out
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
  }, [refreshNotifications, isAuthenticated, user]);

  // Set up real-time subscription for notifications
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    let channel: any = null;

    try {
      channel = supabase
        .channel(`notifications:${user.id}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            // Clear cache and refresh on any notification changes
            clearNotificationCache(user.id);

            // Only refresh if we don't have errors or if this is an insert/update
            if (!hasError || payload.eventType === "INSERT") {
              refreshNotifications().catch((error) => {
                console.error(
                  "Error refreshing notifications from subscription:",
                  error,
                );
              });
            }
          },
        )
        .subscribe((status) => {
          if (status === "SUBSCRIBED") {
            if (import.meta.env.DEV) {
              console.log("Notification subscription established");
            }
          } else if (status === "CHANNEL_ERROR") {
            console.warn("Notification subscription error");
          }
        });

      return () => {
        try {
          if (channel) {
            supabase.removeChannel(channel);
          }
        } catch (error) {
          console.error("Error removing notification channel:", error);
        }
      };
    } catch (error) {
      console.error("Error setting up notification subscription:", error);
    }
  }, [user, isAuthenticated, refreshNotifications, hasError]);

  // Cleanup retry timeout on unmount
  useEffect(() => {
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
    };
  }, []);

  // Performance optimization: memoize computed values
  const unreadCount = notifications.filter((n) => !n.read).length;
  const totalCount = notifications.length;

  return {
    unreadCount,
    totalCount,
    notifications,
    isLoading,
    hasError,
    lastError,
    refreshNotifications: () => refreshNotifications(false),
    clearError,
  };
};
