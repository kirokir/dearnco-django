export const prerender = false;

import { supabaseAdmin } from '../../../lib/supabase';

const getEnv = (key: string) => {
    return import.meta.env[key] || (typeof process !== 'undefined' ? process.env[key] : '');
};

async function hmacSHA256(key: string, message: string): Promise<string> {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(key);
    const msgData = encoder.encode(message);

    const cryptoKey = await crypto.subtle.importKey(
        'raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', cryptoKey, msgData);
    return Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

export async function POST({ request }: { request: Request }) {
    try {
        const keySecret = getEnv('RAZORPAY_KEY_SECRET');

        if (!keySecret) {
            return new Response(JSON.stringify({ error: 'Razorpay secret not configured.' }), { status: 503 });
        }

        const body = await request.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, service_name, customer } = body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return new Response(JSON.stringify({ error: 'Missing payment verification fields' }), { status: 400 });
        }

        // Verify HMAC SHA256 signature
        const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expectedSignature = await hmacSHA256(keySecret, payload);

        const verified = expectedSignature === razorpay_signature;

        if (!verified) {
            console.error('Payment signature verification failed:', {
                order_id: razorpay_order_id,
                payment_id: razorpay_payment_id
            });
            return new Response(JSON.stringify({
                verified: false,
                error: 'Signature verification failed'
            }), { status: 400 });
        }

        // Store payment record in Supabase
        if (supabaseAdmin) {
            try {
                await supabaseAdmin.from('payments').upsert({
                    razorpay_order_id,
                    razorpay_payment_id,
                    razorpay_signature,
                    service_name: service_name || 'unknown',
                    customer_name: customer?.name || null,
                    customer_email: customer?.email || null,
                    customer_phone: customer?.phone || null,
                    customer_org: customer?.org || null,
                    status: 'paid',
                    verified: true,
                    amount: customer?.amount || 0,
                    currency: customer?.currency || 'INR',
                    updated_at: new Date().toISOString()
                });
            } catch (dbErr) {
                // Log but don't fail the verification — payment is still valid
                console.error('Payment DB insert error (non-fatal):', dbErr);
            }
        }

        return new Response(JSON.stringify({
            verified: true,
            payment_id: razorpay_payment_id
        }), { status: 200 });

    } catch (e: any) {
        console.error('Verify Payment API Error:', e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
