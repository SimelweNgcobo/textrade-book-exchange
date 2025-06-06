
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send } from 'lucide-react';

interface AdminBroadcastTabProps {
  onSendBroadcast: (message: string, title?: string) => Promise<void>;
}

const AdminBroadcastTab = ({ onSendBroadcast }: AdminBroadcastTabProps) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSendBroadcast(message, title || undefined);
      setTitle('');
      setMessage('');
    } catch (error) {
      console.error('Error sending broadcast:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Send Broadcast Message
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title (Optional)</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Announcement"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your broadcast message..."
              className="min-h-[120px]"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting || !message.trim()}
            className="w-full bg-book-600 hover:bg-book-700"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Broadcast to All Users
              </>
            )}
          </Button>
        </form>
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Broadcast Information</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Messages will be shown to all users when they visit the site</li>
            <li>• Users can dismiss messages, and they won't see them again</li>
            <li>• Messages are stored in the database for future reference</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminBroadcastTab;
