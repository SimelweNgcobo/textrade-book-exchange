-- Email Change Functionality Database Migration
-- Add columns to support pending email changes

-- Add columns to profiles table for pending email changes
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS pending_email TEXT,
ADD COLUMN IF NOT EXISTS pending_email_token TEXT,
ADD COLUMN IF NOT EXISTS pending_email_expires_at TIMESTAMPTZ;

-- Create index for efficient token lookups
CREATE INDEX IF NOT EXISTS idx_profiles_pending_email_token 
ON profiles(pending_email_token) 
WHERE pending_email_token IS NOT NULL;

-- Create index for efficient expiry cleanup
CREATE INDEX IF NOT EXISTS idx_profiles_pending_email_expires_at 
ON profiles(pending_email_expires_at) 
WHERE pending_email_expires_at IS NOT NULL;

-- Add constraint to ensure pending email is unique when not null
-- This prevents multiple users from requesting the same email
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_pending_email_unique 
ON profiles(pending_email) 
WHERE pending_email IS NOT NULL;

-- Function to clean up expired pending email changes
CREATE OR REPLACE FUNCTION cleanup_expired_pending_emails()
RETURNS void AS $$
BEGIN
  UPDATE profiles 
  SET 
    pending_email = NULL,
    pending_email_token = NULL,
    pending_email_expires_at = NULL
  WHERE 
    pending_email_expires_at IS NOT NULL 
    AND pending_email_expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Create a scheduled job to run cleanup (if you have pg_cron extension)
-- This is optional - you can also run this manually or via a cron job
-- SELECT cron.schedule('cleanup-expired-email-changes', '0 * * * *', 'SELECT cleanup_expired_pending_emails();');

-- Comments for documentation
COMMENT ON COLUMN profiles.pending_email IS 'Stores the new email address while waiting for confirmation';
COMMENT ON COLUMN profiles.pending_email_token IS 'Secure token used to verify email change requests';
COMMENT ON COLUMN profiles.pending_email_expires_at IS 'Expiration timestamp for the email change request (24 hours)';

-- Grant necessary permissions (adjust as needed for your setup)
-- GRANT SELECT, UPDATE ON profiles TO authenticated;

-- Example of Row Level Security (RLS) policies if needed
-- Enable RLS on profiles table
-- ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to read their own pending email status
-- CREATE POLICY "Users can read own pending email" ON profiles
--   FOR SELECT USING (auth.uid() = id);

-- Policy to allow users to update their own pending email
-- CREATE POLICY "Users can update own pending email" ON profiles
--   FOR UPDATE USING (auth.uid() = id);

-- Verification: Check if the migration was successful
DO $$
BEGIN
  -- Check if columns exist
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name IN ('pending_email', 'pending_email_token', 'pending_email_expires_at')
  ) THEN
    RAISE NOTICE 'Email change columns added successfully to profiles table';
  ELSE
    RAISE EXCEPTION 'Failed to add email change columns to profiles table';
  END IF;
  
  -- Check if indexes exist
  IF EXISTS (
    SELECT 1 
    FROM pg_indexes 
    WHERE tablename = 'profiles' 
    AND indexname = 'idx_profiles_pending_email_token'
  ) THEN
    RAISE NOTICE 'Email change indexes created successfully';
  END IF;
END $$;

-- Sample usage queries for testing (uncomment to test)
/*
-- Test inserting a pending email change
UPDATE profiles 
SET 
  pending_email = 'newemail@example.com',
  pending_email_token = 'sample_token_123',
  pending_email_expires_at = NOW() + INTERVAL '24 hours'
WHERE id = 'sample_user_id';

-- Test querying pending changes
SELECT 
  id, 
  email, 
  pending_email, 
  pending_email_expires_at,
  CASE 
    WHEN pending_email_expires_at > NOW() THEN 'Active'
    ELSE 'Expired'
  END as status
FROM profiles 
WHERE pending_email IS NOT NULL;

-- Test cleanup function
SELECT cleanup_expired_pending_emails();
*/
