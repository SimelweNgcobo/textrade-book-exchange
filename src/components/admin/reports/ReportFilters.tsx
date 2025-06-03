import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface ReportFiltersProps {
  activeTab: 'pending' | 'resolved' | 'dismissed' | 'suspended' | 'all';
  onTabChange: (tab: ReportFiltersProps['activeTab']) => void;
  badgeCounts?: Partial<Record<ReportFiltersProps['activeTab'], number>>;
}

const ReportFilters = ({
  activeTab,
  onTabChange,
  badgeCounts = {},
}: ReportFiltersProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="mb-6">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="pending" className="relative">
          Pending
          {badgeCounts.pending ? (
            <Badge variant="destructive" className="ml-2 text-xs">
              {badgeCounts.pending > 99 ? '99+' : badgeCounts.pending}
            </Badge>
          ) : null}
        </TabsTrigger>
        <TabsTrigger value="resolved">
          Resolved
          {badgeCounts.resolved ? (
            <Badge variant="secondary" className="ml-2 text-xs">
              {badgeCounts.resolved}
            </Badge>
          ) : null}
        </TabsTrigger>
        <TabsTrigger value="dismissed">
          Dismissed
          {badgeCounts.dismissed ? (
            <Badge variant="secondary" className="ml-2 text-xs">
              {badgeCounts.dismissed}
            </Badge>
          ) : null}
        </TabsTrigger>
        <TabsTrigger value="suspended">
          Suspended
          {badgeCounts.suspended ? (
            <Badge variant="secondary" className="ml-2 text-xs">
              {badgeCounts.suspended}
            </Badge>
          ) : null}
        </TabsTrigger>
        <TabsTrigger value="all">
          All
          {badgeCounts.all ? (
            <Badge variant="secondary" className="ml-2 text-xs">
              {badgeCounts.all}
            </Badge>
          ) : null}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ReportFilters;
