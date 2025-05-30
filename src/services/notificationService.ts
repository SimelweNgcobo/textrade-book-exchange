
import { supabase } from '@/integrations/supabase/client';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
}

export interface NotificationInput {
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
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

    return (data || []).map(notification => ({
      id: notification.id,
      userId: notification.user_id,
      title: notification.title,
      message: notification.message,
      type: notification.type as 'info' | 'warning' | 'success' | 'error',
      read: notification.read,
      createdAt: notification.created_at
    }));
  } catch (error) {
    console.error('Error in getNotifications:', error);
    return [];
  }
};

export const addNotification = async (notification: NotificationInput): Promise<void> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .insert([{
        user_id: notification.userId,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        read: notification.read
      }]);

    if (error) {
      console.error('Error adding notification:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in addNotification:', error);
    throw error;
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
      throw error;
    }
  } catch (error) {
    console.error('Error in markNotificationAsRead:', error);
    throw error;
  }
};

export const clearNotification = async (notificationId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);

    if (error) {
      console.error('Error clearing notification:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in clearNotification:', error);
    throw error;
  }
};
