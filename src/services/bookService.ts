import { supabase } from '@/integrations/supabase/client';
import { Book, BookFormData } from '@/types/book';

// Commission calculation functions
export const calculateCommission = (price: number): number => {
  return price * 0.1; // 10% commission
};

export const calculateSellerReceives = (price: number): number => {
  return price - calculateCommission(price);
};

interface BookFilters {
  search?: string;
  category?: string;
  condition?: string;
  grade?: string;
  universityYear?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const getBooks = async (filters?: BookFilters): Promise<Book[]> => {
  try {
    let query = supabase
      .from('books')
      .select(`
        *,
        profiles!books_seller_id_fkey (
          id,
          name,
          email
        )
      `)
      .eq('sold', false)
      .order('created_at', { ascending: false });

    // Apply filters if provided
    if (filters) {
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,author.ilike.%${filters.search}%`);
      }
      if (filters.category) {
        query = query.eq('category', filters.category);
      }
      if (filters.condition) {
        query = query.eq('condition', filters.condition);
      }
      if (filters.grade) {
        query = query.eq('grade', filters.grade);
      }
      if (filters.universityYear) {
        query = query.eq('university_year', filters.universityYear);
      }
      if (filters.minPrice) {
        query = query.gte('price', filters.minPrice);
      }
      if (filters.maxPrice) {
        query = query.lte('price', filters.maxPrice);
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching books:', error);
      return [];
    }

    if (!data) return [];

    const books: Book[] = data.map((book) => ({
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
        id: book.seller_id,
        name: (book.profiles as any)?.name || 'Anonymous',
        email: (book.profiles as any)?.email || ''
      }
    }));

    return books;
  } catch (error) {
    console.error('Error in getBooks:', error);
    return [];
  }
};

export const getBookById = async (id: string): Promise<Book | null> => {
  try {
    const { data: book, error } = await supabase
      .from('books')
      .select(`
        *,
        profiles!books_seller_id_fkey (
          id,
          name,
          email
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching book:', error);
      return null;
    }

    if (!book) return null;

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
        id: book.seller_id,
        name: (book.profiles as any)?.name || 'Anonymous',
        email: (book.profiles as any)?.email || ''
      }
    };
  } catch (error) {
    console.error('Error in getBookById:', error);
    return null;
  }
};

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

export const getUserBooks = async (userId: string): Promise<Book[]> => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .eq('seller_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user books:', error);
      return [];
    }

    // Fetch seller profile
    const { data: seller } = await supabase
      .from('profiles')
      .select('id, name, email')
      .eq('id', userId)
      .single();

    const books: Book[] = data.map((book) => ({
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
    }));

    return books;
  } catch (error) {
    console.error('Error in getUserBooks:', error);
    return [];
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
