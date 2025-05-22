
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
  DialogDescription, 
  DialogTrigger 
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
  Ban,
  Eye,
  Shield,
  UserX,
  ShieldAlert,
  ShieldCheck
} from 'lucide-react';
import { Report, UserReport } from '@/types/report';

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
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBanDialogOpen, setIsBanDialogOpen] = useState(false);
  const [banReason, setBanReason] = useState('');
  const [reports, setReports] = useState<Report[]>([]);
  const [userWarningLevels, setUserWarningLevels] = useState<Record<string, 'none' | 'yellow' | 'red'>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would fetch from your database
    setTimeout(() => {
      const mockReports = [
        {
          id: 1,
          type: 'listing',
          entityId: 'book-1',
          entityName: 'Calculus Textbook',
          reportedBy: 'user-123',
          reporterName: 'Jane Smith',
          reason: 'Price seems suspiciously low, potential scam',
          createdAt: '2025-05-18T10:30:00',
          severity: 'high',
          status: 'pending'
        },
        {
          id: 2,
          type: 'user',
          entityId: 'user-456',
          entityName: 'John Doe',
          reportedBy: 'user-789',
          reporterName: 'Alice Johnson',
          reason: 'User did not show up for book exchange',
          createdAt: '2025-05-17T14:20:00',
          severity: 'medium',
          status: 'pending'
        },
        {
          id: 3,
          type: 'listing',
          entityId: 'book-2',
          entityName: 'Physics 101',
          reportedBy: 'user-456',
          reporterName: 'John Doe',
          reason: 'Book condition much worse than described',
          createdAt: '2025-05-16T09:15:00',
          severity: 'low',
          status: 'resolved'
        },
        {
          id: 4,
          type: 'user',
          entityId: 'user-321',
          entityName: 'Bob Williams',
          reportedBy: 'user-123',
          reporterName: 'Jane Smith',
          reason: 'Harassing messages after transaction',
          createdAt: '2025-05-15T16:45:00',
          severity: 'high',
          status: 'dismissed'
        },
        // Add more user reports to show warning levels
        {
          id: 5,
          type: 'user',
          entityId: 'user-555',
          entityName: 'David Smith',
          reportedBy: 'user-123',
          reporterName: 'Jane Smith',
          reason: 'Sent threatening messages',
          createdAt: '2025-05-14T11:30:00',
          severity: 'high',
          status: 'pending'
        },
        {
          id: 6,
          type: 'user',
          entityId: 'user-555',
          entityName: 'David Smith',
          reportedBy: 'user-456',
          reporterName: 'John Doe',
          reason: 'Tried to scam me with fake book',
          createdAt: '2025-05-13T09:45:00',
          severity: 'high',
          status: 'pending'
        },
        {
          id: 7,
          type: 'user',
          entityId: 'user-666',
          entityName: 'Mary Johnson',
          reportedBy: 'user-123',
          reporterName: 'Jane Smith',
          reason: 'Didn\'t deliver book as promised',
          createdAt: '2025-05-12T14:20:00',
          severity: 'medium',
          status: 'pending'
        },
      ];
      
      setReports(mockReports);

      // Calculate warning levels based on report counts
      const userReportCounts: Record<string, number> = {};
      const userReports = mockReports.filter(r => r.type === 'user');
      
      userReports.forEach(report => {
        const userId = report.entityId;
        userReportCounts[userId] = (userReportCounts[userId] || 0) + 1;
      });

      // Set warning levels based on count
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
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setIsDialogOpen(true);
  };

  const handleBanUser = (report: Report) => {
    setSelectedReport(report);
    setIsBanDialogOpen(true);
  };

  const confirmBanUser = () => {
    if (!banReason.trim()) {
      toast.error('Please provide a reason for the ban');
      return;
    }
    
    // In a real app, you would call your API to ban the user
    toast.success(`User ${selectedReport.entityName} has been banned`);
    setIsBanDialogOpen(false);
    setBanReason('');
    
    // Update the report status
    const updatedReports = reports.map(report => 
      report.id === selectedReport.id 
        ? { ...report, status: 'resolved' } 
        : report
    );
    setReports(updatedReports);
  };

  const handleResolveReport = (reportId: number) => {
    // In a real app, you would call your API to resolve the report
    const updatedReports = reports.map(report => 
      report.id === reportId 
        ? { ...report, status: 'resolved' } 
        : report
    );
    setReports(updatedReports);
    setIsDialogOpen(false);
    toast.success('Report marked as resolved');
  };

  const handleDismissReport = (reportId: number) => {
    // In a real app, you would call your API to dismiss the report
    const updatedReports = reports.map(report => 
      report.id === reportId 
        ? { ...report, status: 'dismissed' } 
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
    : reports.filter(report => report.status === activeTab);

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
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
              <TabsTrigger value="dismissed">Dismissed</TabsTrigger>
              <TabsTrigger value="all">All Reports</TabsTrigger>
            </TabsList>

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
      </div>
    </Layout>
  );
};

export default AdminReports;
