import { supabase } from "@/integrations/supabase/client";
import { Broadcast, BroadcastInput, BroadcastView } from "@/types/broadcast";
import { addNotification } from "./notificationService";
import { retryWithConnection } from "@/utils/connectionHealthCheck";

// Enhanced error logging function
const logDetailedError = (context: string, error: unknown) => {
  const errorDetails = {
    message: error instanceof Error ? error.message : String(error),
    name: error instanceof Error ? error.name : "Unknown",
    stack: error instanceof Error ? error.stack : undefined,
    type: typeof error,
    constructor: error instanceof Error ? error.constructor.name : undefined,
    timestamp: new Date().toISOString(),
  };

  console.error(`[BroadcastService] ${context}:`, errorDetails);
};

export const getActiveBroadcasts = async (): Promise<Broadcast[]> => {
  try {
    console.log("🔄 Fetching active broadcasts...");

    const fetchBroadcastsOperation = async () => {
      const { data, error } = await supabase
        .from("broadcasts")
        .select("*")
        .eq("is_active", true)
        .or("expires_at.is.null,expires_at.gt." + new Date().toISOString())
        .order("created_at", { ascending: false });

      if (error) {
        // If broadcasts table doesn't exist, return empty array
        if (error.code === "42P01" || error.code === "PGRST106") {
          console.log("ℹ️ Broadcasts table not found, returning empty array");
          return [];
        }

        logDetailedError("Database error fetching broadcasts", error);
        throw new Error(
          `Failed to fetch broadcasts: ${error.message || "Unknown database error"}`,
        );
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
    };

    // Use retry logic for network resilience
    return await retryWithConnection(fetchBroadcastsOperation, 2, 1000);
  } catch (error) {
    logDetailedError("Error in getActiveBroadcasts", error);

    // Return empty array instead of throwing to prevent app crashes
    console.warn("🚨 Failed to fetch broadcasts, returning empty array");
    return [];
  }
};

export const getLatestBroadcast = async (): Promise<Broadcast | null> => {
  try {
    console.log("🔄 Fetching latest broadcast...");

    const broadcasts = await getActiveBroadcasts();
    const latest = broadcasts.length > 0 ? broadcasts[0] : null;

    if (latest) {
      console.log(`✅ Found latest broadcast: ${latest.title}`);
    } else {
      console.log("ℹ️ No active broadcasts found");
    }

    return latest;
  } catch (error) {
    logDetailedError("Error getting latest broadcast", error);
    return null;
  }
};

export const createBroadcast = async (
  broadcast: BroadcastInput,
): Promise<Broadcast> => {
  try {
    console.log("📝 Creating new broadcast:", broadcast.title);

    const createBroadcastOperation = async () => {
      const { data, error } = await supabase
        .from("broadcasts")
        .insert([
          {
            message: broadcast.message,
            title: broadcast.title,
            priority: broadcast.priority,
            expires_at: broadcast.expiresAt,
            target_audience: broadcast.targetAudience,
            created_by: broadcast.createdBy,
            is_active: true,
          },
        ])
        .select()
        .single();

      if (error) {
        logDetailedError("Error creating broadcast", error);
        throw new Error(
          `Failed to create broadcast: ${error.message || "Unknown database error"}`,
        );
      }

      console.log("✅ Broadcast created successfully");

      return {
        id: data.id,
        message: data.message,
        title: data.title,
        createdAt: data.created_at,
        isActive: data.is_active,
        priority: data.priority,
        expiresAt: data.expires_at,
        targetAudience: data.target_audience,
        createdBy: data.created_by,
      };
    };

    return await retryWithConnection(createBroadcastOperation, 2, 1000);
  } catch (error) {
    logDetailedError("Error in createBroadcast", error);
    throw error; // Re-throw for create operations
  }
};

export const markBroadcastAsViewed = async (
  userId: string,
  broadcastId: string,
): Promise<void> => {
  try {
    console.log(
      `👁️ Marking broadcast as viewed: ${broadcastId} for user: ${userId}`,
    );

    const markViewedOperation = async () => {
      const { error } = await supabase.from("broadcast_views").upsert({
        user_id: userId,
        broadcast_id: broadcastId,
        viewed_at: new Date().toISOString(),
        dismissed: false,
      });

      if (error && error.code !== "42P01" && error.code !== "PGRST106") {
        logDetailedError("Error marking broadcast as viewed", error);
        throw new Error(
          `Failed to mark broadcast as viewed: ${error.message || "Unknown database error"}`,
        );
      }
    };

    await retryWithConnection(markViewedOperation, 2, 1000);
    console.log("✅ Broadcast marked as viewed");
  } catch (error) {
    logDetailedError("Error in markBroadcastAsViewed", error);
    // Don't throw - this is not critical functionality
  }
};

export const dismissBroadcast = async (
  userId: string,
  broadcastId: string,
): Promise<void> => {
  try {
    console.log(`❌ Dismissing broadcast: ${broadcastId} for user: ${userId}`);

    const dismissBroadcastOperation = async () => {
      const { error } = await supabase.from("broadcast_views").upsert({
        user_id: userId,
        broadcast_id: broadcastId,
        viewed_at: new Date().toISOString(),
        dismissed: true,
      });

      if (error && error.code !== "42P01" && error.code !== "PGRST106") {
        logDetailedError("Error dismissing broadcast", error);
        throw new Error(
          `Failed to dismiss broadcast: ${error.message || "Unknown database error"}`,
        );
      }
    };

    await retryWithConnection(dismissBroadcastOperation, 2, 1000);
    console.log("✅ Broadcast dismissed");
  } catch (error) {
    logDetailedError("Error in dismissBroadcast", error);
    // Don't throw - this is not critical functionality
  }
};

export const hasBroadcastBeenViewed = async (
  userId: string,
  broadcastId: string,
): Promise<boolean> => {
  try {
    console.log(
      `🔍 Checking if broadcast viewed: ${broadcastId} for user: ${userId}`,
    );

    const checkViewedOperation = async () => {
      const { data, error } = await supabase
        .from("broadcast_views")
        .select("dismissed")
        .eq("user_id", userId)
        .eq("broadcast_id", broadcastId)
        .single();

      if (error) {
        // If table doesn't exist or no record found, assume not viewed
        if (
          error.code === "42P01" ||
          error.code === "PGRST106" ||
          error.code === "PGRST116"
        ) {
          return false;
        }
        logDetailedError("Error checking broadcast view status", error);
        return false; // Default to not viewed on error
      }

      return data ? data.dismissed : false;
    };

    const result = await retryWithConnection(checkViewedOperation, 2, 1000);
    console.log(`📊 Broadcast viewed status: ${result}`);
    return result;
  } catch (error) {
    logDetailedError("Error in hasBroadcastBeenViewed", error);
    return false; // Default to not viewed on error
  }
};

export const saveBroadcastToNotifications = async (
  userId: string,
  broadcast: Broadcast,
): Promise<void> => {
  try {
    console.log(`💾 Saving broadcast to notifications: ${broadcast.title}`);

    await addNotification({
      userId,
      title: `📢 ${broadcast.title}`,
      message: broadcast.message,
      type: broadcast.priority === "urgent" ? "warning" : "info",
      read: false,
    });

    console.log("✅ Broadcast saved to notifications");
  } catch (error) {
    logDetailedError("Error saving broadcast to notifications", error);
    // Don't throw - this is not critical functionality
  }
};
