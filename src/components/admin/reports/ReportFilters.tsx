import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface ReportFiltersProps {
  activeTab: "pending" | "resolved" | "dismissed" | "suspended" | "all";
  setActiveTab: (
    tab: "pending" | "resolved" | "dismissed" | "suspended" | "all",
  ) => void;
  reportCounts: {
    pending: number;
    resolved: number;
    dismissed: number;
    suspended: number;
    all: number;
  };
}

const ReportFilters = ({
  activeTab,
  setActiveTab,
  reportCounts,
}: ReportFiltersProps) => {
  const isMobile = useIsMobile();

  const handleTabChange = (value: string) => {
    setActiveTab(
      value as "pending" | "resolved" | "dismissed" | "suspended" | "all",
    );
  };

  if (isMobile) {
    return (
      <div className="space-y-3">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 h-auto gap-1 p-1">
            <TabsTrigger value="pending" className="text-xs px-2 py-2 relative">
              Pending
              {reportCounts.pending > 0 && (
                <Badge
                  variant="destructive"
                  className="ml-1 text-[10px] h-4 w-auto min-w-[16px] px-1"
                >
                  {reportCounts.pending}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="resolved" className="text-xs px-2 py-2">
              Resolved
              {reportCounts.resolved > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1 text-[10px] h-4 w-auto min-w-[16px] px-1"
                >
                  {reportCounts.resolved}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="dismissed" className="text-xs px-2 py-2">
              Dismissed
              {reportCounts.dismissed > 0 && (
                <Badge
                  variant="outline"
                  className="ml-1 text-[10px] h-4 w-auto min-w-[16px] px-1"
                >
                  {reportCounts.dismissed}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 h-auto gap-1 p-1">
            <TabsTrigger value="suspended" className="text-xs px-2 py-2">
              Suspended
              {reportCounts.suspended > 0 && (
                <Badge
                  variant="destructive"
                  className="ml-1 text-[10px] h-4 w-auto min-w-[16px] px-1"
                >
                  {reportCounts.suspended}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="all" className="text-xs px-2 py-2">
              All Reports
              {reportCounts.all > 0 && (
                <Badge
                  variant="outline"
                  className="ml-1 text-[10px] h-4 w-auto min-w-[16px] px-1"
                >
                  {reportCounts.all}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    );
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-5 h-auto">
        <TabsTrigger value="pending" className="relative">
          Pending Reports
          {reportCounts.pending > 0 && (
            <Badge variant="destructive" className="ml-2 text-xs">
              {reportCounts.pending}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="resolved">
          Resolved
          {reportCounts.resolved > 0 && (
            <Badge variant="secondary" className="ml-2 text-xs">
              {reportCounts.resolved}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="dismissed">
          Dismissed
          {reportCounts.dismissed > 0 && (
            <Badge variant="outline" className="ml-2 text-xs">
              {reportCounts.dismissed}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="suspended">
          Suspended Users
          {reportCounts.suspended > 0 && (
            <Badge variant="destructive" className="ml-2 text-xs">
              {reportCounts.suspended}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="all">
          All Reports
          {reportCounts.all > 0 && (
            <Badge variant="outline" className="ml-2 text-xs">
              {reportCounts.all}
            </Badge>
          )}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ReportFilters;
