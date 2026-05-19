export const prerender = false;

const getEnv = (key: string) => {
    return import.meta.env[key] || (typeof process !== 'undefined' ? process.env[key] : '');
};

export async function POST({ request }: { request: Request }) {
    try {
        const keyId = getEnv('RAZORPAY_KEY_ID');
        const keySecret = getEnv('RAZORPAY_KEY_SECRET');

        if (!keyId || !keySecret) {
            return new Response(JSON.stringify({
                error: 'Razorpay credentials not configured.',
                fallback_url: 'https://razorpay.me/@kinbotechnologies'
            }), { status: 503 });
        }

        const body = await request.json();
        const { amount, currency = 'INR', service_name, customer } = body;

        if (!amount || !service_name) {
            return new Response(JSON.stringify({ error: 'Missing amount or service_name' }), { status: 400 });
        }

        // Create order via Razorpay Orders API
        const authHeader = 'Basic ' + btoa(`${keyId}:${keySecret}`);

        const orderRes = await fetch('https://api.razorpay.com/v1/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader,
            },
            body: JSON.stringify({
                amount: Math.round(amount * 100), // Convert to paise
                currency,
                receipt: `kinbo_${service_name}_${Date.now()}`,
                notes: {
                    service: service_name,
                    customer_name: customer?.name || '',
                    customer_email: customer?.email || '',
                    customer_phone: customer?.phone || '',
                    customer_org: customer?.org || '',
                }
            })
        });

        if (!orderRes.ok) {
            const errData = await orderRes.json();
            console.error('Razorpay Order Creation Error:', errData);
            return new Response(JSON.stringify({
                error: 'Failed to create payment order',
                details: errData
            }), { status: 500 });
        }

        const orderData = await orderRes.json();

        return new Response(JSON.stringify({
            order_id: orderData.id,
            amount: orderData.amount,
            currency: orderData.currency,
            key_id: keyId, // Public key safe to share
        }), { status: 200 });

    } catch (e: any) {
        console.error('Create Order API Error:', e);
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
