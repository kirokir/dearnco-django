# Old Render Settings (Python/Django)

These are the settings used for the previous Django application deployment on Render. Reference these if you wish to restore the Django service or create a separate service for it.

### General Settings
- **Service Name:** `dearnco-django`
- **Runtime:** `Python 3`
- **Instance Type:** `Free`

### Build & Deploy
- **Build Command:** `./build.sh`
- **Start Command:** `gunicorn dearco_portfolio.wsgi`

### Subdirectory Context
- If you redeploy this service, you should set the **Root Directory** to `dco_archive/` since the Django project has been moved there.

### Typical Environment Variables
| Key | Context |
| :--- | :--- |
| `SECRET_KEY` | Django secret key |
| `DATABASE_URL` | Supabase / Postgres connection string |
| `DEBUG` | Usually `False` for production |
| `CLOUDINARY_CLOUD_NAME` | Media storage |
| `CLOUDINARY_API_KEY` | Media storage |
| `CLOUDINARY_API_SECRET` | Media storage |

---
*Created on 2026-04-05 during portfolio migration.*
