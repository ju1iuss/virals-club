-- Optional hero video URL for pages (Supabase Storage public URL)
ALTER TABLE pages ADD COLUMN IF NOT EXISTS header_video TEXT;

COMMENT ON COLUMN pages.header_video IS 'Public URL for optional header/hero video (e.g. content-videos bucket)';

-- Bucket for uploaded videos (admin write, public read)
INSERT INTO storage.buckets (id, name, public)
VALUES ('content-videos', 'content-videos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read content videos" ON storage.objects
  FOR SELECT USING (bucket_id = 'content-videos');

CREATE POLICY "Admin upload content videos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'content-videos'
    AND (EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = TRUE
    ))
  );

CREATE POLICY "Admin delete content videos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'content-videos'
    AND (EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = TRUE
    ))
  );
