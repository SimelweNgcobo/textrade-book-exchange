
import { supabase } from '@/integrations/supabase/client';

export interface UpdateBookData {
  title: string;
  author: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  frontCover?: string;
  backCover?: string;
  insidePages?: string;
}

export const updateBook = async (bookId: string, data: UpdateBookData) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Construct the image URL from the three separate images or use the first one as main image
    const imageUrl = data.frontCover || data.backCover || data.insidePages || '';

    const { data: updatedBook, error } = await supabase
      .from('books')
      .update({
        title: data.title,
        author: data.author,
        description: data.description,
        price: data.price,
        category: data.category,
        condition: data.condition,
        image_url: imageUrl,
        front_cover: data.frontCover,
        back_cover: data.backCover,
        inside_pages: data.insidePages
      })
      .eq('id', bookId)
      .eq('seller_id', user.id) // Ensure user can only update their own books
      .select()
      .single();

    if (error) {
      console.error('Error updating book:', error);
      throw error;
    }

    return updatedBook;
  } catch (error) {
    console.error('Error in updateBook:', error);
    throw error;
  }
};

export const deleteBook = async (bookId: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', bookId)
      .eq('seller_id', user.id); // Ensure user can only delete their own books

    if (error) {
      console.error('Error deleting book:', error);
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error in deleteBook:', error);
    throw error;
  }
};

export const adminDeleteBook = async (bookId: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (!profile?.is_admin) {
      throw new Error('Unauthorized: Admin access required');
    }

    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', bookId);

    if (error) {
      console.error('Error deleting book as admin:', error);
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error in adminDeleteBook:', error);
    throw error;
  }
};
