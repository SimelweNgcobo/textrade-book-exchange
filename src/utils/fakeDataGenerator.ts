
// Fake data generator for books, notifications, and activity logs
import { BookFormData } from "@/types/book";
import { NotificationInput } from "@/services/notificationService";
import { Activity } from "@/services/activityService";

// Book categories and conditions
const CATEGORIES = [
  "Textbooks",
  "Fiction",
  "Non-Fiction", 
  "Science",
  "Mathematics",
  "Engineering",
  "Medicine",
  "Law",
  "Business",
  "Art & Design",
  "History",
  "Philosophy",
  "Psychology",
  "Computer Science"
];

const CONDITIONS = ["New", "Good", "Better", "Average", "Below Average"] as const;

const GRADES = ["Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];

const UNIVERSITY_YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Honours", "Masters"];

const UNIVERSITIES = [
  "University of Cape Town",
  "University of the Witwatersrand", 
  "Stellenbosch University",
  "University of Pretoria",
  "University of KwaZulu-Natal",
  "Rhodes University",
  "North-West University",
  "University of the Free State"
];

// Sample book data
const FAKE_BOOKS = [
  {
    title: "Introduction to Calculus",
    author: "James Stewart",
    description: "Comprehensive calculus textbook covering limits, derivatives, and integrals. Perfect for first-year mathematics students. Contains numerous examples and practice problems.",
    category: "Mathematics",
    price: 450
  },
  {
    title: "Principles of Physics",
    author: "David Halliday",
    description: "Fundamental physics concepts explained clearly with real-world applications. Includes mechanics, thermodynamics, and electromagnetism.",
    category: "Science", 
    price: 520
  },
  {
    title: "Organic Chemistry",
    author: "Paula Bruice",
    description: "Essential organic chemistry textbook with detailed reaction mechanisms and molecular structures. Great condition with minimal highlighting.",
    category: "Science",
    price: 380
  },
  {
    title: "Constitutional Law",
    author: "Iain Currie",
    description: "South African constitutional law principles and case studies. Essential reading for law students. Well-maintained with bookmarks included.",
    category: "Law",
    price: 340
  },
  {
    title: "Financial Accounting",
    author: "Jerry Weygandt",
    description: "Complete guide to financial accounting principles. Includes practice exercises and solutions manual. Previous owner's notes are helpful.",
    category: "Business",
    price: 290
  },
  {
    title: "Data Structures and Algorithms",
    author: "Thomas Cormen",
    description: "Computer science fundamentals covering sorting, searching, graphs, and dynamic programming. Code examples in multiple languages.",
    category: "Computer Science",
    price: 470
  },
  {
    title: "Human Anatomy Atlas",
    author: "Frank Netter",
    description: "Medical anatomy reference with detailed illustrations. Essential for medical and health science students. All pages intact.",
    category: "Medicine",
    price: 680
  },
  {
    title: "Microeconomics Theory",
    author: "Hal Varian",
    description: "Advanced microeconomic theory and applications. Graduate level text with mathematical proofs and economic models.",
    category: "Business",
    price: 410
  },
  {
    title: "World History: Patterns of Interaction",
    author: "Roger Beck",
    description: "Comprehensive world history from ancient civilizations to modern times. Excellent for history majors and general education.",
    category: "History",
    price: 320
  },
  {
    title: "Psychology: The Science of Mind",
    author: "David Myers",
    description: "Introduction to psychological principles and research methods. Covers cognitive, social, and developmental psychology.",
    category: "Psychology",
    price: 360
  },
  {
    title: "Engineering Mechanics: Statics",
    author: "Russell Hibbeler",
    description: "Fundamental engineering mechanics covering force systems, equilibrium, and structural analysis. Many solved examples.",
    category: "Engineering",
    price: 490
  },
  {
    title: "Art History Through the Ages",
    author: "Gardner's",
    description: "Survey of art history from prehistoric to contemporary periods. Beautiful color illustrations and cultural context.",
    category: "Art & Design",
    price: 440
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "Classic American literature novel set in the Jazz Age. Required reading for English literature courses. Clean copy.",
    category: "Fiction",
    price: 120
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "Timeless novel about justice and morality in the American South. Excellent condition with discussion questions included.",
    category: "Fiction",
    price: 130
  },
  {
    title: "1984",
    author: "George Orwell",
    description: "Dystopian classic about totalitarianism and surveillance. Relevant for political science and literature studies.",
    category: "Fiction",
    price: 140
  },
  {
    title: "Linear Algebra Done Right",
    author: "Sheldon Axler",
    description: "Pure mathematics approach to linear algebra. Focuses on vector spaces and linear transformations. Advanced undergraduate level.",
    category: "Mathematics",
    price: 380
  },
  {
    title: "Discrete Mathematics",
    author: "Kenneth Rosen",
    description: "Mathematical foundations for computer science including logic, sets, relations, and graph theory. Lots of practice problems.",
    category: "Mathematics",
    price: 420
  },
  {
    title: "Environmental Science",
    author: "G. Tyler Miller",
    description: "Comprehensive environmental science covering ecology, pollution, and sustainability. Current environmental issues discussed.",
    category: "Science",
    price: 350
  },
  {
    title: "Marketing Management",
    author: "Philip Kotler",
    description: "Essential marketing textbook covering strategy, consumer behavior, and digital marketing. Industry case studies included.",
    category: "Business",
    price: 390
  },
  {
    title: "Philosophy: The Basics",
    author: "Nigel Warburton",
    description: "Introduction to philosophical thinking and major philosophical questions. Accessible writing style for beginners.",
    category: "Philosophy",
    price: 250
  }
];

const NOTIFICATION_TEMPLATES = [
  {
    title: "New Book Listed",
    message: "A new book matching your interests has been listed",
    type: "info" as const
  },
  {
    title: "Price Drop Alert",
    message: "A book on your wishlist has dropped in price",
    type: "success" as const
  },
  {
    title: "Book Sold",
    message: "Congratulations! Your book has been sold",
    type: "success" as const
  },
  {
    title: "Purchase Confirmation",
    message: "Your book purchase has been confirmed",
    type: "success" as const
  },
  {
    title: "Payment Received",
    message: "Payment has been received for your book sale",
    type: "success" as const
  },
  {
    title: "Listing Expires Soon",
    message: "Your book listing will expire in 3 days",
    type: "warning" as const
  },
  {
    title: "Profile Updated",
    message: "Your profile information has been successfully updated",
    type: "info" as const
  },
  {
    title: "New Message",
    message: "You have received a new message from a potential buyer",
    type: "info" as const
  },
  {
    title: "Book Review Request",
    message: "Please review your recent book purchase",
    type: "info" as const
  },
  {
    title: "Seasonal Sale",
    message: "Back-to-school sale is now live! Save up to 30%",
    type: "info" as const
  }
];

const ACTIVITY_TEMPLATES = [
  {
    type: "listing_created" as const,
    title: "Book Listed",
    description: "Successfully created a new book listing"
  },
  {
    type: "purchase" as const,
    title: "Book Purchased", 
    description: "Purchased a book from another seller"
  },
  {
    type: "sale" as const,
    title: "Book Sold",
    description: "Your book was purchased by another user"
  },
  {
    type: "listing_updated" as const,
    title: "Listing Updated",
    description: "Updated book listing information"
  },
  {
    type: "profile_updated" as const,
    title: "Profile Updated",
    description: "Updated profile information and preferences"
  },
  {
    type: "search" as const,
    title: "Book Search",
    description: "Searched for books in the marketplace"
  },
  {
    type: "book_viewed" as const,
    title: "Book Viewed",
    description: "Viewed a book listing"
  },
  {
    type: "login" as const,
    title: "Login",
    description: "Logged into your account"
  }
];

// Utility functions
const getRandomElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateRandomPrice = (min: number = 100, max: number = 800): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

const generateRandomDate = (daysAgo: number = 30): string => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date.toISOString();
};

