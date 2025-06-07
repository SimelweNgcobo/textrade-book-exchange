import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, CreditCard, Edit, Share2, User } from "lucide-react";
import { Book } from "@/types/book";
import { UserProfile } from "@/types/address";

interface BookActionsProps {
  book: Book;
  user: UserProfile | null;
  onBuyNow: () => void;
  onAddToCart: () => void;
  onEditBook: () => void;
  onShare: () => void;
  onViewSellerProfile: () => void;
}

const BookActions = ({
  book,
  user,
  onBuyNow,
  onAddToCart,
  onEditBook,
  onShare,
  onViewSellerProfile,
}: BookActionsProps) => {
  const isOwner = user?.id === book.seller?.id;
  const isSold = book.sold;

  return (
    <Card className="sticky top-4">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Price Section */}
          <div className="text-center p-4 bg-book-50 rounded-lg border">
            <div className="text-3xl font-bold text-book-600 mb-2">
              R{book.price?.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">Final Price</p>
          </div>

          {/* Action Buttons */}
          {isSold ? (
            <div className="text-center p-4 bg-gray-100 rounded-lg">
              <p className="text-gray-600 font-medium">
                This book has been sold
              </p>
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
            <div className="space-y-3">
              <Button
                onClick={onBuyNow}
                className="w-full bg-book-600 hover:bg-book-700"
                size="lg"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Buy Now
              </Button>
              <Button
                onClick={onAddToCart}
                variant="outline"
                className="w-full border-book-600 text-book-600 hover:bg-book-50"
                size="lg"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          )}

          {/* Secondary Actions */}
          <div className="pt-3 border-t border-gray-200 space-y-2">
            <Button
              onClick={onViewSellerProfile}
              variant="outline"
              className="w-full"
              size="sm"
            >
              <User className="mr-2 h-4 w-4" />
              View Profile
            </Button>
            <Button
              onClick={onShare}
              variant="outline"
              className="w-full"
              size="sm"
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share Book
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookActions;
