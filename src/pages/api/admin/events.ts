export const prerender = false;

import { supabaseAdmin } from '../../../lib/supabase';

// Helper to check admin auth
function isAdmin(request: Request) {
  const cookie = request.headers.get('cookie');
  return cookie?.includes('admin_session=true');
}

export async function GET({ request }: { request: Request }) {
  if (!isAdmin(request)) return new Response('Unauthorized', { status: 401 });
  if (!supabaseAdmin) return new Response('DB not configured', { status: 503 });

  const { data, error } = await supabaseAdmin.from('events').select('*').order('created_at', { ascending: false });
  if (error) return new Response(error.message, { status: 500 });

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST({ request }: { request: Request }) {
  if (!isAdmin(request)) return new Response('Unauthorized', { status: 401 });
  if (!supabaseAdmin) return new Response('DB not configured', { status: 503 });

  try {
    const body = await request.json();
    const { data, error } = await supabaseAdmin.from('events').insert([body]).select().single();
    if (error) throw error;
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
}

export async function PUT({ request }: { request: Request }) {
  if (!isAdmin(request)) return new Response('Unauthorized', { status: 401 });
  if (!supabaseAdmin) return new Response('DB not configured', { status: 503 });

  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    const { data, error } = await supabaseAdmin.from('events').update(updateData).eq('id', id).select().single();
    if (error) throw error;
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
}

export async function DELETE({ request }: { request: Request }) {
  if (!isAdmin(request)) return new Response('Unauthorized', { status: 401 });
  if (!supabaseAdmin) return new Response('DB not configured', { status: 503 });

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return new Response('ID required', { status: 400 });

    const { error } = await supabaseAdmin.from('events').delete().eq('id', id);
    if (error) throw error;
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  }
}
