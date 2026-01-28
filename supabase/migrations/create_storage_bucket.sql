-- Create a bucket for content images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('content-images', 'content-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to read images
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'content-images');

-- Allow admins to upload images
CREATE POLICY "Admin Upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'content-images' 
    AND (EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = TRUE
    ))
  );

-- Allow admins to delete images
CREATE POLICY "Admin Delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'content-images' 
    AND (EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = TRUE
    ))
  );
