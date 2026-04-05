import { supabaseAdmin } from '../../lib/supabase';

export const prerender = false;

export async function GET() {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: 'Supabase not initialized.' }), { status: 500 });
        }
        const { data, error } = await supabaseAdmin
            .from('ideas')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (e: any) {
        console.error('API Ideas GET Error:', e);
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
        const required = ['name', 'email', 'project_type', 'idea_title', 'idea_description'];
        for (const field of required) {
            if (!body[field] || !body[field].trim()) {
                return new Response(JSON.stringify({ error: `Missing required field: ${field}` }), { status: 400 });
            }
        }

        const { error } = await supabaseAdmin
            .from('ideas')
            .insert({
                name: body.name,
                email: body.email,
                phone: body.phone || null,
                project_type: body.project_type,
                budget: body.budget || null,
                timeline: body.timeline || null,
                idea_title: body.idea_title,
                idea_description: body.idea_description,
                target_audience: body.target_audience || null,
                features: body.features || null,
                portfolio_url: body.portfolio_url || null,
                linkedin: body.linkedin || null,
                additional_notes: body.additional_notes || null,
                status: 'new'
            });

        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e: any) {
        console.error('API Ideas POST Error:', e);
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
            .from('ideas')
            .delete()
            .eq('id', parseInt(id));

        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e: any) {
        console.error('API Ideas DELETE Error:', e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
