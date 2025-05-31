
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Mail, Calendar, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { getContactMessages, ContactMessage } from '@/services/contactService';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const AdminContactTab = () => {
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadContactMessages();
  }, []);

  const loadContactMessages = async () => {
    try {
      const data = await getContactMessages();
      setMessages(data);
    } catch (error) {
      console.error('Error loading contact messages:', error);
      toast.error('Failed to load contact messages');
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await (supabase as any)
        .from('contact_messages')
        .update({ status: 'read' })
        .eq('id', messageId);

      if (error) {
        console.error('Error marking message as read:', error);
        toast.error('Failed to mark message as read');
        return;
      }

      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, status: 'read' } : msg
      ));
      toast.success('Message marked as read');
    } catch (error) {
      console.error('Error in markAsRead:', error);
      toast.error('Failed to mark message as read');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg md:text-xl flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Contact Messages
        </CardTitle>
        <CardDescription className="text-sm">
          View and manage contact form submissions from users
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 md:p-6">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No contact messages yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs md:text-sm min-w-[100px]">Status</TableHead>
                  <TableHead className="text-xs md:text-sm min-w-[120px]">Name</TableHead>
                  <TableHead className="text-xs md:text-sm min-w-[150px]">Email</TableHead>
                  <TableHead className="text-xs md:text-sm min-w-[120px]">Subject</TableHead>
                  <TableHead className="text-xs md:text-sm min-w-[200px]">Message</TableHead>
                  <TableHead className="text-xs md:text-sm min-w-[120px]">Date</TableHead>
                  <TableHead className="text-xs md:text-sm min-w-[80px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message.id} className={message.status === 'unread' ? 'bg-blue-50' : ''}>
                    <TableCell>
                      <Badge variant={message.status === 'unread' ? 'default' : 'secondary'} className="text-xs">
                        {message.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs md:text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3" />
                        {message.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs md:text-sm">{message.email}</TableCell>
                    <TableCell className="text-xs md:text-sm">{message.subject}</TableCell>
                    <TableCell className="text-xs md:text-sm max-w-[200px]">
                      <div className="truncate" title={message.message}>
                        {message.message}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs md:text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(message.created_at!)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {message.status === 'unread' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => markAsRead(message.id!)}
                          className="h-6 w-6 p-0 md:h-7 md:w-auto md:px-2"
                        >
                          <span className="sr-only md:not-sr-only">Mark Read</span>
                          ✓
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminContactTab;
