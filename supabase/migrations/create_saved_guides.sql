-- Create saved_guides table
CREATE TABLE IF NOT EXISTS saved_guides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  guide_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, guide_id)
);

-- Enable RLS
ALTER TABLE saved_guides ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own saved guides"
  ON saved_guides FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save guides"
  ON saved_guides FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their saved guides"
  ON saved_guides FOR DELETE
  USING (auth.uid() = user_id);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_saved_guides_user_id ON saved_guides(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_guides_guide_id ON saved_guides(guide_id);

-- Add comment
COMMENT ON TABLE saved_guides IS 'Stores guides saved by users for later reading';
