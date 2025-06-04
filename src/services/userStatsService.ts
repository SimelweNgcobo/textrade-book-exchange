
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
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('pickup_address, updated_at')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error('Error fetching user profile:', profileError);
      return null;
    }

    // Get book counts manually
    const { data: totalBooks, error: totalError } = await supabase
      .from('books')
      .select('id, sold')
      .eq('seller_id', userId);

    if (totalError) {
      console.error('Error fetching user books:', totalError);
      return null;
    }

    const totalBooksListed = totalBooks?.length || 0;
    const totalBooksSold = totalBooks?.filter(book => book.sold).length || 0;
    
    // Check if address is validated
    const addressValidated = !!(
      profile?.pickup_address &&
      (profile.pickup_address as any)?.streetAddress &&
      (profile.pickup_address as any)?.city &&
      (profile.pickup_address as any)?.province &&
      (profile.pickup_address as any)?.postalCode
    );

    return {
      totalBooksListed,
      totalBooksSold,
      canListBooks: addressValidated,
      addressValidated,
      lastActive: profile?.updated_at || new Date().toISOString()
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
      .update({ updated_at: new Date().toISOString() })
      .eq('id', userId);

    if (error) {
      console.error('Error updating last active:', error);
    }
  } catch (error) {
    console.error('Error in updateLastActive:', error);
  }
};
