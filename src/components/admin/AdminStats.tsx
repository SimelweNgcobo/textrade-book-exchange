
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, DollarSign, TrendingUp } from 'lucide-react';
import { getTotalCommission, getTotalUsers } from '@/services/adminService';
import { useEffect, useState } from 'react';

interface AdminStatsProps {
  totalBooks: number;
  totalTransactions: number;
}

const AdminStats = ({ totalBooks, totalTransactions }: AdminStatsProps) => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCommission, setTotalCommission] = useState(0);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [users, commission] = await Promise.all([
          getTotalUsers(),
          getTotalCommission()
        ]);
        setTotalUsers(users);
        setTotalCommission(commission);
      } catch (error) {
        console.error('Error loading admin stats:', error);
      }
    };

    loadStats();
  }, []);

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers.toString(),
      icon: Users,
      description: 'Registered users'
    },
    {
      title: 'Total Books',
      value: totalBooks.toString(),
      icon: BookOpen,
      description: 'Listed books'
    },
    {
      title: 'Total Transactions',
      value: totalTransactions.toString(),
      icon: TrendingUp,
      description: 'Completed sales'
    },
    {
      title: 'Total Commission',
      value: `R${totalCommission.toFixed(2)}`,
      icon: DollarSign,
      description: 'Commission earned'
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
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
