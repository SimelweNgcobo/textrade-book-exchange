
import { useAuth } from '@/contexts/AuthContext';
import SystemHealthCheck from '@/components/SystemHealthCheck';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AdminOnlySystemHealth = () => {
  const { user, isAdmin } = useAuth();

  if (!user || !isAdmin) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
          <CardDescription>Administrator access required</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">You do not have permission to view system health information.</p>
        </CardContent>
      </Card>
    );
  }

  return <SystemHealthCheck />;
};

export default AdminOnlySystemHealth;
