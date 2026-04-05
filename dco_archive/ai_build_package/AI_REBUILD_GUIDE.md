# AI REBUILD MASTER GUIDE: Dear&Co Dynamic Agency Website

This document provides a comprehensive blueprint for rebuilding the Dear&Co website from scratch. Follow the documents in this package in the order specified below.

## Rebuild Sequence

1. **Environment Setup**:
    - Refer to `credentials_and_secrets.md` for required environment variables and integrations.
    - Initialize a Django project and install dependencies from `requirements.txt` (included in package).

2. **Core Infrastructure**:
    - Build the `core` app with the Singleton pattern as documented in `models_and_schema.md`.
    - Implement the `SiteConfiguration` in `site_settings`.

3. **Database & Models**:
    - Recreate models for `agency`, `blog`, and `portfolio` according to `models_and_schema.md`.
    - Run migrations and ensure `cloudinary` is configured for media fields.

4. **Logic & URL Routing**:
    - Map URLs as defined in `logic_flow_and_urls.md`.
    - Implement view logic for lead generation (`contact_submit`) and brochure downloads.

5. **Data Import (Optional)**:
    - To restore the previous website's content (blog posts, projects, etc.), allow migrations to run first.
    - Then run: `python manage.py loaddata data_dump.json`
    - This file is included in the package and contains all database entries from the original site.

6. **Frontend Implementation**:
    - Follow the structure in `frontend_assets.md`.
    - Recreate the base template and partials.
    - ensure the Dark Mode toggle logic is implemented in the main JS/CSS files.

6. **Deployment**:
    - Use the logic in `build.sh` for production deployment on Render.com.
    - Ensure superuser creation logic is included in the build process.

## Essential Files Attached
- `requirements.txt`: Full dependency list.
- `build.sh`: Production build script.
- `data_dump.json`: Full database export (JSON).
- `google9bb038f34e823c8d - Copy.html`: Search console verification.

## Architecture Notes
- The site relies heavily on **Cloudinary** for performance.
- The **Supabase** (PostgreSQL) database is required for production.
- **Whitenoise** is used for static asset compression.
