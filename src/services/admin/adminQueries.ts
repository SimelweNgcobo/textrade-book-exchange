
import { supabase } from '@/integrations/supabase/client';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'suspended' | 'banned';
  listingsCount: number;
  createdAt: string;
}

export interface AdminListing {
  id: string;
  title: string;
  author: string;
  price: number;
  status: 'active' | 'sold';
  user: string;
  createdAt: string;
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
  pendingReports: number;
  unreadMessages: number;
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
          status: (profile.status || 'active') as 'active' | 'suspended' | 'banned',
          listingsCount: count || 0,
          createdAt: profile.created_at
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
        seller:seller_id (
          name
        )
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
      user: (book.seller as any)?.name || 'Anonymous',
      createdAt: book.created_at
    }));
  } catch (error) {
    console.error('Error in getAdminListings:', error);
    return [];
  }
};

export const getAdminStats = async (): Promise<AdminStats> => {
  try {
    // Get all statistics in parallel for better performance
    const [
      { count: totalUsers },
      { count: activeListings },
      { count: booksSold },
      { count: totalReports },
      { count: pendingReports },
      { count: unreadMessages }
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('books').select('*', { count: 'exact', head: true }).eq('sold', false),
      supabase.from('books').select('*', { count: 'exact', head: true }).eq('sold', true),
      supabase.from('reports').select('*', { count: 'exact', head: true }),
      supabase.from('reports').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'unread')
    ]);

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
      totalUsers: totalUsers || 0,
      activeListings: activeListings || 0,
      booksSold: booksSold || 0,
      reportedIssues: totalReports || 0,
      newUsersThisWeek: newUsersThisWeek || 0,
      salesThisMonth: salesThisMonth || 0,
      weeklyCommission,
      monthlyCommission,
      pendingReports: pendingReports || 0,
      unreadMessages: unreadMessages || 0
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
      monthlyCommission: 0,
      pendingReports: 0,
      unreadMessages: 0
    };
  }
};

export const getUserProfile = async (userId: string): Promise<AdminUser | null> => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !profile) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    const { count } = await supabase
      .from('books')
      .select('*', { count: 'exact', head: true })
      .eq('seller_id', userId);

    return {
      id: profile.id,
      name: profile.name || 'Anonymous',
      email: profile.email || '',
      status: (profile.status || 'active') as 'active' | 'suspended' | 'banned',
      listingsCount: count || 0,
      createdAt: profile.created_at
    };
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    return null;
  }
};
