
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
  
  if (error?.code === 'PGRST200') {
    throw new Error('Database relationship error. Please try again or contact support.');
  }
  
  // Network and connection errors
  if (error?.message?.includes('fetch') || error?.message?.includes('network')) {
    throw new Error('Network error. Please check your connection and try again.');
  }
  
  // Generic error fallback with more context
  const errorMessage = error?.message || 'Unknown error occurred';
  throw new Error(`Failed to ${operation}: ${errorMessage}. Please try again later.`);
};
