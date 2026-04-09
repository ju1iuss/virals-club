-- Collected email addresses from the on-site lead popup (API uses service role)
-- Email is stored normalized (lowercase, trimmed) by the API
CREATE TABLE IF NOT EXISTS newsletter_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  page_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS newsletter_leads_created_at_idx ON newsletter_leads (created_at DESC);

ALTER TABLE newsletter_leads ENABLE ROW LEVEL SECURITY;

-- No public insert/select; writes go through Next.js API with service role key.

CREATE POLICY "Admins can read newsletter leads" ON newsletter_leads
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = TRUE
    )
  );
