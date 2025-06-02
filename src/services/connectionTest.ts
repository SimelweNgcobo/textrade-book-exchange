
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
  const requiredVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY'
  ];
  
  const missing: string[] = [];
  
  // Check if Supabase client is properly initialized
  if (!supabase) {
    missing.push('Supabase client initialization failed');
  }
  
  // Note: In browser environment, we can't directly check env vars
  // but we can check if the supabase client has the required config
  try {
    const url = supabase.supabaseUrl;
    const key = supabase.supabaseKey;
    
    if (!url || url === '') {
      missing.push('SUPABASE_URL');
    }
    
    if (!key || key === '') {
      missing.push('SUPABASE_ANON_KEY');
    }
  } catch (error) {
    missing.push('Supabase configuration error');
  }
  
  return {
    valid: missing.length === 0,
    missing
  };
};
