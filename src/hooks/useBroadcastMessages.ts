
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface BroadcastMessage {
  message: string;
  timestamp: string;
}

export const useBroadcastMessages = () => {
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Check for unseen broadcast messages on login/page load
    checkForUnseenBroadcasts();

    // Subscribe to real-time broadcast messages
    const channel = supabase
      .channel('broadcast-messages')
      .on('broadcast', { event: 'new_message' }, (payload) => {
        const { message } = payload.payload;
        
        // If user is active, show popup immediately
        setPendingMessage(message);
        setShowPopup(true);
        
        // Also add to notifications for later viewing
        addToNotifications(message);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const checkForUnseenBroadcasts = () => {
    // Check localStorage for any broadcast messages that haven't been seen as popups
    const broadcastQueue = JSON.parse(localStorage.getItem('broadcastQueue') || '[]');
    const seenBroadcasts = JSON.parse(localStorage.getItem('seenBroadcasts') || '[]');
    
    const unseenMessage = broadcastQueue.find((msg: BroadcastMessage) => {
      const messageHash = btoa(msg.message).substring(0, 10);
      return !seenBroadcasts.includes(messageHash);
    });

    if (unseenMessage) {
      setPendingMessage(unseenMessage.message);
      setShowPopup(true);
    }
  };

  const addToNotifications = (message: string) => {
    if (!user) return;

    const notification = {
      userId: user.id,
      title: 'Broadcast Message',
      message,
      type: 'info' as const,
      read: false,
      id: `broadcast_${Date.now()}_${Math.random()}`,
      createdAt: new Date().toISOString()
    };

    const stored = localStorage.getItem('rebooked_notifications');
    const allNotifications = stored ? JSON.parse(stored) : [];
    allNotifications.push(notification);
    localStorage.setItem('rebooked_notifications', JSON.stringify(allNotifications));

    // Trigger notification count update
    window.dispatchEvent(new CustomEvent('notificationUpdate'));
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
