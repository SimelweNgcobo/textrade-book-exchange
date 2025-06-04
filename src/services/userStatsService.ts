
import { supabase } from '@/integrations/supabase/client';

interface UserStats {
  totalBooksListed: number;
  totalBooksSold: number;
  canListBooks: boolean;
  addressValidated: boolean;
  lastActive: string;
}

export const getUserStats = async (userId: string): Promise<UserStats | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('total_books_listed, total_books_sold, can_list_books, address_validated, last_active')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user stats:', error);
      return null;
    }

    return {
      totalBooksListed: data.total_books_listed || 0,
      totalBooksSold: data.total_books_sold || 0,
      canListBooks: data.can_list_books || false,
      addressValidated: data.address_validated || false,
      lastActive: data.last_active || new Date().toISOString()
    };
  } catch (error) {
    console.error('Error in getUserStats:', error);
    return null;
  }
};

export const updateLastActive = async (userId: string) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ last_active: new Date().toISOString() })
      .eq('id', userId);

    if (error) {
      console.error('Error updating last active:', error);
    }
  } catch (error) {
    console.error('Error in updateLastActive:', error);
  }
};
