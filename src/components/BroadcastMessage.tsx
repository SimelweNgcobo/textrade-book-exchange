
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
import { X, MessageSquare } from 'lucide-react';
import { getActiveBroadcastMessages, BroadcastMessage as BroadcastMessageType } from '@/services/broadcastService';

const BroadcastMessage = () => {
  const [messages, setMessages] = useState<BroadcastMessageType[]>([]);
  const [currentMessage, setCurrentMessage] = useState<BroadcastMessageType | null>(null);
  const [dismissedMessages, setDismissedMessages] = useState<string[]>([]);

  useEffect(() => {
    loadBroadcastMessages();
    // Load dismissed messages from localStorage
    const dismissed = JSON.parse(localStorage.getItem('dismissedBroadcasts') || '[]');
    setDismissedMessages(dismissed);
  }, []);

  useEffect(() => {
    // Show the first undismissed message
    const undismissedMessage = messages.find(msg => !dismissedMessages.includes(msg.id));
    if (undismissedMessage && !currentMessage) {
      setCurrentMessage(undismissedMessage);
    }
  }, [messages, dismissedMessages, currentMessage]);

  const loadBroadcastMessages = async () => {
    try {
      const broadcastMessages = await getActiveBroadcastMessages();
      setMessages(broadcastMessages);
    } catch (error) {
      console.error('Error loading broadcast messages:', error);
    }
  };

  const handleDismiss = () => {
    if (currentMessage) {
      const newDismissed = [...dismissedMessages, currentMessage.id];
      setDismissedMessages(newDismissed);
      localStorage.setItem('dismissedBroadcasts', JSON.stringify(newDismissed));
      setCurrentMessage(null);
      
      // Check for next message
      const nextMessage = messages.find(msg => !newDismissed.includes(msg.id));
      if (nextMessage) {
        setTimeout(() => setCurrentMessage(nextMessage), 500);
      }
    }
  };

  if (!currentMessage) return null;

  return (
    <Dialog open={!!currentMessage} onOpenChange={() => handleDismiss()}>
      <DialogContent className="sm:max-w-md max-w-[95vw] mx-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center text-left">
              <MessageSquare className="h-5 w-5 mr-2 text-book-600 flex-shrink-0" />
              <span className="break-words">{currentMessage.title}</span>
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-left">
            Message from ReBooked Solutions Team
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[60vh] overflow-y-auto">
          <p className="text-gray-700 break-words whitespace-pre-wrap leading-relaxed">
            {currentMessage.message}
          </p>
        </div>
        <DialogFooter>
          <Button onClick={handleDismiss} className="w-full bg-book-600 hover:bg-book-700">
            Got it
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BroadcastMessage;
