
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Flag, Eye, X, Ban, User, Book } from 'lucide-react';
import { Report } from '@/types/report';
import { getAllReports, dismissReport, banUserFromReport } from '@/services/reportService';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

const AdminReportsTab = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setIsLoading(true);
    try {
      const reportsData = await getAllReports();
      setReports(reportsData);
    } catch (error) {
      console.error('Error loading reports:', error);
      toast.error('Failed to load reports');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismissReport = async (reportId: number) => {
    try {
      await dismissReport(reportId);
      setReports(reports.filter(r => r.id !== reportId));
      toast.success('Report dismissed successfully');
    } catch (error) {
      console.error('Error dismissing report:', error);
      toast.error('Failed to dismiss report');
    }
  };

  const handleBanUser = async (reportId: number) => {
    try {
      await banUserFromReport(reportId);
      setReports(reports.filter(r => r.id !== reportId));
      toast.success('User banned successfully');
    } catch (error) {
      console.error('Error banning user:', error);
      toast.error('Failed to ban user');
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg md:text-xl flex items-center">
          <Flag className="h-5 w-5 mr-2" />
          Report Management
        </CardTitle>
        <CardDescription className="text-sm">
          Review and manage user reports ({reports.length} pending)
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 md:p-6">
        {reports.length === 0 ? (
          <div className="text-center py-12">
            <Flag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No pending reports</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs md:text-sm min-w-[80px]">Type</TableHead>
                  <TableHead className="text-xs md:text-sm min-w-[120px]">Reported</TableHead>
                  <TableHead className="text-xs md:text-sm min-w-[120px]">Reporter</TableHead>
                  <TableHead className="text-xs md:text-sm min-w-[80px]">Severity</TableHead>
                  <TableHead className="text-xs md:text-sm min-w-[100px]">Date</TableHead>
                  <TableHead className="text-xs md:text-sm min-w-[120px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>
                      <div className="flex items-center">
                        {report.type === 'user' ? (
                          <User className="h-4 w-4 text-blue-500" />
                        ) : (
                          <Book className="h-4 w-4 text-green-500" />
                        )}
                        <span className="ml-2 text-xs md:text-sm capitalize">
                          {report.type}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs md:text-sm">
                        <div className="font-medium">{report.entityName}</div>
                        {report.entityEmail && (
                          <div className="text-gray-500 text-xs">
                            {report.entityEmail}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs md:text-sm">
                      <div className="font-medium">{report.reporterName}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getSeverityColor(report.severity)} className="text-xs">
                        {report.severity}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs md:text-sm">
                      {formatDate(report.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedReport(report)}
                              className="h-7 w-7 p-0 md:h-8 md:w-auto md:px-2"
                            >
                              <Eye className="h-3 w-3 md:h-4 md:w-4" />
                              {!isMobile && <span className="ml-1">View</span>}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Report Details</AlertDialogTitle>
                              <AlertDialogDescription asChild>
                                <div className="space-y-3 text-left">
                                  <div>
                                    <strong>Type:</strong> {report.type === 'user' ? 'User Report' : 'Listing Report'}
                                  </div>
                                  <div>
                                    <strong>Reported {report.type}:</strong> {report.entityName}
                                    {report.entityEmail && (
                                      <div className="text-sm text-gray-600 mt-1">
                                        Email: {report.entityEmail}
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <strong>Reported by:</strong> {report.reporterName}
                                  </div>
                                  <div>
                                    <strong>Reason:</strong>
                                    <p className="mt-1 text-gray-700">{report.reason}</p>
                                  </div>
                                  <div>
                                    <strong>Date:</strong> {formatDate(report.createdAt)}
                                  </div>
                                  <div>
                                    <strong>Severity:</strong> 
                                    <Badge variant={getSeverityColor(report.severity)} className="ml-2">
                                      {report.severity}
                                    </Badge>
                                  </div>
                                </div>
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Close</AlertDialogCancel>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 w-7 p-0 md:h-8 md:w-auto md:px-2"
                            >
                              <X className="h-3 w-3 md:h-4 md:w-4" />
                              {!isMobile && <span className="ml-1">Dismiss</span>}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Dismiss Report</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to dismiss this report? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDismissReport(report.id)}>
                                Dismiss
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        {report.type === 'user' && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="destructive"
                                className="h-7 w-7 p-0 md:h-8 md:w-auto md:px-2"
                              >
                                <Ban className="h-3 w-3 md:h-4 md:w-4" />
                                {!isMobile && <span className="ml-1">Ban</span>}
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Ban User</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to ban {report.entityName}? This will suspend their account and they will no longer be able to access the platform.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleBanUser(report.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Ban User
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminReportsTab;
