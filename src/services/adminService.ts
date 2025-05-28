
import { supabase } from '@/integrations/supabase/client';

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

    return {
      totalUsers: totalUsers || 0,
      activeListings: activeListings || 0,
      booksSold: booksSold || 0,
      reportedIssues: 7, // Mock data
      newUsersThisWeek: 23, // Mock data
      salesThisMonth: 45, // Mock data
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
          status: 'active' as const, // Default to active since status column doesn't exist yet
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
    // First get all books
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
          // Auto-approve: all listings are active unless sold
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
    // For now, just log the action since status column doesn't exist yet
    console.log(`Would update user ${userId} status to ${status}`);
    
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
    const newAction = {
      ...action,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    // Store in localStorage for now
    const stored = localStorage.getItem('admin_actions');
    const actions = stored ? JSON.parse(stored) : [];
    actions.unshift(newAction);
    localStorage.setItem('admin_actions', JSON.stringify(actions.slice(0, 100))); // Keep last 100 actions
    
    console.log('Admin action logged:', newAction);
  } catch (error) {
    console.error('Error logging admin action:', error);
    throw error;
  }
};

export const sendBroadcastMessage = async (message: string): Promise<void> => {
  try {
    // Get all users to send notifications to
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, email');

    if (profiles) {
      // Create a unique message ID for this broadcast
      const messageId = `broadcast_${Date.now()}`;
      
      // Store broadcast in localStorage for all users to see
      const broadcastData = {
        id: messageId,
        message,
        timestamp: new Date().toISOString(),
        recipients: profiles.map(p => p.id)
      };
      
      // Store in broadcast queue
      const queue = JSON.parse(localStorage.getItem('broadcastQueue') || '[]');
      queue.push(broadcastData);
      localStorage.setItem('broadcastQueue', JSON.stringify(queue));
      
      // Add to notifications for each user
      profiles.forEach(profile => {
        addBroadcastNotification(profile.id, message);
      });
      
      // Trigger notification update event
      window.dispatchEvent(new CustomEvent('notificationUpdate'));
      
      // Log the action
      await logAdminAction({
        action: 'Broadcast Message Sent',
        target: 'All Users',
        admin: 'Current Admin',
        details: `Message sent to ${profiles.length} users: ${message.substring(0, 50)}...`
      });
    }
  } catch (error) {
    console.error('Error sending broadcast message:', error);
    throw error;
  }
};

const addBroadcastNotification = (userId: string, message: string): void => {
  const notification = {
    userId,
    title: 'Message from Rebooked Solutions Team',
    message,
    type: 'info' as const,
    read: false,
    id: `broadcast_${Date.now()}_${Math.random()}`,
    createdAt: new Date().toISOString()
  };

  const stored = localStorage.getItem('rebooked_notifications');
  const allNotifications = stored ? JSON.parse(stored) : [];
  allNotifications.unshift(notification);
  localStorage.setItem('rebooked_notifications', JSON.stringify(allNotifications));
};
