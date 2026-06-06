# Cloudinary Upload Troubleshooting for AI Agents

## Issue: "Upload preset not found"
When using Cloudinary's Unsigned upload feature from a local Node/Astro environment or browser:

1. **Endpoint Selection**: Do NOT forcefully use `/video/upload` if the user's Unsigned preset was created with `type: upload` without a strict video configuration. Using `/auto/upload` is the safest way to support both images and videos on a single unsigned preset.
2. **Environment Variables**: If the `.env` variables are missing or misconfigured locally, `import.meta.env` can cause the `upload_preset` or `cloud_name` to be undefined or incorrect. Hardcode them temporarily to debug if "preset not found" persists.
3. **FormData Ordering**: When constructing a `FormData` object in Node.js (Astro SSR) to send to Cloudinary, **always append `upload_preset` BEFORE `file`**. Large `File` objects or specific serialization behaviors in `node-fetch`/`undici` can cause Cloudinary to truncate or fail to parse subsequent fields, resulting in a false "Upload preset not found" error because it never parsed the preset name!
   
   **Correct Implementation:**
   ```typescript
   const uploadFormData = new FormData();
   uploadFormData.append('upload_preset', uploadPreset); // MUST BE FIRST
   uploadFormData.append('file', file);
   ```

4. **Error Alerting**: Always ensure the frontend UI catches and `alert()`s the user of 500 or 400 errors returned from the `/api/upload` route. Without an alert, the UI state silently fails and the user thinks the upload worked but returned the wrong file type (e.g. keeping the old image URL on screen).
