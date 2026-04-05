# GitHub & Deployment Context

## 🔐 Account Details
- **GitHub Username:** `kirokir`
- **Login Method:** Google OAuth (`itsmelorika@gmail.com`)
- **Repository URL:** [https://github.com/kirokir/dearnco-django](https://github.com/kirokir/dearnco-django)

## 🚀 Deployment Status
- **Platform:** Render
- **Trigger:** Auto-deploys on push to `main` branch.
- **Production URL:** (Check Render Dashboard)

## 🌿 Branching Strategy
- **`main`**: **[ACTIVE / STABLE]**
  - Contains all 16 original bug fixes + 2 critical hotfixes for 500 errors.
  - This is the version currently running in production.
- **`stable-old`**: **[BACKUP]**
  - Snapshot of the codebase *before* the 16 bug fixes were applied (dated Jan 31, 2026).
  - Use this if a full revert is necessary.

## 📝 Latest Version Changelog
**Date:** January 31, 2026

### 1. Critical Hotfixes (Post-Deployment)
- **Fixed Homepage 500 Error:** Added safety checks for nullable `hero_image` and `project.image`. Removed duplicate/broken chatbot script.
- **Fixed Blog 500 Error:** Bumped Service Worker cache to `v2` to force client-side update.
- **Fixed Global 500 Error:** Added missing `django.contrib.sitemaps` to `INSTALLED_APPS` (was causing crash on URL loading).
- **Fixed Homepage 500 Error (Traceback):** Replaced invalid filter `is_published=True` with correct `published_date__lte=timezone.now()` in `core/views.py`.
- **Fixed Global 500 Error (Template):** Corrected invalid `{% extends 'core/base.html' %}` to `{% extends 'base.html' %}` in all templates.
- **Fixed Missing CSS:** Disabled `DEBUG` mode to ensure `WhiteNoise` serves static files correctly in production.

### 2. Major Bug Fixes (16 Items)
- **Infrastructure:** Fixed Render wake-up workflow (`ping.yml`) to prevent cold starts.
- **Rendering:** Fixed crashes on missing images in Footer, Blog, Team, and Bento grid.
- **Forms:** Fixed data loss in "About Us" contact form (added all missing fields).
- **Security:** Fixed XSS vulnerability in Chatbot script.
- **SEO:** Added `sitemap.xml`, `robots.txt`, and JSON-LD structured data.
- **UX:** Improved Blog tag filtering and "Job Details" expander.

## 📂 Documentation
All technical documentation is located in the `dco/doc/` folder:
- `project_architecture.md`: System overview and metrics.
- `changes.md`: Detailed line-by-line changelog.
- `bug_report.md`: Original analysis of fixed issues.
- `github_context.md`: This file.
