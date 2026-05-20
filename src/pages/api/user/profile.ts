export const prerender = false;

import { supabaseAdmin } from '../../../lib/supabase';

// Sync from Firebase on Login
export async function POST({ request }: { request: Request }) {
    try {
        const body = await request.json();
        const { firebase_uid, display_name, email, photo_url } = body;

        if (!firebase_uid || !email) {
            return new Response(JSON.stringify({ error: 'firebase_uid and email are required' }), { status: 400 });
        }

        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: 'Database not available' }), { status: 503 });
        }

        // We don't want to overwrite photo_url, bio, socials if the user has manually updated them
        // So we only insert if not exists, or update just last login time.
        // Actually, let's just fetch it first.
        const { data: existing } = await supabaseAdmin
            .from('user_profiles')
            .select('*')
            .eq('firebase_uid', firebase_uid)
            .single();

        let profileData;

        if (!existing) {
            // First time login
            const { data, error } = await supabaseAdmin
                .from('user_profiles')
                .insert([{
                    firebase_uid,
                    display_name: display_name || null,
                    email,
                    photo_url: photo_url || null,
                }])
                .select()
                .single();
            if (error) throw error;
            profileData = data;
        } else {
            // Update updated_at
            const { data, error } = await supabaseAdmin
                .from('user_profiles')
                .update({ updated_at: new Date().toISOString() })
                .eq('firebase_uid', firebase_uid)
                .select()
                .single();
            if (error) throw error;
            profileData = data;
        }

        return new Response(JSON.stringify({ profile: profileData }), { status: 200 });

    } catch (e: any) {
        console.error('Sync Profile API Error:', e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// Fetch Profile
export async function GET({ request }: { request: Request }) {
    try {
        const url = new URL(request.url);
        const email = url.searchParams.get('email');

        if (!email) {
            return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
        }

        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: 'Database not available' }), { status: 503 });
        }

        const { data, error } = await supabaseAdmin
            .from('user_profiles')
            .select('*')
            .eq('email', email)
            .single();

        if (error && error.code !== 'PGRST116') throw error;

        return new Response(JSON.stringify({ profile: data || null }), { status: 200 });

    } catch (e: any) {
        console.error('Get Profile API Error:', e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}

// Update Profile Manually
export async function PUT({ request }: { request: Request }) {
    try {
        const body = await request.json();
        const { email, display_name, photo_url, bio, socials } = body;

        if (!email) {
            return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
        }

        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: 'Database not available' }), { status: 503 });
        }

        const updateData: any = {};
        if (display_name !== undefined) updateData.display_name = display_name;
        if (photo_url !== undefined) updateData.photo_url = photo_url;
        if (bio !== undefined) updateData.bio = bio;
        if (socials !== undefined) updateData.socials = socials;

        const { data, error } = await supabaseAdmin
            .from('user_profiles')
            .update(updateData)
            .eq('email', email)
            .select()
            .single();

        if (error) throw error;

        return new Response(JSON.stringify({ profile: data }), { status: 200 });

    } catch (e: any) {
        console.error('Update Profile API Error:', e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
