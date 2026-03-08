import { supabaseAdmin } from '../../lib/supabase';

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
            .from('site_config')
            .select('data')
            .eq('key', 'primary_settings')
            .single();

        if (error) throw error;
        return new Response(JSON.stringify(data.data), { status: 200 });
    } catch (e: any) {
        console.error('API Config GET Error:', e);
        return new Response(JSON.stringify({
            error: 'Internal Server Error',
            message: e.message,
            stack: e.stack // Exposing stack for debugging as requested
        }), { status: 500 });
    }
}

export async function POST({ request }: { request: Request }) {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({
                error: 'Supabase client not initialized.'
            }), { status: 500 });
        }
        const data = await request.json();
        const { error } = await supabaseAdmin
            .from('site_config')
            .upsert({ key: 'primary_settings', data })
            .eq('key', 'primary_settings');

        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e: any) {
        console.error('API Config POST Error:', e);
        return new Response(JSON.stringify({
            error: 'Internal Server Error',
            message: e.message,
            stack: e.stack
        }), { status: 500 });
    }
}
