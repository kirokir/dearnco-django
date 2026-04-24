-- Create Models Table for Industry Benchmarks
CREATE TABLE IF NOT EXISTS industry_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    benchmark_name TEXT,
    benchmark_url TEXT,
    icon_type TEXT DEFAULT 'generic',
    is_featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for category-based filtering
CREATE INDEX IF NOT EXISTS idx_models_category ON industry_models(category);
CREATE INDEX IF NOT EXISTS idx_models_sort ON industry_models(sort_order);

-- Ensure site_config table exists for section headers
CREATE TABLE IF NOT EXISTS site_config (
    id SERIAL PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    data JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Default configuration for the Models section header
INSERT INTO site_config (key, data)
VALUES ('models_section', '{
    "title": "Framework Library",
    "description": "Standardized architectural models and business frameworks designed to solve specific operational challenges across Indian industry verticals.",
    "collage_url": "/indian_business_models_collage_1776926783752.png"
}')
ON CONFLICT (key) DO NOTHING;
