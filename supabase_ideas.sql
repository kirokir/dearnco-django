-- Run this in Supabase SQL Editor to create the ideas table

CREATE TABLE IF NOT EXISTS ideas (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    project_type TEXT NOT NULL,
    budget TEXT,
    timeline TEXT,
    idea_title TEXT NOT NULL,
    idea_description TEXT NOT NULL,
    target_audience TEXT,
    features TEXT,
    portfolio_url TEXT,
    linkedin TEXT,
    additional_notes TEXT,
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable realtime (optional)
ALTER PUBLICATION supabase_realtime ADD TABLE ideas;
