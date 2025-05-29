
import { supabase } from '@/integrations/supabase/client';
import { addNotification } from '@/services/notificationService';

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

    // Calculate weekly commission (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const { data: weeklyTransactions } = await supabase
      .from('transactions')
      .select('commission')
      .gte('created_at', weekAgo.toISOString());

    const weeklyCommission = weeklyTransactions?.reduce((sum, t) => sum + Number(t.commission), 0) || 0;

    // Calculate monthly commission (last 30 days)
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    
    const { data: monthlyTransactions } = await supabase
      .from('transactions')
      .select('commission')
      .gte('created_at', monthAgo.toISOString());

    const monthlyCommission = monthlyTransactions?.reduce((sum, t) => sum + Number(t.commission), 0) || 0;

    // Get new users this week
    const { count: newUsersThisWeek } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekAgo.toISOString());

    // Get sales this month
    const { count: salesThisMonth } = await supabase
      .from('books')
      .select('*', { count: 'exact', head: true })
      .eq('sold', true)
      .gte('created_at', monthAgo.toISOString());

    return {
      totalUsers: totalUsers || 0,
      activeListings: activeListings || 0,
      booksSold: booksSold || 0,
      reportedIssues: 0, // No real reports yet
      newUsersThisWeek: newUsersThisWeek || 0,
      salesThisMonth: salesThisMonth || 0,
      weeklyCommission,
      monthlyCommission
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
          status: (profile.status as 'active' | 'suspended') || 'active',
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
    const { data: books, error: booksError } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false });

    if (booksError) throw booksError;

    // Then get seller names separately
    const listingsWithUsers = await Promise.all(
      (books || []).map(async (book) => {
        const { data: profile } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', book.seller_id)
          .single();

        return {
          id: book.id,
          title: book.title,
          author: book.author,
          category: book.category,
          price: book.price,
          status: book.sold ? 'sold' as const : 'active' as const,
          user: profile?.name || 'Unknown',
          createdAt: book.created_at,
          images: [book.image_url].filter(Boolean)
        };
      })
    );

    return listingsWithUsers;
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
};

export const updateUserStatus = async (userId: string, status: 'active' | 'suspended'): Promise<void> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ status })
      .eq('id', userId);

    if (error) throw error;
    
    await logAdminAction({
      action: status === 'suspended' ? 'User Suspended' : 'User Reactivated',
      target: userId,
      admin: 'Current Admin',
      details: `User status changed to ${status}`
    });
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

export const logAdminAction = async (action: Omit<AdminAction, 'id' | 'timestamp'>): Promise<void> => {
  try {
    const newAction = {
      ...action,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    const stored = localStorage.getItem('admin_actions');
    const actions = stored ? JSON.parse(stored) : [];
    actions.unshift(newAction);
    localStorage.setItem('admin_actions', JSON.stringify(actions.slice(0, 100)));
    
    console.log('Admin action logged:', newAction);
  } catch (error) {
    console.error('Error logging admin action:', error);
    throw error;
  }
};

export const sendBroadcastMessage = async (message: string): Promise<void> => {
  try {
    // Get all user IDs from profiles
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id');

    if (profiles) {
      // Add notification to each user
      profiles.forEach(profile => {
        addNotification({
          userId: profile.id,
          title: 'Message from Rebooked Solutions Team',
          message,
          type: 'info',
          read: false
        });
      });
      
      // Trigger notification update event for logged-in users
      window.dispatchEvent(new CustomEvent('notificationUpdate'));
    }
    
    // Also queue for offline users
    const broadcastData = {
      id: `broadcast_${Date.now()}`,
      message,
      timestamp: new Date().toISOString(),
      isGlobal: true
    };
    
    const globalQueue = JSON.parse(localStorage.getItem('globalBroadcastQueue') || '[]');
    globalQueue.push(broadcastData);
    localStorage.setItem('globalBroadcastQueue', JSON.stringify(globalQueue));
    
    // Trigger global broadcast event
    window.dispatchEvent(new CustomEvent('globalBroadcastUpdate'));
    
    // Log the action
    await logAdminAction({
      action: 'Broadcast Message Sent',
      target: 'All Users',
      admin: 'Current Admin',
      details: `Global message sent: ${message.substring(0, 50)}...`
    });
  } catch (error) {
    console.error('Error sending broadcast message:', error);
    throw error;
  }
};
