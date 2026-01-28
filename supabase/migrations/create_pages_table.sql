-- Create pages table (for guides, blog posts, and other content types)
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'guide', -- 'guide', 'blog', 'page', etc.
  title TEXT NOT NULL,
  subtitle TEXT,
  category TEXT,
  author TEXT DEFAULT 'VCD Team',
  date TEXT,
  read_time TEXT DEFAULT '10 min read',
  status TEXT NOT NULL DEFAULT 'published', -- 'draft', 'published'
  gated BOOLEAN DEFAULT FALSE,
  image TEXT,
  content JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(slug, type) -- Allow same slug for different types
);

-- Enable RLS
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Policies for public reading
CREATE POLICY "Public can read pages" ON pages
  FOR SELECT USING (true);

-- Policies for admin writing
CREATE POLICY "Admins can insert pages" ON pages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = TRUE
    )
  );

CREATE POLICY "Admins can update pages" ON pages
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = TRUE
    )
  );

CREATE POLICY "Admins can delete pages" ON pages
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = TRUE
    )
  );

-- Function to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON pages
FOR EACH ROW
EXECUTE FUNCTION handle_updated_at();

-- Indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_type ON pages(type);
CREATE INDEX IF NOT EXISTS idx_pages_type_slug ON pages(type, slug);

-- Add comment
COMMENT ON TABLE pages IS 'Stores all content pages including guides, blog posts, and other page types';
COMMENT ON COLUMN pages.type IS 'Content type: guide, blog, page, etc.';
