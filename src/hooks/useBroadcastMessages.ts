
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface BroadcastMessage {
  message: string;
  timestamp: string;
  id: string;
  isGlobal?: boolean;
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
    // Check for unseen broadcast messages on page load/refresh for ALL users
    checkForUnseenBroadcasts();

    // Listen for global broadcast updates
    const handleGlobalBroadcastUpdate = () => {
      checkForUnseenBroadcasts();
    };

    // Listen for storage changes (from other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'globalBroadcastQueue') {
        checkForUnseenBroadcasts();
      }
    };

    window.addEventListener('globalBroadcastUpdate', handleGlobalBroadcastUpdate);
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for notification updates (for logged-in users)
    const handleNotificationUpdate = () => {
      checkForUnseenBroadcasts();
    };
    
    window.addEventListener('notificationUpdate', handleNotificationUpdate);

    return () => {
      window.removeEventListener('globalBroadcastUpdate', handleGlobalBroadcastUpdate);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('notificationUpdate', handleNotificationUpdate);
    };
  }, []); // Remove user dependency to work for all users

  const checkForUnseenBroadcasts = () => {
    // Check for global broadcasts that apply to all users
    const globalBroadcastQueue = JSON.parse(localStorage.getItem('globalBroadcastQueue') || '[]');
    const seenBroadcasts = JSON.parse(localStorage.getItem('seenBroadcasts') || '[]');
    
    // Find the most recent unseen global broadcast
    const unseenBroadcast = globalBroadcastQueue
      .filter((broadcast: BroadcastMessage) => broadcast.isGlobal)
      .find((broadcast: BroadcastMessage) => {
        const messageHash = createMessageHash(broadcast.message);
        return !seenBroadcasts.includes(messageHash);
      });

    // If logged-in user, also check user-specific broadcasts
    if (user) {
      const broadcastQueue = JSON.parse(localStorage.getItem('broadcastQueue') || '[]');
      const userSpecificBroadcast = broadcastQueue.find((broadcast: any) => {
        const messageHash = createMessageHash(broadcast.message);
        const isForThisUser = broadcast.recipients?.includes(user.id) || false;
        return isForThisUser && !seenBroadcasts.includes(messageHash);
      });
      
      // Prioritize user-specific broadcasts over global ones
      if (userSpecificBroadcast) {
        setPendingMessage(userSpecificBroadcast.message);
        setShowPopup(true);
        return;
      }
    }

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
