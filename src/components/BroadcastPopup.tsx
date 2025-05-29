
import { useState, useEffect } from 'react';
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
    // Use encodeURIComponent to handle Unicode characters, then btoa
    return btoa(encodeURIComponent(message)).substring(0, 10);
  } catch (error) {
    // Fallback: create a simple hash from character codes
    let hash = 0;
    for (let i = 0; i < message.length; i++) {
      const char = message.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36).substring(0, 10);
  }
};

const BroadcastPopup = ({ message, onClose, isOpen }: BroadcastPopupProps) => {
  const handleClose = () => {
    // Mark this broadcast as seen
    const seenBroadcasts = JSON.parse(localStorage.getItem('seenBroadcasts') || '[]');
    const messageHash = createMessageHash(message);
    seenBroadcasts.push(messageHash);
    localStorage.setItem('seenBroadcasts', JSON.stringify(seenBroadcasts));
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
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
          <Button onClick={handleClose} className="w-full">
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BroadcastPopup;
