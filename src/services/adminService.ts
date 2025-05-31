
import { supabase } from '@/integrations/supabase/client';

export type { AdminUser, AdminListing, AdminStats } from './admin/adminQueries';
export { 
  getAdminUsers, 
  getAdminListings, 
  getAdminStats 
} from './admin/adminQueries';

export { 
  suspendUser, 
  activateUser, 
  updateUserStatus, 
  removeBook, 
  sendBroadcastMessage 
} from './admin/adminMutations';

// Alias exports for backward compatibility
export { getAdminUsers as getAllUsers } from './admin/adminQueries';
export { getAdminListings as getAllListings } from './admin/adminQueries';
export { removeBook as deleteBookListing } from './admin/adminMutations';

export const getTotalUsers = async (): Promise<number> => {
  const { getAdminStats } = await import('./admin/adminQueries');
  const stats = await getAdminStats();
  return stats.totalUsers;
};

export const getTotalCommission = async (): Promise<number> => {
  const { getAdminStats } = await import('./admin/adminQueries');
  const stats = await getAdminStats();
  return stats.weeklyCommission + stats.monthlyCommission;
};
