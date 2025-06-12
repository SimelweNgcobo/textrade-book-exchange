import { supabase } from "@/integrations/supabase/client";
import { Broadcast, BroadcastInput, BroadcastView } from "@/types/broadcast";
import { addNotification } from "./notificationService";
import {
  logError,
  getErrorMessage,
  retryWithExponentialBackoff,
  withTimeout,
  isNetworkError,
} from "@/utils/errorUtils";

export const getActiveBroadcasts = async (): Promise<Broadcast[]> => {
  try {
    console.log("🔄 Fetching active broadcasts...");

    const result = await retryWithExponentialBackoff(
      async () => {
        return await withTimeout(
          supabase
            .from("broadcasts")
            .select("*")
            .eq("is_active", true)
            .or("expires_at.is.null,expires_at.gt." + new Date().toISOString())
            .order("created_at", { ascending: false }),
          8000, // 8 second timeout
          "Broadcast fetch timed out",
        );
      },
      {
        maxRetries: 2,
        baseDelay: 1000,
        retryCondition: (error) => isNetworkError(error),
      },
    );

    const { data, error } = result as any;

    if (error) {
      // If broadcasts table doesn't exist, return empty array
      if (error.code === "42P01" || error.code === "PGRST106") {
        console.log("ℹ️ Broadcasts table not found, returning empty array");
        return [];
      }

      logError("Database error fetching broadcasts", error);
      return []; // Return empty array instead of throwing
    }

    console.log(`✅ Found ${data?.length || 0} active broadcasts`);

    return (data || []).map((broadcast) => ({
      id: broadcast.id,
      message: broadcast.message,
      title: broadcast.title,
      createdAt: broadcast.created_at,
      isActive: broadcast.is_active,
      priority: broadcast.priority as "low" | "normal" | "high" | "urgent",
      expiresAt: broadcast.expires_at,
      targetAudience: broadcast.target_audience as "all" | "users" | "admin",
      createdBy: broadcast.created_by,
    }));
  } catch (error) {
    logError("Error in getActiveBroadcasts", error);
    // Return empty array instead of throwing to prevent app crashes
    console.warn("🚨 Failed to fetch broadcasts, returning empty array");
    return [];
  }
};

export const getBroadcastViews = async (
  broadcastId: string,
): Promise<BroadcastView[]> => {
  try {
    const result = await retryWithExponentialBackoff(
      async () => {
        return await withTimeout(
          supabase
            .from("broadcast_views")
            .select("*")
            .eq("broadcast_id", broadcastId),
          5000,
          "Broadcast views fetch timed out",
        );
      },
      {
        maxRetries: 1,
        baseDelay: 500,
        retryCondition: (error) => isNetworkError(error),
      },
    );

    const { data, error } = result as any;

    if (error) {
      logError("Error fetching broadcast views", error);
      return [];
    }

    return data || [];
  } catch (error) {
    logError("Error in getBroadcastViews", error);
    return [];
  }
};

export const markBroadcastAsViewed = async (
  broadcastId: string,
  userId: string,
): Promise<void> => {
  try {
    const result = await retryWithExponentialBackoff(
      async () => {
        return await withTimeout(
          supabase
            .from("broadcast_views")
            .upsert({ broadcast_id: broadcastId, user_id: userId }),
          5000,
          "Mark broadcast as viewed timed out",
        );
      },
      {
        maxRetries: 1,
        baseDelay: 500,
        retryCondition: (error) => isNetworkError(error),
      },
    );

    const { error } = result as any;

    if (error) {
      logError("Error marking broadcast as viewed", error);
    }
  } catch (error) {
    logError("Error in markBroadcastAsViewed", error);
  }
};

export const createBroadcast = async (
  broadcast: BroadcastInput,
): Promise<Broadcast | null> => {
  try {
    const result = await retryWithExponentialBackoff(
      async () => {
        return await withTimeout(
          supabase.from("broadcasts").insert(broadcast).select().single(),
          10000,
          "Create broadcast timed out",
        );
      },
      {
        maxRetries: 1,
        baseDelay: 1000,
        retryCondition: (error) => isNetworkError(error),
      },
    );

    const { data, error } = result as any;

    if (error) {
      logError("Error creating broadcast", error);
      throw new Error(getErrorMessage(error, "Failed to create broadcast"));
    }

    // Trigger notification for all users
    if (data) {
      try {
        await addNotification({
          user_id: null, // null means all users
          title: data.title,
          message: data.message,
          type: "info",
        });
      } catch (notifError) {
        logError("Error sending broadcast notification", notifError);
        // Don't fail the broadcast creation if notification fails
      }
    }

    return data
      ? {
          id: data.id,
          message: data.message,
          title: data.title,
          createdAt: data.created_at,
          isActive: data.is_active,
          priority: data.priority as "low" | "normal" | "high" | "urgent",
          expiresAt: data.expires_at,
          targetAudience: data.target_audience as "all" | "users" | "admin",
          createdBy: data.created_by,
        }
      : null;
  } catch (error) {
    logError("Error in createBroadcast", error);
    throw error;
  }
};

export const updateBroadcast = async (
  id: string,
  updates: Partial<BroadcastInput>,
): Promise<Broadcast | null> => {
  try {
    const result = await retryWithExponentialBackoff(
      async () => {
        return await withTimeout(
          supabase
            .from("broadcasts")
            .update(updates)
            .eq("id", id)
            .select()
            .single(),
          8000,
          "Update broadcast timed out",
        );
      },
      {
        maxRetries: 1,
        baseDelay: 1000,
        retryCondition: (error) => isNetworkError(error),
      },
    );

    const { data, error } = result as any;

    if (error) {
      logError("Error updating broadcast", error);
      throw new Error(getErrorMessage(error, "Failed to update broadcast"));
    }

    return data
      ? {
          id: data.id,
          message: data.message,
          title: data.title,
          createdAt: data.created_at,
          isActive: data.is_active,
          priority: data.priority as "low" | "normal" | "high" | "urgent",
          expiresAt: data.expires_at,
          targetAudience: data.target_audience as "all" | "users" | "admin",
          createdBy: data.created_by,
        }
      : null;
  } catch (error) {
    logError("Error in updateBroadcast", error);
    throw error;
  }
};

export const deleteBroadcast = async (id: string): Promise<void> => {
  try {
    const result = await retryWithExponentialBackoff(
      async () => {
        return await withTimeout(
          supabase.from("broadcasts").delete().eq("id", id),
          5000,
          "Delete broadcast timed out",
        );
      },
      {
        maxRetries: 1,
        baseDelay: 500,
        retryCondition: (error) => isNetworkError(error),
      },
    );

    const { error } = result as any;

    if (error) {
      logError("Error deleting broadcast", error);
      throw new Error(getErrorMessage(error, "Failed to delete broadcast"));
    }
  } catch (error) {
    logError("Error in deleteBroadcast", error);
    throw error;
  }
};
