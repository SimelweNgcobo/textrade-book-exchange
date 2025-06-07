
import { Book } from '@/types/book';
import { BookQueryResult } from './bookTypes';

export const mapBookFromDatabase = (bookData: BookQueryResult): Book => {
  const profile = bookData.profiles;
  
  console.log("Mapping book data:", bookData);
  console.log("Profile data:", profile);
  
  return {
    id: bookData.id,
    title: bookData.title,
    author: bookData.author,
    description: bookData.description,
    price: bookData.price,
    category: bookData.category,
    condition: bookData.condition as "New" | "Good" | "Better" | "Average" | "Below Average",
    imageUrl: bookData.front_cover || bookData.image_url || 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop&auto=format&q=80',
    frontCover: bookData.front_cover,
    backCover: bookData.back_cover,
    insidePages: bookData.inside_pages,
    sold: bookData.sold,
    createdAt: bookData.created_at,
    grade: bookData.grade,
    universityYear: bookData.university_year,
    seller: {
      id: bookData.seller_id,
      name: profile?.name || `User ${bookData.seller_id.slice(0, 8)}`,
      email: profile?.email || ''
    }
  };
};
