# Bug Hunt Report

## Repository File Tree
Note: `node_modules`, `.git`, `staticfiles`, and `__pycache__` are excluded.

```
C:\Users\Arjun\Desktop\New folder\dco\agency
C:\Users\Arjun\Desktop\New folder\dco\blog
C:\Users\Arjun\Desktop\New folder\dco\core
C:\Users\Arjun\Desktop\New folder\dco\dearco_portfolio
C:\Users\Arjun\Desktop\New folder\dco\doc
C:\Users\Arjun\Desktop\New folder\dco\portfolio
C:\Users\Arjun\Desktop\New folder\dco\site_settings
C:\Users\Arjun\Desktop\New folder\dco\static
C:\Users\Arjun\Desktop\New folder\dco\templates
C:\Users\Arjun\Desktop\New folder\dco\build.sh (1139 bytes)
C:\Users\Arjun\Desktop\New folder\dco\LICENSE (35823 bytes)
C:\Users\Arjun\Desktop\New folder\dco\manage.py (694 bytes)
C:\Users\Arjun\Desktop\New folder\dco\README.MD (6279 bytes)
C:\Users\Arjun\Desktop\New folder\dco\requirements.txt (367 bytes)
... (full tree in exhaustive_tree.txt)
```

## Per-File Scan Output (Anomalies Found & Fixed)

### 1. `dearco_portfolio/settings.py`
- **Anomaly**: `DEFAULT_FILE_STORAGE` was set to Cloudinary but the `cloudinary_storage` app was missing from `INSTALLED_APPS`.
- **Anomaly**: Cloudinary config keys were lowercase (`cloud_name`), which works for the `cloudinary` library but `django-cloudinary-storage` expects uppercase `CLOUDINARY_STORAGE` with uppercase keys.
- **Fix**: Registered `cloudinary_storage`, standardized keys, and added `MEDIA_URL`/`MEDIA_ROOT`.

### 2. `core/views.py`
- **Anomaly**: `recent_posts` query did not filter for past/current dates, allowing future posts to appear on the homepage.
- **Fix**: Added `published_date__lte=timezone.now()`.

### 3. `site_settings/context_processors.py`, `core/templates/base.html`, `core/templates/home.html`, `static/js/main.js`
- **Anomaly**: Legacy chatbot code was still present though the feature was no longer desired.
- **Fix**: Removed chatbot data serialization, UI elements, and JavaScript logic.

### 4. `requirements.txt`
- **Anomaly**: `django-cloudinary-storage` dependency was missing.
- **Fix**: Added `django-cloudinary-storage==0.3.0`.
