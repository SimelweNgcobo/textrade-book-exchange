
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface BroadcastMessage {
  message: string;
  timestamp: string;
  id: string;
}

// Unicode-safe hash function
const createMessageHash = (message: string): string => {
  try {
    // Use encodeURIComponent to handle Unicode characters, then btoa
    return btoa(encodeURIComponent(message)).substring(0, 10);
  } catch (error) {
    // Fallback: create a simple hash from character codes
    let hash = 0;
    for (let i = 0; i < message.length; i++) {
      const char = message.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36).substring(0, 10);
  }
};

export const useBroadcastMessages = () => {
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Check for unseen broadcast messages on login/page load
    checkForUnseenBroadcasts();

    // Listen for new broadcasts from localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'broadcastQueue') {
        checkForUnseenBroadcasts();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom notification update events
    const handleNotificationUpdate = () => {
      checkForUnseenBroadcasts();
    };
    
    window.addEventListener('notificationUpdate', handleNotificationUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('notificationUpdate', handleNotificationUpdate);
    };
  }, [user]);

  const checkForUnseenBroadcasts = () => {
    if (!user) return;
    
    // Check localStorage for any broadcast messages that haven't been seen as popups
    const broadcastQueue = JSON.parse(localStorage.getItem('broadcastQueue') || '[]');
    const seenBroadcasts = JSON.parse(localStorage.getItem('seenBroadcasts') || '[]');
    
    // Find broadcasts for this user that haven't been shown as popups
    const unseenBroadcast = broadcastQueue.find((broadcast: any) => {
      const messageHash = createMessageHash(broadcast.message);
      const isForThisUser = broadcast.recipients?.includes(user.id) || true; // Show to all users if no recipients specified
      return isForThisUser && !seenBroadcasts.includes(messageHash);
    });

    if (unseenBroadcast) {
      setPendingMessage(unseenBroadcast.message);
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setPendingMessage(null);
  };

  return {
    pendingMessage,
    showPopup,
    closePopup
  };
};
