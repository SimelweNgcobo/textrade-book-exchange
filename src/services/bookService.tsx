import { supabase } from '@/integrations/supabase/client';
import { Book } from '@/types/book';

// Add the missing calculation functions
export const calculateCommission = (price: number): number => {
  return price * 0.1; // 10% commission
};

export const calculateSellerReceives = (price: number): number => {
  return price * 0.9; // 90% after commission
};

export const getBooks = async (filters?: {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
}): Promise<Book[]> => {
  try {
    let query = supabase
      .from('books')
      .select(`
        *,
        seller:profiles!books_seller_id_fkey (
          id,
          name,
          email
        )
      `)
      .eq('sold', false);

    if (filters?.category) {
      query = query.eq('category', filters.category);
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,author.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    if (filters?.minPrice !== undefined) {
      query = query.gte('price', filters.minPrice);
    }

    if (filters?.maxPrice !== undefined) {
      query = query.lte('price', filters.maxPrice);
    }

    if (filters?.condition) {
      query = query.eq('condition', filters.condition);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching books:', error);
      throw error;
    }

    return data?.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      description: book.description,
      price: book.price,
      category: book.category,
      condition: book.condition as "New" | "Good" | "Better" | "Average" | "Below Average",
      imageUrl: book.image_url || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&auto=format&q=80',
      sold: book.sold,
      createdAt: book.created_at,
      seller: {
        id: book.seller?.id || '',
        name: book.seller?.name || 'Anonymous',
        email: book.seller?.email || ''
      }
    })) || [];
  } catch (error) {
    console.error('Error in getBooks:', error);
    return [];
  }
};

export const getBookById = async (id: string): Promise<Book | null> => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select(`
        *,
        seller:profiles!books_seller_id_fkey (
          id,
          name,
          email
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching book by ID:', error);
      return null;
    }

    if (!data) return null;

    return {
      id: data.id,
      title: data.title,
      author: data.author,
      description: data.description,
      price: data.price,
      category: data.category,
      condition: data.condition as "New" | "Good" | "Better" | "Average" | "Below Average",
      imageUrl: data.image_url || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&auto=format&q=80',
      sold: data.sold,
      createdAt: data.created_at,
      seller: {
        id: data.seller?.id || '',
        name: data.seller?.name || 'Anonymous',
        email: data.seller?.email || ''
      }
    };
  } catch (error) {
    console.error('Error in getBookById:', error);
    return null;
  }
};

export const createBook = async (bookData: Omit<Book, 'id' | 'createdAt' | 'seller' | 'sold'>): Promise<Book> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase
      .from('books')
      .insert({
        title: bookData.title,
        author: bookData.author,
        description: bookData.description,
        price: bookData.price,
        category: bookData.category,
        condition: bookData.condition,
        image_url: bookData.imageUrl,
        grade: bookData.grade || null,
        university_year: bookData.universityYear || null,
        seller_id: user.id
      })
      .select(`
        *,
        seller:profiles!books_seller_id_fkey (
          id,
          name,
          email
        )
      `)
      .single();

    if (error) {
      console.error('Error creating book:', error);
      throw error;
    }

    return {
      id: data.id,
      title: data.title,
      author: data.author,
      description: data.description,
      price: data.price,
      category: data.category,
      condition: data.condition as "New" | "Good" | "Better" | "Average" | "Below Average",
      imageUrl: data.image_url || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&auto=format&q=80',
      sold: data.sold,
      createdAt: data.created_at,
      seller: {
        id: data.seller?.id || '',
        name: data.seller?.name || 'Anonymous',
        email: data.seller?.email || ''
      }
    };
  } catch (error) {
    console.error('Error in createBook:', error);
    throw error;
  }
};

export const getAllBooks = async (includeSold: boolean = true): Promise<Book[]> => {
  try {
    let query = supabase
      .from('books')
      .select(`
        *,
        seller:profiles!books_seller_id_fkey (
          id,
          name,
          email
        )
      `);

    if (!includeSold) {
      query = query.eq('sold', false);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching all books:', error);
      throw error;
    }

    return data?.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      description: book.description,
      price: book.price,
      category: book.category,
      condition: book.condition as "New" | "Good" | "Better" | "Average" | "Below Average",
      imageUrl: book.image_url || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&auto=format&q=80',
      sold: book.sold,
      createdAt: book.created_at,
      seller: {
        id: book.seller?.id || '',
        name: book.seller?.name || 'Anonymous',
        email: book.seller?.email || ''
      }
    })) || [];
  } catch (error) {
    console.error('Error in getAllBooks:', error);
    return [];
  }
};

export const removeBook = async (bookId: string): Promise<{ success: boolean; message: string }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { success: false, message: 'User not authenticated' };
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (!profile?.is_admin) {
      return { success: false, message: 'Unauthorized: Admin access required' };
    }

    // Delete the book
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', bookId);

    if (error) {
      console.error('Error removing book:', error);
      return { success: false, message: 'Failed to remove book from database' };
    }

    return { success: true, message: 'Book removed successfully' };
  } catch (error) {
    console.error('Error in removeBook:', error);
    return { success: false, message: 'An unexpected error occurred' };
  }
};

export const getTransactions = async () => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        seller:profiles!transactions_seller_id_fkey (
          name
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }

    return data?.map(transaction => ({
      id: transaction.id,
      bookTitle: transaction.book_title,
      sellerName: transaction.seller?.name || 'Unknown',
      price: transaction.price,
      commission: transaction.commission,
      date: transaction.created_at
    })) || [];
  } catch (error) {
    console.error('Error in getTransactions:', error);
    return [];
  }
};

export const getTotalCommission = async (): Promise<number> => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('commission');

    if (error) {
      console.error('Error fetching total commission:', error);
      throw error;
    }

    const total = data?.reduce((sum, transaction) => sum + (transaction.commission || 0), 0) || 0;
    return Math.round(total * 100) / 100; // Round to 2 decimal places
  } catch (error) {
    console.error('Error in getTotalCommission:', error);
    return 0;
  }
};

export const getUserBooks = async (userId: string): Promise<Book[]> => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select(`
        *,
        seller:profiles!books_seller_id_fkey (
          id,
          name,
          email
        )
      `)
      .eq('seller_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user books:', error);
      throw error;
    }

    return data?.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      description: book.description,
      price: book.price,
      category: book.category,
      condition: book.condition as "New" | "Good" | "Better" | "Average" | "Below Average",
      imageUrl: book.image_url || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&auto=format&q=80',
      sold: book.sold,
      createdAt: book.created_at,
      seller: {
        id: book.seller?.id || '',
        name: book.seller?.name || 'Anonymous',
        email: book.seller?.email || ''
      }
    })) || [];
  } catch (error) {
    console.error('Error in getUserBooks:', error);
    return [];
  }
};
