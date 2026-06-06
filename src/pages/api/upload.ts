export const prerender = false;

// ─── Allowed MIME types ───
const ALLOWED_MIME_TYPES = new Set([
    'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/avif',
    'video/mp4', 'video/webm', 'video/quicktime',
    'application/pdf',
]);

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export async function POST({ request }: { request: Request }) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });
        }

        // ─── MIME type validation ───
        if (!ALLOWED_MIME_TYPES.has(file.type)) {
            return new Response(JSON.stringify({
                error: `File type "${file.type}" is not allowed. Accepted: images, videos, PDFs.`
            }), { status: 415 });
        }

        // ─── File size validation ───
        if (file.size > MAX_FILE_SIZE) {
            return new Response(JSON.stringify({
                error: `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum: 10MB.`
            }), { status: 413 });
        }

        // ─── Cloudinary upload ───
        const cloudName = import.meta.env.CLOUDINARY_CLOUD_NAME || "dw4fmucml";
        const uploadPreset = import.meta.env.CLOUDINARY_UPLOAD_PRESET || "kinbo1";

        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        uploadFormData.append('upload_preset', uploadPreset);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
            method: 'POST',
            body: uploadFormData
        });

        const data = await response.json();

        if (data.secure_url) {
            return new Response(JSON.stringify({ url: data.secure_url }), { status: 200 });
        } else {
            console.error('Cloudinary Error:', data);
            return new Response(JSON.stringify({ error: data.error?.message || 'Upload failed' }), { status: 500 });
        }
    } catch (e: any) {
        console.error('Upload API Error:', e);
        return new Response(JSON.stringify({ 
            error: e?.message || String(e) || 'Unknown server error during upload'
        }), { status: 500 });
    }
}
