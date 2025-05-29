
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  getAdminStats, 
  getAllUsers, 
  getAllListings, 
  updateUserStatus,
  deleteBookListing,
  sendBroadcastMessage as sendBroadcastMessageService,
  AdminStats as AdminStatsType,
  AdminUser,
  AdminListing
} from '@/services/adminService';
import { useIsMobile } from '@/hooks/use-mobile';
import AdminStats from '@/components/admin/AdminStats';
import AdminEarningsTab from '@/components/admin/AdminEarningsTab';
import AdminUsersTab from '@/components/admin/AdminUsersTab';
import AdminListingsTab from '@/components/admin/AdminListingsTab';
import AdminSettingsTab from '@/components/admin/AdminSettingsTab';

interface DashboardStats extends AdminStatsType {}
interface User extends AdminUser {}
interface BookListing extends AdminListing {}

interface AdminAction {
  id: string;
  action: string;
  target: string;
  admin: string;
  timestamp: string;
  details: string;
}

const AdminDashboard = () => {
  const isMobile = useIsMobile();
  
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeListings: 0,
    booksSold: 0,
    reportedIssues: 0,
    newUsersThisWeek: 0,
    salesThisMonth: 0,
    weeklyCommission: 0,
    monthlyCommission: 0
  });

  const [users, setUsers] = useState<User[]>([]);
  const [listings, setListings] = useState<BookListing[]>([]);
  const [adminActions, setAdminActions] = useState<AdminAction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [broadcastMessage, setBroadcastMessage] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const adminStats = await getAdminStats();
      setStats(adminStats);

      const users = await getAllUsers();
      setUsers(users);

      const listings = await getAllListings();
      setListings(listings);

      // Mock admin actions
      setAdminActions([
        {
          id: '1',
          action: 'User Suspended',
          target: 'jane@example.com',
          admin: 'Admin User',
          timestamp: '2025-01-20T10:30:00Z',
          details: 'Suspended for violating terms of service'
        },
        {
          id: '2',
          action: 'Listing Auto-Approved',
          target: 'Physics Textbook',
          admin: 'System',
          timestamp: '2025-01-19T15:45:00Z',
          details: 'Listing automatically approved upon upload'
        }
      ]);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserAction = async (userId: string, action: 'suspend' | 'activate') => {
    try {
      const status = action === 'suspend' ? 'suspended' : 'active';
      await updateUserStatus(userId, status);
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status } : user
      ));
      
      toast.success(`User ${action}d successfully`);
      loadDashboardData(); // Reload to update admin actions
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
      toast.error(`Failed to ${action} user`);
    }
  };

  const handleListingAction = async (listingId: string, action: 'delete') => {
    try {
      if (action === 'delete') {
        await deleteBookListing(listingId);
        setListings(listings.filter(listing => listing.id !== listingId));
        toast.success('Listing deleted successfully');
      }
      loadDashboardData(); // Reload to update admin actions
    } catch (error) {
      console.error(`Error ${action}ing listing:`, error);
      toast.error(`Failed to ${action} listing`);
    }
  };

  const handleSendBroadcast = async () => {
    if (!broadcastMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }

    try {
      await sendBroadcastMessageService(broadcastMessage);
      toast.success(`Broadcast message sent to all ${stats.totalUsers} users`);
      setBroadcastMessage('');
      
      // Reload admin actions to show the broadcast
      loadDashboardData();
    } catch (error) {
      console.error('Error sending broadcast:', error);
      toast.error('Failed to send broadcast message');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Dashboard Overview */}
      <AdminStats stats={stats} />

      {/* Main Admin Tabs */}
      <Tabs defaultValue="earnings" className="space-y-4">
        <TabsList className={`${isMobile ? 'grid grid-cols-2 h-auto' : 'grid grid-cols-4'} w-full`}>
          <TabsTrigger value="earnings" className={isMobile ? 'text-xs px-2 py-2' : ''}>
            {isMobile ? 'Earnings' : 'Earnings'}
          </TabsTrigger>
          <TabsTrigger value="users" className={isMobile ? 'text-xs px-2 py-2' : ''}>
            {isMobile ? 'Users' : 'Users'}
          </TabsTrigger>
          <TabsTrigger value="listings" className={isMobile ? 'text-xs px-2 py-2' : ''}>
            {isMobile ? 'Listings' : 'Listings'}
          </TabsTrigger>
          <TabsTrigger value="settings" className={isMobile ? 'text-xs px-2 py-2' : ''}>
            {isMobile ? 'Settings' : 'Settings'}
          </TabsTrigger>
        </TabsList>

        {/* Earnings Tab */}
        <TabsContent value="earnings" className="space-y-4">
          <AdminEarningsTab stats={stats} />
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <AdminUsersTab users={users} onUserAction={handleUserAction} />
        </TabsContent>

        {/* Listings Tab */}
        <TabsContent value="listings" className="space-y-4">
          <AdminListingsTab listings={listings} onListingAction={handleListingAction} />
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <AdminSettingsTab 
            broadcastMessage={broadcastMessage}
            setBroadcastMessage={setBroadcastMessage}
            onSendBroadcast={handleSendBroadcast}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
