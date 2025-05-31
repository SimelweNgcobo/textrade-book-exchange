import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Search, Eye, CheckCircle, XCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ReportRow } from '@/types/supabase-reports';

const ModerationDashboard = () => {
  const [reports, setReports] = useState<ReportRow[]>([]);
  const [filteredReports, setFilteredReports] = useState<ReportRow[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReports();
  }, []);

  useEffect(() => {
    filterReports();
  }, [reports, searchTerm, activeTab]);

  const loadReports = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading reports:', error);
        toast.error('Failed to load reports');
        return;
      }

      if (data) {
        setReports(data as ReportRow[]);
      }
    } catch (error) {
      console.error('Error loading reports:', error);
      toast.error('Failed to load reports');
    } finally {
      setIsLoading(false);
    }
  };

  const filterReports = () => {
    let filtered = reports.filter(report => report.status === activeTab);

    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.seller_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.book_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reason.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredReports(filtered);
  };

  const updateReportStatus = async (reportId: string, status: 'resolved' | 'dismissed') => {
    try {
      const { error } = await supabase
        .from('reports')
        .update({ status })
        .eq('id', reportId);

      if (error) {
        console.error('Error updating report status:', error);
        toast.error('Failed to update report status');
        return;
      }

      toast.success(`Report ${status} successfully`);
      await loadReports();
    } catch (error) {
      console.error('Error updating report status:', error);
      toast.error('Failed to update report status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'dismissed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-book-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <AlertTriangle className="mr-2 h-6 w-6" />
          Content Moderation
        </h2>
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search reports by user name, book title, or reason..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-80"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending" className="flex items-center">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Pending ({reports.filter(r => r.status === 'pending').length})
          </TabsTrigger>
          <TabsTrigger value="resolved" className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4" />
            Resolved ({reports.filter(r => r.status === 'resolved').length})
          </TabsTrigger>
          <TabsTrigger value="dismissed" className="flex items-center">
            <XCircle className="mr-2 h-4 w-4" />
            Dismissed ({reports.filter(r => r.status === 'dismissed').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredReports.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <AlertTriangle className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p className="text-gray-600">
                  {searchTerm ? 'No reports match your search criteria' : `No ${activeTab} reports found`}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredReports.map((report) => (
              <Card key={report.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                      Report for "{report.book_title}"
                    </CardTitle>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Seller:</span> {report.seller_name}
                    </div>
                    <div>
                      <span className="font-medium">Reported:</span> {formatDate(report.created_at)}
                    </div>
                  </div>
                  
                  <div>
                    <span className="font-medium text-sm">Reason:</span>
                    <p className="mt-1 text-gray-700 bg-gray-50 p-3 rounded">{report.reason}</p>
                  </div>

                  {report.status === 'pending' && (
                    <div className="flex gap-2 pt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`/book/${report.book_id}`, '_blank')}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Listing
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => updateReportStatus(report.id, 'resolved')}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Resolve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateReportStatus(report.id, 'dismissed')}
                        className="text-gray-600 hover:text-gray-700"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Dismiss
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ModerationDashboard;
