
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown, Copy, Share2, Camera, DollarSign, MapPin, MessageSquare, Facebook } from 'lucide-react';
import { toast } from 'sonner';

interface BookNotSellingHelpProps {
  bookId?: string;
  bookTitle?: string;
}

const BookNotSellingHelp = ({ bookId, bookTitle }: BookNotSellingHelpProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const copyListingLink = () => {
    if (bookId) {
      const listingUrl = `${window.location.origin}/books/${bookId}`;
      navigator.clipboard.writeText(listingUrl);
      toast.success('Listing link copied to clipboard!');
    } else {
      toast.error('No book ID available');
    }
  };

  const shareToWhatsApp = () => {
    if (bookId && bookTitle) {
      const listingUrl = `${window.location.origin}/books/${bookId}`;
      const text = `Check out this textbook "${bookTitle}" on Rebooked Solutions!`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + listingUrl)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const shareToFacebook = () => {
    if (bookId) {
      const listingUrl = `${window.location.origin}/books/${bookId}`;
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(listingUrl)}`;
      window.open(facebookUrl, '_blank', 'width=600,height=400');
    }
  };

  const tips = [
    {
      icon: <Share2 className="h-5 w-5 text-book-600 flex-shrink-0" />,
      title: "Share your listing link",
      description: "Post on social media, share with classmates, or send to study groups",
      action: "Copy Link",
      onClick: copyListingLink
    },
    {
      icon: <Camera className="h-5 w-5 text-book-600 flex-shrink-0" />,
      title: "Improve your photos",
      description: "Use clear, well-lit images showing the book's cover, back, and any important pages",
      action: null
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-book-600 flex-shrink-0" />,
      title: "Add detailed description",
      description: "Be honest about condition, mention highlights, notes, or any missing pages",
      action: null
    },
    {
      icon: <DollarSign className="h-5 w-5 text-book-600 flex-shrink-0" />,
      title: "Check your pricing",
      description: "Compare with similar listings to ensure competitive pricing",
      action: null
    },
    {
      icon: <MapPin className="h-5 w-5 text-book-600 flex-shrink-0" />,
      title: "Verify pickup location",
      description: "Make sure your pickup address is accurate and easy to find",
      action: null
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="border-book-600 text-book-600 hover:bg-book-50 rounded-xl w-full sm:w-auto px-3 py-2 text-xs sm:text-sm flex items-center justify-center"
        >
          <TrendingDown className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
          <span className="truncate">Book not selling? Here's what to do</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center text-book-600">
            <TrendingDown className="mr-2 h-6 w-6" />
            Boost Your Book Sales
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-gray-600">
            Here are some proven tips to help your book sell faster:
          </p>

          <div className="grid gap-4">
            {tips.map((tip, index) => (
              <Card key={index} className="border-l-4 border-l-book-500">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      {tip.icon}
                      <div className="min-w-0 flex-1">
                        <h4 className="font-medium">{tip.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{tip.description}</p>
                      </div>
                    </div>
                    {tip.action && tip.onClick && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={tip.onClick}
                        className="border-book-600 text-book-600 hover:bg-book-50 flex-shrink-0"
                      >
                        {tip.action}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {bookId && (
            <Card className="bg-book-50 border-book-200">
              <CardHeader>
                <CardTitle className="text-book-800 text-lg">Share Your Listing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    onClick={copyListingLink} 
                    variant="outline" 
                    size="sm"
                    className="border-book-600 text-book-600 hover:bg-book-100"
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                  </Button>
                  <Button 
                    onClick={shareToWhatsApp} 
                    variant="outline" 
                    size="sm" 
                    className="bg-green-500 text-white border-green-500 hover:bg-green-600"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    WhatsApp
                  </Button>
                  <Button 
                    onClick={shareToFacebook} 
                    variant="outline" 
                    size="sm" 
                    className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                  >
                    <Facebook className="mr-2 h-4 w-4" />
                    Facebook
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookNotSellingHelp;
