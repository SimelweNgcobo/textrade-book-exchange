
export interface ConnectionHealthResult {
  isHealthy: boolean;
  latency?: number;
  error?: string;
}

export const checkConnectionHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/health', {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    console.error('Connection health check failed:', error);
    return false;
  }
};

export const getConnectionStatus = (): 'online' | 'offline' => {
  return navigator.onLine ? 'online' : 'offline';
};

export const checkConnectionHealthDetailed = async (): Promise<ConnectionHealthResult> => {
  try {
    const startTime = Date.now();
    const response = await fetch('/api/health', {
      method: 'GET',
    });
    const endTime = Date.now();
    
    return {
      isHealthy: response.ok,
      latency: endTime - startTime
    };
  } catch (error) {
    return {
      isHealthy: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};
