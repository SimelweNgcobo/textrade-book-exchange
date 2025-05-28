
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import AdminDashboard from '@/components/AdminDashboard';
import { ArrowLeft, Flag } from 'lucide-react';

const Admin = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  // Redirect if not admin
  if (!user || !profile?.isAdmin) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Access Denied</h2>
            <p className="text-gray-600">You do not have permission to view this page.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-book-600"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
            <h1 className="text-3xl font-bold text-book-800">Admin Dashboard</h1>
          </div>
          
          <Button 
            variant="outline"
            onClick={() => navigate('/admin/reports')}
            className="flex items-center"
          >
            <Flag className="mr-2 h-4 w-4" />
            View Reports
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <AdminDashboard />
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
