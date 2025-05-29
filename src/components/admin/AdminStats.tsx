
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  AlertTriangle
} from 'lucide-react';
import { AdminStats as AdminStatsType } from '@/services/adminService';
import { useIsMobile } from '@/hooks/use-mobile';

interface AdminStatsProps {
  stats: AdminStatsType;
}

const AdminStats = ({ stats }: AdminStatsProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      <Card className="p-3 md:p-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 md:p-4">
          <CardTitle className="text-xs md:text-sm font-medium">Total Users</CardTitle>
          <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-0 md:p-4 pt-2">
          <div className="text-lg md:text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            +{stats.newUsersThisWeek} this week
          </p>
        </CardContent>
      </Card>

      <Card className="p-3 md:p-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 md:p-4">
          <CardTitle className="text-xs md:text-sm font-medium">Active Listings</CardTitle>
          <BookOpen className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-0 md:p-4 pt-2">
          <div className="text-lg md:text-2xl font-bold">{stats.activeListings}</div>
          <p className="text-xs text-muted-foreground">
            Auto-approved instantly
          </p>
        </CardContent>
      </Card>

      <Card className="p-3 md:p-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 md:p-4">
          <CardTitle className="text-xs md:text-sm font-medium">Books Sold</CardTitle>
          <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-0 md:p-4 pt-2">
          <div className="text-lg md:text-2xl font-bold">{stats.booksSold}</div>
          <p className="text-xs text-muted-foreground">
            +{stats.salesThisMonth} this month
          </p>
        </CardContent>
      </Card>

      <Card className="p-3 md:p-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 md:p-4">
          <CardTitle className="text-xs md:text-sm font-medium">Reported Issues</CardTitle>
          <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="p-0 md:p-4 pt-2">
          <div className="text-lg md:text-2xl font-bold">{stats.reportedIssues}</div>
          <p className="text-xs text-muted-foreground">
            Pending review
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;
