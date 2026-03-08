import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || '';

const createSafeClient = (url: string, key: string) => {
    try {
        if (!url || !key) return null;
        // Basic URL validation: supabase-js requires a valid URL string
        if (typeof url !== 'string' || !url.startsWith('http')) {
            console.error('SafeSupabase: Invalid URL provided');
            return null;
        }
        return createClient(url, key);
    } catch (e) {
        console.error('SafeSupabase: Initialization crash caught:', e);
        return null;
    }
};

// Client for public operations (SSR data fetching)
export const supabase = createSafeClient(supabaseUrl, supabaseAnonKey);

// Client for privileged operations (Admin panel writes)
export const supabaseAdmin = createSafeClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey);
