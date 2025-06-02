
export const handleBookServiceError = (error: any, operation: string): never => {
  console.error(`Error in ${operation}:`, error);
  
  // Handle specific Supabase errors
  if (error?.message?.includes('JWT')) {
    throw new Error('Authentication required. Please log in and try again.');
  }
  
  if (error?.message?.includes('Row Level Security')) {
    throw new Error('Access denied. You do not have permission to perform this action.');
  }
  
  if (error?.code === 'PGRST116') {
    throw new Error('The requested resource was not found.');
  }
  
  if (error?.message?.includes('relation') && error?.message?.includes('does not exist')) {
    throw new Error('Database configuration error. Please contact support.');
  }
  
  // Generic error fallback
  throw new Error(`Failed to ${operation}. Please try again later.`);
};
