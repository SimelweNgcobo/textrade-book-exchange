
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

// Add the missing createBroadcast function
export const createBroadcast = async (
  broadcast: Omit<Broadcast, "id" | "createdAt">,
): Promise<Broadcast> => {
  try {
    // For now, create a mock broadcast since we don't have a broadcasts table
    const newBroadcast: Broadcast = {
      id: `broadcast-${Date.now()}`,
      title: broadcast.title,
      message: broadcast.message,
      type: broadcast.type,
      priority: broadcast.priority,
      isActive: broadcast.isActive,
      createdAt: new Date().toISOString(),
      expiresAt: broadcast.expiresAt,
      targetAudience: broadcast.targetAudience,
      createdBy: broadcast.createdBy,
    };

    // In a real implementation, this would be saved to the database
    console.log("Created broadcast:", newBroadcast);
    
    return newBroadcast;
  } catch (error) {
    console.error("Error creating broadcast:", error);
    throw new Error("Failed to create broadcast");
  }
};

export const updateBroadcast = async (
  id: string,
  updates: Partial<Broadcast>,
): Promise<Broadcast> => {
  try {
    // For now, create a mock updated broadcast
    const updatedBroadcast: Broadcast = {
      id,
      title: updates.title || "",
      message: updates.message || "",
      type: updates.type || "info",
      priority: updates.priority || "medium",
      isActive: updates.isActive ?? true,
      createdAt: updates.createdAt || new Date().toISOString(),
      expiresAt: updates.expiresAt,
      targetAudience: updates.targetAudience,
      createdBy: updates.createdBy,
    };

    console.log("Updated broadcast:", updatedBroadcast);
    
    return updatedBroadcast;
  } catch (error) {
    console.error("Error updating broadcast:", error);
    throw new Error("Failed to update broadcast");
  }
};

export const deleteBroadcast = async (id: string): Promise<void> => {
  try {
    // In a real implementation, this would delete from the database
    console.log("Deleted broadcast:", id);
  } catch (error) {
    console.error("Error deleting broadcast:", error);
    throw new Error("Failed to delete broadcast");
  }
};

export const getAllBroadcasts = async (): Promise<Broadcast[]> => {
  try {
    // For now, return an empty array since we don't have a broadcasts table
    return [];
  } catch (error) {
    console.error("Error fetching broadcasts:", error);
    return [];
  }
};
