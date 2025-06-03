import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
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
import { CheckCircle, AlertCircle, Clock, Eye, X, Ban, UserX } from 'lucide-react';

interface Report {
  id: string;
  book_title: string;
  seller_name: string;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  created_at: string;
  reporter_user_id: string;
  reported_user_id: string;
  book_id?: string;
}

interface ReportActionsProps {
  report: Report;
  isSubmitting: boolean;
  onUpdateStatus: (reportId: string, status: 'resolved' | 'dismissed') => void;
  onUserAction: (userId: string, action: 'ban' | 'suspend', reason: string) => void;
}

const ReportActions = ({
  report,
  isSubmitting,
  onUpdateStatus,
  onUserAction,
}: ReportActionsProps) => {
  const [banReason, setBanReason] = useState('');
  const [suspendReason, setSuspendReason] = useState('');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'dismissed':
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'dismissed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (report.status !== 'pending') {
    return (
      <Badge className={getStatusColor(report.status)}>
        <span className="flex items-center gap-1 capitalize">
          {getStatusIcon(report.status)}
          {report.status}
        </span>
      </Badge>
    );
  }

  return (
    <ScrollArea className="w-full">
      <div className="flex gap-2 min-w-max">
        {/* View Report */}
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" title="View Report Details">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Report Details</DialogTitle>
              <DialogDescription>
                Review the report and take appropriate action
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <strong>Reported:</strong> {report.book_id ? report.book_title : report.seller_name}
              </div>
              <div>
                <strong>Reason:</strong> {report.reason}
              </div>
              <div>
                <strong>Date:</strong>{' '}
                {new Date(report.created_at).toLocaleString()}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Dismiss Report */}
        <Button
          size="sm"
          variant="outline"
          title="Dismiss this report"
          onClick={() => onUpdateStatus(report.id, 'dismissed')}
        >
          <X className="h-4 w-4 mr-1" />
          Dismiss
        </Button>

        {/* Ban User Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="destructive" title="Ban user">
              <Ban className="h-4 w-4 mr-1" />
              Ban
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ban User</DialogTitle>
              <DialogDescription>
                Provide a reason for banning this user. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Enter reason for banning..."
                value={banReason}
                onChange={(e) => setBanReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setBanReason('')}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={!banReason.trim() || isSubmitting}
                onClick={() => {
                  if (!banReason.trim()) return;
                  onUserAction(report.reported_user_id, 'ban', banReason);
                  setBanReason('');
                }}
              >
                {isSubmitting ? 'Banning...' : 'Ban User'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Suspend User Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="bg-orange-600 hover:bg-orange-700"
              title="Suspend user"
            >
              <UserX className="h-4 w-4 mr-1" />
              Suspend
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Suspend User</DialogTitle>
              <DialogDescription>
                Provide a reason for suspending this user. They can be reinstated later.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Enter reason for suspension..."
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSuspendReason('')}>
                Cancel
              </Button>
              <Button
                className="bg-orange-600 hover:bg-orange-700"
                disabled={!suspendReason.trim() || isSubmitting}
                onClick={() => {
                  if (!suspendReason.trim()) return;
                  onUserAction(report.reported_user_id, 'suspend', suspendReason);
                  setSuspendReason('');
                }}
              >
                {isSubmitting ? 'Suspending...' : 'Suspend User'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ReportActions;
