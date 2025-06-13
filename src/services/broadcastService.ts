
import { supabase } from "@/integrations/supabase/client";
import { Broadcast } from "@/types/broadcast";
import { addNotification } from "./notificationService";

export const getLatestBroadcast = async (): Promise<Broadcast | null> => {
  try {
    // Since we don't have a broadcasts table, return null for now
    return null;
  } catch (error) {
    console.error("Error fetching latest broadcast:", error);
    return null;
  }
};

export const hasBroadcastBeenViewed = async (
  userId: string,
  broadcastId: string,
): Promise<boolean> => {
  try {
    // For now, assume all broadcasts have been viewed
    return true;
  } catch (error) {
    console.error("Error checking broadcast view status:", error);
    return true;
  }
};

export const dismissBroadcast = async (
  userId: string,
  broadcastId: string,
): Promise<void> => {
  try {
    // Store dismissal in localStorage for now
    const dismissed = JSON.parse(
      localStorage.getItem("dismissedBroadcasts") || "[]",
    );
    if (!dismissed.includes(broadcastId)) {
      dismissed.push(broadcastId);
      localStorage.setItem("dismissedBroadcasts", JSON.stringify(dismissed));
    }
  } catch (error) {
    console.error("Error dismissing broadcast:", error);
  }
};

// Fix function signature to match usage: broadcast first, then userId
export const saveBroadcastToNotifications = async (
  broadcast: Broadcast,
  userId: string,
): Promise<void> => {
  try {
    await addNotification({
      userId,
      title: broadcast.title,
      message: broadcast.message,
      type: "info",
      read: false,
    });
  } catch (error) {
    console.error("Error saving broadcast to notifications:", error);
  }
};
