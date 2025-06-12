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

    // Simplified approach with longer timeout and no retries
    // Broadcasts are not critical for app functionality
    const { data, error } = (await withTimeout(
      supabase
        .from("broadcasts")
        .select("*")
        .eq("is_active", true)
        .or("expires_at.is.null,expires_at.gt." + new Date().toISOString())
        .order("created_at", { ascending: false }),
      15000, // Increased to 15 seconds
      "Broadcast fetch timed out after 15 seconds",
    )) as any;

    if (error) {
      // If broadcasts table doesn't exist, return empty array (normal)
      if (error.code === "42P01" || error.code === "PGRST106") {
        console.log("ℹ️ Broadcasts table not found, returning empty array");
        return [];
      }

      // Log error details but don't spam console
      console.warn("⚠️ Broadcast fetch error:", {
        message: error.message || "Unknown error",
        code: error.code || "No code",
        hint: error.hint || "No hint",
      });
      return []; // Return empty array - broadcasts are optional
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
    // Enhanced error logging for debugging timeout issues
    const errorDetails = {
      message: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : "Unknown",
      isTimeout: (error as any)?.isTimeout || false,
      stack: error instanceof Error ? error.stack?.split("\n")[0] : undefined,
    };

    console.warn("⚠️ Broadcast fetch failed:", errorDetails);

    // Return empty array - broadcasts are not critical for app functionality
    return [];
  }
};

export const getBroadcastViews = async (
  broadcastId: string,
): Promise<BroadcastView[]> => {
  try {
    const { data, error } = (await withTimeout(
      supabase
        .from("broadcast_views")
        .select("*")
        .eq("broadcast_id", broadcastId),
      8000, // Reasonable timeout for views
      "Broadcast views fetch timed out",
    )) as any;

    if (error) {
      console.warn(
        "⚠️ Broadcast views fetch error:",
        error.message || "Unknown error",
      );
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn(
      "⚠️ Broadcast views fetch failed:",
      error instanceof Error ? error.message : String(error),
    );
    return [];
  }
};

export const markBroadcastAsViewed = async (
  broadcastId: string,
  userId: string,
): Promise<void> => {
  try {
    const { error } = (await withTimeout(
      supabase
        .from("broadcast_views")
        .upsert({ broadcast_id: broadcastId, user_id: userId }),
      8000,
      "Mark broadcast as viewed timed out",
    )) as any;

    if (error) {
      console.warn(
        "⚠️ Mark broadcast as viewed error:",
        error.message || "Unknown error",
      );
    }
  } catch (error) {
    console.warn(
      "⚠️ Mark broadcast as viewed failed:",
      error instanceof Error ? error.message : String(error),
    );
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

// Additional helper functions for BroadcastManager
export const getLatestBroadcast = async (): Promise<Broadcast | null> => {
  try {
    const broadcasts = await getActiveBroadcasts();
    return broadcasts.length > 0 ? broadcasts[0] : null;
  } catch (error) {
    logError("Error getting latest broadcast", error);
    return null;
  }
};

export const hasBroadcastBeenViewed = async (
  broadcastId: string,
  userId: string,
): Promise<boolean> => {
  try {
    const result = await retryWithExponentialBackoff(
      async () => {
        return await withTimeout(
          supabase
            .from("broadcast_views")
            .select("id")
            .eq("broadcast_id", broadcastId)
            .eq("user_id", userId)
            .single(),
          3000,
          "Check broadcast view timed out",
        );
      },
      {
        maxRetries: 1,
        baseDelay: 300,
        retryCondition: (error) => isNetworkError(error),
      },
    );

    const { data, error } = result as any;
    return !error && !!data;
  } catch (error) {
    logError("Error checking broadcast view status", error);
    return false;
  }
};

export const dismissBroadcast = async (
  broadcastId: string,
  userId: string,
): Promise<void> => {
  try {
    await markBroadcastAsViewed(broadcastId, userId);
  } catch (error) {
    logError("Error dismissing broadcast", error);
  }
};

export const saveBroadcastToNotifications = async (
  broadcast: Broadcast,
  userId: string,
): Promise<void> => {
  try {
    await addNotification({
      user_id: userId,
      title: broadcast.title,
      message: broadcast.message,
      type: "info",
    });
  } catch (error) {
    logError("Error saving broadcast to notifications", error);
  }
};
