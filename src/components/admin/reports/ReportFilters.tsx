import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";

interface ReportFiltersProps {
  activeTab: "pending" | "resolved" | "dismissed" | "suspended" | "all";
  onTabChange: (
    tab: "pending" | "resolved" | "dismissed" | "suspended" | "all",
  ) => void;
}

const ReportFilters = ({ activeTab, onTabChange }: ReportFiltersProps) => {
  const isMobile = useIsMobile();

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="mb-6">
      <TabsList
        className={`grid w-full ${isMobile ? "grid-cols-2 h-auto gap-2" : "grid-cols-5"}`}
      >
        <TabsTrigger
          value="pending"
          className={`relative ${isMobile ? "text-xs px-2 py-2" : ""}`}
        >
          {isMobile ? "Pending" : "Pending"}
          <Badge variant="destructive" className="ml-1 text-xs">
            !
          </Badge>
        </TabsTrigger>
        <TabsTrigger
          value="resolved"
          className={isMobile ? "text-xs px-2 py-2" : ""}
        >
          {isMobile ? "Resolved" : "Resolved"}
        </TabsTrigger>
        {!isMobile && (
          <>
            <TabsTrigger value="dismissed">Dismissed</TabsTrigger>
            <TabsTrigger value="suspended">Suspended Users</TabsTrigger>
            <TabsTrigger value="all">All Reports</TabsTrigger>
          </>
        )}
        {isMobile && (
          <>
            <TabsTrigger value="dismissed" className="text-xs px-2 py-2">
              Dismissed
            </TabsTrigger>
            <TabsTrigger value="suspended" className="text-xs px-2 py-2">
              Suspended
            </TabsTrigger>
            <TabsTrigger value="all" className="text-xs px-2 py-2 col-span-2">
              All Reports
            </TabsTrigger>
          </>
        )}
      </TabsList>
    </Tabs>
  );
};

export default ReportFilters;
