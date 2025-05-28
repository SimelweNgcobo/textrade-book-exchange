
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface BroadcastMessage {
  message: string;
  timestamp: string;
  id: string;
}

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
      const messageHash = btoa(broadcast.message).substring(0, 10);
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
