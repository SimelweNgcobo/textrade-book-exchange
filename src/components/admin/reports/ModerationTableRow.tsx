import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flag, UserX, Copy } from "lucide-react";
import ReportActions from "./ReportActions";

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
  copyEmailToClipboard: (email: string) => void;
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
  copyEmailToClipboard,
  getSeverityColor,
  getSeverityText,
}: ModerationTableRowProps) => {
  if (activeTab === "suspended") {
    const user = item as SuspendedUser;
    return (
      <TableRow key={user.id}>
        <TableCell>
          <div className="flex items-center gap-1 text-orange-600">
            <UserX className="h-4 w-4" />
            <span>{user.status === "banned" ? "Banned" : "Suspended"}</span>
          </div>
        </TableCell>
        <TableCell className="font-medium">
          <div className="flex items-center gap-2">
            <div className="max-w-[150px]">
              <div className="truncate">{user.name}</div>
              <div className="text-xs text-gray-500 truncate">{user.email}</div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => copyEmailToClipboard(user.email)}
              className="h-6 w-6 p-0"
              title="Copy Email Address"
            >
              <Copy className="h-3 w-3" />
            </Button>
          </div>
        </TableCell>
        <TableCell className="max-w-[200px] truncate">
          {user.suspension_reason}
        </TableCell>
        <TableCell>
          {new Date(user.suspended_at).toLocaleDateString()}
        </TableCell>
        <TableCell>
          {new Date(user.suspended_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
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
            onClick={() => onUnsuspendUser(user.id)}
            className="text-green-600 hover:text-green-700"
          >
            Unsuspend
          </Button>
        </TableCell>
      </TableRow>
    );
  } else {
    const report = item as Report;
    const reportCount = reports.filter(
      (r) => r.reported_user_id === report.reported_user_id,
    ).length;

    return (
      <TableRow key={report.id}>
        <TableCell>
          <div className="flex items-center gap-2">
            {report.book_id ? (
              <div className="flex items-center gap-1 text-blue-600">
                <Flag className="h-4 w-4" />
                <span>Listing</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-purple-600">
                <UserX className="h-4 w-4" />
                <span>User</span>
              </div>
            )}
          </div>
        </TableCell>
        <TableCell className="font-medium">
          <div className="max-w-[150px] truncate">
            {report.book_id ? report.book_title : report.seller_name}
          </div>
        </TableCell>
        <TableCell className="max-w-[200px] truncate">
          {report.reason}
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <div>
              <div className="text-sm">
                {report.reporter_name ||
                  `User #${report.reporter_user_id.slice(-8)}`}
              </div>
              {report.reporter_email && (
                <div className="text-xs text-gray-500">
                  {report.reporter_email}
                </div>
              )}
            </div>
            {report.reporter_email && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyEmailToClipboard(report.reporter_email!)}
                className="h-6 w-6 p-0"
                title="Copy Email Address"
              >
                <Copy className="h-3 w-3" />
              </Button>
            )}
          </div>
        </TableCell>
        <TableCell>
          {new Date(report.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </TableCell>
        <TableCell>
          <Badge className={getSeverityColor(reportCount)}>
            {getSeverityText(reportCount)}
          </Badge>
        </TableCell>
        <TableCell>
          <ReportActions
            report={report}
            actionReason={actionReason}
            setActionReason={setActionReason}
            isSubmitting={isSubmitting}
            onUpdateStatus={onUpdateStatus}
            onUserAction={onUserAction}
          />
        </TableCell>
      </TableRow>
    );
  }
};
