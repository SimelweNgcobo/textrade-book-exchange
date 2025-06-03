
import BookImageCarousel from '@/components/BookImageCarousel';
import { Book } from '@/types/book';

interface BookImageSectionProps {
  book: Book;
}

const BookImageSection = ({ book }: BookImageSectionProps) => {
  const images = [book.frontCover, book.backCover, book.insidePages, book.imageUrl]
    .filter(Boolean) as string[];

  return (
    <div className="space-y-4">
      <BookImageCarousel images={images} />
    </div>
  );
};

export default BookImageSection;
