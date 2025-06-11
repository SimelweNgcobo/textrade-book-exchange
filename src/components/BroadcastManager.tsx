import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  getLatestBroadcast,
  hasBroadcastBeenViewed,
  dismissBroadcast,
  saveBroadcastToNotifications,
} from "@/services/broadcastService";
import { Broadcast } from "@/types/broadcast";
import BroadcastDialog from "./BroadcastDialog";

const BroadcastManager = () => {
  // Add safety check for context availability (useful during HMR)
  let authContext;
  try {
    authContext = useAuth();
  } catch (error) {
    console.warn("[BroadcastManager] Auth context not available:", {
      message: error instanceof Error ? error.message : String(error),
      timestamp: new Date().toISOString(),
    });
    return null;
  }

  const { user, isAuthenticated } = authContext;
  const [currentBroadcast, setCurrentBroadcast] = useState<Broadcast | null>(
    null,
  );
  const [showBroadcast, setShowBroadcast] = useState(false);

  useEffect(() => {
    const checkForBroadcasts = async () => {
      try {
        const latestBroadcast = await getLatestBroadcast();

        if (!latestBroadcast) return;

        // Check if user has seen this broadcast (using localStorage for guests)
        if (isAuthenticated && user) {
          const hasViewed = await hasBroadcastBeenViewed(
            user.id,
            latestBroadcast.id,
          );
          if (!hasViewed) {
            setCurrentBroadcast(latestBroadcast);
            setShowBroadcast(true);
            // Save to notifications for logged-in users
            await saveBroadcastToNotifications(user.id, latestBroadcast);
          }
        } else {
          // For guests, use localStorage
          const viewedBroadcasts = JSON.parse(
            localStorage.getItem("viewedBroadcasts") || "[]",
          );

          if (!viewedBroadcasts.includes(latestBroadcast.id)) {
            setCurrentBroadcast(latestBroadcast);
            setShowBroadcast(true);
          }
        }
      } catch (error) {
        console.error("Error checking broadcasts:", {
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          type: error instanceof Error ? error.constructor.name : typeof error,
        });
      }
    };

    // Check for broadcasts on mount and when auth state changes
    checkForBroadcasts();
  }, [isAuthenticated, user]);

  const handleDismiss = async () => {
    if (!currentBroadcast) return;

    if (isAuthenticated && user) {
      await dismissBroadcast(user.id, currentBroadcast.id);
    } else {
      // For guests, store in localStorage
      const viewedBroadcasts = JSON.parse(
        localStorage.getItem("viewedBroadcasts") || "[]",
      );
      viewedBroadcasts.push(currentBroadcast.id);
      localStorage.setItem(
        "viewedBroadcasts",
        JSON.stringify(viewedBroadcasts),
      );
    }

    setShowBroadcast(false);
    setCurrentBroadcast(null);
  };

  if (!currentBroadcast || !showBroadcast) {
    return null;
  }

  return (
    <BroadcastDialog
      broadcast={currentBroadcast}
      isOpen={showBroadcast}
      onDismiss={handleDismiss}
    />
  );
};

export default BroadcastManager;
