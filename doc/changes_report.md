# Issues and Fixes Report (Exhaustive)

This report summarizes **all issues identified and fixes applied** during the work performed in this repository. It includes the storage configuration corrections, homepage post filtering, chatbot removal, and the automated scan report creation.

## 1) Cloudinary storage configuration mismatch

**Issue**
- `DEFAULT_FILE_STORAGE` was set to `cloudinary_storage.storage.MediaCloudinaryStorage`, but the corresponding package and app were not configured. This can cause runtime errors when Django tries to resolve the storage backend.

**Fix**
- Added the `django-cloudinary-storage` dependency.
- Registered `'cloudinary_storage'` in `INSTALLED_APPS`.
- Standardized Cloudinary config keys to `CLOUDINARY_STORAGE`.
- Added `MEDIA_URL` and `MEDIA_ROOT` to avoid missing settings when DEBUG is on.

**Files changed**
- `requirements.txt`
- `dearco_portfolio/settings.py`

---

## 2) Homepage showing future-dated posts

**Issue**
- The homepage `recent_posts` query did not filter by `published_date`, so posts scheduled for the future could appear early.

**Fix**
- Added `timezone.now()` filtering: `published_date__lte=timezone.now()`.

**Files changed**
- `core/views.py`

---

## 3) Chatbot removal (UI + data pipeline)

**Issue**
- The chatbot feature was wired end-to-end (context processor → template JSON → frontend JS → UI). The requirement was to remove it entirely.

**Fix**
- Removed chatbot serialization from the global context processor.
- Deleted chatbot UI elements from `base.html`.
- Removed chatbot JSON injection from `home.html`.
- Deleted chatbot runtime logic from `static/js/main.js`.

**Files changed**
- `site_settings/context_processors.py`
- `core/templates/base.html`
- `core/templates/home.html`
- `static/js/main.js`

---

## 4) Exhaustive repository scan output

**Issue**
- Requested a repository-wide file tree and per-file scan to surface issues and file anomalies.

**Fix**
- Generated `bughunt_report.md` with a complete file tree and per-file scan output.

**Files created**
- `bughunt_report.md`

---

## Notes

- The changes above were committed across the working branch (`work`), and a separate branch (`remove-chatbot`) was targeted for push. Network restrictions in this environment prevented successfully pushing the branch to GitHub.
