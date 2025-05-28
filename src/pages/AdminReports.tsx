
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Flag, 
  User, 
  BookIcon, 
  Check, 
  X, 
  AlertTriangle, 
  UserX,
  Eye,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Users
} from 'lucide-react';
import { Report, UserReport, ReportType, ReportSeverity, ReportStatus } from '@/types/report';
import { getAllUsers, updateUserStatus, AdminUser } from '@/services/adminService';

const AdminReports = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      toast.error('You do not have permission to access this page');
      navigate('/');
    }
  }, [isAdmin, navigate]);
  
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBanDialogOpen, setIsBanDialogOpen] = useState(false);
  const [isUserActionDialogOpen, setIsUserActionDialogOpen] = useState(false);
  const [banReason, setBanReason] = useState('');
  const [reports, setReports] = useState<Report[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [userWarningLevels, setUserWarningLevels] = useState<Record<string, 'none' | 'yellow' | 'red'>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Load users
      const usersData = await getAllUsers();
      setUsers(usersData);

      // Mock reports data - in real app this would come from database
      const mockReports: Report[] = [
        {
          id: 1,
          type: 'listing' as ReportType,
          entityId: 'book-1',
          entityName: 'Calculus Textbook',
          reportedBy: 'user-123',
          reporterName: 'Jane Smith',
          reason: 'Price seems suspiciously low, potential scam',
          createdAt: '2025-05-18T10:30:00',
          severity: 'high' as ReportSeverity,
          status: 'pending' as ReportStatus
        },
        {
          id: 2,
          type: 'user' as ReportType,
          entityId: 'user-456',
          entityName: 'John Doe',
          entityEmail: 'john.doe@university.edu',
          reportedBy: 'user-789',
          reporterName: 'Alice Johnson',
          reason: 'User did not show up for book exchange',
          createdAt: '2025-05-17T14:20:00',
          severity: 'medium' as ReportSeverity,
          status: 'pending' as ReportStatus
        },
        {
          id: 3,
          type: 'user' as ReportType,
          entityId: 'user-555',
          entityName: 'David Smith',
          entityEmail: 'david.smith@university.edu',
          reportedBy: 'user-123',
          reporterName: 'Jane Smith',
          reason: 'Sent threatening messages',
          createdAt: '2025-05-14T11:30:00',
          severity: 'high' as ReportSeverity,
          status: 'pending' as ReportStatus
        }
      ];
      
      setReports(mockReports);

      // Calculate warning levels
      const userReportCounts: Record<string, number> = {};
      const userReports = mockReports.filter(r => r.type === 'user');
      
      userReports.forEach(report => {
        const userId = report.entityId;
        userReportCounts[userId] = (userReportCounts[userId] || 0) + 1;
      });

      const warningLevels: Record<string, 'none' | 'yellow' | 'red'> = {};
      Object.entries(userReportCounts).forEach(([userId, count]) => {
        if (count >= 3) {
          warningLevels[userId] = 'red';
        } else if (count >= 1) {
          warningLevels[userId] = 'yellow';
        } else {
          warningLevels[userId] = 'none';
        }
      });

      setUserWarningLevels(warningLevels);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setIsDialogOpen(true);
  };

  const handleUserAction = async (user: AdminUser, action: 'suspend' | 'unsuspend') => {
    try {
      const newStatus = action === 'suspend' ? 'suspended' : 'active';
      await updateUserStatus(user.id, newStatus);
      
      // Update local state
      setUsers(users.map(u => 
        u.id === user.id ? { ...u, status: newStatus } : u
      ));
      
      toast.success(`User ${action}ed successfully`);
      setIsUserActionDialogOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
      toast.error(`Failed to ${action} user`);
    }
  };

  const handleBanUser = (report: Report) => {
    setSelectedReport(report);
    setIsBanDialogOpen(true);
  };

  const confirmBanUser = async () => {
    if (!banReason.trim()) {
      toast.error('Please provide a reason for the ban');
      return;
    }
    
    if (selectedReport) {
      try {
        await updateUserStatus(selectedReport.entityId, 'suspended');
        toast.success(`User ${selectedReport.entityName} has been suspended`);
        
        // Update reports
        const updatedReports = reports.map(report => 
          report.id === selectedReport.id 
            ? { ...report, status: 'resolved' as ReportStatus } 
            : report
        );
        setReports(updatedReports);
        
        // Reload users data
        await loadData();
      } catch (error) {
        console.error('Error suspending user:', error);
        toast.error('Failed to suspend user');
      }
    }
    
    setIsBanDialogOpen(false);
    setBanReason('');
  };

  const handleResolveReport = (reportId: number) => {
    const updatedReports = reports.map(report => 
      report.id === reportId 
        ? { ...report, status: 'resolved' as ReportStatus } 
        : report
    );
    setReports(updatedReports);
    setIsDialogOpen(false);
    toast.success('Report marked as resolved');
  };

  const handleDismissReport = (reportId: number) => {
    const updatedReports = reports.map(report => 
      report.id === reportId 
        ? { ...report, status: 'dismissed' as ReportStatus } 
        : report
    );
    setReports(updatedReports);
    setIsDialogOpen(false);
    toast.success('Report dismissed');
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">High</span>;
      case 'medium':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Medium</span>;
      case 'low':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Low</span>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Pending</span>;
      case 'resolved':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Resolved</span>;
      case 'dismissed':
        return <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Dismissed</span>;
      default:
        return null;
    }
  };

  const getUserWarningBadge = (userId: string) => {
    const warningLevel = userWarningLevels[userId] || 'none';
    
    switch (warningLevel) {
      case 'red':
        return (
          <div className="flex items-center">
            <ShieldAlert className="h-4 w-4 text-red-600 mr-1" />
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">High Risk</span>
          </div>
        );
      case 'yellow':
        return (
          <div className="flex items-center">
            <Shield className="h-4 w-4 text-amber-600 mr-1" />
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Warning</span>
          </div>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredReports = activeTab === "all" 
    ? reports 
    : activeTab === "suspended"
    ? []
    : reports.filter(report => report.status === activeTab);

  const suspendedUsers = users.filter(user => user.status === 'suspended');
  const activeUsers = users.filter(user => user.status === 'active');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 text-book-600">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <div className="flex items-center mb-6">
            <Flag className="h-6 w-6 text-red-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-800">Moderation Dashboard</h1>
          </div>

          <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full mb-8">
              <TabsTrigger value="pending">Pending Reports</TabsTrigger>
              <TabsTrigger value="resolved">Resolved Reports</TabsTrigger>
              <TabsTrigger value="dismissed">Dismissed Reports</TabsTrigger>
              <TabsTrigger value="suspended">Suspended Users</TabsTrigger>
              <TabsTrigger value="all">All Reports</TabsTrigger>
            </TabsList>

            {/* Reports Tabs */}
            {activeTab !== "suspended" && (
              <TabsContent value={activeTab}>
                {isLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-book-600"></div>
                  </div>
                ) : filteredReports.length > 0 ? (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead>Reported Entity</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Warning Level</TableHead>
                          <TableHead>Reported By</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Severity</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredReports.map((report) => (
                          <TableRow key={report.id}>
                            <TableCell>
                              <div className="flex items-center">
                                {report.type === 'listing' 
                                  ? <BookIcon className="h-4 w-4 text-blue-500 mr-2" />
                                  : <User className="h-4 w-4 text-purple-500 mr-2" />
                                }
                                {report.type === 'listing' ? 'Listing' : 'User'}
                              </div>
                            </TableCell>
                            <TableCell>{report.entityName}</TableCell>
                            <TableCell>
                              {report.type === 'user' && report.entityEmail ? (
                                <span className="text-sm text-gray-600">{report.entityEmail}</span>
                              ) : (
                                <span className="text-sm text-gray-400">N/A</span>
                              )}
                            </TableCell>
                            <TableCell>
                              {report.type === 'user' && getUserWarningBadge(report.entityId)}
                            </TableCell>
                            <TableCell>{report.reporterName}</TableCell>
                            <TableCell>{formatDate(report.createdAt)}</TableCell>
                            <TableCell>{getSeverityBadge(report.severity)}</TableCell>
                            <TableCell>{getStatusBadge(report.status)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleViewReport(report)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                {report.status === 'pending' && (
                                  <>
                                    {report.type === 'user' && (
                                      <Button 
                                        variant="destructive" 
                                        size="sm"
                                        onClick={() => handleBanUser(report)}
                                      >
                                        <UserX className="h-4 w-4" />
                                      </Button>
                                    )}
                                    <Button 
                                      variant="default" 
                                      size="sm"
                                      className="bg-green-600 hover:bg-green-700"
                                      onClick={() => handleResolveReport(report.id)}
                                    >
                                      <Check className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="secondary" 
                                      size="sm"
                                      onClick={() => handleDismissReport(report.id)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-gray-500">No {activeTab === "all" ? "reports" : `${activeTab} reports`} found.</p>
                  </div>
                )}
              </TabsContent>
            )}

            {/* Suspended Users Tab */}
            <TabsContent value="suspended">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-book-600"></div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <UserX className="h-5 w-5 text-red-600 mr-2" />
                      <h3 className="text-lg font-semibold text-red-800">Suspended Users ({suspendedUsers.length})</h3>
                    </div>
                    <p className="text-sm text-red-600 mt-1">Users who have been suspended from the platform</p>
                  </div>

                  {suspendedUsers.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Join Date</TableHead>
                            <TableHead>Listings</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {suspendedUsers.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>{user.name}</TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>{formatDate(user.joinDate)}</TableCell>
                              <TableCell>{user.listingsCount}</TableCell>
                              <TableCell>
                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  Suspended
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedUser(user);
                                    setIsUserActionDialogOpen(true);
                                  }}
                                  className="text-green-600 hover:text-green-700"
                                >
                                  <ShieldCheck className="h-4 w-4 mr-1" />
                                  Unsuspend
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No suspended users found.</p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Report Detail Dialog */}
        {selectedReport && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <Flag className="h-5 w-5 text-red-600 mr-2" />
                  Report Details
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Type</p>
                  <p className="font-medium flex items-center">
                    {selectedReport.type === 'listing' 
                      ? <BookIcon className="h-4 w-4 text-blue-500 mr-2" />
                      : <User className="h-4 w-4 text-purple-500 mr-2" />
                    }
                    {selectedReport.type === 'listing' ? 'Listing' : 'User'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Reported Entity</p>
                  <p className="font-medium">{selectedReport.entityName}</p>
                </div>
                
                {selectedReport.type === 'user' && selectedReport.entityEmail && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-medium">{selectedReport.entityEmail}</p>
                  </div>
                )}
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Reported By</p>
                  <p className="font-medium">{selectedReport.reporterName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Date</p>
                  <p className="font-medium">{formatDate(selectedReport.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Severity</p>
                  <p>{getSeverityBadge(selectedReport.severity)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <p>{getStatusBadge(selectedReport.status)}</p>
                </div>
                
                {selectedReport.type === 'user' && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Warning Level</p>
                    <p>{getUserWarningBadge(selectedReport.entityId)}</p>
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Report Reason</p>
                <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                  <p>{selectedReport.reason}</p>
                </div>
              </div>
              
              <DialogFooter className="flex justify-end space-x-2">
                {selectedReport.status === 'pending' && (
                  <>
                    {selectedReport.type === 'user' && (
                      <Button 
                        variant="destructive"
                        onClick={() => {
                          setIsDialogOpen(false);
                          setIsBanDialogOpen(true);
                        }}
                      >
                        <UserX className="h-4 w-4 mr-2" />
                        Ban User
                      </Button>
                    )}
                    <Button 
                      variant="default" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleResolveReport(selectedReport.id)}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Resolve
                    </Button>
                    <Button 
                      variant="secondary"
                      onClick={() => handleDismissReport(selectedReport.id)}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Dismiss
                    </Button>
                  </>
                )}
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Ban User Dialog */}
        {selectedReport && (
          <Dialog open={isBanDialogOpen} onOpenChange={setIsBanDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center text-red-600">
                  <UserX className="h-5 w-5 mr-2" />
                  Ban User
                </DialogTitle>
                <DialogDescription>
                  This action will ban {selectedReport.entityName} from using the platform.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="banReason" className="text-sm font-medium">
                    Reason for ban <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="banReason"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={4}
                    value={banReason}
                    onChange={(e) => setBanReason(e.target.value)}
                    placeholder="Provide a reason for banning this user"
                    required
                  />
                </div>
                
                <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
                    <p className="text-sm text-amber-800">
                      This action cannot be easily undone. The user will be notified of the ban reason.
                    </p>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsBanDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmBanUser}>
                  Confirm Ban
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* User Action Dialog */}
        {selectedUser && (
          <Dialog open={isUserActionDialogOpen} onOpenChange={setIsUserActionDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center text-green-600">
                  <ShieldCheck className="h-5 w-5 mr-2" />
                  Unsuspend User
                </DialogTitle>
                <DialogDescription>
                  This will restore {selectedUser.name}'s access to the platform.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="bg-green-50 p-3 rounded-md border border-green-200">
                  <p className="text-sm text-green-800">
                    User will be able to log in and use all platform features again.
                  </p>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsUserActionDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  variant="default" 
                  onClick={() => handleUserAction(selectedUser, 'unsuspend')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Confirm Unsuspend
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </Layout>
  );
};

export default AdminReports;
