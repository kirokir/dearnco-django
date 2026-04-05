# Architecture: Dear&Co Dynamic Agency Website

## Project Overview
This is a modular Django 4.x application designed for an enterprise-grade agency website. It uses a three-tier architecture and is optimized for deployment on Render.com with Cloudinary for media and Supabase (PostgreSQL) for data.

## Directory Structure
- `agency/`: Management of team members, job openings, and agency-specific content.
- `blog/`: Blogging system with categories, tags, and publication workflows.
- `core/`: Core website logic, common utilities, and generic views.
- `dearco_portfolio/`: Project configuration (settings, wsgi, asgi, urls).
- `portfolio/`: Project showcase and case studies.
- `site_settings/`: Global site configurations (Singleton pattern), theming, and social links.
- `static/`: Global static assets (CSS, JS, Images).
- `templates/`: Base templates and reusable partials.

## Core Dependencies
Based on `requirements.txt`:
- **Django**: Web framework.
- **dj-database-url**: Database configuration via URL.
- **python-dotenv**: Environment variable management.
- **cloudinary & django-cloudinary-storage**: Media asset management.
- **whitenoise**: Serving static files in production.
- **django-tinymce**: Rich text editor for admin.
- **psycopg2-binary**: PostgreSQL adapter.

## Deployment Logic
The `build.sh` script handles the production build process:
1. Installs dependencies.
2. Collects static files using `collectstatic`.
3. Runs database migrations.
