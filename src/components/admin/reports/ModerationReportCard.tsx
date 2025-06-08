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
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">
                  {user.name}
                </div>
                <div className="text-sm text-gray-600 truncate">
                  {user.email}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCopyEmail}
                  className="h-8 w-8 p-0"
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

            {/* Reason */}
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">
                Reason:
              </div>
              <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                {user.suspension_reason}
              </div>
            </div>

            {/* Date */}
            <div className="text-sm text-gray-500">
              Suspended: {new Date(user.suspended_at).toLocaleDateString()}
            </div>

            {/* Action Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleUnsuspend}
              disabled={isSubmitting}
              className="w-full text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              {isSubmitting ? "Unsuspending..." : "Unsuspend User"}
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

    const handleCopyReporterEmail = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (report.reporter_email) {
        copyEmailToClipboard(report.reporter_email);
      }
    };

    return (
      <Card className="border border-gray-200 shadow-sm">
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {report.book_id ? (
                  <div className="flex items-center gap-2 text-blue-600">
                    <Flag className="h-4 w-4 flex-shrink-0" />
                    <span className="font-medium text-sm">Listing Report</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-purple-600">
                    <UserX className="h-4 w-4 flex-shrink-0" />
                    <span className="font-medium text-sm">User Report</span>
                  </div>
                )}
              </div>
              <Badge className={getSeverityColor(reportCount)}>
                {getSeverityText(reportCount)}
              </Badge>
            </div>

            {/* Subject */}
            <div>
              <div className="font-medium text-gray-900 mb-1">
                {report.book_id ? report.book_title : report.seller_name}
              </div>
            </div>

            {/* Reporter Info */}
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-500">
                  Reporter:{" "}
                  {report.reporter_name ||
                    `User #${report.reporter_user_id.slice(-8)}`}
                </div>
                {report.reporter_email && (
                  <div className="text-xs text-gray-400 truncate">
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

            {/* Reason */}
            <div>
              <div className="text-sm font-medium text-gray-700 mb-1">
                Reason:
              </div>
              <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded break-words">
                {report.reason}
              </div>
            </div>

            {/* Date */}
            <div className="text-sm text-gray-500">
              {new Date(report.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>

            {/* Actions */}
            <div className="pt-2 border-t border-gray-100">
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
