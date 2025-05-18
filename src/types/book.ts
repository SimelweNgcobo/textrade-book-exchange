
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  condition: 'New' | 'Like New' | 'Very Good' | 'Good' | 'Acceptable' | 'Poor';
  category: string;
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
