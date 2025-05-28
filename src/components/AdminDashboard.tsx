import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  AlertTriangle, 
  Settings, 
  BarChart3,
  MessageSquare,
  Eye,
  Edit,
  Trash2,
  UserX,
  CheckCircle,
  XCircle,
  Search,
  DollarSign
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card className="p-3 md:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 md:p-4">
            <CardTitle className="text-xs md:text-sm font-medium">Total Users</CardTitle>
            <Users className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 md:p-4 pt-2">
            <div className="text-lg md:text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.newUsersThisWeek} this week
            </p>
          </CardContent>
        </Card>

        <Card className="p-3 md:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 md:p-4">
            <CardTitle className="text-xs md:text-sm font-medium">Active Listings</CardTitle>
            <BookOpen className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 md:p-4 pt-2">
            <div className="text-lg md:text-2xl font-bold">{stats.activeListings}</div>
            <p className="text-xs text-muted-foreground">
              Auto-approved instantly
            </p>
          </CardContent>
        </Card>

        <Card className="p-3 md:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 md:p-4">
            <CardTitle className="text-xs md:text-sm font-medium">Books Sold</CardTitle>
            <TrendingUp className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 md:p-4 pt-2">
            <div className="text-lg md:text-2xl font-bold">{stats.booksSold}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.salesThisMonth} this month
            </p>
          </CardContent>
        </Card>

        <Card className="p-3 md:p-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0 md:p-4">
            <CardTitle className="text-xs md:text-sm font-medium">Reported Issues</CardTitle>
            <AlertTriangle className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-0 md:p-4 pt-2">
            <div className="text-lg md:text-2xl font-bold">{stats.reportedIssues}</div>
            <p className="text-xs text-muted-foreground">
              Pending review
            </p>
          </CardContent>
        </Card>
      </div>

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
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg md:text-xl">Commission Earnings</CardTitle>
              <CardDescription className="text-sm">Track your earnings from book sales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-3 md:space-y-4">
                  <h4 className="text-base md:text-lg font-semibold">Weekly Summary</h4>
                  <div className="bg-green-50 p-3 md:p-4 rounded-lg">
                    <div className="text-2xl md:text-3xl font-bold text-green-600">
                      R{stats.weeklyCommission.toFixed(2)}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">Commission earned this week</p>
                  </div>
                </div>
                
                <div className="space-y-3 md:space-y-4">
                  <h4 className="text-base md:text-lg font-semibold">Monthly Summary</h4>
                  <div className="bg-blue-50 p-3 md:p-4 rounded-lg">
                    <div className="text-2xl md:text-3xl font-bold text-blue-600">
                      R{stats.monthlyCommission.toFixed(2)}
                    </div>
                    <p className="text-xs md:text-sm text-gray-600">Commission earned this month</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium mb-2 text-sm md:text-base">Commission Rate</h5>
                <p className="text-xs md:text-sm text-gray-600">
                  You earn a commission on every book sold through the platform. 
                  Commission rates may vary based on book category and price.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg md:text-xl">User Management</CardTitle>
              <CardDescription className="text-sm">Manage registered users and their accounts</CardDescription>
            </CardHeader>
            <CardContent className="p-0 md:p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs md:text-sm min-w-[100px]">Name</TableHead>
                      <TableHead className="text-xs md:text-sm min-w-[150px]">Email</TableHead>
                      <TableHead className="text-xs md:text-sm min-w-[80px]">Status</TableHead>
                      <TableHead className="text-xs md:text-sm min-w-[80px]">Listings</TableHead>
                      <TableHead className="text-xs md:text-sm min-w-[100px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="text-xs md:text-sm font-medium">{user.name}</TableCell>
                        <TableCell className="text-xs md:text-sm">{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'active' ? 'default' : 'destructive'} className="text-xs">
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs md:text-sm">{user.listingsCount}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end">
                            {user.status === 'active' ? (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleUserAction(user.id, 'suspend')}
                                className="h-7 w-7 p-0 md:h-8 md:w-auto md:px-2"
                              >
                                <UserX className="h-3 w-3 md:h-4 md:w-4" />
                                {!isMobile && <span className="ml-1">Suspend</span>}
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="default"
                                onClick={() => handleUserAction(user.id, 'activate')}
                                className="h-7 w-7 p-0 md:h-8 md:w-auto md:px-2"
                              >
                                <CheckCircle className="h-3 w-3 md:h-4 md:w-4" />
                                {!isMobile && <span className="ml-1">Activate</span>}
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Listings Tab */}
        <TabsContent value="listings" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg md:text-xl">Book Listings Management</CardTitle>
              <CardDescription className="text-sm">All listings are auto-approved and go live immediately</CardDescription>
            </CardHeader>
            <CardContent className="p-0 md:p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs md:text-sm min-w-[120px]">Title</TableHead>
                      <TableHead className="text-xs md:text-sm min-w-[100px]">Author</TableHead>
                      <TableHead className="text-xs md:text-sm min-w-[80px]">Price</TableHead>
                      <TableHead className="text-xs md:text-sm min-w-[80px]">Status</TableHead>
                      <TableHead className="text-xs md:text-sm min-w-[100px]">Seller</TableHead>
                      <TableHead className="text-xs md:text-sm min-w-[80px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {listings.map((listing) => (
                      <TableRow key={listing.id}>
                        <TableCell className="text-xs md:text-sm font-medium">{listing.title}</TableCell>
                        <TableCell className="text-xs md:text-sm">{listing.author}</TableCell>
                        <TableCell className="text-xs md:text-sm">R{listing.price}</TableCell>
                        <TableCell>
                          <Badge variant={listing.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                            {listing.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs md:text-sm">{listing.user}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleListingAction(listing.id, 'delete')}
                            className="h-7 w-7 p-0 md:h-8 md:w-auto md:px-2"
                          >
                            <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                            {!isMobile && <span className="ml-1">Delete</span>}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg md:text-xl">Site Configuration</CardTitle>
              <CardDescription className="text-sm">Manage site-wide settings and features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Broadcast Message</h4>
                <p className="text-xs text-gray-500 mb-2">
                  Messages will appear as pop-ups for offline users and notifications for active users
                </p>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                  <Input
                    placeholder="Enter message to send to all users..."
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    className="flex-1 text-sm"
                  />
                  <Button onClick={handleSendBroadcast} className="w-full md:w-auto">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Listing Settings</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm">Auto-approve new listings</span>
                    <Badge variant="default" className="text-xs">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm">User registration</span>
                    <Button variant="outline" size="sm" className="h-7 w-7 p-0 md:h-8 md:w-auto md:px-2">
                      <Settings className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-sm">Maximum images per listing</span>
                    <Button variant="outline" size="sm" className="h-7 w-7 p-0 md:h-8 md:w-auto md:px-2">
                      <Settings className="h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
