
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { HelpCircle, Share2, DollarSign, Camera, Star } from 'lucide-react';

interface BookNotSellingHelpProps {
  bookId?: string;
  bookTitle?: string;
}

const BookNotSellingHelp = ({ bookId, bookTitle }: BookNotSellingHelpProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const tips = [
    {
      icon: <Camera className="h-5 w-5 text-blue-500" />,
      title: "Improve Your Photos",
      description: "Take clear, well-lit photos from multiple angles. Show the front cover, back cover, and any important pages or condition details."
    },
    {
      icon: <DollarSign className="h-5 w-5 text-green-500" />,
      title: "Adjust Your Price",
      description: "Check similar books on the platform and consider lowering your price slightly to be more competitive."
    },
    {
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      title: "Add More Details",
      description: "Include information about the book's condition, edition, and any included materials (CDs, access codes, etc.)."
    },
    {
      icon: <Share2 className="h-5 w-5 text-purple-500" />,
      title: "Share Your Listing",
      description: "Share your book listing on social media, university groups, or with classmates who might need the book."
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full text-book-600 border-book-600 hover:bg-book-50"
        >
          <HelpCircle className="h-4 w-4 mr-2" />
          Book not selling? Here's what to do
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <HelpCircle className="h-5 w-5 mr-2 text-book-600" />
            Tips to Sell Your Book Faster
          </DialogTitle>
          <DialogDescription>
            Here are some proven strategies to help your book sell quickly
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0 mt-0.5">
                {tip.icon}
              </div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm">{tip.title}</h4>
                <p className="text-gray-600 text-xs mt-1">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-3 bg-book-50 rounded-lg">
          <p className="text-xs text-book-700 text-center">
            💡 <strong>Pro tip:</strong> Books with multiple clear photos and detailed descriptions sell 3x faster!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookNotSellingHelp;
