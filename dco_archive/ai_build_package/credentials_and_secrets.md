# Credentials and Secrets

To rebuild this site, the following environment variables and files are required.

## Environment Variables (.env)
The application expects these variables. A template file `.env.example` has been included in this package.

| Variable | Description | Source |
|----------|-------------|--------|
| `SECRET_KEY` | Django's secret key for security | User Generated |
| `DEBUG` | Toggle for debug mode (True/False) | Configuration |
| `DATABASE_URL` | PostgreSQL connection string (Supabase) | Supabase Dashboard |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account name | Cloudinary Dashboard |
| `CLOUDINARY_API_KEY` | Cloudinary API Key | Cloudinary Dashboard |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret | Cloudinary Dashboard |
| `RENDER_EXTERNAL_HOSTNAME` | Hostname for Render.com deployment | Render.com |

## Integration Files
- **Google Site Verification**: `google9bb038f34e823c8d - Copy.html` (Located in root). This is used for Google Search Console verification.

## Admin Interface & Backend
The site includes a built-in Django Admin interface for managing content (Blogs, Projects, Leads).

- **URL**: `/admin/` (e.g., `http://localhost:8000/admin/` or `https://your-site.com/admin/`)
- **Credentials**: You must create a "Superuser" to log in.

### How to Create an Admin User
1. **Locally**: Run `python manage.py createsuperuser` and follow the prompts.
2. **In Production**: The system is configured to respect `DJANGO_SUPERUSER_USERNAME`. The legacy username provided is **`devarjuna`**.
   - `DJANGO_SUPERUSER_USERNAME=devarjuna`
   - `DJANGO_SUPERUSER_EMAIL=...`
   - `DJANGO_SUPERUSER_PASSWORD=...`

## Hosting Services
- **Backend**: Render.com
- **Database**: Supabase (PostgreSQL)
- **Media**: Cloudinary CDN
