
import { supabase } from '@/integrations/supabase/client';
import { Book } from '@/types/book';

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
    console.log('Fetching books with filters:', filters);
    
    let query = supabase
      .from('books')
      .select(`
        *,
        profiles!seller_id (
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
      if (filters.minPrice !== undefined) {
        query = query.gte('price', filters.minPrice);
      }
      if (filters.maxPrice !== undefined) {
        query = query.lte('price', filters.maxPrice);
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching books:', error);
      throw error;
    }

    if (!data) {
      console.log('No data returned from books query');
      return [];
    }

    console.log('Raw books data:', data);

    const books: Book[] = data.map((book: any) => {
      const profile = book.profiles;
      return {
        id: book.id,
        title: book.title,
        author: book.author,
        description: book.description,
        price: book.price,
        category: book.category,
        condition: book.condition as "New" | "Good" | "Better" | "Average" | "Below Average",
        imageUrl: book.front_cover || book.image_url || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&auto=format&q=80',
        frontCover: book.front_cover,
        backCover: book.back_cover,
        insidePages: book.inside_pages,
        sold: book.sold,
        createdAt: book.created_at,
        grade: book.grade,
        universityYear: book.university_year,
        seller: {
          id: book.seller_id,
          name: profile?.name || 'Anonymous',
          email: profile?.email || ''
        }
      };
    });

    console.log('Processed books:', books);
    return books;
  } catch (error) {
    console.error('Error in getBooks:', error);
    return [];
  }
};

export const getBookById = async (id: string): Promise<Book | null> => {
  try {
    console.log('Fetching book by ID:', id);
    
    const { data: book, error } = await supabase
      .from('books')
      .select(`
        *,
        profiles!seller_id (
          id,
          name,
          email
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching book by ID:', error);
      throw error;
    }

    if (!book) {
      console.log('No book found with ID:', id);
      return null;
    }

    console.log('Found book:', book);

    const profile = book.profiles;
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      description: book.description,
      price: book.price,
      category: book.category,
      condition: book.condition as "New" | "Good" | "Better" | "Average" | "Below Average",
      imageUrl: book.front_cover || book.image_url || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&auto=format&q=80',
      frontCover: book.front_cover,
      backCover: book.back_cover,
      insidePages: book.inside_pages,
      sold: book.sold,
      createdAt: book.created_at,
      grade: book.grade,
      universityYear: book.university_year,
      seller: {
        id: book.seller_id,
        name: profile?.name || 'Anonymous',
        email: profile?.email || ''
      }
    };
  } catch (error) {
    console.error('Error in getBookById:', error);
    return null;
  }
};

export const getUserBooks = async (userId: string): Promise<Book[]> => {
  try {
    console.log('Fetching user books for ID:', userId);
    
    const { data, error } = await supabase
      .from('books')
      .select(`
        *,
        profiles!seller_id (
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

    if (!data) {
      console.log('No books found for user:', userId);
      return [];
    }

    console.log('User books data:', data);

    return data.map((book: any) => {
      const profile = book.profiles;
      return {
        id: book.id,
        title: book.title,
        author: book.author,
        description: book.description,
        price: book.price,
        category: book.category,
        condition: book.condition as "New" | "Good" | "Better" | "Average" | "Below Average",
        imageUrl: book.front_cover || book.image_url || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&auto=format&q=80',
        frontCover: book.front_cover,
        backCover: book.back_cover,
        insidePages: book.inside_pages,
        sold: book.sold,
        createdAt: book.created_at,
        grade: book.grade,
        universityYear: book.university_year,
        seller: {
          id: book.seller_id,
          name: profile?.name || 'Anonymous',
          email: profile?.email || ''
        }
      };
    });
  } catch (error) {
    console.error('Error in getUserBooks:', error);
    return [];
  }
};
