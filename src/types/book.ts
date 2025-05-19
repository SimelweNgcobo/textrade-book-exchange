
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  condition: 'New' | 'Good' | 'Better' | 'Average' | 'Below Average';
  category: string;
  grade?: string; // For school books
  universityYear?: '1st Year' | '2nd Year' | '3rd Year' | '4th Year' | 'Masters' | 'Doctorate' | null; // For university books
  imageUrl: string;
  seller: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  sold: boolean;
}

export type BookFormData = Omit<Book, 'id' | 'seller' | 'createdAt' | 'sold'>;
