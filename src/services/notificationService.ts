
import { supabase } from '@/integrations/supabase/client';

interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
}

export const getNotifications = async (userId: string): Promise<Notification[]> => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }

    return data?.map(notification => ({
      id: notification.id,
      userId: notification.user_id,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      read: notification.read,
      createdAt: notification.created_at
    })) || [];
  } catch (error) {
    console.error('Error in getNotifications:', error);
    return [];
  }
};

export const addNotification = async (notification: Omit<Notification, 'id' | 'createdAt'>): Promise<void> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: notification.userId,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        read: notification.read
      });

    if (error) {
      console.error('Error adding notification:', error);
    }
  } catch (error) {
    console.error('Error in addNotification:', error);
  }
};

export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    if (error) {
      console.error('Error marking notification as read:', error);
    }
  } catch (error) {
    console.error('Error in markNotificationAsRead:', error);
  }
};

export const deleteNotification = async (notificationId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);

    if (error) {
      console.error('Error deleting notification:', error);
    }
  } catch (error) {
    console.error('Error in deleteNotification:', error);
  }
};

export const sendBookRemovalNotification = async (userId: string, bookTitle: string): Promise<void> => {
  await addNotification({
    userId,
    title: 'Book Listing Removed',
    message: `Your book listing for "${bookTitle}" was removed because it did not have a clear image or enough detail. Try uploading it again with a better image or description 😉`,
    type: 'warning',
    read: false
  });
};

// Legacy functions for backward compatibility
export const queueBroadcastMessage = (message: string): void => {
  const queue = JSON.parse(localStorage.getItem('broadcastQueue') || '[]');
  queue.push({
    message,
    timestamp: new Date().toISOString()
  });
  localStorage.setItem('broadcastQueue', JSON.stringify(queue));
};

export const clearOldBroadcastMessages = (): void => {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  
  const queue = JSON.parse(localStorage.getItem('broadcastQueue') || '[]');
  const filtered = queue.filter((msg: any) => new Date(msg.timestamp) > oneDayAgo);
  localStorage.setItem('broadcastQueue', JSON.stringify(filtered));
};

export const queueGlobalBroadcastMessage = (message: string): void => {
  const globalQueue = JSON.parse(localStorage.getItem('globalBroadcastQueue') || '[]');
  globalQueue.push({
    message,
    timestamp: new Date().toISOString(),
    id: `global_broadcast_${Date.now()}`,
    isGlobal: true
  });
  localStorage.setItem('globalBroadcastQueue', JSON.stringify(globalQueue));
  
  window.dispatchEvent(new CustomEvent('globalBroadcastUpdate'));
};

export const clearOldGlobalBroadcastMessages = (): void => {
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  
  const queue = JSON.parse(localStorage.getItem('globalBroadcastQueue') || '[]');
  const filtered = queue.filter((msg: any) => new Date(msg.timestamp) > oneDayAgo);
  localStorage.setItem('globalBroadcastQueue', JSON.stringify(filtered));
};
