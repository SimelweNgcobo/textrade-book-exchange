
export const handleBookServiceError = (error: any, operation: string): never => {
  console.error(`Error in ${operation}:`, error);
  
  if (error?.message?.includes('JWT')) {
    throw new Error('Authentication required. Please log in and try again.');
  }
  
  if (error?.message?.includes('Row Level Security')) {
    throw new Error('Access denied. You do not have permission to perform this action.');
  }
  
  if (error?.code === 'PGRST116') {
    throw new Error('The requested resource was not found.');
  }
  
  throw new Error(`Failed to ${operation}. Please try again later.`);
};
