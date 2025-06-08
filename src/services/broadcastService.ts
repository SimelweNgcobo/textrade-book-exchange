import { supabase } from "@/integrations/supabase/client";
import { Broadcast, BroadcastInput, BroadcastView } from "@/types/broadcast";
import { addNotification } from "./notificationService";

export const getActiveBroadcasts = async (): Promise<Broadcast[]> => {
  try {
    const { data, error } = await supabase
      .from("broadcasts")
      .select("*")
      .eq("is_active", true)
      .or("expires_at.is.null,expires_at.gt." + new Date().toISOString())
      .order("created_at", { ascending: false });

    if (error) {
      // If broadcasts table doesn't exist, return empty array
      if (error.code === "42P01") {
        console.log("Broadcasts table not found, returning empty array");
        return [];
      }
      console.error("Error fetching broadcasts:", error);
      return [];
    }

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
    console.error("Error in getActiveBroadcasts:", error);
    return [];
  }
};

export const getLatestBroadcast = async (): Promise<Broadcast | null> => {
  try {
    const broadcasts = await getActiveBroadcasts();
    return broadcasts.length > 0 ? broadcasts[0] : null;
  } catch (error) {
    console.error("Error getting latest broadcast:", error);
    return null;
  }
};

export const createBroadcast = async (
  broadcast: BroadcastInput,
): Promise<Broadcast> => {
  try {
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
      console.error("Error creating broadcast:", error);
      throw error;
    }

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
  } catch (error) {
    console.error("Error in createBroadcast:", error);
    throw error;
  }
};

export const markBroadcastAsViewed = async (
  userId: string,
  broadcastId: string,
): Promise<void> => {
  try {
    const { error } = await supabase.from("broadcast_views").upsert({
      user_id: userId,
      broadcast_id: broadcastId,
      viewed_at: new Date().toISOString(),
      dismissed: false,
    });

    if (error && error.code !== "42P01") {
      console.error("Error marking broadcast as viewed:", error);
    }
  } catch (error) {
    console.error("Error in markBroadcastAsViewed:", error);
  }
};

export const dismissBroadcast = async (
  userId: string,
  broadcastId: string,
): Promise<void> => {
  try {
    const { error } = await supabase.from("broadcast_views").upsert({
      user_id: userId,
      broadcast_id: broadcastId,
      viewed_at: new Date().toISOString(),
      dismissed: true,
    });

    if (error && error.code !== "42P01") {
      console.error("Error dismissing broadcast:", error);
    }
  } catch (error) {
    console.error("Error in dismissBroadcast:", error);
  }
};

export const hasBroadcastBeenViewed = async (
  userId: string,
  broadcastId: string,
): Promise<boolean> => {
  try {
    const { data, error } = await supabase
      .from("broadcast_views")
      .select("dismissed")
      .eq("user_id", userId)
      .eq("broadcast_id", broadcastId)
      .single();

    if (error) {
      // If table doesn't exist or no record found, assume not viewed
      return false;
    }

    return data ? data.dismissed : false;
  } catch (error) {
    console.error("Error checking broadcast view status:", error);
    return false;
  }
};

export const saveBroadcastToNotifications = async (
  userId: string,
  broadcast: Broadcast,
): Promise<void> => {
  try {
    await addNotification({
      userId,
      title: `📢 ${broadcast.title}`,
      message: broadcast.message,
      type: broadcast.priority === "urgent" ? "warning" : "info",
      read: false,
    });
  } catch (error) {
    console.error("Error saving broadcast to notifications:", error);
  }
};
