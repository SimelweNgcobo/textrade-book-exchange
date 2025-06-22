
export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  condition: string;
  price: number;
  description: string;
  image_url: string;
  front_cover?: string;
  back_cover?: string;
  inside_pages?: string;
  seller_id: string;
  sold: boolean;
  created_at: string;
  grade?: string;
  university_year?: string;
  // Legacy fields for compatibility
  frontCover?: string;
  imageUrl?: string;
  universityYear?: string;
}

export interface BookFormData {
  title: string;
  author: string;
  category: string;
  condition: string;
  price: number;
  description: string;
  grade?: string;
  university_year?: string;
}

export interface UnavailableBook {
  id: string;
  title: string;
  author: string;
  category: string;
  requestCount: number;
}
