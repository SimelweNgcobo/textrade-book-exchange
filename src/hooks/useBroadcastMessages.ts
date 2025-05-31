
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface BroadcastMessage {
  message: string;
  timestamp: string;
  id: string;
  isGlobal?: boolean;
  recipients?: string[];
}

// Unicode-safe hash function
const createMessageHash = (message: string): string => {
  try {
    return btoa(encodeURIComponent(message)).substring(0, 10);
  } catch {
    let hash = 0;
    for (let i = 0; i < message.length; i++) {
      hash = ((hash << 5) - hash) + message.charCodeAt(i);
      hash |= 0; // Convert to 32-bit int
    }
    return Math.abs(hash).toString(36).substring(0, 10);
  }
};

export const useBroadcastMessages = () => {
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const checkForUnseenBroadcasts = useCallback(() => {
    const seenBroadcasts: string[] = JSON.parse(localStorage.getItem('seenBroadcasts') || '[]');
    const globalQueue: BroadcastMessage[] = JSON.parse(localStorage.getItem('globalBroadcastQueue') || '[]');

    // Check for unseen global broadcast
    const unseenGlobal = globalQueue.find((broadcast) => {
      if (!broadcast.isGlobal) return false;
      const hash = createMessageHash(broadcast.message);
      return !seenBroadcasts.includes(hash);
    });

    if (user) {
      const userQueue: BroadcastMessage[] = JSON.parse(localStorage.getItem('broadcastQueue') || '[]');
      const userBroadcast = userQueue.find((broadcast) => {
        const hash = createMessageHash(broadcast.message);
        const isForUser = broadcast.recipients?.includes(user.id);
        return isForUser && !seenBroadcasts.includes(hash);
      });

      if (userBroadcast) {
        setCurrentMessage(userBroadcast.message);
        setShowPopup(true);
        return;
      }
    }

    if (unseenGlobal) {
      setCurrentMessage(unseenGlobal.message);
      setShowPopup(true);
    }

  }, [user]);

  useEffect(() => {
    checkForUnseenBroadcasts();

    const handleGlobalUpdate = () => checkForUnseenBroadcasts();
    const handleNotificationUpdate = () => checkForUnseenBroadcasts();
    const handleStorageUpdate = (e: StorageEvent) => {
      if (e.key === 'globalBroadcastQueue' || e.key === 'broadcastQueue') {
        checkForUnseenBroadcasts();
      }
    };

    window.addEventListener('globalBroadcastUpdate', handleGlobalUpdate);
    window.addEventListener('notificationUpdate', handleNotificationUpdate);
    window.addEventListener('storage', handleStorageUpdate);

    return () => {
      window.removeEventListener('globalBroadcastUpdate', handleGlobalUpdate);
      window.removeEventListener('notificationUpdate', handleNotificationUpdate);
      window.removeEventListener('storage', handleStorageUpdate);
    };
  }, [checkForUnseenBroadcasts]);

  const handleClosePopup = () => {
    setShowPopup(false);
    setCurrentMessage(null);
  };

  return { 
    currentMessage, 
    showPopup, 
    isLoading, 
    handleClosePopup 
  };
};
