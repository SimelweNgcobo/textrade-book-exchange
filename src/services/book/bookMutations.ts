
import { supabase } from '@/integrations/supabase/client';
import { Book, BookFormData } from '@/types/book';

export const createBook = async (bookData: BookFormData): Promise<Book> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data: book, error } = await supabase
      .from('books')
      .insert([
        {
          seller_id: user.id,
          title: bookData.title,
          author: bookData.author,
          description: bookData.description,
          price: bookData.price,
          category: bookData.category,
          condition: bookData.condition,
          image_url: bookData.imageUrl,
          front_cover: bookData.frontCover,
          back_cover: bookData.backCover,
          inside_pages: bookData.insidePages,
          grade: bookData.grade,
          university_year: bookData.universityYear
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating book:', error);
      throw error;
    }

    // Fetch seller profile
    const { data: seller } = await supabase
      .from('profiles')
      .select('id, name, email')
      .eq('id', user.id)
      .single();

    return {
      id: book.id,
      title: book.title,
      author: book.author,
      description: book.description,
      price: book.price,
      category: book.category,
      condition: book.condition as "New" | "Good" | "Better" | "Average" | "Below Average",
      imageUrl: book.image_url || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&auto=format&q=80',
      frontCover: book.front_cover,
      backCover: book.back_cover,
      insidePages: book.inside_pages,
      sold: book.sold,
      createdAt: book.created_at,
      grade: book.grade,
      universityYear: book.university_year,
      seller: {
        id: seller?.id || '',
        name: seller?.name || 'Anonymous',
        email: seller?.email || ''
      }
    };
  } catch (error) {
    console.error('Error in createBook:', error);
    throw error;
  }
};

export const updateBook = async (bookId: string, bookData: Partial<BookFormData>): Promise<Book | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // First verify the user owns this book
    const { data: existingBook, error: fetchError } = await supabase
      .from('books')
      .select('seller_id')
      .eq('id', bookId)
      .single();

    if (fetchError || !existingBook) {
      throw new Error('Book not found');
    }

    if (existingBook.seller_id !== user.id) {
      throw new Error('User not authorized to edit this book');
    }

    const updateData: any = {};
    
    if (bookData.title !== undefined) updateData.title = bookData.title;
    if (bookData.author !== undefined) updateData.author = bookData.author;
    if (bookData.description !== undefined) updateData.description = bookData.description;
    if (bookData.price !== undefined) updateData.price = bookData.price;
    if (bookData.category !== undefined) updateData.category = bookData.category;
    if (bookData.frontCover !== undefined) updateData.front_cover = bookData.frontCover;
    if (bookData.backCover !== undefined) updateData.back_cover = bookData.backCover;
    if (bookData.insidePages !== undefined) updateData.inside_pages = bookData.insidePages;

    const { data: book, error } = await supabase
      .from('books')
      .update(updateData)
      .eq('id', bookId)
      .select()
      .single();

    if (error) {
      console.error('Error updating book:', error);
      throw error;
    }

    // Fetch seller profile
    const { data: seller } = await supabase
      .from('profiles')
      .select('id, name, email')
      .eq('id', book.seller_id)
      .single();

    return {
      id: book.id,
      title: book.title,
      author: book.author,
      description: book.description,
      price: book.price,
      category: book.category,
      condition: book.condition as "New" | "Good" | "Better" | "Average" | "Below Average",
      imageUrl: book.image_url || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&auto=format&q=80',
      frontCover: book.front_cover,
      backCover: book.back_cover,
      insidePages: book.inside_pages,
      sold: book.sold,
      createdAt: book.created_at,
      grade: book.grade,
      universityYear: book.university_year,
      seller: {
        id: seller?.id || '',
        name: seller?.name || 'Anonymous',
        email: seller?.email || ''
      }
    };
  } catch (error) {
    console.error('Error in updateBook:', error);
    throw error;
  }
};

export const deleteBook = async (bookId: string): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // First verify the user owns this book or is an admin
    const { data: existingBook, error: fetchError } = await supabase
      .from('books')
      .select('seller_id')
      .eq('id', bookId)
      .single();

    if (fetchError || !existingBook) {
      throw new Error('Book not found');
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    const isAdmin = profile?.is_admin || false;
    const isOwner = existingBook.seller_id === user.id;

    if (!isAdmin && !isOwner) {
      throw new Error('User not authorized to delete this book');
    }

    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', bookId);

    if (error) {
      console.error('Error deleting book:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in deleteBook:', error);
    throw error;
  }
};
