import { defineMiddleware } from "astro:middleware";

// ─── In-Memory Rate Limiter ───
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_API = 60;       // 60 req/min for APIs
const RATE_LIMIT_MAX_LOGIN = 5;      // 5 attempts/min for admin login

function getClientIP(request: Request): string {
    return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
        || request.headers.get("x-real-ip")
        || "unknown";
}

function isRateLimited(key: string, maxRequests: number): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(key);

    if (!entry || now > entry.resetAt) {
        rateLimitMap.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    entry.count++;
    return entry.count > maxRequests;
}

// Periodic cleanup of stale entries
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitMap) {
        if (now > entry.resetAt) rateLimitMap.delete(key);
    }
}, 300_000); // every 5 min

// ─── Security Headers ───
const SECURITY_HEADERS: Record<string, string> = {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "SAMEORIGIN",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(self)",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
    "Content-Security-Policy": [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://www.googletagmanager.com https://www.google-analytics.com https://checkout.razorpay.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: blob: https: http:",
        "media-src 'self' https: blob:",
        "connect-src 'self' https://*.supabase.co https://api.cloudinary.com https://wa.me https://www.google-analytics.com https://lumberjack.razorpay.com https://api.razorpay.com",
        "frame-src 'self' https://api.razorpay.com https://checkout.razorpay.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
    ].join("; "),
};

// ─── Protected API Routes (require admin_session cookie) ───
const ADMIN_WRITE_ROUTES = [
    { path: "/api/config", methods: ["POST"] },
    { path: "/api/upload", methods: ["POST"] },
    { path: "/api/redirects", methods: ["POST", "DELETE"] },
    { path: "/api/blog", methods: ["POST", "DELETE"] },
    { path: "/api/products", methods: ["POST", "DELETE"] },
    { path: "/api/payments", methods: ["POST", "DELETE", "PUT", "PATCH"] },
];

function requiresAdminAuth(pathname: string, method: string): boolean {
    return ADMIN_WRITE_ROUTES.some(
        (route) => pathname.startsWith(route.path) && route.methods.includes(method.toUpperCase())
    );
}

export const onRequest = defineMiddleware(async ({ request, cookies, url }, next) => {
    const pathname = url.pathname;
    const method = request.method;
    const clientIP = getClientIP(request);

    // ─── Rate Limiting ───
    if (pathname.startsWith("/api/")) {
        const rateLimitKey = `api:${clientIP}`;
        if (isRateLimited(rateLimitKey, RATE_LIMIT_MAX_API)) {
            return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }), {
                status: 429,
                headers: { "Content-Type": "application/json", "Retry-After": "60" },
            });
        }
    }

    // Admin login rate limiting
    if (pathname === "/admin" && method === "POST") {
        const loginKey = `login:${clientIP}`;
        if (isRateLimited(loginKey, RATE_LIMIT_MAX_LOGIN)) {
            return new Response("Too many login attempts. Please wait 1 minute.", {
                status: 429,
                headers: { "Retry-After": "60" },
            });
        }
    }

    // ─── Admin Auth Guard for Protected API Routes ───
    if (requiresAdminAuth(pathname, method)) {
        const adminSession = cookies.get("admin_session")?.value;
        if (adminSession !== "true") {
            return new Response(JSON.stringify({ error: "Unauthorized. Admin session required." }), {
                status: 401,
                headers: { "Content-Type": "application/json" },
            });
        }
    }

    // ─── Honeypot Check for Public Form Submissions ───
    if (method === "POST" && (pathname === "/api/ideas" || pathname === "/api/service-leads")) {
        try {
            const clonedRequest = request.clone();
            const body = await clonedRequest.json();
            // If honeypot field is filled, silently accept but discard
            if (body._hp_company && body._hp_company.trim() !== "") {
                return new Response(JSON.stringify({ success: true }), {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                });
            }
        } catch {
            // Not JSON or parse error — let the actual handler deal with it
        }
    }

    // ─── Proceed to route handler ───
    const response = await next();

    // ─── Inject Security Headers ───
    const newResponse = new Response(response.body, response);
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
        newResponse.headers.set(key, value);
    }

    return newResponse;
});
