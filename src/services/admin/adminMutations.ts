
import { supabase } from '@/integrations/supabase/client';

export const suspendUser = async (userId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ status: 'suspended' })
      .eq('id', userId);

    if (error) {
      console.error('Error suspending user:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in suspendUser:', error);
    throw error;
  }
};

export const activateUser = async (userId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ status: 'active' })
      .eq('id', userId);

    if (error) {
      console.error('Error activating user:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in activateUser:', error);
    throw error;
  }
};

export const updateUserStatus = async (userId: string, status: 'active' | 'suspended'): Promise<void> => {
  if (status === 'suspended') {
    return suspendUser(userId);
  } else {
    return activateUser(userId);
  }
};

export const removeBook = async (bookId: string): Promise<void> => {
  try {
    // Get book details for notification
    const { data: book } = await supabase
      .from('books')
      .select('title, seller_id')
      .eq('id', bookId)
      .single();

    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', bookId);

    if (error) {
      console.error('Error removing book:', error);
      throw error;
    }

    // Send notification to seller
    if (book) {
      try {
        const { addNotification } = await import('@/services/notificationService');
        await addNotification({
          userId: book.seller_id,
          title: 'Book Listing Removed',
          message: `Your book listing for "${book.title}" was removed by an administrator. If you believe this was done in error, please contact support.`,
          type: 'warning',
          read: false
        });
      } catch (notificationError) {
        console.error('Error sending notification:', notificationError);
      }
    }
  } catch (error) {
    console.error('Error in removeBook:', error);
    throw error;
  }
};

export const sendBroadcastMessage = async (message: string): Promise<void> => {
  try {
    // Get all user IDs
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('id');

    if (error) {
      throw error;
    }

    // Send notification to all users
    const { addNotification } = await import('@/services/notificationService');
    
    for (const profile of profiles || []) {
      await addNotification({
        userId: profile.id,
        title: 'Admin Announcement',
        message: message,
        type: 'info',
        read: false
      });
    }
  } catch (error) {
    console.error('Error sending broadcast message:', error);
    throw error;
  }
};
