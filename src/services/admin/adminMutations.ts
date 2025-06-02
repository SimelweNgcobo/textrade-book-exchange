
import { supabase } from '@/integrations/supabase/client';

export const updateUserStatus = async (userId: string, status: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in updateUserStatus:', error);
    throw new Error('Failed to update user status');
  }
};

export const deleteBookListing = async (bookId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', bookId);

    if (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in deleteBookListing:', error);
    throw new Error('Failed to delete book listing');
  }
};

export const sendBroadcastMessage = async (message: string): Promise<void> => {
  try {
    // Get all users
    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select('id');

    if (usersError) {
      throw usersError;
    }

    if (!users || users.length === 0) {
      throw new Error('No users found');
    }

    // Create notifications for all users
    const notifications = users.map(user => ({
      user_id: user.id,
      title: 'System Announcement',
      message: message,
      type: 'system'
    }));

    const { error: notificationError } = await supabase
      .from('notifications')
      .insert(notifications);

    if (notificationError) {
      console.error('Error creating notifications:', notificationError);
      throw notificationError;
    }
  } catch (error) {
    console.error('Error in sendBroadcastMessage:', error);
    throw new Error('Failed to send broadcast message');
  }
};
