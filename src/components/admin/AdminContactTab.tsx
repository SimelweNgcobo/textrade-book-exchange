
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Mail, Eye, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { getAllContactMessages, markMessageAsRead, ContactMessage } from '@/services/contactService';
import { useIsMobile } from '@/hooks/use-mobile';

const AdminContactTab = () => {
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      const data = await getAllContactMessages();
      setMessages(data);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error('Failed to load contact messages');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (messageId: string) => {
    try {
      await markMessageAsRead(messageId);
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, status: 'read' } : msg
      ));
      toast.success('Message marked as read');
    } catch (error) {
      console.error('Error marking message as read:', error);
      toast.error('Failed to mark message as read');
    }
  };

  const truncateMessage = (message: string, maxLength: number = 100) => {
    if (message.length <= maxLength) return message;
    return message.substring(0, maxLength) + '...';
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-blue-600" />
          <CardTitle>Contact Messages</CardTitle>
        </div>
        <CardDescription>
          Manage and respond to user inquiries
        </CardDescription>
      </CardHeader>
      <CardContent>
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No contact messages yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs md:text-sm">Status</TableHead>
                  <TableHead className="text-xs md:text-sm">Name</TableHead>
                  <TableHead className="text-xs md:text-sm">Email</TableHead>
                  <TableHead className="text-xs md:text-sm">Subject</TableHead>
                  <TableHead className="text-xs md:text-sm">Preview</TableHead>
                  <TableHead className="text-xs md:text-sm">Date</TableHead>
                  <TableHead className="text-xs md:text-sm text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow key={message.id}>
                    <TableCell>
                      <Badge variant={message.status === 'unread' ? 'destructive' : 'secondary'}>
                        {message.status === 'unread' ? (
                          <Clock className="h-3 w-3 mr-1" />
                        ) : (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        )}
                        {message.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs md:text-sm font-medium">
                      {message.name}
                    </TableCell>
                    <TableCell className="text-xs md:text-sm">
                      <div className="max-w-[150px] truncate">
                        {message.email}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs md:text-sm">
                      <div className="max-w-[200px] truncate">
                        {message.subject}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs md:text-sm">
                      <div className="max-w-[200px] break-words">
                        {truncateMessage(message.message)}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs md:text-sm">
                      {new Date(message.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedMessage(message)}
                            >
                              <Eye className="h-4 w-4" />
                              {!isMobile && <span className="ml-1">View</span>}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Contact Message Details</DialogTitle>
                              <DialogDescription>
                                From {message.name} ({message.email})
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <strong>Subject:</strong> {message.subject}
                              </div>
                              <div>
                                <strong>Date:</strong> {new Date(message.created_at).toLocaleString()}
                              </div>
                              <div>
                                <strong>Message:</strong>
                                <ScrollArea className="h-40 w-full border rounded p-3 mt-2">
                                  <div className="whitespace-pre-wrap break-words">
                                    {message.message}
                                  </div>
                                </ScrollArea>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        {message.status === 'unread' && (
                          <Button
                            size="sm"
                            onClick={() => handleMarkAsRead(message.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                            {!isMobile && <span className="ml-1">Mark Read</span>}
                          </Button>
                        )}
                      </div>
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
