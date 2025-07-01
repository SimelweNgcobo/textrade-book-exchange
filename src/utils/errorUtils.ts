
export const logError = (message: string, error: unknown) => {
  console.error(`[Error] ${message}:`, error);
};

export const getErrorMessage = (error: unknown, fallbackMessage: string): string => {
  if (error && typeof error === 'object' && 'message' in error) {
    return (error as { message: string }).message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return fallbackMessage;
};
