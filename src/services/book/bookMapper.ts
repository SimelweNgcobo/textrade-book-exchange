
import { Book } from '@/types/book';

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
