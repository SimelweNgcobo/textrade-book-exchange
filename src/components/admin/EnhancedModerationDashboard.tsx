import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Flag, UserX, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import ReportFilters from "./reports/ReportFilters";
import ReportActions from "./reports/ReportActions";
import ErrorFallback from "@/components/ErrorFallback";
import { Button } from "@/components/ui/button";
import { useErrorHandler } from "@/hooks/useErrorHandler";
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

interface SuspendedUser {
  id: string;
  name: string;
  email: string;
  status: string;
  suspended_at: string;
  suspension_reason: string;
}

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

      const [reportsResponse, usersResponse] = await Promise.all([
        supabase
          .from("reports")
          .select("*")
          .order("created_at", { ascending: false }),
        supabase
          .from("profiles")
          .select("id, name, email, status, suspended_at, suspension_reason")
          .in("status", ["suspended", "banned"])
          .order("created_at", { ascending: false }),
      ]);

      if (reportsResponse.error) {
        throw new Error(
          `Failed to load reports: ${reportsResponse.error.message}`,
        );
      }

      if (usersResponse.error) {
        throw new Error(
          `Failed to load suspended users: ${usersResponse.error.message}`,
        );
      }

      const typedReports: Report[] = (reportsResponse.data || []).map(
        (report) => ({
          ...report,
          status: report.status as "pending" | "resolved" | "dismissed",
        }),
      );

      // Properly handle the suspended users data with better type safety
      const typedUsers: SuspendedUser[] = (usersResponse.data || [])
        .filter(
          (user): user is NonNullable<typeof user> =>
            user !== null &&
            user !== undefined &&
            typeof user === "object" &&
            "id" in user,
        )
        .map((user) => ({
          id: user.id || "",
          name: user.name || "Anonymous",
          email: user.email || "No email",
          status: user.status || "suspended",
          suspended_at: user.suspended_at || new Date().toISOString(),
          suspension_reason: user.suspension_reason || "No reason provided",
        }));

      setReports(typedReports);
      setSuspendedUsers(typedUsers);
    } catch (error) {
      console.error("Error loading moderation data:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to load moderation data";
      setError(errorMessage);
      handleError(error, "Moderation Dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const filterData = () => {
    switch (activeTab) {
      case "pending":
        setFilteredData(reports.filter((r) => r.status === "pending"));
        break;
      case "resolved":
        setFilteredData(reports.filter((r) => r.status === "resolved"));
        break;
      case "dismissed":
        setFilteredData(reports.filter((r) => r.status === "dismissed"));
        break;
      case "suspended":
        setFilteredData(suspendedUsers);
        break;
      case "all":
        setFilteredData(reports);
        break;
    }
  };

  const updateReportStatus = async (
    reportId: string,
    status: "resolved" | "dismissed",
  ) => {
    try {
      const { error } = await supabase
        .from("reports")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", reportId);

      if (error) {
        throw new Error(`Failed to update report: ${error.message}`);
      }

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

      const status = action === "ban" ? "banned" : "suspended";
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          status,
          suspension_reason: reason,
          suspended_at: new Date().toISOString(),
        })
        .eq("id", userId);

      if (profileError) {
        throw new Error(`Failed to ${action} user: ${profileError.message}`);
      }

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

  const unsuspendUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          status: "active",
          suspension_reason: null,
          suspended_at: null,
        })
        .eq("id", userId);

      if (error) {
        throw new Error(`Failed to unsuspend user: ${error.message}`);
      }

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

  // Mobile Card Component for Reports
  const MobileReportCard = ({ item }: { item: Report | SuspendedUser }) => {
    if (activeTab === "suspended") {
      const user = item as SuspendedUser;
      return (
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-orange-600">
                  <UserX className="h-4 w-4" />
                  <span className="font-medium">
                    {user.status === "banned" ? "Banned" : "Suspended"}
                  </span>
                </div>
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

              <div>
                <div className="font-medium text-gray-900">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>

              <div>
                <div className="text-sm font-medium text-gray-700">Reason:</div>
                <div className="text-sm text-gray-600 break-words overflow-hidden">
                  <div className="line-clamp-3">{user.suspension_reason}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Suspended: {new Date(user.suspended_at).toLocaleDateString()}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => unsuspendUser(user.id)}
                  className="text-green-600 hover:text-green-700"
                >
                  Unsuspend
                </Button>
              </div>
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
                <div className="text-sm text-gray-500">
                  Reporter #{report.reporter_user_id.slice(-8)}
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
                  onUpdateStatus={updateReportStatus}
                  onUserAction={handleUserAction}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      );
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
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-red-600" />
            <div>
              <CardTitle className="text-lg">
                Enhanced Moderation Dashboard
              </CardTitle>
              <CardDescription className="text-sm">
                Manage user reports and moderation actions with real-time
                updates
              </CardDescription>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={loadData}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <ReportFilters activeTab={activeTab} onTabChange={setActiveTab} />

        {filteredData.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              {activeTab === "suspended"
                ? "No suspended users"
                : "No reports to review"}
            </p>
          </div>
        ) : (
          <>
            {/* Mobile View */}
            {isMobile ? (
              <div className="space-y-4">
                {filteredData.map((item, index) => (
                  <MobileReportCard
                    key={
                      activeTab === "suspended"
                        ? (item as SuspendedUser).id
                        : (item as Report).id
                    }
                    item={item}
                  />
                ))}
              </div>
            ) : (
              /* Desktop View */
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
                    {filteredData.map((item) => {
                      if (activeTab === "suspended") {
                        const user = item as SuspendedUser;
                        return (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center gap-1 text-orange-600">
                                <UserX className="h-4 w-4" />
                                <span>
                                  {user.status === "banned"
                                    ? "Banned"
                                    : "Suspended"}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">
                              <div className="max-w-[150px] truncate">
                                {user.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {user.email}
                              </div>
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate">
                              {user.suspension_reason}
                            </TableCell>
                            <TableCell>
                              {new Date(user.suspended_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              {new Date(user.suspended_at).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  user.status === "banned"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-orange-100 text-orange-800"
                                }
                              >
                                {user.status === "banned"
                                  ? "Banned"
                                  : "Suspended"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => unsuspendUser(user.id)}
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
                                {report.book_id
                                  ? report.book_title
                                  : report.seller_name}
                              </div>
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate">
                              {report.reason}
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">
                                Reporter #{report.reporter_user_id.slice(-8)}
                              </span>
                            </TableCell>
                            <TableCell>
                              {new Date(report.created_at).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
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
                                onUpdateStatus={updateReportStatus}
                                onUserAction={handleUserAction}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      }
                    })}
                  </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedModerationDashboard;
