-- Add welcome_email_sent column to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS welcome_email_sent BOOLEAN DEFAULT FALSE;

-- Add created_at if it doesn't exist (it usually should, but just in case)
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- Create index for faster filtering of unsent emails
CREATE INDEX IF NOT EXISTS idx_profiles_welcome_email_sent ON profiles(welcome_email_sent) WHERE welcome_email_sent = FALSE;
