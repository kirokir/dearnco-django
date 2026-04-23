-- Create Redirection Table
CREATE TABLE IF NOT EXISTS redirects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    fqdn TEXT NOT NULL UNIQUE,
    target_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster lookup by FQDN
CREATE INDEX IF NOT EXISTS idx_redirects_fqdn ON redirects(fqdn);
