# Project Architecture & Logic Flow

## Project Size
**Total Size:** 23.5 MB (23,506,539 bytes)
**File Count:** ~1201 files

## File Structure
```text
dco/
├── agency/                 # Agency specific views (About, Careers, Leads)
├── blog/                   # Blog functionality (Posts, Tags)
├── core/                   # Core functionality (Home, Static Pages, Services)
├── dearco_portfolio/       # Project Settings & Configuration
│   ├── settings.py         # Main settings (Apps, DB, Cloudinary)
│   ├── urls.py             # Main URL routing
│   └── wsgi.py             # WSGI entry point
├── portfolio/              # Portfolio functionality (Projects, Team)
├── site_settings/          # Dynamic site configuration (Hero opacity, etc.)
├── static/                 # Static assets (CSS, JS, Images)
├── staticfiles/            # Collected static files (for production)
├── templates/              # Global templates
├── manage.py               # Django management script
├── requirements.txt        # Python dependencies
└── build.sh                # Build script for deployment
```

## Application Logic Flow

### 1. Core Logic (`core`)
The `core` app serves as the central hub, primarily driving the **Homepage** and static pages.
- **Home View (`home_view`)**:
    - Aggregates data from multiple apps to create a rich landing page.
    - Fetches `Primary` and `Secondary` projects from `portfolio`.
    - Fetches the 4 most recent `BlogPost` items.
    - Defines hardcoded `Service` objects (SaaS, AI, Mobile, etc.).
    - Loads `BentoGridItem`s from `agency` for visual layout.
    - Loads `SiteConfiguration` to dynamically adjust UI elements like hero image opacity.
- **Static Views**: Handles `Contact`, `Terms`, `Privacy`, and `FAQ` pages.

### 2. Agency Logic (`agency`)
Focuses on the company's operational aspect and lead generation.
- **About & Team**: Displays team members sorted by `display_order`.
- **Careers (`join_us_view`)**: Lists active `JobPosition`s.
- **Lead Gen**:
    - `contact_submit_view`: Captures `StrategyCallLead` from the contact form.
    - `brochure_download_view`: Captures `AssessmentLead` (email) and provides a PDF download if available.

### 3. Blog Logic (`blog`)
Standard blogging capability.
- **Index**: Displays `Featured` posts (shuffled) and `Non-Featured` posts. Uses `select_related` for performance.
- **Detail**: Shows individual posts based on `slug`.

### 4. Portfolio Logic (`portfolio`)
Manages the showcase of work.
- **All Projects**: Lists all projects, categorized by type (Primary/Secondary).
- **Team**: Dedicated view for team members (reused in Agency).

### 5. Configuration & Infrastructure (`dearco_portfolio`)
- **Database**: Uses `dj_database_url` for flexible DB connection strings (SQLite/Postgres).
- **Storage**:
    - **Static**: `WhiteNoise` for serving static files.
    - **Media**: `Cloudinary` for image/asset storage.
- **Security**: Loads secrets from `.env` or environment variables.
