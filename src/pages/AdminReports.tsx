import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import AdminReportsTab from '@/components/admin/AdminReportsTab';

const AdminReports = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin === false) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  // Optionally show nothing or a loading state while auth is being determined
  if (isAdmin === undefined) return null;

  return (
    <Layout>
      <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 md:mb-6 text-book-600"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="bg-white rounded-lg shadow-md p-3 md:p-6">
          <AdminReportsTab />
        </div>
      </div>
    </Layout>
  );
};

export default AdminReports;
