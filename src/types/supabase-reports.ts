
export interface ReportRow {
  id: string;
  book_id: string;
  reporter_user_id: string;
  reported_user_id: string;
  book_title: string;
  seller_name: string;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  created_at: string;
  updated_at: string;
}

export interface ReportInsert {
  book_id: string;
  reporter_user_id: string;
  reported_user_id: string;
  book_title: string;
  seller_name: string;
  reason: string;
  status?: 'pending' | 'resolved' | 'dismissed';
}

export interface ReportUpdate {
  status?: 'pending' | 'resolved' | 'dismissed';
  reason?: string;
}
