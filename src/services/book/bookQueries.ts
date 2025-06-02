
import { supabase } from '@/integrations/supabase/client';
import { Book } from '@/types/book';
import { BookFilters, BookQueryResult } from './bookTypes';
import { mapBookFromDatabase } from './bookMapper';
import { handleBookServiceError } from './bookErrorHandler';

export const getBooks = async (filters?: BookFilters): Promise<Book[]> => {
  try {
    console.log('Fetching books with filters:', filters);
    
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
      if (filters.minPrice !== undefined) {
        query = query.gte('price', filters.minPrice);
      }
      if (filters.maxPrice !== undefined) {
        query = query.lte('price', filters.maxPrice);
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      handleBookServiceError(error, 'fetch books');
    }

    if (!data) {
      console.log('No data returned from books query');
      return [];
    }

    console.log('Raw books data:', data);
    
    const books: Book[] = data.map((book: any) => {
      const bookData: BookQueryResult = {
        ...book,
        profiles: book.profiles ? {
          id: book.profiles.id,
          name: book.profiles.name,
          email: book.profiles.email
        } : null
      };
      return mapBookFromDatabase(bookData);
    });

    console.log('Processed books:', books);
    return books;
  } catch (error) {
    console.error('Error in getBooks:', error);
    handleBookServiceError(error, 'fetch books');
  }
};

export const getBookById = async (id: string): Promise<Book | null> => {
  try {
    console.log('Fetching book by ID:', id);
    
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
      console.error('Supabase error:', error);
      handleBookServiceError(error, 'fetch book by ID');
    }

    if (!book) {
      console.log('No book found with ID:', id);
      return null;
    }

    console.log('Found book:', book);
    
    const bookData: BookQueryResult = {
      ...book,
      profiles: book.profiles ? {
        id: book.profiles.id,
        name: book.profiles.name,
        email: book.profiles.email
      } : null
    };
    
    return mapBookFromDatabase(bookData);
  } catch (error) {
    console.error('Error in getBookById:', error);
    handleBookServiceError(error, 'fetch book by ID');
  }
};

export const getUserBooks = async (userId: string): Promise<Book[]> => {
  try {
    console.log('Fetching user books for ID:', userId);
    
    const { data, error } = await supabase
      .from('books')
      .select(`
        *,
        profiles!books_seller_id_fkey (
          id,
          name,
          email
        )
      `)
      .eq('seller_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      handleBookServiceError(error, 'fetch user books');
    }

    if (!data) {
      console.log('No books found for user:', userId);
      return [];
    }

    console.log('User books data:', data);
    
    return data.map((book: any) => {
      const bookData: BookQueryResult = {
        ...book,
        profiles: book.profiles ? {
          id: book.profiles.id,
          name: book.profiles.name,
          email: book.profiles.email
        } : null
      };
      return mapBookFromDatabase(bookData);
    });
  } catch (error) {
    console.error('Error in getUserBooks:', error);
    handleBookServiceError(error, 'fetch user books');
  }
};
