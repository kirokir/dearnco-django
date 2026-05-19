export const prerender = false;

import { supabaseAdmin } from '../../../lib/supabase';

export async function POST({ request }: { request: Request }) {
    try {
        if (!supabaseAdmin) {
            return new Response(JSON.stringify({ error: 'Database not available' }), { status: 503 });
        }

        const body = await request.json();
        const { name, email, phone, service, college, details } = body;

        if (!name || !email || !service) {
            return new Response(JSON.stringify({ error: 'Missing required fields: name, email, service' }), { status: 400 });
        }

        // Insert as an idea/lead with service_booking type
        const { data, error } = await supabaseAdmin.from('ideas').insert({
            name,
            email,
            phone: phone || null,
            project_type: 'service_booking',
            idea_title: `Service Booking: ${service}`,
            idea_description: details || `Booking inquiry for ${service}`,
            additional_notes: college ? `Institution: ${college}` : null,
            status: 'new',
        }).select('id').single();

        if (error) {
            console.error('Create Lead DB Error:', error);
            return new Response(JSON.stringify({ error: 'Failed to create lead' }), { status: 500 });
        }

        return new Response(JSON.stringify({
            success: true,
            lead_id: data?.id
        }), { status: 200 });

    } catch (e: any) {
        console.error('Create Lead API Error:', e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
