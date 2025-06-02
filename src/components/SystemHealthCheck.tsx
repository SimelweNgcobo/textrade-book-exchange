
import { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { performHealthCheck } from '@/services/connectionTest';

const SystemHealthCheck = () => {
  const [healthStatus, setHealthStatus] = useState<{
    database: boolean;
    config: boolean;
    errors: string[];
    isLoading: boolean;
  }>({
    database: false,
    config: false,
    errors: [],
    isLoading: true
  });

  useEffect(() => {
    const checkSystemHealth = async () => {
      try {
        const health = await performHealthCheck();
        setHealthStatus({
          ...health,
          isLoading: false
        });
      } catch (error) {
        console.error('Health check failed:', error);
        setHealthStatus({
          database: false,
          config: false,
          errors: ['System health check failed'],
          isLoading: false
        });
      }
    };

    checkSystemHealth();
  }, []);

  if (healthStatus.isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
        Checking system health...
      </div>
    );
  }

  if (healthStatus.errors.length > 0) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTitle>System Error</AlertTitle>
        <AlertDescription>
          {healthStatus.errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
          <br />
          Please check your configuration and try again.
        </AlertDescription>
      </Alert>
    );
  }

  if (!healthStatus.database || !healthStatus.config) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTitle>System Unavailable</AlertTitle>
        <AlertDescription>
          The system is currently experiencing issues. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};

export default SystemHealthCheck;
