import { supabaseAdmin } from '../../lib/supabase';
import dns from 'node:dns/promises';

export const prerender = false;

export async function GET() {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({
                error: 'Supabase client not initialized.',
                details: 'Check PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.'
            }), { status: 500 });
        }
        const { data, error } = await supabaseAdmin
            .from('redirects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (e: any) {
        console.error('API Redirects GET Error:', e);
        return new Response(JSON.stringify({
            error: 'Internal Server Error',
            message: e.message,
            stack: e.stack
        }), { status: 500 });
    }
}

export async function POST({ request }: { request: Request }) {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: 'Supabase client not initialized.' }), { status: 500 });
        }
        const { id, fqdn, target_url } = await request.json();

        if (!fqdn || !target_url) {
            return new Response(JSON.stringify({ error: 'Missing fqdn or target_url' }), { status: 400 });
        }

        // ─── DNS VALIDATION ───
        const expectedIp = '18.133.72.105';
        let resolvedIps: string[] = [];
        let dnsDiagnostics: any = null;

        try {
            resolvedIps = await dns.resolve4(fqdn);
            if (!resolvedIps.includes(expectedIp)) {
                throw new Error('IP mismatch');
            }
        } catch (e) {
            // Fetch diagnostic info for advanced troubleshooting
            try {
                dnsDiagnostics = await dns.resolveAny(fqdn).catch(() => []);
            } catch {
                dnsDiagnostics = [];
            }

            return new Response(JSON.stringify({
                error: 'DNS_VALIDATION_FAILED',
                message: `DNS failure for ${fqdn}, the A record does not resolve to ${expectedIp}`,
                fqdn,
                expected: expectedIp,
                found: resolvedIps,
                diagnostics: dnsDiagnostics
            }), { status: 422 });
        }

        const { error } = await supabaseAdmin
            .from('redirects')
            .upsert({
                id: id || undefined,
                fqdn,
                target_url,
                updated_at: new Date().toISOString()
            });

        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e: any) {
        console.error('API Redirects POST Error:', e);
        return new Response(JSON.stringify({
            error: 'Internal Server Error',
            message: e.message,
            stack: e.stack
        }), { status: 500 });
    }
}

export async function DELETE({ request }: { request: Request }) {
    // ... (rest of DELETE handler remains the same)
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: 'Supabase client not initialized.' }), { status: 500 });
        }
        const url = new URL(request.url);
        const fqdn = url.searchParams.get('fqdn');
        const id = url.searchParams.get('id');

        if (!id && !fqdn) return new Response('Missing id or fqdn', { status: 400 });

        const query = supabaseAdmin.from('redirects').delete();
        if (id) query.eq('id', id);
        else if (fqdn) query.eq('fqdn', fqdn);

        const { error } = await query;

        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e: any) {
        console.error('API Redirects DELETE Error:', e);
        return new Response(JSON.stringify({
            error: 'Internal Server Error',
            message: e.message,
            stack: e.stack
        }), { status: 500 });
    }
}
