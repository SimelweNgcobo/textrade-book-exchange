
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  category: string;
  condition: "New" | "Good" | "Better" | "Average" | "Below Average";
  imageUrl: string;
  frontCover?: string;
  backCover?: string;
  insidePages?: string;
  sold: boolean;
  createdAt: string;
  grade?: string;
  universityYear?: string;
  seller: {
    id: string;
    name: string;
    email: string;
  };
}

export interface BookFormData {
  title: string;
  author: string;
  description: string;
  price: number;
  category: string;
  condition: "New" | "Good" | "Better" | "Average" | "Below Average";
  grade?: string;
  universityYear?: string;
  imageUrl: string;
  frontCover: string;
  backCover: string;
  insidePages: string;
}
