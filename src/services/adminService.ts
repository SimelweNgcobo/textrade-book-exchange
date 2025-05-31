// Re-export all functions from admin modules
export * from './admin/adminQueries';
export * from './admin/adminMutations';

// Keep backward compatibility aliases
export { getAdminUsers as getAllUsers } from './admin/adminQueries';
export { getAdminListings as getAllListings } from './admin/adminQueries';
export { removeBook as deleteBookListing } from './admin/adminMutations';

// Additional utility functions
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
