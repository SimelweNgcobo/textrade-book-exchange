
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Flag, UserX } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import ReportFilters from './reports/ReportFilters';
import ReportActions from './reports/ReportActions';

interface Report {
  id: string;
  book_title: string;
  seller_name: string;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  created_at: string;
  reporter_user_id: string;
  reported_user_id: string;
  book_id?: string;
}

const EnhancedModerationDashboard = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [filteredReports, setFilteredReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'resolved' | 'dismissed' | 'suspended' | 'all'>('pending');
  const [actionReason, setActionReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadReports();
    setupRealtimeSubscription();
  }, []);

  useEffect(() => {
    filterReports();
  }, [reports, activeTab]);

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('reports-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reports'
        },
        () => {
          loadReports();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const loadReports = async () => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading reports:', error);
        toast.error('Failed to load reports');
        return;
      }

      const typedReports: Report[] = (data || []).map(report => ({
        ...report,
        status: report.status as 'pending' | 'resolved' | 'dismissed'
      }));

      setReports(typedReports);
    } catch (error) {
      console.error('Error in loadReports:', error);
      toast.error('Failed to load reports');
    } finally {
      setIsLoading(false);
    }
  };

  const filterReports = () => {
    let filtered = reports;
    
    switch (activeTab) {
      case 'pending':
        filtered = reports.filter(r => r.status === 'pending');
        break;
      case 'resolved':
        filtered = reports.filter(r => r.status === 'resolved');
        break;
      case 'dismissed':
        filtered = reports.filter(r => r.status === 'dismissed');
        break;
      case 'suspended':
        filtered = reports;
        break;
      case 'all':
        filtered = reports;
        break;
    }
    
    setFilteredReports(filtered);
  };

  const updateReportStatus = async (reportId: string, status: 'resolved' | 'dismissed') => {
    try {
      const { error } = await supabase
        .from('reports')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', reportId);

      if (error) {
        console.error('Error updating report:', error);
        toast.error('Failed to update report status');
        return;
      }

      toast.success(`Report ${status} successfully`);
    } catch (error) {
      console.error('Error in updateReportStatus:', error);
      toast.error('Failed to update report status');
    }
  };

  const handleUserAction = async (userId: string, action: 'ban' | 'suspend', reason: string) => {
    try {
      setIsSubmitting(true);
      
      const status = action === 'ban' ? 'banned' : 'suspended';
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          status,
          suspension_reason: reason,
          suspended_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (profileError) {
        console.error('Error updating user status:', profileError);
        toast.error(`Failed to ${action} user`);
        return;
      }

      toast.success(`User ${action === 'ban' ? 'banned' : 'suspended'} successfully`);
      setActionReason('');
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
      toast.error(`Failed to ${action} user`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSeverityColor = (reportCount: number) => {
    if (reportCount >= 3) return 'bg-red-100 text-red-800';
    if (reportCount >= 2) return 'bg-yellow-100 text-yellow-800';
    return 'bg-blue-100 text-blue-800';
  };

  const getSeverityText = (reportCount: number) => {
    if (reportCount >= 3) return 'High';
    if (reportCount >= 2) return 'Medium';
    return 'Low';
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Flag className="h-5 w-5 text-red-600" />
          <CardTitle>Moderation Dashboard</CardTitle>
        </div>
        <CardDescription>
          Manage user and book reports with real-time updates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReportFilters activeTab={activeTab} onTabChange={setActiveTab} />

        {filteredReports.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No reports to review</p>
          </div>
        ) : (
          <ScrollArea className="w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Warning</TableHead>
                  <TableHead>Reporter</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead className="w-[200px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => {
                  const reportCount = filteredReports.filter(r => r.reported_user_id === report.reported_user_id).length;
                  return (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {report.book_id ? (
                            <div className="flex items-center gap-1 text-blue-600">
                              <Flag className="h-4 w-4" />
                              <span>Listing</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-purple-600">
                              <UserX className="h-4 w-4" />
                              <span>User</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {report.book_id ? report.book_title : report.seller_name}
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        N/A
                      </TableCell>
                      <TableCell>
                        {reportCount >= 2 && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            Warning
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">Reporter #{report.reporter_user_id.slice(-8)}</span>
                      </TableCell>
                      <TableCell>
                        {new Date(report.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(reportCount)}>
                          {getSeverityText(reportCount)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <ReportActions
                          report={report}
                          actionReason={actionReason}
                          setActionReason={setActionReason}
                          isSubmitting={isSubmitting}
                          onUpdateStatus={updateReportStatus}
                          onUserAction={handleUserAction}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedModerationDashboard;
