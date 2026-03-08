import { supabaseAdmin } from '../../lib/supabase';

export const prerender = false;

export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from('site_config')
            .select('data')
            .eq('key', 'primary_settings')
            .single();

        if (error) throw error;
        return new Response(JSON.stringify(data.data), { status: 200 });
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

export async function POST({ request }: { request: Request }) {
    try {
        const data = await request.json();
        const { error } = await supabaseAdmin
            .from('site_config')
            .upsert({ key: 'primary_settings', data })
            .eq('key', 'primary_settings');

        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e: any) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
