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

export const getAllUsers = getAdminUsers;
export const getAllListings = getAdminListings;
export const deleteBookListing = removeBook;

export const getTotalUsers = async (): Promise<number> => {
  const stats = await getAdminStats();
  return stats.totalUsers;
};

export const getTotalCommission = async (): Promise<number> => {
  const stats = await getAdminStats();
  return stats.weeklyCommission + stats.monthlyCommission;
};
