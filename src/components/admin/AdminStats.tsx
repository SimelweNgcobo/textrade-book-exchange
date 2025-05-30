
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, DollarSign, TrendingUp } from 'lucide-react';
import { AdminStats as AdminStatsType } from '@/services/adminService';

interface AdminStatsProps {
  stats: AdminStatsType;
}

const AdminStats = ({ stats }: AdminStatsProps) => {
  const statsData = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toString(),
      icon: Users,
      description: 'Registered users'
    },
    {
      title: 'Active Listings',
      value: stats.activeListings.toString(),
      icon: BookOpen,
      description: 'Books for sale'
    },
    {
      title: 'Books Sold',
      value: stats.booksSold.toString(),
      icon: TrendingUp,
      description: 'Completed sales'
    },
    {
      title: 'Total Commission',
      value: `R${stats.monthlyCommission.toFixed(2)}`,
      icon: DollarSign,
      description: 'Commission earned'
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminStats;
