
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
  Search
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

interface DashboardStats {
  totalUsers: number;
  activeListings: number;
  booksSold: number;
  reportedIssues: number;
  newUsersThisWeek: number;
  salesThisMonth: number;
}

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
  status: 'active' | 'pending' | 'sold' | 'rejected';
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
    salesThisMonth: 0
  });

  const [users, setUsers] = useState<User[]>([]);
  const [listings, setListings] = useState<BookListing[]>([]);
  const [adminActions, setAdminActions] = useState<AdminAction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedListing, setSelectedListing] = useState<BookListing | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isListingDialogOpen, setIsListingDialogOpen] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Mock data - in real implementation, fetch from API
      setStats({
        totalUsers: 1247,
        activeListings: 342,
        booksSold: 128,
        reportedIssues: 7,
        newUsersThisWeek: 23,
        salesThisMonth: 45
      });

      setUsers([
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          joinDate: '2025-01-15',
          status: 'active',
          listingsCount: 5
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          joinDate: '2025-01-10',
          status: 'suspended',
          listingsCount: 2
        }
      ]);

      setListings([
        {
          id: '1',
          title: 'Calculus Textbook',
          author: 'James Stewart',
          category: 'Mathematics',
          price: 120,
          status: 'active',
          user: 'John Doe',
          createdAt: '2025-01-20',
          images: ['image1.jpg', 'image2.jpg', 'image3.jpg']
        },
        {
          id: '2',
          title: 'Physics 101',
          author: 'Halliday',
          category: 'Science',
          price: 85,
          status: 'pending',
          user: 'Jane Smith',
          createdAt: '2025-01-18',
          images: ['image4.jpg', 'image5.jpg']
        }
      ]);

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
          action: 'Listing Deleted',
          target: 'Physics Textbook',
          admin: 'Admin User',
          timestamp: '2025-01-19T15:45:00Z',
          details: 'Deleted inappropriate listing'
        }
      ]);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserAction = async (userId: string, action: 'suspend' | 'reactivate' | 'reset-password') => {
    try {
      // In real implementation, call API
      const user = users.find(u => u.id === userId);
      if (!user) return;

      let message = '';
      switch (action) {
        case 'suspend':
          user.status = 'suspended';
          message = `User ${user.name} has been suspended`;
          break;
        case 'reactivate':
          user.status = 'active';
          message = `User ${user.name} has been reactivated`;
          break;
        case 'reset-password':
          message = `Password reset email sent to ${user.email}`;
          break;
      }

      setUsers([...users]);
      toast.success(message);
      
      // Log admin action
      const newAction: AdminAction = {
        id: Date.now().toString(),
        action: action === 'reset-password' ? 'Password Reset' : action === 'suspend' ? 'User Suspended' : 'User Reactivated',
        target: user.email,
        admin: 'Current Admin',
        timestamp: new Date().toISOString(),
        details: message
      };
      setAdminActions([newAction, ...adminActions]);
    } catch (error) {
      console.error('Error performing user action:', error);
      toast.error('Failed to perform action');
    }
  };

  const handleListingAction = async (listingId: string, action: 'approve' | 'reject' | 'delete') => {
    try {
      const listing = listings.find(l => l.id === listingId);
      if (!listing) return;

      let message = '';
      switch (action) {
        case 'approve':
          listing.status = 'active';
          message = `Listing "${listing.title}" has been approved`;
          break;
        case 'reject':
          listing.status = 'rejected';
          message = `Listing "${listing.title}" has been rejected`;
          break;
        case 'delete':
          setListings(listings.filter(l => l.id !== listingId));
          message = `Listing "${listing.title}" has been deleted`;
          break;
      }

      if (action !== 'delete') {
        setListings([...listings]);
      }
      
      toast.success(message);
      
      // Log admin action
      const newAction: AdminAction = {
        id: Date.now().toString(),
        action: `Listing ${action === 'delete' ? 'Deleted' : action === 'approve' ? 'Approved' : 'Rejected'}`,
        target: listing.title,
        admin: 'Current Admin',
        timestamp: new Date().toISOString(),
        details: message
      };
      setAdminActions([newAction, ...adminActions]);
    } catch (error) {
      console.error('Error performing listing action:', error);
      toast.error('Failed to perform action');
    }
  };

  const handleViewImages = (images: string[], startIndex: number = 0) => {
    setSelectedImages(images);
    setCurrentImageIndex(startIndex);
    setIsImageViewerOpen(true);
  };

  const sendBroadcastMessage = async () => {
    if (!broadcastMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }

    try {
      // In real implementation, call API to send broadcast
      toast.success(`Broadcast message sent to all ${stats.totalUsers} users`);
      setBroadcastMessage('');
      
      // Log admin action
      const newAction: AdminAction = {
        id: Date.now().toString(),
        action: 'Broadcast Message Sent',
        target: 'All Users',
        admin: 'Current Admin',
        timestamp: new Date().toISOString(),
        details: `Message: ${broadcastMessage.substring(0, 50)}...`
      };
      setAdminActions([newAction, ...adminActions]);
    } catch (error) {
      console.error('Error sending broadcast:', error);
      toast.error('Failed to send broadcast message');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      pending: "secondary",
      suspended: "destructive",
      rejected: "destructive",
      sold: "outline"
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredListings = listings.filter(listing =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    listing.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              Books available for sale
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

      {/* Main Admin Tabs */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="listings">Book Listings</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Site Settings</TabsTrigger>
        </TabsList>

        {/* User Management Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage all registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Listings</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.listingsCount}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsUserDialogOpen(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {user.status === 'active' ? (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleUserAction(user.id, 'suspend')}
                          >
                            <UserX className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleUserAction(user.id, 'reactivate')}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Book Listings Tab */}
        <TabsContent value="listings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Book Listings Management</CardTitle>
              <CardDescription>View and manage all book listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2 mb-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search listings by title, author, or user..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredListings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell className="font-medium">{listing.title}</TableCell>
                      <TableCell>{listing.author}</TableCell>
                      <TableCell>{listing.category}</TableCell>
                      <TableCell>R{listing.price}</TableCell>
                      <TableCell>{listing.user}</TableCell>
                      <TableCell>{getStatusBadge(listing.status)}</TableCell>
                      <TableCell>{new Date(listing.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewImages(listing.images)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {listing.status === 'pending' && (
                          <>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() => handleListingAction(listing.id, 'approve')}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleListingAction(listing.id, 'reject')}
                            >
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleListingAction(listing.id, 'delete')}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reported Issues</CardTitle>
              <CardDescription>Review and manage reported content</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                You can access detailed reports in the{' '}
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() => window.location.href = '/admin/reports'}
                >
                  Admin Reports section
                </Button>
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Logs</CardTitle>
              <CardDescription>View site trends and admin activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Recent Admin Actions</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Admin</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminActions.map((action) => (
                      <TableRow key={action.id}>
                        <TableCell className="font-medium">{action.action}</TableCell>
                        <TableCell>{action.target}</TableCell>
                        <TableCell>{action.admin}</TableCell>
                        <TableCell>{new Date(action.timestamp).toLocaleString()}</TableCell>
                        <TableCell>{action.details}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Site Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Configuration</CardTitle>
              <CardDescription>Manage site-wide settings and features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Broadcast Message</h4>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter message to send to all users..."
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={sendBroadcastMessage}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Feature Controls</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Allow new listings</span>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
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

      {/* Image Viewer Dialog */}
      <Dialog open={isImageViewerOpen} onOpenChange={setIsImageViewerOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Listing Images</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedImages.length > 0 && (
              <div className="text-center">
                <img
                  src={selectedImages[currentImageIndex]}
                  alt={`Image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-[60vh] mx-auto rounded-lg"
                />
                <div className="mt-4 flex justify-center space-x-2">
                  {selectedImages.map((_, index) => (
                    <Button
                      key={index}
                      variant={index === currentImageIndex ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentImageIndex(index)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* User Details Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <strong>Name:</strong> {selectedUser.name}
              </div>
              <div>
                <strong>Email:</strong> {selectedUser.email}
              </div>
              <div>
                <strong>Join Date:</strong> {new Date(selectedUser.joinDate).toLocaleDateString()}
              </div>
              <div>
                <strong>Status:</strong> {getStatusBadge(selectedUser.status)}
              </div>
              <div>
                <strong>Total Listings:</strong> {selectedUser.listingsCount}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
              Close
            </Button>
            {selectedUser && (
              <Button
                onClick={() => handleUserAction(selectedUser.id, 'reset-password')}
              >
                Reset Password
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
