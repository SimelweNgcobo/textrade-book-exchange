
export interface Broadcast {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  priority: 'low' | 'normal' | 'medium' | 'high' | 'urgent';
  target_audience: 'all' | 'users' | 'admin';
  active: boolean;
  expires_at?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface BroadcastFormData {
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  priority: 'low' | 'normal' | 'medium' | 'high' | 'urgent';
  target_audience: 'all' | 'users' | 'admin';
  expires_at?: string;
}
