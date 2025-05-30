
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
    let query = supabase
      .from('books')
      .select(`
        *,
        seller:seller_id (
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
      imageUrl: book.image_url || book.front_cover || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&auto=format&q=80',
      frontCover: book.front_cover,
      backCover: book.back_cover,
      insidePages: book.inside_pages,
      sold: book.sold,
      createdAt: book.created_at,
      grade: book.grade,
      universityYear: book.university_year,
      seller: {
        id: book.seller_id,
        name: (book.seller as any)?.name || 'Anonymous',
        email: (book.seller as any)?.email || ''
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
        seller:seller_id (
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
      imageUrl: book.image_url || book.front_cover || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&auto=format&q=80',
      frontCover: book.front_cover,
      backCover: book.back_cover,
      insidePages: book.inside_pages,
      sold: book.sold,
      createdAt: book.created_at,
      grade: book.grade,
      universityYear: book.university_year,
      seller: {
        id: book.seller_id,
        name: (book.seller as any)?.name || 'Anonymous',
        email: (book.seller as any)?.email || ''
      }
    };
  } catch (error) {
    console.error('Error in getBookById:', error);
    return null;
  }
};

export const getUserBooks = async (userId: string): Promise<Book[]> => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select(`
        *,
        seller:seller_id (
          id,
          name,
          email
        )
      `)
      .eq('seller_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user books:', error);
      return [];
    }

    if (!data) return [];

    return data.map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      description: book.description,
      price: book.price,
      category: book.category,
      condition: book.condition as "New" | "Good" | "Better" | "Average" | "Below Average",
      imageUrl: book.image_url || book.front_cover || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&auto=format&q=80',
      frontCover: book.front_cover,
      backCover: book.back_cover,
      insidePages: book.inside_pages,
      sold: book.sold,
      createdAt: book.created_at,
      grade: book.grade,
      universityYear: book.university_year,
      seller: {
        id: book.seller_id,
        name: (book.seller as any)?.name || 'Anonymous',
        email: (book.seller as any)?.email || ''
      }
    }));
  } catch (error) {
    console.error('Error in getUserBooks:', error);
    return [];
  }
};
