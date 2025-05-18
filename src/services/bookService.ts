
import { Book, BookFormData } from '../types/book';

// Mock data for books
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    description: 'A comprehensive introduction to the modern study of computer algorithms. It covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers.',
    price: 450,
    condition: 'Good',
    category: 'Computer Science',
    imageUrl: 'https://source.unsplash.com/random/300x400/?textbook',
    seller: {
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
    },
    createdAt: '2023-06-15T10:00:00Z',
    sold: false
  },
  {
    id: '2',
    title: 'Organic Chemistry',
    author: 'Paula Yurkanis Bruice',
    description: 'A comprehensive text for organic chemistry that emphasizes the relationship between structure and reactivity.',
    price: 350,
    condition: 'Like New',
    category: 'Chemistry',
    imageUrl: 'https://source.unsplash.com/random/300x400/?chemistry',
    seller: {
      id: '124',
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
    createdAt: '2023-07-20T14:30:00Z',
    sold: false
  },
  {
    id: '3',
    title: 'Principles of Economics',
    author: 'N. Gregory Mankiw',
    description: 'A well-regarded introduction to economics that covers both microeconomics and macroeconomics.',
    price: 300,
    condition: 'Good',
    category: 'Economics',
    imageUrl: 'https://source.unsplash.com/random/300x400/?economics',
    seller: {
      id: '125',
      name: 'Bob Johnson',
      email: 'bob@example.com',
    },
    createdAt: '2023-08-05T09:45:00Z',
    sold: false
  },
  {
    id: '4',
    title: 'Calculus: Early Transcendentals',
    author: 'James Stewart',
    description: 'A comprehensive calculus textbook covering differentiation, integration, and series.',
    price: 375,
    condition: 'Very Good',
    category: 'Mathematics',
    imageUrl: 'https://source.unsplash.com/random/300x400/?math',
    seller: {
      id: '126',
      name: 'Alice Williams',
      email: 'alice@example.com',
    },
    createdAt: '2023-09-10T16:20:00Z',
    sold: false
  },
  {
    id: '5',
    title: 'Psychology: The Science of Mind and Behavior',
    author: 'Michael Passer',
    description: 'An introduction to the field of psychology, covering all major topics in the discipline.',
    price: 280,
    condition: 'Acceptable',
    category: 'Psychology',
    imageUrl: 'https://source.unsplash.com/random/300x400/?psychology',
    seller: {
      id: '127',
      name: 'Charlie Brown',
      email: 'charlie@example.com',
    },
    createdAt: '2023-10-25T11:15:00Z',
    sold: false
  },
  {
    id: '6',
    title: 'Campbell Biology',
    author: 'Lisa A. Urry, Michael L. Cain',
    description: 'A comprehensive biology textbook covering all major topics in the field.',
    price: 420,
    condition: 'Like New',
    category: 'Biology',
    imageUrl: 'https://source.unsplash.com/random/300x400/?biology',
    seller: {
      id: '128',
      name: 'Diana Miller',
      email: 'diana@example.com',
    },
    createdAt: '2023-11-12T13:40:00Z',
    sold: false
  }
];

// In-memory storage of books
let books = [...mockBooks];

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
  
  return { 
    success: true, 
    message: 'Book purchased successfully', 
    price: originalPrice 
  };
};
