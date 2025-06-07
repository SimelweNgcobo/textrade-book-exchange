
import { supabase } from '@/integrations/supabase/client';

export interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  checks: {
    database: boolean;
    authentication: boolean;
    environment: boolean;
    connectivity: boolean;
  };
  errors: string[];
  timestamp: string;
  responseTime: number;
}

export const performHealthCheck = async (): Promise<HealthCheckResult> => {
  const startTime = Date.now();
  const errors: string[] = [];
  let database = false;
  let authentication = false;
  let environment = false;
  let connectivity = false;

  // Check environment variables
  try {
    const supabaseUrl = "https://kbpjqzaqbqukutflwixf.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImticGpxemFxYnF1a3V0Zmx3aXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NjMzNzcsImV4cCI6MjA2MzEzOTM3N30.3EdAkGlyFv1JRaRw9OFMyA5AkkKoXp0hdX1bFWpLVMc";
    
    if (supabaseUrl && supabaseKey) {
      environment = true;
    } else {
      errors.push('Missing Supabase configuration');
    }
  } catch (error) {
    errors.push('Environment configuration error');
  }

  // Check basic connectivity
  try {
    const response = await fetch('https://kbpjqzaqbqukutflwixf.supabase.co/rest/v1/', {
      method: 'HEAD',
      headers: {
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImticGpxemFxYnF1a3V0Zmx3aXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NjMzNzcsImV4cCI6MjA2MzEzOTM3N30.3EdAkGlyFv1JRaRw9OFMyA5AkkKoXp0hdX1bFWpLVMc'
      }
    });
    
    if (response.ok || response.status === 405) { // 405 is expected for HEAD on some endpoints
      connectivity = true;
    } else {
      errors.push(`Connectivity check failed: ${response.status}`);
    }
  } catch (error) {
    errors.push('Network connectivity error');
  }

  // Check database connection
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
    
    if (!error) {
      database = true;
    } else {
      errors.push(`Database connection failed: ${error.message}`);
    }
  } catch (error) {
    errors.push('Database connection error');
  }

  // Check authentication service
  try {
    const { data, error } = await supabase.auth.getSession();
    if (!error) {
      authentication = true;
    } else {
      errors.push(`Authentication service error: ${error.message}`);
    }
  } catch (error) {
    errors.push('Authentication service unavailable');
  }

  const responseTime = Date.now() - startTime;

  // Determine overall status
  let status: 'healthy' | 'degraded' | 'unhealthy';
  const healthyServices = [database, authentication, environment, connectivity].filter(Boolean).length;
  
  if (healthyServices === 4) {
    status = 'healthy';
  } else if (healthyServices >= 2) {
    status = 'degraded';
  } else {
    status = 'unhealthy';
  }

  return {
    status,
    checks: {
      database,
      authentication,
      environment,
      connectivity
    },
    errors,
    timestamp: new Date().toISOString(),
    responseTime
  };
};

export const getServiceStatusIcon = (isHealthy: boolean) => {
  return isHealthy ? '✅' : '❌';
};

export const getOverallStatusColor = (status: string) => {
  switch (status) {
    case 'healthy':
      return 'text-green-600';
    case 'degraded':
      return 'text-yellow-600';
    case 'unhealthy':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};
