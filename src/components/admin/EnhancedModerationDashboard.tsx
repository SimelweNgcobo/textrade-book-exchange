import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ReportFilters from "./reports/ReportFilters";
import ErrorFallback from "@/components/ErrorFallback";
import { Button } from "@/components/ui/button";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useIsMobile } from "@/hooks/use-mobile";
import { ModerationReportCard } from "./reports/ModerationReportCard";
import { ModerationTableRow } from "./reports/ModerationTableRow";
import {
  loadModerationData,
  updateReportStatus,
  updateUserStatus,
  unsuspendUser,
  Report,
  SuspendedUser,
  ModerationData,
} from "@/services/admin/moderationDataService";

const EnhancedModerationDashboard = () => {
  const isMobile = useIsMobile();
  const [reports, setReports] = useState<Report[]>([]);
  const [suspendedUsers, setSuspendedUsers] = useState<SuspendedUser[]>([]);
  const [filteredData, setFilteredData] = useState<Report[] | SuspendedUser[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "pending" | "resolved" | "dismissed" | "suspended" | "all"
  >("pending");
  const [actionReason, setActionReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleError } = useErrorHandler();

  useEffect(() => {
    loadData();
    setupRealtimeSubscription();
  }, []);

  useEffect(() => {
    filterData();
  }, [reports, suspendedUsers, activeTab]);

  const setupRealtimeSubscription = () => {
    const reportsChannel = supabase
      .channel("reports-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "reports",
        },
        () => {
          console.log("Reports updated, reloading...");
          loadData();
        },
      )
      .subscribe();

    const profilesChannel = supabase
      .channel("profiles-changes")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
        },
        () => {
          console.log("User profiles updated, reloading...");
          loadData();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(reportsChannel);
      supabase.removeChannel(profilesChannel);
    };
  };

  const loadData = async () => {
    try {
      setError(null);
      setIsLoading(true);

      const data: ModerationData = await loadModerationData();
      setReports(data.reports);
      setSuspendedUsers(data.suspendedUsers);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to load moderation data";
      console.error("Error loading moderation data:", error);
      setError(errorMessage);
      handleError(error, "Load Moderation Data");
    } finally {
      setIsLoading(false);
    }
  };

  const filterData = () => {
    if (activeTab === "suspended") {
      setFilteredData(suspendedUsers);
    } else if (activeTab === "all") {
      setFilteredData(reports);
    } else {
      setFilteredData(reports.filter((report) => report.status === activeTab));
    }
  };

  const handleUpdateReportStatus = async (
    reportId: string,
    status: "resolved" | "dismissed",
  ) => {
    try {
      await updateReportStatus(reportId, status);
      toast.success(`Report ${status} successfully`);
      loadData();
    } catch (error) {
      handleError(error, "Update Report Status");
    }
  };

  const handleUserAction = async (
    userId: string,
    action: "ban" | "suspend",
    reason: string,
  ) => {
    try {
      setIsSubmitting(true);
      await updateUserStatus(userId, action, reason);
      toast.success(
        `User ${action === "ban" ? "banned" : "suspended"} successfully`,
      );
      setActionReason("");
      loadData();
    } catch (error) {
      handleError(error, `${action} User`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUnsuspendUser = async (userId: string) => {
    try {
      await unsuspendUser(userId);
      toast.success("User unsuspended successfully");
      loadData();
    } catch (error) {
      handleError(error, "Unsuspend User");
    }
  };

  const getSeverityColor = (reportCount: number) => {
    if (reportCount >= 3) return "bg-red-100 text-red-800";
    if (reportCount >= 2) return "bg-yellow-100 text-yellow-800";
    return "bg-blue-100 text-blue-800";
  };

  const getSeverityText = (reportCount: number) => {
    if (reportCount >= 3) return "High";
    if (reportCount >= 2) return "Medium";
    return "Low";
  };

  const copyEmailToClipboard = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      toast.success("Email address copied to clipboard");
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      toast.success("Email address copied to clipboard");
    }
  };

  if (error) {
    return (
      <ErrorFallback
        error={new Error(error)}
        resetError={() => {
          setError(null);
          loadData();
        }}
        title="Moderation Dashboard Error"
        description="Failed to load moderation data. Please try again."
      />
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <RefreshCw className="h-6 w-6 animate-spin text-book-600" />
            <span>Loading moderation data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Enhanced Moderation Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Manage user reports and moderation actions with real-time
            notifications
          </p>
        </div>
        <Button
          onClick={loadData}
          disabled={isLoading}
          variant="outline"
          size="sm"
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
          />
          Refresh Data
        </Button>
      </div>

      <ReportFilters
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        reportCounts={{
          pending: reports.filter((r) => r.status === "pending").length,
          resolved: reports.filter((r) => r.status === "resolved").length,
          dismissed: reports.filter((r) => r.status === "dismissed").length,
          suspended: suspendedUsers.length,
          all: reports.length,
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {activeTab === "suspended" ? "Suspended/Banned Users" : "Reports"}
          </CardTitle>
          <CardDescription>
            {activeTab === "suspended"
              ? "Manage suspended and banned user accounts"
              : `${filteredData.length} ${activeTab} reports`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredData.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No {activeTab === "suspended" ? "suspended users" : "reports"}{" "}
                found
              </p>
            </div>
          ) : (
            <>
              {isMobile ? (
                <div className="space-y-4">
                  {filteredData.map((item) => (
                    <ModerationReportCard
                      key={
                        activeTab === "suspended"
                          ? (item as SuspendedUser).id
                          : (item as Report).id
                      }
                      item={item}
                      activeTab={activeTab}
                      reports={reports}
                      actionReason={actionReason}
                      setActionReason={setActionReason}
                      isSubmitting={isSubmitting}
                      onUpdateStatus={handleUpdateReportStatus}
                      onUserAction={handleUserAction}
                      onUnsuspendUser={handleUnsuspendUser}
                      copyEmailToClipboard={copyEmailToClipboard}
                      getSeverityColor={getSeverityColor}
                      getSeverityText={getSeverityText}
                    />
                  ))}
                </div>
              ) : (
                <ScrollArea className="w-full">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Entity</TableHead>
                        <TableHead>
                          {activeTab === "suspended" ? "Reason" : "Reason"}
                        </TableHead>
                        <TableHead>
                          {activeTab === "suspended" ? "Suspended" : "Reporter"}
                        </TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead className="w-[200px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.map((item) => (
                        <ModerationTableRow
                          key={
                            activeTab === "suspended"
                              ? (item as SuspendedUser).id
                              : (item as Report).id
                          }
                          item={item}
                          activeTab={activeTab}
                          reports={reports}
                          actionReason={actionReason}
                          setActionReason={setActionReason}
                          isSubmitting={isSubmitting}
                          onUpdateStatus={handleUpdateReportStatus}
                          onUserAction={handleUserAction}
                          onUnsuspendUser={handleUnsuspendUser}
                          copyEmailToClipboard={copyEmailToClipboard}
                          getSeverityColor={getSeverityColor}
                          getSeverityText={getSeverityText}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedModerationDashboard;
