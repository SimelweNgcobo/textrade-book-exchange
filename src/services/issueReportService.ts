
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
    
    const { error } = await supabase
      .from('issue_reports')
      .insert({
        user_id: user?.id || null,
        name: reportData.name,
        email: reportData.email,
        category: reportData.category,
        description: reportData.description,
        status: 'open'
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
      .from('issue_reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching issue reports:', error);
      throw error;
    }

    return data || [];
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
    const updateData: any = { status };
    if (adminNotes) updateData.admin_notes = adminNotes;

    const { error } = await supabase
      .from('issue_reports')
      .update(updateData)
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
