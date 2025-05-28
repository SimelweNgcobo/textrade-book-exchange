
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
  AdminStats as AdminStatsType
} from '@/services/adminService';

interface DashboardStats extends AdminStatsType {}

interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: 'active' | 'suspended';
  listingsCount: number;
}

interface BookListing {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  status: 'active' | 'sold' | 'pending';
  user: string;
  createdAt: string;
  images: string[];
}

interface AdminAction {
  id: string;
  action: string;
  target: string;
  admin: string;
  timestamp: string;
  details: string;
}

const AdminDashboard = () => {
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
    <div className="space-y-6">
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.newUsersThisWeek} this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeListings}</div>
            <p className="text-xs text-muted-foreground">
              Auto-approved instantly
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Books Sold</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.booksSold}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.salesThisMonth} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reported Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reportedIssues}</div>
            <p className="text-xs text-muted-foreground">
              Pending review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Commission Earnings Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Commission</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R{stats.weeklyCommission.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Last 7 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Commission</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R{stats.monthlyCommission.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Admin Tabs */}
      <Tabs defaultValue="earnings" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="listings">Listings</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Earnings Tab */}
        <TabsContent value="earnings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Commission Earnings</CardTitle>
              <CardDescription>Track your earnings from book sales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Weekly Summary</h4>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">
                      R{stats.weeklyCommission.toFixed(2)}
                    </div>
                    <p className="text-sm text-gray-600">Commission earned this week</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold">Monthly Summary</h4>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">
                      R{stats.monthlyCommission.toFixed(2)}
                    </div>
                    <p className="text-sm text-gray-600">Commission earned this month</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium mb-2">Commission Rate</h5>
                <p className="text-sm text-gray-600">
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
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage registered users and their accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Listings</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.listingsCount}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {user.status === 'active' ? (
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleUserAction(user.id, 'suspend')}
                            >
                              <UserX className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => handleUserAction(user.id, 'activate')}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Listings Tab */}
        <TabsContent value="listings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Book Listings Management</CardTitle>
              <CardDescription>All listings are auto-approved and go live immediately</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell>{listing.title}</TableCell>
                      <TableCell>{listing.author}</TableCell>
                      <TableCell>R{listing.price}</TableCell>
                      <TableCell>
                        <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                          {listing.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{listing.user}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleListingAction(listing.id, 'delete')}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Configuration</CardTitle>
              <CardDescription>Manage site-wide settings and features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Broadcast Message</h4>
                <p className="text-xs text-gray-500 mb-2">
                  Messages will appear as pop-ups for offline users and notifications for active users
                </p>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter message to send to all users..."
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleSendBroadcast}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Listing Settings</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Auto-approve new listings</span>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>User registration</span>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Maximum images per listing</span>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
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
