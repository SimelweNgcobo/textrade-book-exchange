
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Share2, 
  Camera, 
  DollarSign, 
  Clock, 
  Tag, 
  Users, 
  BookOpen,
  TrendingUp,
  MessageCircle,
  Star
} from 'lucide-react';
import { toast } from 'sonner';

interface BookNotSellingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookTitle: string;
  bookPrice: number;
  daysListed: number;
}

const BookNotSellingModal = ({ isOpen, onClose, bookTitle, bookPrice, daysListed }: BookNotSellingModalProps) => {
  const [selectedTip, setSelectedTip] = useState<string | null>(null);

  const tips = [
    {
      id: 'pricing',
      icon: DollarSign,
      title: 'Check Your Pricing',
      description: 'Research similar books to ensure competitive pricing',
      action: 'Compare prices on other platforms',
      badge: 'High Impact'
    },
    {
      id: 'photos',
      icon: Camera,
      title: 'Improve Your Photos',
      description: 'Clear, well-lit photos increase buyer confidence',
      action: 'Take new photos in good lighting',
      badge: 'Quick Fix'
    },
    {
      id: 'description',
      icon: BookOpen,
      title: 'Enhance Description',
      description: 'Detailed condition notes help buyers make decisions',
      action: 'Add more detail about condition',
      badge: 'Easy'
    },
    {
      id: 'timing',
      icon: Clock,
      title: 'Consider Timing',
      description: 'List closer to semester start for better visibility',
      action: 'Relist during peak season',
      badge: 'Seasonal'
    },
    {
      id: 'promotion',
      icon: TrendingUp,
      title: 'Promote Your Listing',
      description: 'Share on social media and with classmates',
      action: 'Share your profile link',
      badge: 'Free'
    },
    {
      id: 'bundle',
      icon: Tag,
      title: 'Create Bundles',
      description: 'Group related books for better deals',
      action: 'List complementary books together',
      badge: 'Strategy'
    }
  ];

  const shareTemplates = [
    {
      platform: 'WhatsApp',
      template: `📚 Selling: ${bookTitle}\n💰 Price: R${bookPrice}\n📍 Available for pickup\n\nCheck out my ReBooked profile for more books!`
    },
    {
      platform: 'Facebook',
      template: `Looking to sell my copy of "${bookTitle}" for R${bookPrice}. Great condition and ready for pickup! Check out my other books on ReBooked.`
    },
    {
      platform: 'Instagram Story',
      template: `📖 Book for sale: ${bookTitle}\n💸 R${bookPrice}\nDM me if interested! #textbooks #student #books`
    }
  ];

  const handleShareTemplate = (template: string) => {
    navigator.clipboard.writeText(template);
    toast.success('Template copied to clipboard!');
  };

  const handleProfileShare = () => {
    const profileUrl = `${window.location.origin}/profile`;
    navigator.clipboard.writeText(profileUrl);
    toast.success('Profile link copied! Share it with friends and classmates.');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <MessageCircle className="h-5 w-5 text-book-600" />
            Book Not Selling? Here's How to Help!
          </DialogTitle>
          <p className="text-gray-600">
            Your book "{bookTitle}" has been listed for {daysListed} days. Here are some proven strategies to increase sales.
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-book-50 rounded-lg">
              <div className="font-semibold text-book-800">{daysListed}</div>
              <div className="text-xs text-gray-600">Days Listed</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="font-semibold text-green-800">R{bookPrice}</div>
              <div className="text-xs text-gray-600">Your Price</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="font-semibold text-blue-800">0</div>
              <div className="text-xs text-gray-600">Views Today</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="font-semibold text-purple-800">0</div>
              <div className="text-xs text-gray-600">Inquiries</div>
            </div>
          </div>

          {/* Improvement Tips */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              Proven Tips to Increase Sales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tips.map((tip) => {
                const Icon = tip.icon;
                return (
                  <Card 
                    key={tip.id} 
                    className={`cursor-pointer transition-all ${
                      selectedTip === tip.id ? 'ring-2 ring-book-600 bg-book-50' : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedTip(selectedTip === tip.id ? null : tip.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-book-100 rounded-lg">
                          <Icon className="h-4 w-4 text-book-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm">{tip.title}</h4>
                            <Badge variant="secondary" className="text-xs">{tip.badge}</Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{tip.description}</p>
                          {selectedTip === tip.id && (
                            <div className="mt-2 p-2 bg-white rounded border">
                              <p className="text-xs font-medium text-book-700">Action: {tip.action}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Share Templates */}
          <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Share2 className="h-4 w-4 text-green-500" />
              Ready-to-Use Share Templates
            </h3>
            <div className="space-y-3">
              {shareTemplates.map((template, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{template.platform}</h4>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleShareTemplate(template.template)}
                      className="text-xs"
                    >
                      Copy Template
                    </Button>
                  </div>
                  <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                    {template.template}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button
              onClick={handleProfileShare}
              className="flex items-center gap-2 bg-book-600 hover:bg-book-700"
            >
              <Users className="h-4 w-4" />
              Share My Profile
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex items-center gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Back to Listings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookNotSellingModal;
