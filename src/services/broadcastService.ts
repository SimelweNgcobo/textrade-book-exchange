
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

    const { error } = await supabase
      .from('broadcast_messages')
      .insert({
        title: messageData.title || 'Announcement',
        message: messageData.message,
        is_global: messageData.is_global ?? true,
        target_user_ids: messageData.target_user_ids || [],
        created_by: user.id,
        expires_at: messageData.expires_at || null,
        is_active: true
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
      .from('broadcast_messages')
      .select('*')
      .eq('is_active', true)
      .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching broadcast messages:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getActiveBroadcastMessages:', error);
    return [];
  }
};

export const dismissBroadcastMessage = async (messageId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('broadcast_messages')
      .update({ is_active: false })
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
