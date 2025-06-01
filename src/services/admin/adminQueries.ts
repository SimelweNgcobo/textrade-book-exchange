
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
  pendingReports: number;
  unreadMessages: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
  listingsCount: number;
}

export interface AdminListing {
  id: string;
  title: string;
  author: string;
  price: number;
  condition: string;
  seller: {
    name: string;
    email: string;
  };
  createdAt: string;
  sold: boolean;
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

    // Get books sold
    const { count: booksSold } = await supabase
      .from('books')
      .select('*', { count: 'exact', head: true })
      .eq('sold', true);

    // Get pending reports
    const { count: pendingReports } = await supabase
      .from('reports')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    // Get unread contact messages
    const { count: unreadMessages } = await supabase
      .from('contact_messages')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'unread');

    // Get transactions for commission calculation
    const { data: transactions } = await supabase
      .from('transactions')
      .select('commission, created_at');

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const weeklyCommission = transactions
      ?.filter(t => new Date(t.created_at) >= weekAgo)
      .reduce((sum, t) => sum + Number(t.commission), 0) || 0;

    const monthlyCommission = transactions
      ?.filter(t => new Date(t.created_at) >= monthAgo)
      .reduce((sum, t) => sum + Number(t.commission), 0) || 0;

    // Get new users this week
    const { count: newUsersThisWeek } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekAgo.toISOString());

    // Get sales this month
    const { count: salesThisMonth } = await supabase
      .from('transactions')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', monthAgo.toISOString());

    return {
      totalUsers: totalUsers || 0,
      activeListings: activeListings || 0,
      booksSold: booksSold || 0,
      reportedIssues: pendingReports || 0,
      newUsersThisWeek: newUsersThisWeek || 0,
      salesThisMonth: salesThisMonth || 0,
      weeklyCommission,
      monthlyCommission,
      pendingReports: pendingReports || 0,
      unreadMessages: unreadMessages || 0
    };
  } catch (error) {
    console.error('Error fetching admin stats:', error);
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

export const getAdminUsers = async (): Promise<AdminUser[]> => {
  try {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }

    // Get book counts for each user
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
          status: profile.status || 'active',
          createdAt: profile.created_at,
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
        profiles!books_seller_id_fkey (
          name,
          email
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching listings:', error);
      return [];
    }

    return (books || []).map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      condition: book.condition,
      seller: {
        name: (book.profiles as any)?.name || 'Anonymous',
        email: (book.profiles as any)?.email || ''
      },
      createdAt: book.created_at,
      sold: book.sold
    }));
  } catch (error) {
    console.error('Error in getAdminListings:', error);
    return [];
  }
};
