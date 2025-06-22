
export const checkConnectionHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/health', {
      method: 'GET',
      timeout: 5000,
    } as RequestInit);
    return response.ok;
  } catch (error) {
    console.error('Connection health check failed:', error);
    return false;
  }
};

export const getConnectionStatus = (): 'online' | 'offline' => {
  return navigator.onLine ? 'online' : 'offline';
};
