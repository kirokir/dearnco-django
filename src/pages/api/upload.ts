export const prerender = false;

export async function POST({ request }: { request: Request }) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });
        }

        // Cloudinary Credentials from user
        const cloudName = "dw4fmucml";
        const uploadPreset = "kinbo1";

        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        uploadFormData.append('upload_preset', uploadPreset);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
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
        return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
}
