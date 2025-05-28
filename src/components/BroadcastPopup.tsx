
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

const BroadcastPopup = ({ message, onClose, isOpen }: BroadcastPopupProps) => {
  const handleClose = () => {
    // Mark this broadcast as seen
    const seenBroadcasts = JSON.parse(localStorage.getItem('seenBroadcasts') || '[]');
    const messageHash = btoa(message).substring(0, 10); // Create a simple hash
    seenBroadcasts.push(messageHash);
    localStorage.setItem('seenBroadcasts', JSON.stringify(seenBroadcasts));
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-blue-600" />
            Message from Admin
          </DialogTitle>
          <DialogDescription>
            You have received a new broadcast message
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-gray-700">{message}</p>
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
