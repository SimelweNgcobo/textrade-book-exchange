
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, CreditCard, Edit, Share2, MessageCircle } from 'lucide-react';
import { Book } from '@/types/book';

interface BookActionsProps {
  book: Book;
  user: any;
  onBuyNow: () => void;
  onAddToCart: () => void;
  onEditBook: () => void;
  onShare: () => void;
  onContactSeller: () => void;
}

const BookActions = ({ book, user, onBuyNow, onAddToCart, onEditBook, onShare, onContactSeller }: BookActionsProps) => {
  const isOwner = user?.id === book.seller?.id;
  const isSold = book.sold;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="text-center">
            <span className="text-3xl font-bold text-book-600">R{book.price?.toLocaleString()}</span>
          </div>
          
          {isSold ? (
            <div className="text-center p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-600 font-medium">This book has been sold</p>
            </div>
          ) : isOwner ? (
            <Button
              onClick={onEditBook}
              className="w-full bg-book-600 hover:bg-book-700"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Book
            </Button>
          ) : (
            <div className="space-y-2">
              <Button
                onClick={onBuyNow}
                className="w-full bg-book-600 hover:bg-book-700"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Buy Now
              </Button>
              <Button
                onClick={onAddToCart}
                variant="outline"
                className="w-full border-book-600 text-book-600 hover:bg-book-50"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <div className="flex gap-2">
                <Button
                  onClick={onContactSeller}
                  variant="outline"
                  className="flex-1"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact Seller
                </Button>
                <Button
                  onClick={onShare}
                  variant="outline"
                  className="flex-1"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookActions;
