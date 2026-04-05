-- Enterprise Upgrade for KINBO TECHNOLOGIES PRIVATE LIMITED

-- 1. Create products table if it doesn't exist
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    features TEXT,
    category TEXT,
    status TEXT DEFAULT 'active',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Add enterprise columns to products
ALTER TABLE products ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS screenshots TEXT[];
ALTER TABLE products ADD COLUMN IF NOT EXISTS app_store_link TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS play_store_link TEXT;

-- 3. Ensure site_config table exists with correct columns (using 'data' to match existing API)
CREATE TABLE IF NOT EXISTS site_config (
    id SERIAL PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Initial enterprise configuration
-- We'll store this under the 'primary_settings' key to stay compatible with the current API behavior
-- but we'll also provide a dedicated key just in case.
INSERT INTO site_config (key, data)
VALUES ('enterprise_assets', '{
    "hero_video_url": "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-circuit-board-1113-large.mp4",
    "logo_url": "",
    "locations": "INDIA | CHINA | GCC",
    "company_name": "KINBO TECHNOLOGIES PRIVATE LIMITED"
}')
ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data;
