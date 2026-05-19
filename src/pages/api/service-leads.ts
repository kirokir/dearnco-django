import { supabaseAdmin } from '../../lib/supabase';

export const prerender = false;

export async function GET({ url }: { url: URL }) {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: 'Supabase not initialized.' }), { status: 500 });
        }
        const { data, error } = await supabaseAdmin
            .from('service_leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (e: any) {
        console.error('API Service Leads GET Error:', e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

export async function POST({ request }: { request: Request }) {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: 'Supabase not initialized.' }), { status: 500 });
        }
        const body = await request.json();

        // Validate required fields
        const required = ['form_type', 'name', 'email'];
        for (const field of required) {
            if (!body[field] || typeof body[field] !== 'string' || !body[field].trim()) {
                return new Response(JSON.stringify({ error: `Missing required field: ${field}` }), { status: 400 });
            }
        }

        const { error } = await supabaseAdmin
            .from('service_leads')
            .insert({
                form_type: body.form_type,
                name: body.name,
                email: body.email,
                phone: body.phone || null,
                organization: body.organization || null,
                metadata: body.metadata || {},
                status: 'new'
            });

        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e: any) {
        console.error('API Service Leads POST Error:', e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

export async function DELETE({ request }: { request: Request }) {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: 'Supabase not initialized.' }), { status: 500 });
        }
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        if (!id) return new Response('Missing id', { status: 400 });

        const { error } = await supabaseAdmin
            .from('service_leads')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e: any) {
        console.error('API Service Leads DELETE Error:', e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
