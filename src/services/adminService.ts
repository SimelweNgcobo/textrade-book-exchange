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

export interface AdminStats {
  totalUsers: number;
  activeListings: number;
  booksSold: number;
  reportedIssues: number;
  newUsersThisWeek: number;
  salesThisMonth: number;
  weeklyCommission: number;
  monthlyCommission: number;
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
          status: (profile.status === 'suspended' ? 'suspended' : 'active') as 'active' | 'suspended',
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

export const getAllUsers = async (): Promise<AdminUser[]> => {
  return getAdminUsers();
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

export const getAllListings = async (): Promise<AdminListing[]> => {
  return getAdminListings();
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

export const deleteBookListing = async (bookId: string): Promise<void> => {
  return removeBook(bookId);
};

export const getTotalUsers = async (): Promise<number> => {
  try {
    // Count actual profiles, not auth users
    const { count, error } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .neq('status', 'deleted'); // Exclude deleted users if any

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

export const getTotalCommission = async (): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('commission');

    if (error) {
      console.error('Error getting total commission:', error);
      return 0;
    }

    return (data || []).reduce((total, transaction) => total + (transaction.commission || 0), 0);
  } catch (error) {
    console.error('Error in getTotalCommission:', error);
    return 0;
  }
};

export const getAdminStats = async (): Promise<AdminStats> => {
  try {
    const [totalUsers, totalCommission] = await Promise.all([
      getTotalUsers(),
      getTotalCommission()
    ]);

    const { count: activeListings } = await supabase
      .from('books')
      .select('*', { count: 'exact', head: true })
      .eq('sold', false);

    const { count: booksSold } = await supabase
      .from('books')
      .select('*', { count: 'exact', head: true })
      .eq('sold', true);

    // Get new users this week
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const { count: newUsersThisWeek } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekAgo.toISOString());

    // Get sales this month
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    const { count: salesThisMonth } = await supabase
      .from('transactions')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', monthAgo.toISOString());

    // Get reports count
    const { count: reportedIssues } = await supabase
      .from('reports')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // Get weekly commission
    const { data: weeklyTransactions } = await supabase
      .from('transactions')
      .select('commission')
      .gte('created_at', weekAgo.toISOString());

    const weeklyCommission = (weeklyTransactions || []).reduce((total, t) => total + (t.commission || 0), 0);

    // Get monthly commission
    const { data: monthlyTransactions } = await supabase
      .from('transactions')
      .select('commission')
      .gte('created_at', monthAgo.toISOString());

    const monthlyCommission = (monthlyTransactions || []).reduce((total, t) => total + (t.commission || 0), 0);

    return {
      totalUsers,
      activeListings: activeListings || 0,
      booksSold: booksSold || 0,
      reportedIssues: reportedIssues || 0,
      newUsersThisWeek: newUsersThisWeek || 0,
      salesThisMonth: salesThisMonth || 0,
      weeklyCommission,
      monthlyCommission
    };
  } catch (error) {
    console.error('Error in getAdminStats:', error);
    return {
      totalUsers: 0,
      activeListings: 0,
      booksSold: 0,
      reportedIssues: 0,
      newUsersThisWeek: 0,
      salesThisMonth: 0,
      weeklyCommission: 0,
      monthlyCommission: 0
    };
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
