
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Share2, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface ShareProfileDialogProps {
  userId: string;
  userName: string;
  isOpen?: boolean;
  onClose?: () => void;
  isOwnProfile?: boolean;
}

const ShareProfileDialog = ({ 
  userId, 
  userName, 
  isOpen = false, 
  onClose,
  isOwnProfile = false 
}: ShareProfileDialogProps) => {
  const [copied, setCopied] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(isOpen);

  const profileUrl = `${window.location.origin}/user/${userId}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      toast.success('Profile link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      toast.error('Failed to copy link');
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open && onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Share2 className="mr-2 h-5 w-5" />
            Share {isOwnProfile ? 'Your' : `${userName}'s`} Profile
          </DialogTitle>
          <DialogDescription>
            Share this profile link with others to let them see 
            {isOwnProfile ? ' your' : ` ${userName}'s`} book listings.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profile-url">Profile URL</Label>
            <div className="flex space-x-2">
              <Input
                id="profile-url"
                value={profileUrl}
                readOnly
                className="flex-1"
              />
              <Button
                size="sm"
                onClick={handleCopy}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareProfileDialog;
