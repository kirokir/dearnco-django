export const prerender = false;

import { supabaseAdmin } from '../../../lib/supabase';

export async function GET({ request }: { request: Request }) {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: 'Database not available' }), { status: 503 });
        }

        const { data, error } = await supabaseAdmin
            .from('events')
            .select('*')
            .eq('active', true)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return new Response(JSON.stringify({ events: data || [] }), { status: 200 });

    } catch (e: any) {
        console.error('Fetch Events API Error:', e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
