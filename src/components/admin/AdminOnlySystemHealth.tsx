
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AdminOnlySystemHealth = () => {
  const { user, isAdmin } = useAuth();

  if (!user || !isAdmin) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Access Restricted</CardTitle>
          <CardDescription>Administrator access required</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">You do not have permission to view this section.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Panel</CardTitle>
        <CardDescription>Administrative functions</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Admin features are available through the main dashboard.</p>
      </CardContent>
    </Card>
  );
};

export default AdminOnlySystemHealth;
