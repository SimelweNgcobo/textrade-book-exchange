
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription, 
} from '@/components/ui/dialog';
import { Share2, Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface ShareProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userName: string;
  isOwnProfile: boolean;
}

const ShareProfileDialog = ({ isOpen, onClose, userId, userName, isOwnProfile }: ShareProfileDialogProps) => {
  const profileUrl = `${window.location.origin}/user/${userId}`;
  
  const copyProfileLink = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success('Profile link copied to clipboard!');
  };

  const shareToSocial = (platform: string) => {
    const text = `Check out ${userName}'s textbook listings on ReBooked Solutions!`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(profileUrl)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + profileUrl)}`;
        break;
      default:
        return;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Share2 className="h-5 w-5 text-book-600 mr-2" />
            Share Profile
          </DialogTitle>
          <DialogDescription>
            Share {isOwnProfile ? 'your' : `${userName}'s`} profile with others
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Profile Link</Label>
            <div className="flex items-center space-x-2">
              <Input
                readOnly
                value={profileUrl}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={copyProfileLink}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium mb-2 block">Share on Social Media</Label>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => shareToSocial('twitter')}
                className="flex-1"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button
                variant="outline"
                onClick={() => shareToSocial('facebook')}
                className="flex-1"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button
                variant="outline"
                onClick={() => shareToSocial('whatsapp')}
                className="flex-1"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareProfileDialog;
