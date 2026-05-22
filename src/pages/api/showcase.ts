import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const GET: APIRoute = async ({ request }) => {
    try {
        const url = new URL(request.url);
        const type = url.searchParams.get('type');
        const featured = url.searchParams.get('featured');

        let query = supabase.from('showcase_projects').select('*').order('order_index', { ascending: true });
        
        if (type) {
            query = query.eq('type', type);
        }
        if (featured === 'true') {
            query = query.eq('featured', true);
        }

        const { data, error } = await query;

        if (error) throw error;

        return new Response(JSON.stringify(data || []), { status: 200, headers: { 'Content-Type': 'application/json' }});
    } catch (error: any) {
        console.error('Error fetching showcase:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' }});
    }
};

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        
        const { data, error } = await supabase.from('showcase_projects').insert([{
            ...body,
            slug: body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        }]).select();

        if (error) throw error;

        return new Response(JSON.stringify(data[0]), { status: 201, headers: { 'Content-Type': 'application/json' }});
    } catch (error: any) {
        console.error('Error creating showcase:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' }});
    }
};

export const PUT: APIRoute = async ({ request }) => {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        
        if (!id) {
            return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
        }

        const body = await request.json();
        
        const { data, error } = await supabase.from('showcase_projects').update(body).eq('id', id).select();

        if (error) throw error;

        return new Response(JSON.stringify(data[0]), { status: 200, headers: { 'Content-Type': 'application/json' }});
    } catch (error: any) {
        console.error('Error updating showcase:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' }});
    }
};

export const DELETE: APIRoute = async ({ request }) => {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        
        if (!id) {
            return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
        }
        
        const { error } = await supabase.from('showcase_projects').delete().eq('id', id);

        if (error) throw error;

        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' }});
    } catch (error: any) {
        console.error('Error deleting showcase:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' }});
    }
};
