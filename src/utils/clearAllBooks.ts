
import { supabase } from '@/integrations/supabase/client';

export const clearAllBooks = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from('books')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all books

    if (error) {
      console.error('Error clearing books:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error clearing books:', error);
    return { success: false, error: 'Unexpected error occurred' };
  }
};