// Generate fake books
export const generateFakeBooks = (count: number = 20): Omit<BookFormData, 'imageUrl'>[] => {
  const fakeBooks: Omit<BookFormData, 'imageUrl'>[] = [];
  
  for (let i = 0; i < Math.min(count, FAKE_BOOKS.length); i++) {
    const bookTemplate = FAKE_BOOKS[i];
    
    fakeBooks.push({
      title: bookTemplate.title,
      author: bookTemplate.author,
      description: bookTemplate.description,
      price: bookTemplate.price + Math.floor(Math.random() * 100) - 50, // Add some price variation
      category: bookTemplate.category,
      condition: getRandomElement(CONDITIONS),
      grade: Math.random() > 0.7 ? getRandomElement(GRADES) : undefined,
      universityYear: Math.random() > 0.6 ? getRandomElement(UNIVERSITY_YEARS) : undefined,
      university: Math.random() > 0.5 ? getRandomElement(UNIVERSITIES) : undefined,
      frontCover: `https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=600&fit=crop&auto=format`,
      backCover: `https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&auto=format`,
      insidePages: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&auto=format`
    });
  }
  
  return fakeBooks;
};

// Generate fake notifications
export const generateFakeNotifications = (userId: string, count: number = 15): Omit<NotificationInput, 'userId'>[] => {
  const notifications: Omit<NotificationInput, 'userId'>[] = [];
  
  for (let i = 0; i < count; i++) {
    const template = getRandomElement(NOTIFICATION_TEMPLATES);
    
    notifications.push({
      title: template.title,
      message: `${template.message}${Math.random() > 0.8 ? ` - ${getRandomElement(FAKE_BOOKS).title}` : ''}`,
      type: template.type,
      read: Math.random() > 0.4 // 60% chance of being read
    });
  }
  
  return notifications;
};

// Generate fake activity logs
export const generateFakeActivities = (userId: string, count: number = 25): Omit<Activity, 'id' | 'user_id' | 'created_at'>[] => {
  const activities: Omit<Activity, 'id' | 'user_id' | 'created_at'>[] = [];
  
  for (let i = 0; i < count; i++) {
    const template = getRandomElement(ACTIVITY_TEMPLATES);
    const book = getRandomElement(FAKE_BOOKS);
    
    activities.push({
      type: template.type,
      title: template.title,
      description: `${template.description}${template.type.includes('book') || template.type === 'purchase' || template.type === 'sale' ? ` - ${book.title}` : ''}`,
      metadata: {
        book_id: `fake-book-${Math.random().toString(36).substr(2, 9)}`,
        book_title: book.title,
        price: book.price,
        category: book.category,
        timestamp: generateRandomDate(30)
      }
    });
  }
  
  return activities;
};

export default {
  generateFakeBooks,
  generateFakeNotifications, 
  generateFakeActivities,
  FAKE_BOOKS,
  CATEGORIES,
  CONDITIONS,
  GRADES,
  UNIVERSITY_YEARS,
  UNIVERSITIES
};
