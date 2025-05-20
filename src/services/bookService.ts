import { Book, BookFormData } from '../types/book';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Get all books with optional filtering
export const getBooks = async (filters?: {
  category?: string;
  condition?: string;
  grade?: string;
  universityYear?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}): Promise<Book[]> => {
  try {
    let query = supabase
      .from('books')
      .select(`
        id,
        title,
        author,
        description,
        price,
        condition,
        category,
        grade,
        university_year,
        image_url,
        created_at,
        sold,
        seller_id,
        profiles:seller_id (
          id,
          name,
          email
        )
      `)
      .eq('sold', false);
    
    if (filters) {
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
      
      if (filters.search) {
        const searchTerm = `%${filters.search.toLowerCase()}%`;
        query = query.or(`title.ilike.${searchTerm},author.ilike.${searchTerm},description.ilike.${searchTerm},category.ilike.${searchTerm}`);
      }
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
    
    return data.map(transformBookData);
  } catch (error) {
    console.error('Error in getBooks:', error);
    return [];
  }
};

// Get a single book by ID
export const getBookById = async (id: string): Promise<Book | null> => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select(`
        id,
        title,
        author,
        description,
        price,
        condition,
        category,
        grade,
        university_year,
        image_url,
        created_at,
        sold,
        seller_id,
        profiles:seller_id (
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
    
    return transformBookData(data);
  } catch (error) {
    console.error('Error in getBookById:', error);
    return null;
  }
};

// Create a new book listing
export const createBook = async (
  bookData: BookFormData,
  sellerId: string,
  sellerName: string,
  sellerEmail: string
): Promise<Book> => {
  try {
    const { data, error } = await supabase
      .from('books')
      .insert({
        title: bookData.title,
        author: bookData.author,
        description: bookData.description,
        price: bookData.price,
        condition: bookData.condition,
        category: bookData.category,
        grade: bookData.grade || null,
        university_year: bookData.universityYear || null,
        image_url: bookData.imageUrl,
        seller_id: sellerId
      })
      .select()
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
      condition: data.condition as any,
      category: data.category,
      grade: data.grade || undefined,
      universityYear: data.university_year as any,
      imageUrl: data.image_url,
      seller: {
        id: sellerId,
        name: sellerName,
        email: sellerEmail
      },
      createdAt: data.created_at,
      sold: data.sold
    };
  } catch (error) {
    console.error('Error in createBook:', error);
    throw error;
  }
};

// Purchase a book
export const purchaseBook = async (
  bookId: string, 
  buyerId: string
): Promise<{ success: boolean; message: string; price: number }> => {
  try {
    // Get the book details first
    const { data: book, error: bookError } = await supabase
      .from('books')
      .select('*, profiles:seller_id (name)')
      .eq('id', bookId)
      .single();
    
    if (bookError) {
      console.error('Error fetching book for purchase:', bookError);
      return { success: false, message: 'Book not found', price: 0 };
    }
    
    if (book.sold) {
      return { success: false, message: 'This book has already been sold', price: 0 };
    }
    
    const originalPrice = book.price;
    const commission = 15; // R15 fixed commission
    
    // Begin transaction
    // 1. Mark the book as sold
    const { error: updateError } = await supabase
      .from('books')
      .update({ sold: true })
      .eq('id', bookId);
    
    if (updateError) {
      console.error('Error updating book status:', updateError);
      return { success: false, message: 'Failed to process purchase', price: 0 };
    }
    
    // 2. Record the transaction
    const { error: transactionError } = await supabase
      .from('transactions')
      .insert({
        book_id: bookId,
        book_title: book.title,
        seller_id: book.seller_id,
        buyer_id: buyerId,
        price: originalPrice,
        commission: commission
      });
    
    if (transactionError) {
      console.error('Error recording transaction:', transactionError);
      // Attempt to rollback the book status
      await supabase
        .from('books')
        .update({ sold: false })
        .eq('id', bookId);
      
      return { success: false, message: 'Failed to record transaction', price: 0 };
    }
    
    return { 
      success: true, 
      message: 'Book purchased successfully', 
      price: originalPrice 
    };
  } catch (error) {
    console.error('Error in purchaseBook:', error);
    return { success: false, message: 'An unexpected error occurred', price: 0 };
  }
};

// Get books by seller ID
export const getBooksBySeller = async (sellerId: string): Promise<Book[]> => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select(`
        id,
        title,
        author,
        description,
        price,
        condition,
        category,
        grade,
        university_year,
        image_url,
        created_at,
        sold,
        seller_id,
        profiles:seller_id (
          id,
          name,
          email
        )
      `)
      .eq('seller_id', sellerId);
    
    if (error) {
      console.error('Error fetching seller books:', error);
      throw error;
    }
    
    return data.map(transformBookData);
  } catch (error) {
    console.error('Error in getBooksBySeller:', error);
    return [];
  }
};

// Admin Functions
export const getAllBooks = async (includeSold: boolean = false): Promise<Book[]> => {
  try {
    let query = supabase
      .from('books')
      .select(`
        id,
        title,
        author,
        description,
        price,
        condition,
        category,
        grade,
        university_year,
        image_url,
        created_at,
        sold,
        seller_id,
        profiles:seller_id (
          id,
          name,
          email
        )
      `);
    
    if (!includeSold) {
      query = query.eq('sold', false);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching all books:', error);
      throw error;
    }
    
    return data.map(transformBookData);
  } catch (error) {
    console.error('Error in getAllBooks:', error);
    return [];
  }
};

export const getTransactions = async (): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        id,
        book_id,
        book_title,
        seller_id,
        buyer_id,
        price,
        commission,
        created_at
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
    
    // Get seller and buyer profiles separately
    if (data && data.length > 0) {
      const sellerIds = [...new Set(data.map(t => t.seller_id))];
      const buyerIds = [...new Set(data.map(t => t.buyer_id))];
      
      const { data: sellerProfiles, error: sellerError } = await supabase
        .from('profiles')
        .select('id, name')
        .in('id', sellerIds);
        
      const { data: buyerProfiles, error: buyerError } = await supabase
        .from('profiles')
        .select('id, name')
        .in('id', buyerIds);
      
      if (sellerError || buyerError) {
        console.error('Error fetching profiles:', sellerError || buyerError);
      }
      
      const sellerMap = sellerProfiles ? sellerProfiles.reduce((map: Record<string, any>, profile) => {
        map[profile.id] = profile;
        return map;
      }, {}) : {};
      
      const buyerMap = buyerProfiles ? buyerProfiles.reduce((map: Record<string, any>, profile) => {
        map[profile.id] = profile;
        return map;
      }, {}) : {};
      
      return data.map(transaction => ({
        id: transaction.id,
        bookId: transaction.book_id,
        bookTitle: transaction.book_title,
        sellerId: transaction.seller_id,
        sellerName: sellerMap[transaction.seller_id]?.name || 'Unknown',
        buyerId: transaction.buyer_id,
        buyerName: buyerMap[transaction.buyer_id]?.name || 'Unknown',
        price: transaction.price,
        commission: transaction.commission,
        date: transaction.created_at
      }));
    }
    
    return [];
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
      console.error('Error fetching commissions:', error);
      throw error;
    }
    
    return data.reduce((total, transaction) => total + transaction.commission, 0);
  } catch (error) {
    console.error('Error in getTotalCommission:', error);
    return 0;
  }
};

export const removeBook = async (bookId: string): Promise<{ success: boolean; message: string }> => {
  try {
    const { error } = await supabase
      .from('books')
      .delete()
      .eq('id', bookId);
    
    if (error) {
      console.error('Error removing book:', error);
      throw error;
    }
    
    return { success: true, message: 'Book removed successfully' };
  } catch (error) {
    console.error('Error in removeBook:', error);
    return { success: false, message: 'Failed to remove book' };
  }
};

// Helper function to transform database book data to our Book type
function transformBookData(data: any): Book {
  return {
    id: data.id,
    title: data.title,
    author: data.author,
    description: data.description,
    price: data.price,
    condition: data.condition,
    category: data.category,
    grade: data.grade || undefined,
    universityYear: data.university_year || undefined,
    imageUrl: data.image_url,
    seller: {
      id: data.seller_id,
      name: data.profiles?.name || 'Unknown',
      email: data.profiles?.email || 'unknown@example.com'
    },
    createdAt: data.created_at,
    sold: data.sold
  };
}
