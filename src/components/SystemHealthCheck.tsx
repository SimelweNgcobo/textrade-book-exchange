
import { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { testDatabaseConnection, validateEnvironmentVariables } from '@/services/connectionTest';

const SystemHealthCheck = () => {
  const [dbStatus, setDbStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [envStatus, setEnvStatus] = useState<{ valid: boolean; missing: string[] }>({ valid: true, missing: [] });

  useEffect(() => {
    const checkSystemHealth = async () => {
      // Check environment variables
      const envCheck = validateEnvironmentVariables();
      setEnvStatus(envCheck);
      
      // Check database connection
      if (envCheck.valid) {
        try {
          const isConnected = await testDatabaseConnection();
          setDbStatus(isConnected ? 'connected' : 'error');
        } catch (error) {
          console.error('Health check failed:', error);
          setDbStatus('error');
        }
      } else {
        setDbStatus('error');
      }
    };

    checkSystemHealth();
  }, []);

  if (!envStatus.valid) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTitle>Configuration Error</AlertTitle>
        <AlertDescription>
          Missing environment variables: {envStatus.missing.join(', ')}
          <br />
          Please check your Supabase configuration.
        </AlertDescription>
      </Alert>
    );
  }

  if (dbStatus === 'error') {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertTitle>Database Connection Error</AlertTitle>
        <AlertDescription>
          Unable to connect to the database. Please check your Supabase configuration and try again.
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};

export default SystemHealthCheck;
