export const prerender = false;

export async function GET() {
    return new Response(JSON.stringify({ status: "alive" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}
