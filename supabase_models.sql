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
