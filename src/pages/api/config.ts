import { supabaseAdmin } from '../../lib/supabase';

export const prerender = false;

export async function GET({ url }: { url: URL }) {
    try {
        if (!supabaseAdmin) {
            console.error('API Config GET: Supabase client not initialized.');
            return new Response(JSON.stringify({ 
                error: 'Supabase client not initialized.',
                details: 'Connection parameters missing or invalid.'
            }), { status: 503 }); // 503 Service Unavailable
        }

        const key = url.searchParams.get('key') || 'primary_settings';

        const { data, error } = await supabaseAdmin
            .from('site_config')
            .select('data')
            .eq('key', key)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error(`API Config GET [${key}] Error:`, error);
            return new Response(JSON.stringify({ error: 'Database query failed', message: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify(data?.data || {}), { status: 200 });
    } catch (e: any) {
        console.error('API Config GET Critical Error:', e);
        return new Response(JSON.stringify({
            error: 'Internal Server Error',
            message: e.message
        }), { status: 500 });
    }
}

export async function POST({ request }: { request: Request }) {
    try {
        if (!supabaseAdmin) {
            console.error('API Config POST: Supabase client not initialized.');
            return new Response(JSON.stringify({
                error: 'Supabase client not initialized.'
            }), { status: 503 });
        }
        const body = await request.json();

        // Support saving specific keys (e.g. enterprise_assets)
        const key = body.key || 'primary_settings';
        const data = body.key ? body.value : body; // If key is provided, use .value as the data

        const { data: existing, error: selectError } = await supabaseAdmin
            .from('site_config')
            .select('id')
            .eq('key', key)
            .single();

        if (selectError && selectError.code !== 'PGRST116') {
             console.error(`API Config POST [${key}] Select Error:`, selectError);
             return new Response(JSON.stringify({ error: 'Database select failed', message: selectError.message }), { status: 500 });
        }

        let error;
        if (existing) {
            const res = await supabaseAdmin.from('site_config').update({ data }).eq('key', key);
            error = res.error;
        } else {
            const res = await supabaseAdmin.from('site_config').insert({ key, data });
            error = res.error;
        }

        if (error) {
            console.error(`API Config POST [${key}] Save Error:`, error);
            return new Response(JSON.stringify({ error: 'Database save failed', message: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e: any) {
        console.error('API Config POST Critical Error:', e);
        return new Response(JSON.stringify({
            error: 'Internal Server Error',
            message: e.message
        }), { status: 500 });
    }
}
