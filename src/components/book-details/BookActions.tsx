
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Book } from '@/types/book';
import ReportBookDialog from '@/components/ReportBookDialog';

interface BookActionsProps {
  book: Book;
  currentUserId?: string;
  onBuyNow: () => void;
  onAddToCart: () => void;
  onEditBook: () => void;
}

const BookActions = ({ 
  book, 
  currentUserId, 
  onBuyNow, 
  onAddToCart, 
  onEditBook 
}: BookActionsProps) => {
  const isOwnBook = currentUserId === book.seller?.id;
  const canBuyOrCart = !book.sold && !isOwnBook;

  return (
    <div className="space-y-3">
      {canBuyOrCart && (
        <>
          <Button
            onClick={onBuyNow}
            className="w-full bg-book-600 hover:bg-book-700 text-base md:text-lg py-3"
            size="lg"
          >
            Buy Now
          </Button>
          <Button
            onClick={onAddToCart}
            variant="outline"
            className="w-full text-base md:text-lg py-3"
            size="lg"
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </>
      )}
      
      {book.sold && (
        <Button disabled className="w-full text-base md:text-lg py-3" size="lg">
          Sold Out
        </Button>
      )}

      {isOwnBook && (
        <Button
          onClick={onEditBook}
          variant="outline"
          className="w-full text-base md:text-lg py-3"
          size="lg"
        >
          Edit Book
        </Button>
      )}

      <div className="flex gap-3">
        <ReportBookDialog
          bookId={book.id}
          bookTitle={book.title}
          sellerId={book.seller?.id || ''}
          sellerName={book.seller?.name || 'Unknown'}
        />
      </div>
    </div>
  );
};

export default BookActions;
