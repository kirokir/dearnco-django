import { supabaseAdmin } from '../../lib/supabase';

export const prerender = false;

export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from('posts')
            .select('*')
            .order('date', { ascending: false });

        if (error) throw error;

        // Return in the format expected by AdminInterface
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
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

export async function POST({ request }: { request: Request }) {
    try {
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
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

export async function DELETE({ request }: { request: Request }) {
    try {
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
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
