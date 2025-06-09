
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  condition: string;
  category: string;
  imageUrl: string;
  sellerId: string;
  createdAt: string;
  sold: boolean;
  grade?: string;
  frontCover?: string;
  backCover?: string;
  insidePages?: string;
  universityYear?: string;
}

export interface BookFormData {
  title: string;
  author: string;
  description: string;
  price: number;
  condition: string;
  category: string;
  grade?: string;
  universityYear?: string;
  images: File[];
}
