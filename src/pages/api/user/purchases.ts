export const prerender = false;

import { supabaseAdmin } from '../../../lib/supabase';

export async function GET({ request }: { request: Request }) {
    try {
        const url = new URL(request.url);
        const email = url.searchParams.get('email');

        if (!email) {
            return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
        }

        if (supabaseAdmin) {
            const { data, error } = await supabaseAdmin
                .from('payments')
                .select('*')
                .eq('customer_email', email)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return new Response(JSON.stringify({ purchases: data || [] }), { status: 200 });
        }

        return new Response(JSON.stringify({ error: 'Database connection failed' }), { status: 500 });

    } catch (e: any) {
        console.error('Fetch Purchases API Error:', e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
