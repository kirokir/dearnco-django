import { createClient } from '@supabase/supabase-js';

// Astro-specific environment variables
// Note: PUBLIC_ variables are available in the browser and server.
// Non-PUBLIC_ variables are only available on the server.
const getEnv = (key: string) => {
    // Try import.meta.env (Astro's preferred way)
    // Then fallback to process.env (Vercel/Node runtime)
    return import.meta.env[key] || (typeof process !== 'undefined' ? process.env[key] : '');
};

const supabaseUrl = getEnv('PUBLIC_SUPABASE_URL');
const supabaseAnonKey = getEnv('PUBLIC_SUPABASE_ANON_KEY');
const supabaseServiceKey = getEnv('SUPABASE_SERVICE_ROLE_KEY');

const createSafeClient = (url: string, key: string, label: string) => {
    try {
        if (!url || !key) {
            console.warn(`SafeSupabase [${label}]: Missing URL or Key. Client will be null.`);
            return null;
        }
        
        // Basic URL validation
        if (typeof url !== 'string' || !url.startsWith('http')) {
            console.error(`SafeSupabase [${label}]: Invalid URL provided: ${url}`);
            return null;
        }

        return createClient(url, key, {
            auth: {
                persistSession: false // Critical for SSR/Serverless to avoid memory/storage issues
            }
        });
    } catch (e) {
        console.error(`SafeSupabase [${label}]: Initialization crash caught:`, e);
        return null;
    }
};

// Client for public operations (SSR data fetching)
export const supabase = createSafeClient(supabaseUrl, supabaseAnonKey, 'Public');

// Client for privileged operations (Admin panel writes)
// Falls back to Anon Key if Service Key is missing, but will error on writes
export const supabaseAdmin = createSafeClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey, 'Admin');
