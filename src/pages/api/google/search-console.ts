import type { APIRoute } from 'astro';
import { google } from 'googleapis';

export const GET: APIRoute = async ({ request }) => {
    try {
        const url = new URL(request.url);
        const action = url.searchParams.get('action') || 'overview';
        
        // Use environment variables for OAuth2
        const clientId = import.meta.env.GOOGLE_CLIENT_ID;
        const clientSecret = import.meta.env.GOOGLE_CLIENT_SECRET;
        const redirectUri = import.meta.env.GOOGLE_REDIRECT_URI;
        const refreshToken = import.meta.env.GOOGLE_REFRESH_TOKEN;
        const targetUrl = import.meta.env.SITE || 'https://dear.is-a.dev/';

        if (!clientId || !clientSecret || !refreshToken) {
            // Return mock data for local dev or when credentials are missing so the UI doesn't crash
            return new Response(JSON.stringify(getMockData(action)), { status: 200 });
        }

        const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
        oauth2Client.setCredentials({ refresh_token: refreshToken });

        const searchconsole = google.searchconsole({
            version: 'v1',
            auth: oauth2Client
        });

        // Set date range (last 30 days)
        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(today.getDate() - 30);
        
        const startDate = thirtyDaysAgo.toISOString().split('T')[0];
        const endDate = today.toISOString().split('T')[0];

        let result;

        if (action === 'overview') {
            // Get overall stats over time (for charts)
            const response = await searchconsole.searchanalytics.query({
                siteUrl: targetUrl,
                requestBody: {
                    startDate,
                    endDate,
                    dimensions: ['date'],
                    rowLimit: 30
                }
            });
            result = response.data;
        } else if (action === 'queries') {
            // Get top queries
            const response = await searchconsole.searchanalytics.query({
                siteUrl: targetUrl,
                requestBody: {
                    startDate,
                    endDate,
                    dimensions: ['query'],
                    rowLimit: 50
                }
            });
            result = response.data;
        } else if (action === 'pages') {
            // Get top pages
            const response = await searchconsole.searchanalytics.query({
                siteUrl: targetUrl,
                requestBody: {
                    startDate,
                    endDate,
                    dimensions: ['page'],
                    rowLimit: 50
                }
            });
            result = response.data;
        } else if (action === 'devices') {
            // Get device breakdown
            const response = await searchconsole.searchanalytics.query({
                siteUrl: targetUrl,
                requestBody: {
                    startDate,
                    endDate,
                    dimensions: ['device'],
                    rowLimit: 10
                }
            });
            result = response.data;
        }

        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error: any) {
        console.error('GSC API Error:', error);
        // Fallback to mock data if API fails to prevent UI crash
        const action = new URL(request.url).searchParams.get('action') || 'overview';
        return new Response(JSON.stringify(getMockData(action)), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

function getMockData(action: string) {
    if (action === 'overview') {
        // Generate mock timeline data for charts
        const rows = [];
        let date = new Date();
        date.setDate(date.getDate() - 30);
        for (let i = 0; i < 30; i++) {
            date.setDate(date.getDate() + 1);
            rows.push({
                keys: [date.toISOString().split('T')[0]],
                clicks: Math.floor(Math.random() * 50) + 10,
                impressions: Math.floor(Math.random() * 500) + 100,
                ctr: (Math.random() * 0.1) + 0.02,
                position: (Math.random() * 20) + 5
            });
        }
        return { rows };
    }
    
    if (action === 'queries') {
        return {
            rows: [
                { keys: ["kinbo technologies"], clicks: 120, impressions: 500, ctr: 0.24, position: 1.2 },
                { keys: ["arjun jayesh portfolio"], clicks: 80, impressions: 400, ctr: 0.20, position: 2.5 },
                { keys: ["astro ssr dashboard"], clicks: 45, impressions: 800, ctr: 0.05, position: 8.4 },
                { keys: ["ai healthcare systems"], clicks: 30, impressions: 1200, ctr: 0.02, position: 14.1 },
            ]
        };
    }

    if (action === 'pages') {
        return {
            rows: [
                { keys: ["https://dear.is-a.dev/"], clicks: 250, impressions: 1500, ctr: 0.16, position: 3.2 },
                { keys: ["https://dear.is-a.dev/collaborate"], clicks: 40, impressions: 300, ctr: 0.13, position: 5.1 },
                { keys: ["https://dear.is-a.dev/about"], clicks: 35, impressions: 250, ctr: 0.14, position: 6.8 },
                { keys: ["https://dear.is-a.dev/blog/ai-revolution"], clicks: 20, impressions: 800, ctr: 0.02, position: 12.4 },
            ]
        };
    }

    return { rows: [] };
}
