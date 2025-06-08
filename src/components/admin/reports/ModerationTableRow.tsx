import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flag, UserX, Copy } from "lucide-react";
import ReportActions from "./ReportActions";
import { copyEmailToClipboard } from "@/utils/emailCopyUtils";

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
  reporter_email?: string;
  reporter_name?: string;
}

interface SuspendedUser {
  id: string;
  name: string;
  email: string;
  status: string;
  suspended_at: string;
  suspension_reason: string;
}

interface ModerationTableRowProps {
  item: Report | SuspendedUser;
  activeTab: "pending" | "resolved" | "dismissed" | "suspended" | "all";
  reports: Report[];
  actionReason: string;
  setActionReason: (reason: string) => void;
  isSubmitting: boolean;
  onUpdateStatus: (reportId: string, status: "resolved" | "dismissed") => void;
  onUserAction: (
    userId: string,
    action: "ban" | "suspend",
    reason: string,
  ) => void;
  onUnsuspendUser: (userId: string) => void;
  getSeverityColor: (reportCount: number) => string;
  getSeverityText: (reportCount: number) => string;
}

export const ModerationTableRow = ({
  item,
  activeTab,
  reports,
  actionReason,
  setActionReason,
  isSubmitting,
  onUpdateStatus,
  onUserAction,
  onUnsuspendUser,
  getSeverityColor,
  getSeverityText,
}: ModerationTableRowProps) => {
  if (activeTab === "suspended") {
    const user = item as SuspendedUser;

    const handleCopyEmail = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      copyEmailToClipboard(user.email);
    };

    const handleUnsuspend = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onUnsuspendUser(user.id);
    };

    return (
      <TableRow key={user.id} className="hover:bg-gray-50">
        <TableCell>
          <div className="flex items-center gap-2 text-orange-600">
            <UserX className="h-4 w-4" />
            <span className="font-medium">
              {user.status === "banned" ? "Banned" : "Suspended"}
            </span>
          </div>
        </TableCell>
        <TableCell className="font-medium">
          <div className="flex items-center gap-2">
            <div className="max-w-[150px]">
              <div className="truncate font-medium">{user.name}</div>
              <div className="text-xs text-gray-500 truncate">{user.email}</div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopyEmail}
              className="h-6 w-6 p-0 flex-shrink-0"
              title="Copy Email Address"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </TableCell>
        <TableCell>
          <div className="max-w-[200px]">
            <div className="truncate" title={user.suspension_reason}>
              {user.suspension_reason}
            </div>
          </div>
        </TableCell>
        <TableCell>
          <div className="text-sm">
            {new Date(user.suspended_at).toLocaleDateString()}
          </div>
        </TableCell>
        <TableCell>
          <div className="text-sm">
            {new Date(user.suspended_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </TableCell>
        <TableCell>
          <Badge
            className={
              user.status === "banned"
                ? "bg-red-100 text-red-800"
                : "bg-orange-100 text-orange-800"
            }
          >
            {user.status === "banned" ? "Banned" : "Suspended"}
          </Badge>
        </TableCell>
        <TableCell>
          <Button
            variant="outline"
            size="sm"
            onClick={handleUnsuspend}
            disabled={isSubmitting}
            className="text-green-600 hover:text-green-700 hover:bg-green-50"
          >
            {isSubmitting ? "Unsuspending..." : "Unsuspend"}
          </Button>
        </TableCell>
      </TableRow>
    );
  } else {
    const report = item as Report;
    const reportCount = reports.filter(
      (r) => r.reported_user_id === report.reported_user_id,
    ).length;

    const handleCopyReporterEmail = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (report.reporter_email) {
        copyEmailToClipboard(report.reporter_email);
      }
    };

    return (
      <TableRow key={report.id} className="hover:bg-gray-50">
        <TableCell>
          <div className="flex items-center gap-2">
            {report.book_id ? (
              <div className="flex items-center gap-2 text-blue-600">
                <Flag className="h-4 w-4" />
                <span className="font-medium">Listing</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-purple-600">
                <UserX className="h-4 w-4" />
                <span className="font-medium">User</span>
              </div>
            )}
          </div>
        </TableCell>
        <TableCell className="font-medium">
          <div className="max-w-[150px]">
            <div
              className="truncate"
              title={report.book_id ? report.book_title : report.seller_name}
            >
              {report.book_id ? report.book_title : report.seller_name}
            </div>
          </div>
        </TableCell>
        <TableCell>
          <div className="max-w-[200px]">
            <div className="truncate" title={report.reason}>
              {report.reason}
            </div>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <div className="min-w-0 flex-1">
              <div className="text-sm truncate">
                {report.reporter_name ||
                  `User #${report.reporter_user_id.slice(-8)}`}
              </div>
              {report.reporter_email && (
                <div className="text-xs text-gray-500 truncate">
                  {report.reporter_email}
                </div>
              )}
            </div>
            {report.reporter_email && (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopyReporterEmail}
                className="h-6 w-6 p-0 flex-shrink-0"
                title="Copy Reporter Email"
              >
                <Copy className="h-3 w-3" />
              </Button>
            )}
          </div>
        </TableCell>
        <TableCell>
          <div className="text-sm">
            {new Date(report.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </TableCell>
        <TableCell>
          <Badge className={getSeverityColor(reportCount)}>
            {getSeverityText(reportCount)}
          </Badge>
        </TableCell>
        <TableCell>
          <div className="min-w-[200px]">
            <ReportActions
              report={report}
              actionReason={actionReason}
              setActionReason={setActionReason}
              isSubmitting={isSubmitting}
              onUpdateStatus={onUpdateStatus}
              onUserAction={onUserAction}
            />
          </div>
        </TableCell>
      </TableRow>
    );
  }
};
