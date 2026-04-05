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
            .from('posts')
            .select('*')
            .order('date', { ascending: false });

        if (error) throw error;

        const formattedPosts = data.map(post => ({
            slug: post.slug,
            title: post.title,
            category: post.category,
            date: post.date,
            excerpt: post.excerpt,
            body: post.body
        }));

        return new Response(JSON.stringify(formattedPosts), { status: 200 });
    } catch (e: any) {
        console.error('API Blog GET Error:', e);
        return new Response(JSON.stringify({
            error: 'Internal Server Error',
            message: e.message,
            stack: e.stack
        }), { status: 500 });
    }
}

export async function POST({ request }: { request: Request }) {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: 'Supabase client not initialized.' }), { status: 500 });
        }
        const { slug, title, category, date, excerpt, body } = await request.json();

        const { error } = await supabaseAdmin
            .from('posts')
            .upsert({
                slug,
                title,
                category,
                date,
                excerpt,
                body,
                updated_at: new Date().toISOString()
            });

        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e: any) {
        console.error('API Blog POST Error:', e);
        return new Response(JSON.stringify({
            error: 'Internal Server Error',
            message: e.message,
            stack: e.stack
        }), { status: 500 });
    }
}

export async function DELETE({ request }: { request: Request }) {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: 'Supabase client not initialized.' }), { status: 500 });
        }
        const url = new URL(request.url);
        const slug = url.searchParams.get('slug');
        if (!slug) return new Response('Missing slug', { status: 400 });

        const { error } = await supabaseAdmin
            .from('posts')
            .delete()
            .eq('slug', slug);

        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (e: any) {
        console.error('API Blog DELETE Error:', e);
        return new Response(JSON.stringify({
            error: 'Internal Server Error',
            message: e.message,
            stack: e.stack
        }), { status: 500 });
    }
}
