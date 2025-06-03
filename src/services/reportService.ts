import { supabase } from '@/integrations/supabase/client';

// --- Type Definitions ---
export interface Report {
  id: string;
  reported_user_id: string;
  reporter_user_id: string;
  book_id?: string;
  book_title: string;
  seller_name: string;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  created_at: string;
  updated_at?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  status: 'active' | 'suspended' | 'banned';
  suspension_reason?: string;
  suspended_at?: string;
  created_at: string;
}

// --- Report Submission ---
export interface ReportData {
  reportedUserId: string;
  reporterUserId: string;
  bookId?: string;
  bookTitle: string;
  sellerName: string;
  reason: string;
}

export const submitReport = async (reportData: ReportData): Promise<void> => {
  try {
    const { error } = await supabase
      .from('reports')
      .insert({
        reported_user_id: reportData.reportedUserId,
        reporter_user_id: reportData.reporterUserId,
        book_id: reportData.bookId,
        book_title: reportData.bookTitle,
        seller_name: reportData.sellerName,
        reason: reportData.reason,
        status: 'pending'
      });

    if (error) {
      throw new Error(`Error submitting report: ${error.message}`);
    }
  } catch (error) {
    console.error('Error in submitReport:', error);
    throw error;
  }
};

// --- Fetch All Reports ---
export const getAllReports = async (): Promise<Report[]> => {
  try {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error fetching all reports: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllReports:', error);
    throw error;
  }
};

// --- Fetch Reports by Status ---
export const getReportsByStatus = async (status: 'pending' | 'resolved' | 'dismissed'): Promise<Report[]> => {
  try {
    const { data, error } = await supabase
      .from('reports')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error fetching ${status} reports: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getReportsByStatus:', error);
    throw error;
  }
};

// --- Fetch Suspended Users ---
export const getSuspendedUsers = async (): Promise<UserProfile[]> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('status', 'suspended')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error fetching suspended users: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getSuspendedUsers:', error);
    throw error;
  }
};

// --- Dismiss Report ---
export const dismissReport = async (reportId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('reports')
      .update({ status: 'dismissed', updated_at: new Date().toISOString() })
      .eq('id', reportId);

    if (error) {
      throw new Error(`Error dismissing report: ${error.message}`);
    }
  } catch (error) {
    console.error('Error in dismissReport:', error);
    throw error;
  }
};

// --- Ban User Based on Report ---
export const banUserFromReport = async (reportId: string, reason: string): Promise<void> => {
  try {
    const { data: report, error: reportError } = await supabase
      .from('reports')
      .select('reported_user_id')
      .eq('id', reportId)
      .single();

    if (reportError || !report) {
      throw new Error('Report not found or invalid');
    }

    const { error: banError } = await supabase
      .from('profiles')
      .update({
        status: 'banned',
        suspension_reason: reason,
        suspended_at: new Date().toISOString()
      })
      .eq('id', report.reported_user_id);

    if (banError) {
      throw new Error(`Error banning user: ${banError.message}`);
    }

    const { error: resolveError } = await supabase
      .from('reports')
      .update({ status: 'resolved', updated_at: new Date().toISOString() })
      .eq('id', reportId);

    if (resolveError) {
      throw new Error(`Failed to mark report as resolved: ${resolveError.message}`);
    }
  } catch (error) {
    console.error('Error banning user from report:', error);
    throw error;
  }
};

// --- Suspend User Based on Report ---
export const suspendUserFromReport = async (reportId: string, reason: string): Promise<void> => {
  try {
    const { data: report, error: reportError } = await supabase
      .from('reports')
      .select('reported_user_id')
      .eq('id', reportId)
      .single();

    if (reportError || !report) {
      throw new Error('Report not found or invalid');
    }

    const { error: suspendError } = await supabase
      .from('profiles')
      .update({
        status: 'suspended',
        suspension_reason: reason,
        suspended_at: new Date().toISOString()
      })
      .eq('id', report.reported_user_id);

    if (suspendError) {
      throw new Error(`Error suspending user: ${suspendError.message}`);
    }

    const { error: resolveError } = await supabase
      .from('reports')
      .update({ status: 'resolved', updated_at: new Date().toISOString() })
      .eq('id', reportId);

    if (resolveError) {
      throw new Error(`Failed to mark report as resolved: ${resolveError.message}`);
    }
  } catch (error) {
    console.error('Error suspending user from report:', error);
    throw error;
  }
};
