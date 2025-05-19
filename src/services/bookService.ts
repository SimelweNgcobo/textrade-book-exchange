
import { Book, BookFormData } from '../types/book';

// Helper to persist data in localStorage
const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getFromLocalStorage = (key: string, defaultValue: any) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

// Initialize books with mock data from localStorage or empty array
let books: Book[] = getFromLocalStorage('books', []);

// Mock data setup - only populate if books array is empty
if (books.length === 0) {
  const mockBooks: Book[] = [
    {
      id: '1',
      title: 'Introduction to Psychology',
      author: 'James Watson',
      description: 'A comprehensive introduction to the field of psychology for first-year university students.',
      price: 450,
      condition: 'Good',
      category: 'Psychology',
      grade: undefined,
      universityYear: '1st Year',
      imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop',
      seller: {
        id: '101',
        name: 'Michael Johnson',
        email: 'michael@example.com'
      },
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      sold: false
    },
    {
      id: '2',
      title: 'Grade 11 Mathematics',
      author: 'Sarah Williams',
      description: 'A complete mathematics textbook covering the Grade 11 curriculum.',
      price: 280,
      condition: 'Better',
      category: 'Mathematics',
      grade: 'Grade 11',
      universityYear: undefined,
      imageUrl: 'https://images.unsplash.com/photo-1576872381149-7847515ce5d8?q=80&w=1000&auto=format&fit=crop',
      seller: {
        id: '102',
        name: 'Emily Davis',
        email: 'emily@example.com'
      },
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
      sold: false
    },
    {
      id: '3',
      title: 'Advanced Organic Chemistry',
      author: 'Robert Smith',
      description: 'A detailed textbook on advanced organic chemistry principles for third-year chemistry students.',
      price: 550,
      condition: 'New',
      category: 'Chemistry',
      grade: undefined,
      universityYear: '3rd Year',
      imageUrl: 'https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?q=80&w=1000&auto=format&fit=crop',
      seller: {
        id: '103',
        name: 'David Wilson',
        email: 'david@example.com'
      },
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
      sold: false
    }
  ];

  books = mockBooks;
  saveToLocalStorage('books', books);
}

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

// Initialize transactions from localStorage or empty array
let transactions: Transaction[] = getFromLocalStorage('transactions', []);

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
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Refresh data from localStorage to ensure we have the latest
  books = getFromLocalStorage('books', []);

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

    if (filters.grade) {
      filteredBooks = filteredBooks.filter(book => 
        book.grade === filters.grade
      );
    }

    if (filters.universityYear) {
      filteredBooks = filteredBooks.filter(book => 
        book.universityYear === filters.universityYear
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
        book.category.toLowerCase().includes(searchLower) ||
        (book.grade && book.grade.toLowerCase().includes(searchLower)) ||
        (book.universityYear && book.universityYear.toLowerCase().includes(searchLower))
      );
    }
  }

  return filteredBooks.filter(book => !book.sold);
};

// Get a single book by ID
export const getBookById = async (id: string): Promise<Book | null> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Refresh data from localStorage
  books = getFromLocalStorage('books', []);
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
  
  // Refresh data from localStorage
  books = getFromLocalStorage('books', []);
  
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
  saveToLocalStorage('books', books);
  
  return newBook;
};

// Purchase a book
export const purchaseBook = async (
  bookId: string, 
  buyerId: string
): Promise<{ success: boolean; message: string; price: number }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Refresh data from localStorage
  books = getFromLocalStorage('books', []);
  transactions = getFromLocalStorage('transactions', []);
  
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
  
  // Save updated data
  saveToLocalStorage('books', books);
  saveToLocalStorage('transactions', transactions);
  
  return { 
    success: true, 
    message: 'Book purchased successfully', 
    price: originalPrice 
  };
};

// Get books by seller ID
export const getBooksBySeller = async (sellerId: string): Promise<Book[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Refresh data from localStorage
  books = getFromLocalStorage('books', []);
  
  return books.filter(book => book.seller.id === sellerId);
};

// Admin Functions
export const getAllBooks = async (includeSold: boolean = false): Promise<Book[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Refresh data from localStorage
  books = getFromLocalStorage('books', []);
  
  return includeSold ? books : books.filter(book => !book.sold);
};

export const getTransactions = async (): Promise<Transaction[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Refresh data from localStorage
  transactions = getFromLocalStorage('transactions', []);
  
  return transactions;
};

export const getTotalCommission = async (): Promise<number> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Refresh data from localStorage
  transactions = getFromLocalStorage('transactions', []);
  
  return transactions.reduce((total, transaction) => total + transaction.commission, 0);
};

export const removeBook = async (bookId: string): Promise<{ success: boolean; message: string }> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Refresh data from localStorage
  books = getFromLocalStorage('books', []);
  
  const bookIndex = books.findIndex(book => book.id === bookId);
  
  if (bookIndex === -1) {
    return { success: false, message: 'Book not found' };
  }
  
  books.splice(bookIndex, 1);
  saveToLocalStorage('books', books);
  
  return { success: true, message: 'Book removed successfully' };
};
