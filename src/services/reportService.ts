
import { supabase } from '@/integrations/supabase/client';
import { Report } from '@/types/report';

// Mock reports data for now - in a real app this would come from Supabase
const mockReports: Report[] = [
  {
    id: 1,
    type: 'user',
    entityId: 'user-123',
    entityName: 'John Smith',
    entityEmail: 'john.smith@email.com',
    reportedBy: 'reporter-456',
    reporterName: 'Sarah Johnson',
    reason: 'Inappropriate behavior in messages and attempted scam',
    createdAt: '2024-01-15T10:30:00Z',
    severity: 'high',
    status: 'pending'
  },
  {
    id: 2,
    type: 'listing',
    entityId: 'book-789',
    entityName: 'Advanced Physics Textbook',
    reportedBy: 'reporter-321',
    reporterName: 'Mike Davis',
    reason: 'False description - book is in poor condition despite being listed as "like new"',
    createdAt: '2024-01-14T14:22:00Z',
    severity: 'medium',
    status: 'pending'
  },
  {
    id: 3,
    type: 'user',
    entityId: 'user-555',
    entityName: 'Emma Wilson',
    entityEmail: 'emma.wilson@email.com',
    reportedBy: 'reporter-777',
    reporterName: 'Alex Brown',
    reason: 'Never shipped book after payment was made',
    createdAt: '2024-01-13T09:15:00Z',
    severity: 'high',
    status: 'pending'
  }
];

export const getAllReports = async (): Promise<Report[]> => {
  try {
    // In a real app, this would fetch from Supabase reports table
    // For now, return mock data
    return mockReports.filter(report => report.status === 'pending');
  } catch (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }
};

export const dismissReport = async (reportId: number): Promise<void> => {
  try {
    // In a real app, this would update the report status in Supabase
    const reportIndex = mockReports.findIndex(r => r.id === reportId);
    if (reportIndex !== -1) {
      mockReports[reportIndex].status = 'dismissed';
    }
    console.log(`Report ${reportId} dismissed`);
  } catch (error) {
    console.error('Error dismissing report:', error);
    throw error;
  }
};

export const banUserFromReport = async (reportId: number): Promise<void> => {
  try {
    const report = mockReports.find(r => r.id === reportId);
    if (!report || report.type !== 'user') {
      throw new Error('Invalid report or not a user report');
    }

    // Update user status to suspended in Supabase
    const { error } = await supabase
      .from('profiles')
      .update({ status: 'suspended' })
      .eq('id', report.entityId);

    if (error) throw error;

    // Mark report as resolved
    const reportIndex = mockReports.findIndex(r => r.id === reportId);
    if (reportIndex !== -1) {
      mockReports[reportIndex].status = 'resolved';
    }

    console.log(`User ${report.entityName} banned from report ${reportId}`);
  } catch (error) {
    console.error('Error banning user from report:', error);
    throw error;
  }
};
