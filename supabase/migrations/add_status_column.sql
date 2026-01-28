-- Add status column to pages table
ALTER TABLE pages 
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'published';

-- Add comment
COMMENT ON COLUMN pages.status IS 'Publication status: draft, published';
