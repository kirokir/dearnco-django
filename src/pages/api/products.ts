import { supabaseAdmin } from '../../lib/supabase';

export const prerender = false;

export async function GET() {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: 'Supabase not initialized.' }), { status: 500 });
        }
        const { data, error } = await supabaseAdmin
            .from('products')
            .select('*')
            .order('sort_order', { ascending: true });

        if (error) throw error;
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (e: any) {
        console.error('API Products GET Error:', e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

export async function POST({ request }: { request: Request }) {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: 'Supabase not initialized.' }), { status: 500 });
        }
        const body = await request.json();

        if (!body.name || !body.description) {
            return new Response(JSON.stringify({ error: 'Name and description are required.' }), { status: 400 });
        }

        const payload: any = {
            name: body.name,
            tagline: body.tagline || null,
            description: body.description,
            features: body.features || null,
            category: body.category || null,
            status: body.status || 'active',
            sort_order: body.sort_order ?? 0,
            logo_url: body.logo_url || null,
            screenshots: body.screenshots || [],
            app_store_link: body.app_store_link || null,
            play_store_link: body.play_store_link || null,
        };

        // If id is provided, update; otherwise insert
        if (body.id) {
            const { error } = await supabaseAdmin
                .from('products')
                .update(payload)
                .eq('id', body.id);
            if (error) throw error;
        } else {
            const { error } = await supabaseAdmin
                .from('products')
                .insert(payload);
            if (error) throw error;
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e: any) {
        console.error('API Products POST Error:', e);
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
            .from('products')
            .delete()
            .eq('id', parseInt(id));

        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e: any) {
        console.error('API Products DELETE Error:', e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
