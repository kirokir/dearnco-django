-- Service Leads table for structured form submissions
CREATE TABLE IF NOT EXISTS service_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    form_type TEXT NOT NULL, -- e.g., 'research_mentorship', 'workshop_booking', 'project_scoping'
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    organization TEXT, -- College / Institution / Company
    metadata JSONB, -- Stores all form-specific dynamic fields
    status TEXT DEFAULT 'new',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for querying by form type
CREATE INDEX IF NOT EXISTS idx_service_leads_form_type ON service_leads(form_type);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_service_leads_updated_at ON service_leads;
CREATE TRIGGER update_service_leads_updated_at
BEFORE UPDATE ON service_leads
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
