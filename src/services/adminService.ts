
import { supabase } from '@/integrations/supabase/client';

export interface AdminStats {
  totalUsers: number;
  activeListings: number;
  booksSold: number;
  reportedIssues: number;
  newUsersThisWeek: number;
  salesThisMonth: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: 'active' | 'suspended';
  listingsCount: number;
}

export interface AdminListing {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  status: 'active' | 'pending' | 'sold' | 'rejected';
  user: string;
  createdAt: string;
  images: string[];
}

export interface AdminAction {
  id: string;
  action: string;
  target: string;
  admin: string;
  timestamp: string;
  details: string;
}

export const getAdminStats = async (): Promise<AdminStats> => {
  try {
    // Get total users
    const { count: totalUsers } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    // Get active listings
    const { count: activeListings } = await supabase
      .from('books')
      .select('*', { count: 'exact', head: true })
      .eq('sold', false);

    // Get sold books
    const { count: booksSold } = await supabase
      .from('books')
      .select('*', { count: 'exact', head: true })
      .eq('sold', true);

    // For now, using mock data for some metrics
    // In a real implementation, you would have proper tables for these
    return {
      totalUsers: totalUsers || 0,
      activeListings: activeListings || 0,
      booksSold: booksSold || 0,
      reportedIssues: 7, // Mock data
      newUsersThisWeek: 23, // Mock data
      salesThisMonth: 45 // Mock data
    };
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    throw error;
  }
};

export const getAllUsers = async (): Promise<AdminUser[]> => {
  try {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Get listing counts for each user
    const usersWithListings = await Promise.all(
      (profiles || []).map(async (profile) => {
        const { count } = await supabase
          .from('books')
          .select('*', { count: 'exact', head: true })
          .eq('seller_id', profile.id);

        return {
          id: profile.id,
          name: profile.name || 'Unknown',
          email: profile.email || '',
          joinDate: profile.created_at,
          status: 'active' as const, // You can add a status field to profiles table
          listingsCount: count || 0
        };
      })
    );

    return usersWithListings;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getAllListings = async (): Promise<AdminListing[]> => {
  try {
    const { data: books, error } = await supabase
      .from('books')
      .select(`
        *,
        profiles!books_seller_id_fkey(name)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (books || []).map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      category: book.category,
      price: book.price,
      status: book.sold ? 'sold' : 'active',
      user: book.profiles?.name || 'Unknown',
      createdAt: book.created_at,
      images: [book.image_url].filter(Boolean)
    }));
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
};

export const updateUserStatus = async (userId: string, status: 'active' | 'suspended'): Promise<void> => {
  try {
    // Note: You would need to add a status field to the profiles table
    const { error } = await supabase
      .from('profiles')
      .update({ status })
      .eq('id', userId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating user status:', error);
    throw error;
  }
};

export const deleteBookListing = async (bookId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', bookId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting book listing:', error);
    throw error;
  }
};

export const updateBookStatus = async (bookId: string, status: 'active' | 'pending' | 'rejected'): Promise<void> => {
  try {
    // Note: You would need to add a status field to the books table
    // For now, we can use the sold field as a workaround
    const { error } = await supabase
      .from('books')
      .update({ 
        // sold: status === 'sold'
        // You would implement proper status handling here
      })
      .eq('id', bookId);

    if (error) throw error;
  } catch (error) {
    console.error('Error updating book status:', error);
    throw error;
  }
};

export const logAdminAction = async (action: Omit<AdminAction, 'id' | 'timestamp'>): Promise<void> => {
  try {
    // Note: You would need to create an admin_actions table
    // For now, we'll just log to console
    console.log('Admin action logged:', {
      ...action,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error logging admin action:', error);
    throw error;
  }
};

export const sendBroadcastMessage = async (message: string): Promise<void> => {
  try {
    // Note: You would implement email/notification service here
    // For now, we'll just log the action
    console.log('Broadcast message sent:', message);
    
    await logAdminAction({
      action: 'Broadcast Message Sent',
      target: 'All Users',
      admin: 'Current Admin',
      details: `Message: ${message.substring(0, 50)}...`
    });
  } catch (error) {
    console.error('Error sending broadcast message:', error);
    throw error;
  }
};
