import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { submitReport } from '@/services/reportService';
import { toast } from 'sonner';

interface ReportBookDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: string;
  bookTitle: string;
  sellerId?: string;
  sellerName?: string;
}

const categories = [
  { value: 'inappropriate-content', label: 'Inappropriate Content' },
  { value: 'misleading-info', label: 'Misleading Information' },
  { value: 'counterfeit', label: 'Counterfeit/Fake Book' },
  { value: 'overpriced', label: 'Unreasonably Overpriced' },
  { value: 'duplicate', label: 'Duplicate Listing' },
  { value: 'spam', label: 'Spam' },
  { value: 'other', label: 'Other' },
] as const;

const ReportBookDialog = ({
  isOpen,
  onClose,
  bookId,
  bookTitle,
  sellerId,
  sellerName,
}: ReportBookDialogProps) => {
  const { user } = useAuth();
  const [reason, setReason] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user) return toast.error('You must be logged in to report a listing');
    if (!category || !reason.trim()) return toast.error('Please select a category and provide a reason');
    if (!sellerId || !sellerName) return toast.error('Seller information not available');

    setIsSubmitting(true);
    try {
      await submitReport({
        reportedUserId: sellerId,
        reporterUserId: user.id,
        bookId,
        bookTitle,
        sellerName,
        reason: `${category}: ${reason.trim()}`,
      });

      toast.success('Report submitted successfully');
      onClose();
      setReason('');
      setCategory('');
    } catch (error) {
      console.error('Error submitting report:', error);
      toast.error('Failed to submit report');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report Book Listing</DialogTitle>
          <DialogDescription>
            Help us maintain a safe marketplace by reporting inappropriate content or suspicious activity.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Book Title</Label>
            <p className="text-sm text-gray-600">{bookTitle}</p>
          </div>

          <div>
            <Label>Seller</Label>
            <p className="text-sm text-gray-600">{sellerName || 'Unknown'}</p>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category" aria-label="Report Category">
                <SelectValue placeholder="Select a reason category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="reason">Additional Details</Label>
            <Textarea
              id="reason"
              aria-label="Additional Details"
              placeholder="Please provide specific details about why you're reporting this listing..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!category || !reason.trim() || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportBookDialog;
