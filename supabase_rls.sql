-- ============================================================
-- KINBO TECHNOLOGIES — Supabase Row Level Security (RLS)
-- Run this in Supabase SQL Editor to lock down all tables.
-- After enabling RLS, only the service_role key bypasses policies.
-- The anon key will respect these policies.
-- ============================================================

-- ─── 1. site_config — NO public access ───
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Deny all public access to site_config" ON site_config;
CREATE POLICY "Deny all public access to site_config"
  ON site_config
  FOR ALL
  USING (false);

-- ─── 2. payments — NO public access ───
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Deny all public access to payments" ON payments;
CREATE POLICY "Deny all public access to payments"
  ON payments
  FOR ALL
  USING (false);

-- ─── 3. redirects — NO public access ───
ALTER TABLE redirects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Deny all public access to redirects" ON redirects;
CREATE POLICY "Deny all public access to redirects"
  ON redirects
  FOR ALL
  USING (false);

-- ─── 4. service_leads — Anon INSERT only (role-restricted) ───
ALTER TABLE service_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert on service_leads" ON service_leads;
DROP POLICY IF EXISTS "Deny public select on service_leads" ON service_leads;
DROP POLICY IF EXISTS "Deny public update on service_leads" ON service_leads;
DROP POLICY IF EXISTS "Deny public delete on service_leads" ON service_leads;
DROP POLICY IF EXISTS "Allow anon insert on service_leads" ON service_leads;

CREATE POLICY "Allow anon insert on service_leads"
  ON service_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- No SELECT/UPDATE/DELETE for anon
-- service_role bypasses RLS automatically

-- ─── 5. ideas — Anon INSERT only (role-restricted) ───
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert on ideas" ON ideas;
DROP POLICY IF EXISTS "Deny public select on ideas" ON ideas;
DROP POLICY IF EXISTS "Deny public update on ideas" ON ideas;
DROP POLICY IF EXISTS "Deny public delete on ideas" ON ideas;
DROP POLICY IF EXISTS "Allow anon insert on ideas" ON ideas;

CREATE POLICY "Allow anon insert on ideas"
  ON ideas
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- ─── 6. posts — Public SELECT only ───
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on posts" ON posts;
DROP POLICY IF EXISTS "Deny public write on posts" ON posts;
DROP POLICY IF EXISTS "Deny public update on posts" ON posts;
DROP POLICY IF EXISTS "Deny public delete on posts" ON posts;
DROP POLICY IF EXISTS "Allow anon read on posts" ON posts;

CREATE POLICY "Allow anon read on posts"
  ON posts
  FOR SELECT
  TO anon
  USING (true);

-- ─── 7. products — Public SELECT only ───
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on products" ON products;
DROP POLICY IF EXISTS "Deny public write on products" ON products;
DROP POLICY IF EXISTS "Deny public update on products" ON products;
DROP POLICY IF EXISTS "Deny public delete on products" ON products;
DROP POLICY IF EXISTS "Allow anon read on products" ON products;

CREATE POLICY "Allow anon read on products"
  ON products
  FOR SELECT
  TO anon
  USING (true);

-- ─── 8. industry_models — Public SELECT only ───
ALTER TABLE industry_models ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read on industry_models" ON industry_models;
DROP POLICY IF EXISTS "Deny public write on industry_models" ON industry_models;
DROP POLICY IF EXISTS "Deny public update on industry_models" ON industry_models;
DROP POLICY IF EXISTS "Deny public delete on industry_models" ON industry_models;
DROP POLICY IF EXISTS "Allow anon read on industry_models" ON industry_models;

CREATE POLICY "Allow anon read on industry_models"
  ON industry_models
  FOR SELECT
  TO anon
  USING (true);

-- ─── 9. works — Public SELECT only (was MISSING RLS — CRITICAL) ───
ALTER TABLE works ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anon read on works" ON works;
CREATE POLICY "Allow anon read on works"
  ON works
  FOR SELECT
  TO anon
  USING (true);

-- ============================================================
-- FIX: Function Search Path Mutable
-- The update_updated_at_column() function needs a fixed search_path
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$;

-- ============================================================
-- NOTES:
-- 1. service_role key (used in server-side APIs) bypasses ALL RLS.
-- 2. anon key now only has INSERT on ideas/service_leads,
--    SELECT on posts/products/industry_models/works.
-- 3. The "RLS Policy Always True" warnings for ideas/service_leads
--    are resolved by restricting policies TO anon role specifically.
-- 4. The works table RLS is now enabled (was CRITICAL).
-- 5. The function search path is now immutable.
-- ============================================================
