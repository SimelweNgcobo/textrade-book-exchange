
export type ReportSeverity = 'low' | 'medium' | 'high';
export type ReportStatus = 'pending' | 'resolved' | 'dismissed';
export type ReportType = 'user' | 'listing';

export interface Report {
  id: number;
  type: ReportType;
  entityId: string;
  entityName: string;
  entityEmail?: string; // Added optional email field for user reports
  reportedBy: string;
  reporterName: string;
  reason: string;
  createdAt: string;
  severity: ReportSeverity;
  status: ReportStatus;
}

export interface UserReport extends Report {
  type: 'user';
  reportCount?: number; // Total number of reports for this user
  warningLevel?: 'none' | 'yellow' | 'red'; // Warning level based on report count
}
