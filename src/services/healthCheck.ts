
import { supabase } from '@/integrations/supabase/client';

export interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'unhealthy';
  checks: {
    database: boolean;
    authentication: boolean;
    environment: boolean;
  };
  errors: string[];
  timestamp: string;
}

export const performHealthCheck = async (): Promise<HealthCheckResult> => {
  const errors: string[] = [];
  let database = false;
  let authentication = false;
  let environment = false;

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

  // Determine overall status
  let status: 'healthy' | 'degraded' | 'unhealthy';
  if (database && authentication && environment) {
    status = 'healthy';
  } else if (database || authentication) {
    status = 'degraded';
  } else {
    status = 'unhealthy';
  }

  return {
    status,
    checks: {
      database,
      authentication,
      environment
    },
    errors,
    timestamp: new Date().toISOString()
  };
};
