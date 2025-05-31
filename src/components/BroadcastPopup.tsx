import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MessageSquare } from 'lucide-react';

interface BroadcastPopupProps {
  message: string;
  onClose: () => void;
  isOpen: boolean;
}

// Unicode-safe hash function
const createMessageHash = (message: string): string => {
  try {
    return btoa(encodeURIComponent(message)).substring(0, 10);
  } catch {
    let hash = 0;
    for (let i = 0; i < message.length; i++) {
      hash = ((hash << 5) - hash) + message.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(36).substring(0, 10);
  }
};

const BroadcastPopup = ({ message, onClose, isOpen }: BroadcastPopupProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const seenBroadcasts: string[] = JSON.parse(localStorage.getItem('seenBroadcasts') || '[]');
    const messageHash = createMessageHash(message);

    if (!seenBroadcasts.includes(messageHash)) {
      const updated = [...seenBroadcasts, messageHash];

      // Optional: Limit to last 50 to prevent unbounded growth
      const limited = updated.slice(-50);

      localStorage.setItem('seenBroadcasts', JSON.stringify(limited));
    }
  }, [isOpen, message]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-w-[95vw] mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-left">
            <MessageSquare className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
            <span className="break-words">Message from Rebooked Solutions Team</span>
          </DialogTitle>
          <DialogDescription className="text-left">
            You have received a new message from the Rebooked Solutions Team
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[60vh] overflow-y-auto">
          <p className="text-gray-700 break-words whitespace-pre-wrap leading-relaxed">{message}</p>
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BroadcastPopup;
