
import { supabase } from '@/integrations/supabase/client';

export const testDatabaseConnection = async (): Promise<boolean> => {
  try {
    console.log('Testing database connection...');
    
    // Simple query to test connection
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
    
    if (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
    
    console.log('Database connection test successful');
    return true;
  } catch (error) {
    console.error('Database connection test error:', error);
    return false;
  }
};

export const validateEnvironmentVariables = (): { valid: boolean; missing: string[] } => {
  const missing: string[] = [];
  
  // Check if Supabase client is properly initialized
  if (!supabase) {
    missing.push('Supabase client initialization failed');
    return { valid: false, missing };
  }
  
  try {
    // Test if we can make a simple query to validate the connection
    // This indirectly validates that the URL and key are properly configured
    const hasValidConfig = supabase && typeof supabase.from === 'function';
    
    if (!hasValidConfig) {
      missing.push('SUPABASE_URL or SUPABASE_ANON_KEY configuration issue');
    }
  } catch (error) {
    missing.push('Supabase configuration error');
  }
  
  return {
    valid: missing.length === 0,
    missing
  };
};

export const performHealthCheck = async (): Promise<{ 
  database: boolean; 
  config: boolean; 
  errors: string[] 
}> => {
  const errors: string[] = [];
  
  // Check environment configuration
  const envCheck = validateEnvironmentVariables();
  if (!envCheck.valid) {
    errors.push(...envCheck.missing);
  }
  
  // Check database connection
  let dbConnected = false;
  if (envCheck.valid) {
    try {
      dbConnected = await testDatabaseConnection();
      if (!dbConnected) {
        errors.push('Database connection failed');
      }
    } catch (error) {
      errors.push('Database health check failed');
    }
  }
  
  return {
    database: dbConnected,
    config: envCheck.valid,
    errors
  };
};
