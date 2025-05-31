
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';
import { Book } from '@/types/book';

interface SellerInfoProps {
  book: Book;
  onViewSellerProfile: () => void;
}

const SellerInfo = ({ book, onViewSellerProfile }: SellerInfoProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Seller: {book.seller?.name || 'Anonymous'}</p>
            <p className="text-sm text-gray-600">
              Member since {new Date().getFullYear()}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onViewSellerProfile}
            className="flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            View Profile
          </Button>
        </div>
        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800 font-medium">
            Like what you see? Check their profile for more books like this.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SellerInfo;
