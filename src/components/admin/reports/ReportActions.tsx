import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  X,
  Ban,
  UserX,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Report {
  id: string;
  book_title: string;
  seller_name: string;
  reason: string;
  status: "pending" | "resolved" | "dismissed";
  created_at: string;
  reporter_user_id: string;
  reported_user_id: string;
  book_id?: string;
}

interface ReportActionsProps {
  report: Report;
  actionReason: string;
  setActionReason: (reason: string) => void;
  isSubmitting: boolean;
  onUpdateStatus: (reportId: string, status: "resolved" | "dismissed") => void;
  onUserAction: (
    userId: string,
    action: "ban" | "suspend",
    reason: string,
  ) => void;
}

const ReportActions = ({
  report,
  actionReason,
  setActionReason,
  isSubmitting,
  onUpdateStatus,
  onUserAction,
}: ReportActionsProps) => {
  const isMobile = useIsMobile();
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "dismissed":
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800";
      case "dismissed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  if (report.status !== "pending") {
    return (
      <Badge className={getStatusColor(report.status)}>
        <span className="flex items-center gap-1">
          {getStatusIcon(report.status)}
          {report.status}
        </span>
      </Badge>
    );
  }

  return (
    <ScrollArea className="w-full">
      <div className="flex gap-2 min-w-max">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
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
                <strong>Reported:</strong>{" "}
                {report.book_id ? report.book_title : report.seller_name}
              </div>
              <div>
                <strong>Reason:</strong> {report.reason}
              </div>
              <div>
                <strong>Date:</strong>{" "}
                {new Date(report.created_at).toLocaleString()}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          size="sm"
          variant="outline"
          onClick={() => onUpdateStatus(report.id, "dismissed")}
        >
          <X className="h-4 w-4 mr-1" />
          Dismiss
        </Button>

        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="destructive">
              <Ban className="h-4 w-4 mr-1" />
              Ban
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ban User</DialogTitle>
              <DialogDescription>
                Provide a reason for banning this user. This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Enter reason for banning..."
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setActionReason("")}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={!actionReason.trim() || isSubmitting}
                onClick={() =>
                  onUserAction(report.reported_user_id, "ban", actionReason)
                }
              >
                {isSubmitting ? "Banning..." : "Ban User"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
              <UserX className="h-4 w-4 mr-1" />
              Suspend
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Suspend User</DialogTitle>
              <DialogDescription>
                Provide a reason for suspending this user. They can be
                reinstated later.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Enter reason for suspension..."
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setActionReason("")}>
                Cancel
              </Button>
              <Button
                className="bg-orange-600 hover:bg-orange-700"
                disabled={!actionReason.trim() || isSubmitting}
                onClick={() =>
                  onUserAction(report.reported_user_id, "suspend", actionReason)
                }
              >
                {isSubmitting ? "Suspending..." : "Suspend User"}
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
