
export type ReportSeverity = 'low' | 'medium' | 'high';
export type ReportStatus = 'pending' | 'resolved' | 'dismissed';
export type ReportType = 'user' | 'listing';
export type WarningLevel = 'none' | 'warning';

export interface Report {
  id: number;
  type: ReportType;
  entityId: string;
  entityName: string;
  entityEmail?: string;
  reportedBy: string;
  reporterName: string;
  reason: string;
  createdAt: string;
  severity: ReportSeverity;
  status: ReportStatus;
  reportCount?: number; // For tracking multiple reports on same entity
  warningLevel?: WarningLevel;
}

export interface UserReport extends Report {
  type: 'user';
  reportCount?: number;
  warningLevel?: WarningLevel;
}
