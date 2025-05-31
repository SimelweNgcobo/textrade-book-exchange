
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import AdminDashboard from '@/components/AdminDashboard';
import { ArrowLeft, Flag } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Admin = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Redirect if not admin
  if (!user || !profile?.is_admin) {
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
      <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
        <div className={`flex ${isMobile ? 'flex-col space-y-4' : 'items-center justify-between'} mb-4 md:mb-6`}>
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-green-600"
              size={isMobile ? "sm" : "default"}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
            <h1 className="text-xl md:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          
          <Button 
            variant="outline"
            onClick={() => navigate('/admin/reports')}
            className="flex items-center w-full md:w-auto"
            size={isMobile ? "sm" : "default"}
          >
            <Flag className="mr-2 h-4 w-4" />
            View Reports
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-3 md:p-6">
          <AdminDashboard />
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
