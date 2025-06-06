
import { supabase } from '@/integrations/supabase/client';

export interface IssueReportData {
  name: string;
  email: string;
  category: string;
  description: string;
  user_id?: string;
}

export interface IssueReport {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  category: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  created_at: string;
  updated_at: string;
  admin_notes?: string;
}

export const submitIssueReport = async (reportData: IssueReportData): Promise<void> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    // For now, store in reports table as a workaround
    const { error } = await supabase
      .from('reports')
      .insert({
        reporter_user_id: user?.id || null,
        reported_user_id: user?.id || null, // Temporary field
        book_id: null,
        book_title: reportData.category,
        seller_name: reportData.name,
        reason: reportData.description,
        status: 'pending'
      });

    if (error) {
      console.error('Error submitting issue report:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in submitIssueReport:', error);
    throw new Error('Failed to submit issue report');
  }
};

export const getAllIssueReports = async (): Promise<IssueReport[]> => {
  try {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching issue reports:', error);
      throw error;
    }

    // Transform reports to issue report format
    return (data || []).map(report => ({
      id: report.id,
      user_id: report.reporter_user_id,
      name: report.seller_name,
      email: '', // Not available in reports table
      category: report.book_title,
      description: report.reason,
      status: report.status === 'pending' ? 'open' : 'resolved',
      created_at: report.created_at,
      updated_at: report.updated_at,
      admin_notes: ''
    }));
  } catch (error) {
    console.error('Error in getAllIssueReports:', error);
    throw new Error('Failed to fetch issue reports');
  }
};

export const updateIssueReportStatus = async (
  reportId: string, 
  status: 'open' | 'in_progress' | 'resolved' | 'closed',
  adminNotes?: string
): Promise<void> => {
  try {
    const reportStatus = status === 'resolved' ? 'resolved' : 'pending';

    const { error } = await supabase
      .from('reports')
      .update({ status: reportStatus })
      .eq('id', reportId);

    if (error) {
      console.error('Error updating issue report:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in updateIssueReportStatus:', error);
    throw new Error('Failed to update issue report');
  }
};
