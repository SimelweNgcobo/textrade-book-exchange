
import { supabase } from '@/integrations/supabase/client';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'suspended';
  listingsCount: number;
}

export interface AdminListing {
  id: string;
  title: string;
  author: string;
  price: number;
  status: 'active' | 'sold';
  user: string;
}

export const getAdminUsers = async (): Promise<AdminUser[]> => {
  try {
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
      return [];
    }

    // Get listings count for each user
    const usersWithCounts = await Promise.all(
      (profiles || []).map(async (profile) => {
        const { count } = await supabase
          .from('books')
          .select('*', { count: 'exact', head: true })
          .eq('seller_id', profile.id);

        return {
          id: profile.id,
          name: profile.name || 'Anonymous',
          email: profile.email || '',
          status: profile.status === 'suspended' ? 'suspended' : 'active',
          listingsCount: count || 0
        };
      })
    );

    return usersWithCounts;
  } catch (error) {
    console.error('Error in getAdminUsers:', error);
    return [];
  }
};

export const getAdminListings = async (): Promise<AdminListing[]> => {
  try {
    const { data: books, error } = await supabase
      .from('books')
      .select(`
        *,
        profiles!books_seller_id_fkey(name)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching admin listings:', error);
      return [];
    }

    return (books || []).map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      status: book.sold ? 'sold' : 'active',
      user: (book.profiles as any)?.name || 'Anonymous'
    }));
  } catch (error) {
    console.error('Error in getAdminListings:', error);
    return [];
  }
};

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

export const getTotalUsers = async (): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error getting total users:', error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error('Error in getTotalUsers:', error);
    return 0;
  }
};
