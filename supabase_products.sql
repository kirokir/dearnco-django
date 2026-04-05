-- Run this in Supabase SQL Editor to create the products table

CREATE TABLE IF NOT EXISTS products (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    tagline TEXT,
    description TEXT NOT NULL,
    features TEXT,
    category TEXT,
    status TEXT DEFAULT 'active',
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
