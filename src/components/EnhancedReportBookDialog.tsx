
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Flag, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface EnhancedReportBookDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: string;
  bookTitle: string;
  sellerId?: string;
  sellerName?: string;
}

const EnhancedReportBookDialog = ({ 
  isOpen, 
  onClose, 
  bookId, 
  bookTitle, 
  sellerId, 
  sellerName 
}: EnhancedReportBookDialogProps) => {
  const { user } = useAuth();
  const [reason, setReason] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reportReasons = [
    {
      value: 'misleading_info',
      label: 'Misleading Information',
      description: 'Incorrect book details, condition, or pricing'
    },
    {
      value: 'inappropriate_content',
      label: 'Inappropriate Content',
      description: 'Offensive images or descriptions'
    },
    {
      value: 'suspected_fraud',
      label: 'Suspected Fraud',
      description: 'Suspicious seller behavior or fake listing'
    },
    {
      value: 'copyright_violation',
      label: 'Copyright Violation',
      description: 'Unauthorized copies or pirated materials'
    },
    {
      value: 'duplicate_listing',
      label: 'Duplicate Listing',
      description: 'Same book listed multiple times'
    },
    {
      value: 'seller_issue',
      label: 'Seller Communication Issue',
      description: 'Unresponsive or unprofessional seller'
    },
    {
      value: 'other',
      label: 'Other',
      description: 'Please specify in the description below'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be logged in to report a book');
      return;
    }

    if (!reason) {
      toast.error('Please select a reason for reporting');
      return;
    }

    if (!description.trim()) {
      toast.error('Please provide a description of the issue');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('reports')
        .insert({
          book_id: bookId,
          book_title: bookTitle,
          reported_user_id: sellerId || '',
          seller_name: sellerName || 'Unknown',
          reporter_user_id: user.id,
          reason: reason,
          status: 'pending'
        });

      if (error) {
        console.error('Error submitting report:', error);
        toast.error('Failed to submit report. Please try again.');
        return;
      }

      toast.success('Report submitted successfully. Our team will review it shortly.');
      onClose();
      setReason('');
      setDescription('');
    } catch (error) {
      console.error('Error submitting report:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedReasonInfo = reportReasons.find(r => r.value === reason);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Flag className="h-5 w-5" />
            Report Book Issue
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Book Info */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-sm mb-1">Reporting:</h4>
            <p className="text-sm text-gray-700">{bookTitle}</p>
            {sellerName && (
              <p className="text-xs text-gray-500 mt-1">Seller: {sellerName}</p>
            )}
          </div>

          {/* Reason Selection */}
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-sm font-medium">
              Reason for Report <span className="text-red-500">*</span>
            </Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {reportReasons.map((reasonOption) => (
                  <SelectItem key={reasonOption.value} value={reasonOption.value}>
                    <div className="flex flex-col">
                      <span className="font-medium">{reasonOption.label}</span>
                      <span className="text-xs text-gray-500">{reasonOption.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedReasonInfo && (
              <p className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
                {selectedReasonInfo.description}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide specific details about the issue..."
              className="min-h-[100px] text-sm"
              maxLength={500}
            />
            <p className="text-xs text-gray-500 text-right">
              {description.length}/500 characters
            </p>
          </div>

          {/* Warning Notice */}
          <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-yellow-800">
              <p className="font-medium mb-1">Important:</p>
              <p>False reports may result in account restrictions. Please only report genuine issues.</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700"
              disabled={isSubmitting || !reason || !description.trim()}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Submit Report
                </div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EnhancedReportBookDialog;
