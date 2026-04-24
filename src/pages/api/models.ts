import { supabaseAdmin } from '../../lib/supabase';

export const prerender = false;

export async function GET() {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: 'Supabase not initialized.' }), { status: 500 });
        }
        const { data, error } = await supabaseAdmin
            .from('industry_models')
            .select('*')
            .order('sort_order', { ascending: true });

        if (error) throw error;
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (e: any) {
        console.error('API Models GET Error:', e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

export async function POST({ request }: { request: Request }) {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: 'Supabase not initialized.' }), { status: 500 });
        }
        const body = await request.json();

        if (!body.title || !body.description) {
            return new Response(JSON.stringify({ error: 'Title and description are required.' }), { status: 400 });
        }

        const payload: any = {
            title: body.title,
            description: body.description,
            category: body.category || 'General',
            benchmark_name: body.benchmark_name || null,
            benchmark_url: body.benchmark_url || null,
            icon_type: body.icon_type || 'generic',
            is_featured: body.is_featured ?? false,
            sort_order: body.sort_order ?? 0,
            updated_at: new Date().toISOString()
        };

        if (body.id) {
            const { error } = await supabaseAdmin
                .from('industry_models')
                .update(payload)
                .eq('id', body.id);
            if (error) throw error;
        } else {
            const { error } = await supabaseAdmin
                .from('industry_models')
                .insert(payload);
            if (error) throw error;
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e: any) {
        console.error('API Models POST Error:', e);
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
            .from('industry_models')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e: any) {
        console.error('API Models DELETE Error:', e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
