
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { ReportInsert } from '@/types/supabase-reports';

interface ReportBookDialogProps {
  bookId: string;
  bookTitle: string;
  sellerId: string;
  sellerName: string;
}

const ReportBookDialog = ({ bookId, bookTitle, sellerId, sellerName }: ReportBookDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!user) {
      toast.error('You must be logged in to report a listing');
      return;
    }

    if (!reason.trim()) {
      toast.error('Please provide a reason for reporting');
      return;
    }

    setIsSubmitting(true);
    try {
      const reportData: ReportInsert = {
        book_id: bookId,
        reporter_user_id: user.id,
        reported_user_id: sellerId,
        reason: reason.trim(),
        book_title: bookTitle,
        seller_name: sellerName,
        status: 'pending'
      };

      const { error } = await supabase
        .from('reports' as any)
        .insert(reportData);

      if (error) {
        console.error('Error submitting report:', error);
        toast.error('Failed to submit report');
        return;
      }

      toast.success('Report submitted successfully');
      setIsOpen(false);
      setReason('');
    } catch (error) {
      console.error('Error submitting report:', error);
      toast.error('Failed to submit report');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="lg"
          className="border-red-300 text-red-600 hover:bg-red-50 h-12"
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Report Listing</DialogTitle>
          <DialogDescription>
            Report "{bookTitle}" by {sellerName}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="reason">Reason for reporting</Label>
            <Textarea
              id="reason"
              placeholder="Please describe why you are reporting this listing..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !reason.trim()}
            className="bg-red-600 hover:bg-red-700"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportBookDialog;
