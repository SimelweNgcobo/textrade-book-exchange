
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Flag } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface ReportBookDialogProps {
  bookId: string;
  bookTitle: string;
  sellerId: string;
  sellerName: string;
}

const ReportBookDialog = ({ bookId, bookTitle, sellerId, sellerName }: ReportBookDialogProps) => {
  const [open, setOpen] = useState(false);
  const [reportType, setReportType] = useState<'listing' | 'user'>('listing');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!reason.trim()) {
      toast.error('Please provide a reason for the report');
      return;
    }

    if (!user) {
      toast.error('You must be logged in to report');
      return;
    }

    setIsSubmitting(true);
    try {
      // For now, just show success message - actual reporting will be implemented with database
      toast.success('Report submitted successfully');
      setOpen(false);
      setReason('');
      setReportType('listing');
    } catch (error) {
      console.error('Error submitting report:', error);
      toast.error('Failed to submit report');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="text-red-600 hover:text-red-700 border-red-200">
          <Flag className="h-4 w-4 mr-2" />
          Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Report Issue</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-base font-medium">What would you like to report?</Label>
            <RadioGroup value={reportType} onValueChange={(value: 'listing' | 'user') => setReportType(value)} className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="listing" id="listing" />
                <Label htmlFor="listing">This listing: "{bookTitle}"</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="user" id="user" />
                <Label htmlFor="user">User: {sellerName}</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div>
            <Label htmlFor="reason">Reason for report</Label>
            <Textarea
              id="reason"
              placeholder="Please describe the issue..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-1 min-h-[100px]"
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Report'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportBookDialog;
