
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface ReportFiltersProps {
  activeTab: 'pending' | 'resolved' | 'dismissed' | 'suspended' | 'all';
  onTabChange: (tab: 'pending' | 'resolved' | 'dismissed' | 'suspended' | 'all') => void;
}

const ReportFilters = ({ activeTab, onTabChange }: ReportFiltersProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="mb-6">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="pending" className="relative">
          Pending
          <Badge variant="destructive" className="ml-2 text-xs">
            !
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="resolved">Resolved</TabsTrigger>
        <TabsTrigger value="dismissed">Dismissed</TabsTrigger>
        <TabsTrigger value="suspended">Suspended Users</TabsTrigger>
        <TabsTrigger value="all">All Reports</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ReportFilters;
