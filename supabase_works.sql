-- Create Works Table for Portfolio
CREATE TABLE IF NOT EXISTS works (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    link TEXT,
    tags TEXT[] DEFAULT '{}',
    sort_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for category and sorting
CREATE INDEX IF NOT EXISTS idx_works_category ON works(category);
CREATE INDEX IF NOT EXISTS idx_works_sort ON works(sort_order);

-- RLS (Optional, depending on your Supabase setup)
-- ALTER TABLE works ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow public read" ON works FOR SELECT USING (true);
