
import { supabase } from '@/integrations/supabase/client';

export interface BroadcastMessageData {
  title?: string;
  message: string;
  is_global?: boolean;
  target_user_ids?: string[];
  expires_at?: string;
}

export interface BroadcastMessage {
  id: string;
  title: string;
  message: string;
  is_global: boolean;
  target_user_ids: string[];
  created_by: string;
  created_at: string;
  expires_at: string | null;
  is_active: boolean;
}

export const createBroadcastMessage = async (messageData: BroadcastMessageData): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User must be authenticated to create broadcasts');
    }

    // For now, store in notifications table as a workaround
    const { error } = await supabase
      .from('notifications')
      .insert({
        user_id: user.id,
        title: messageData.title || 'Announcement',
        message: messageData.message,
        type: 'broadcast',
        read: false
      });

    if (error) {
      console.error('Error creating broadcast message:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in createBroadcastMessage:', error);
    throw new Error('Failed to create broadcast message');
  }
};

export const getActiveBroadcastMessages = async (): Promise<BroadcastMessage[]> => {
  try {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('type', 'broadcast')
      .eq('read', false)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching broadcast messages:', error);
      throw error;
    }

    // Transform notifications to broadcast message format
    return (data || []).map(notification => ({
      id: notification.id,
      title: notification.title,
      message: notification.message,
      is_global: true,
      target_user_ids: [],
      created_by: notification.user_id,
      created_at: notification.created_at,
      expires_at: null,
      is_active: !notification.read
    }));
  } catch (error) {
    console.error('Error in getActiveBroadcastMessages:', error);
    return [];
  }
};

export const dismissBroadcastMessage = async (messageId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', messageId);

    if (error) {
      console.error('Error dismissing broadcast message:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in dismissBroadcastMessage:', error);
    throw new Error('Failed to dismiss broadcast message');
  }
};
