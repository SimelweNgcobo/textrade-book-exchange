
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users } from 'lucide-react';
import { getAllUsers, updateUserStatus, AdminUser } from '@/services/adminService';
import { useIsMobile } from '@/hooks/use-mobile';

const AdminReports = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    loadData();
  }, [isAdmin, navigate]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const usersData = await getAllUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserAction = async (user: AdminUser, action: 'suspend' | 'unsuspend') => {
    try {
      const newStatus = action === 'suspend' ? 'suspended' : 'active';
      await updateUserStatus(user.id, newStatus);
      
      setUsers(users.map(u => 
        u.id === user.id ? { ...u, status: newStatus } : u
      ));
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
    }
  };

  const suspendedUsers = users.filter(user => user.status === 'suspended');

  return (
    <Layout>
      <div className="container mx-auto px-2 md:px-4 py-4 md:py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 md:mb-6 text-book-600">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="bg-white rounded-lg shadow-md p-3 md:p-6">
          <div className="mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">User Management</h1>
            <p className="text-gray-600">Manage user accounts and suspensions</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-book-600"></div>
            </div>
          ) : (
            <div className="space-y-4 md:space-y-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 md:p-4">
                <div className="flex items-center">
                  <Users className="h-4 w-4 md:h-5 md:w-5 text-red-600 mr-2" />
                  <h3 className="text-base md:text-lg font-semibold text-red-800">
                    Suspended Users ({suspendedUsers.length})
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-red-600 mt-1">
                  Users who have been suspended from the platform
                </p>
              </div>

              {suspendedUsers.length === 0 ? (
                <div className="py-12 text-center">
                  <Users className="h-10 w-10 md:h-12 md:w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-sm">No suspended users found.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {suspendedUsers.map((user) => (
                    <div key={user.id} className="border rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{user.name}</h4>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUserAction(user, 'unsuspend')}
                        className="text-green-600 hover:text-green-700"
                      >
                        Unsuspend
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminReports;
