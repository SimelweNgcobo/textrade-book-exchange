
import { Book } from '@/types/book';
import { BookQueryResult } from './bookTypes';

export const mapDatabaseBookToBook = (dbBook: any): Book => {
  return {
    id: dbBook.id,
    title: dbBook.title,
    author: dbBook.author,
    description: dbBook.description,
    price: parseFloat(dbBook.price),
    condition: dbBook.condition,
    category: dbBook.category,
    imageUrl: dbBook.image_url,
    sellerId: dbBook.seller_id,
    createdAt: dbBook.created_at,
    sold: dbBook.sold,
    grade: dbBook.grade,
    frontCover: dbBook.front_cover,
    backCover: dbBook.back_cover,
    insidePages: dbBook.inside_pages,
    universityYear: dbBook.university_year,
  };
};

// Add the missing export that's being imported
export const mapBookFromDatabase = (bookData: BookQueryResult): Book => {
  return {
    id: bookData.id,
    title: bookData.title,
    author: bookData.author,
    description: bookData.description,
    price: parseFloat(bookData.price.toString()),
    condition: bookData.condition,
    category: bookData.category,
    imageUrl: bookData.image_url || '',
    sellerId: bookData.seller_id,
    createdAt: bookData.created_at,
    sold: bookData.sold,
    grade: bookData.grade,
    frontCover: bookData.front_cover,
    backCover: bookData.back_cover,
    insidePages: bookData.inside_pages,
    universityYear: bookData.university_year,
    seller: bookData.profiles ? {
      id: bookData.profiles.id,
      name: bookData.profiles.name,
      email: bookData.profiles.email,
    } : undefined,
  };
};

export const mapBookToDatabase = (book: Partial<Book>) => {
  return {
    title: book.title,
    author: book.author,
    description: book.description,
    price: book.price,
    condition: book.condition,
    category: book.category,
    image_url: book.imageUrl,
    seller_id: book.sellerId,
    sold: book.sold,
    grade: book.grade,
    front_cover: book.frontCover,
    back_cover: book.backCover,
    inside_pages: book.insidePages,
    university_year: book.universityYear,
  };
};
