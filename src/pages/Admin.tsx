
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import AdminDashboard from '@/components/AdminDashboard';
import { ArrowLeft, Flag, Shield } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import LoadingSpinner from '@/components/LoadingSpinner';
import AppErrorBoundary from '@/components/AppErrorBoundary';

const Admin = () => {
  const { user, profile, isLoading, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  // Show loading state while authentication is being checked
  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <LoadingSpinner size="lg" text="Checking admin access..." />
        </div>
      </Layout>
    );
  }

  // Show access denied for non-authenticated users
  if (!isAuthenticated || !user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Authentication Required</h2>
            <p className="text-gray-600 mb-6">You must be logged in to access the admin dashboard.</p>
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/login')}
                className="w-full"
              >
                Log In
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/')}
                className="w-full"
              >
                Go Home
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Show access denied for non-admin users
  if (!isAdmin) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-orange-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Admin Access Required</h2>
            <p className="text-gray-600 mb-6">
              You do not have administrator privileges to access this page.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => navigate('/profile')}
                className="w-full"
              >
                Go to Profile
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/')}
                className="w-full"
              >
                Go Home
              </Button>
            </div>
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
              className="text-book-600"
              size={isMobile ? "sm" : "default"}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-book-600" />
              <h1 className="text-xl md:text-3xl font-bold text-book-800">Admin Dashboard</h1>
            </div>
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
          <AppErrorBoundary>
            <AdminDashboard />
          </AppErrorBoundary>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
