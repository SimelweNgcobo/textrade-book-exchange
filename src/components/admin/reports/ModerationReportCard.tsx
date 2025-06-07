import { Card, CardContent } from "@/components/ui/card";
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

interface ModerationReportCardProps {
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

export const ModerationReportCard = ({
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
}: ModerationReportCardProps) => {
  if (activeTab === "suspended") {
    const user = item as SuspendedUser;
    return (
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="font-medium text-gray-900">{user.name}</div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyEmailToClipboard(user.email)}
                  className="h-6 w-6 p-0"
                  title="Copy Email Address"
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Badge
                  className={
                    user.status === "banned"
                      ? "bg-red-100 text-red-800"
                      : "bg-orange-100 text-orange-800"
                  }
                >
                  {user.status === "banned" ? "Banned" : "Suspended"}
                </Badge>
              </div>
            </div>

            <div className="text-sm text-gray-600">{user.email}</div>

            <div>
              <div className="text-sm font-medium text-gray-700">Reason:</div>
              <div className="text-sm text-gray-600">
                {user.suspension_reason}
              </div>
            </div>

            <div className="text-sm text-gray-500">
              Suspended: {new Date(user.suspended_at).toLocaleDateString()}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => onUnsuspendUser(user.id)}
              className="w-full text-green-600 hover:text-green-700"
            >
              Unsuspend User
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  } else {
    const report = item as Report;
    const reportCount = reports.filter(
      (r) => r.reported_user_id === report.reported_user_id,
    ).length;

    return (
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {report.book_id ? (
                  <div className="flex items-center gap-1 text-blue-600">
                    <Flag className="h-4 w-4" />
                    <span className="font-medium">Listing</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-purple-600">
                    <UserX className="h-4 w-4" />
                    <span className="font-medium">User</span>
                  </div>
                )}
              </div>
              <Badge className={getSeverityColor(reportCount)}>
                {getSeverityText(reportCount)}
              </Badge>
            </div>

            <div>
              <div className="font-medium text-gray-900">
                {report.book_id ? report.book_title : report.seller_name}
              </div>
              <div className="text-sm text-gray-500 flex items-center justify-between">
                <span>
                  Reporter:{" "}
                  {report.reporter_name ||
                    `User #${report.reporter_user_id.slice(-8)}`}
                  {report.reporter_email && (
                    <span className="block text-xs text-gray-400">
                      {report.reporter_email}
                    </span>
                  )}
                </span>
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
            </div>

            <div>
              <div className="text-sm font-medium text-gray-700">Reason:</div>
              <div className="text-sm text-gray-600 break-words overflow-hidden">
                <div className="line-clamp-3">{report.reason}</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {new Date(report.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            <div className="pt-2 border-t">
              <ReportActions
                report={report}
                actionReason={actionReason}
                setActionReason={setActionReason}
                isSubmitting={isSubmitting}
                onUpdateStatus={onUpdateStatus}
                onUserAction={onUserAction}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
};
