
import BookImageCarousel from '@/components/BookImageCarousel';

interface BookImageSectionProps {
  images: string[];
}

const BookImageSection = ({ images }: BookImageSectionProps) => {
  return (
    <div className="space-y-4">
      <BookImageCarousel images={images} />
    </div>
  );
};

export default BookImageSection;
