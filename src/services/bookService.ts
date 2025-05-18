
import { Book, BookFormData } from '../types/book';

// Start with an empty books array instead of mock data
let books: Book[] = [];

// Track sold books and commissions
interface Transaction {
  id: string;
  bookId: string;
  bookTitle: string;
  sellerId: string;
  sellerName: string;
  buyerId: string;
  price: number;
  commission: number;
  date: string;
}

let transactions: Transaction[] = [];

// Get all books with optional filtering
export const getBooks = async (filters?: {
  category?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}): Promise<Book[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  let filteredBooks = [...books];

  if (filters) {
    if (filters.category) {
      filteredBooks = filteredBooks.filter(book => 
        book.category.toLowerCase() === filters.category?.toLowerCase()
      );
    }

    if (filters.condition) {
      filteredBooks = filteredBooks.filter(book => 
        book.condition === filters.condition
      );
    }

    if (filters.minPrice !== undefined) {
      filteredBooks = filteredBooks.filter(book => 
        book.price >= filters.minPrice!
      );
    }

    if (filters.maxPrice !== undefined) {
      filteredBooks = filteredBooks.filter(book => 
        book.price <= filters.maxPrice!
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredBooks = filteredBooks.filter(book => 
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower) ||
        book.description.toLowerCase().includes(searchLower) ||
        book.category.toLowerCase().includes(searchLower)
      );
    }
  }

  return filteredBooks.filter(book => !book.sold);
};

// Get a single book by ID
export const getBookById = async (id: string): Promise<Book | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const book = books.find(book => book.id === id);
  return book || null;
};

// Create a new book listing
export const createBook = async (
  bookData: BookFormData,
  sellerId: string,
  sellerName: string,
  sellerEmail: string
): Promise<Book> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const newBook: Book = {
    id: Date.now().toString(),
    ...bookData,
    seller: {
      id: sellerId,
      name: sellerName,
      email: sellerEmail
    },
    createdAt: new Date().toISOString(),
    sold: false
  };
  
  books.push(newBook);
  return newBook;
};

// Get books by seller ID
export const getBooksBySeller = async (sellerId: string): Promise<Book[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return books.filter(book => book.seller.id === sellerId);
};

// Purchase a book
export const purchaseBook = async (
  bookId: string, 
  buyerId: string
): Promise<{ success: boolean; message: string; price: number }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const bookIndex = books.findIndex(book => book.id === bookId);
  
  if (bookIndex === -1) {
    return { success: false, message: 'Book not found', price: 0 };
  }
  
  if (books[bookIndex].sold) {
    return { success: false, message: 'This book has already been sold', price: 0 };
  }
  
  const originalPrice = books[bookIndex].price;
  const commission = 15; // R15 commission
  
  // Mark the book as sold
  books[bookIndex] = {
    ...books[bookIndex],
    sold: true
  };
  
  // Record the transaction
  const transaction: Transaction = {
    id: Date.now().toString(),
    bookId,
    bookTitle: books[bookIndex].title,
    sellerId: books[bookIndex].seller.id,
    sellerName: books[bookIndex].seller.name,
    buyerId,
    price: originalPrice,
    commission,
    date: new Date().toISOString()
  };
  
  transactions.push(transaction);
  
  return { 
    success: true, 
    message: 'Book purchased successfully', 
    price: originalPrice 
  };
};

// Admin Functions
export const getAllBooks = async (includeSold: boolean = false): Promise<Book[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return includeSold ? books : books.filter(book => !book.sold);
};

export const getTransactions = async (): Promise<Transaction[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return transactions;
};

export const getTotalCommission = async (): Promise<number> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return transactions.reduce((total, transaction) => total + transaction.commission, 0);
};

export const removeBook = async (bookId: string): Promise<{ success: boolean; message: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const bookIndex = books.findIndex(book => book.id === bookId);
  
  if (bookIndex === -1) {
    return { success: false, message: 'Book not found' };
  }
  
  books.splice(bookIndex, 1);
  
  return { success: true, message: 'Book removed successfully' };
};
