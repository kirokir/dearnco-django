# 🏗️ Project Architecture & Logic Flow

## 📊 Project Size
*(Accurate as of 2026-01-31)*

| Metric | Value | Details |
| :--- | :--- | :--- |
| **Total Size** | **16.9 MB** | *Excluding .git, \_\_pycache\_\_* |
| **Total Files** | **1,159** | |
| **Python Files** | 50 | ~993 lines of code |
| **HTML Templates** | 16 | 47.7 KB |
| **CSS Files** | 64 | 814.8 KB |
| **JS Files** | 406 | 11.5 MB |

### 📂 Files by Directory
| Directory | Count | Main Purpose |
| :--- | :---: | :--- |
| `agency/` | 15 | Agency views, leads, jobs |
| `blog/` | 14 | Blog posts, tags |
| `core/` | 22 | Homepage, static pages |
| `dearco_portfolio/` | 6 | Django settings, URLs |
| `doc/` | 6 | Documentation |
| `portfolio/` | 12 | Projects, team |
| `site_settings/` | 9 | Dynamic site config |
| `static/` | 7 | Source static assets |
| `staticfiles/` | 1,077 | Collected for production |
| `.github/` | 1 | GitHub Actions workflows |

---

## 🗂️ File Structure
```text
dco/
├── .github/workflows/      # 🤖 CI/CD (ping.yml for Render wake)
├── agency/                 # 🏢 Agency: About, Careers, Lead capture
│   ├── models.py           # StrategyCallLead, JobPosition, ChatbotQA, BentoGridItem
│   ├── views.py            # about_view, join_us_view, contact_submit_view
│   └── templates/agency/   # about.html, join_us.html
├── blog/                   # ✍️ Blog functionality
│   ├── models.py           # BlogPost, Tag
│   ├── views.py            # blog_index, blog_detail
│   └── templates/blog/     # blog_index.html, blog_detail.html
├── core/                   # 🏠 Core site functionality
│   ├── models.py           # SingletonModel base class
│   ├── views.py            # home_view, robots_txt, static pages
│   └── templates/          # base.html, home.html
├── dearco_portfolio/       # ⚙️ Django Project Configuration
│   ├── settings.py         # Apps, DB, Cloudinary, WhiteNoise
│   ├── urls.py             # Main URL routing + sitemap
│   ├── sitemaps.py         # SEO sitemaps (NEW)
│   └── wsgi.py             # WSGI entry point
├── doc/                    # 📚 Project Documentation (NEW)
│   ├── bug_report.md       # Bug analysis & fixes
│   ├── changes.md          # All changes made
│   ├── implementation_plan.md
│   ├── project_architecture.md (this file)
│   ├── project_code_dump.txt
│   └── walkthrough.md
├── portfolio/              # 🎨 Portfolio & Team
│   ├── models.py           # Project, TeamMember
│   └── templates/portfolio/
├── site_settings/          # 🔧 Dynamic Configuration
│   ├── models.py           # SiteConfiguration (Singleton)
│   └── context_processors.py # Global template context
├── static/                 # 📦 Source Static Assets
│   ├── css/main.css        # Main stylesheet
│   └── js/main.js          # Main JavaScript
├── staticfiles/            # 🚀 Collected Static (Production)
├── templates/sw.js         # 📱 Service Worker (PWA)
├── manage.py               # 🐍 Django CLI
├── requirements.txt        # 📦 Python dependencies
└── build.sh                # 🛠️ Render deployment script
```

---

## 🔄 Application Logic Flow

### 1. 🏠 Core Logic (`core`)
The **central hub** driving the Homepage and static pages.

**Home View (`home_view`):**
- 🧩 **Aggregates data** from multiple apps for a rich landing page
- 🎨 **Projects:** Fetches `Primary` and `Secondary` from `portfolio`
- 📝 **Blog:** Fetches 4 most recent `BlogPost` items + 3 featured posts
- 🛠️ **Services:** Defines hardcoded `Service` objects (SaaS, AI, Mobile, etc.)
- 🍱 **Bento:** Loads `BentoGridItem`s from `agency` for visual grid layout
- ⚙️ **Config:** Loads `SiteConfiguration` for dynamic UI (hero opacity)

**Static Views:** `Contact`, `Terms`, `Privacy`, `FAQ`, `robots.txt`

### 2. 🏢 Agency Logic (`agency`)
**Lead generation and company info.**

| View | Function |
| :--- | :--- |
| `about_view` | Team members + Contact form |
| `join_us_view` | Active job positions |
| `contact_submit_view` | Saves `StrategyCallLead` (all fields) |
| `brochure_download_view` | Email capture + PDF download |

**Models:** `StrategyCallLead`, `AssessmentLead`, `JobPosition`, `BentoGridItem`, `ChatbotQA`, `Brochure`

### 3. ✍️ Blog Logic (`blog`)
Standard blogging with tag filtering.

- **Index:** Featured posts (shuffled) + non-featured, tag dropdown filter
- **Detail:** Individual post by slug with related posts

### 4. 🎨 Portfolio Logic (`portfolio`)
Showcase of work.

- **Projects:** Categorized by Primary/Secondary
- **Team:** Dedicated team page with image fallbacks

### 5. 🔧 Site Settings (`site_settings`)
Dynamic configuration via admin.

**SiteConfiguration (Singleton):**
- 🖼️ Logo, hero image, footer background
- 🎚️ Hero opacity, meta description/keywords
- 📞 Contact info (email, phone, LinkedIn)

**Context Processor:** Injects `site_config`, `office_locations`, `chatbot_qas_json` globally

### 6. 🏗️ Infrastructure (`dearco_portfolio`)

| Component | Technology |
| :--- | :--- |
| **Database** | PostgreSQL (production), SQLite (dev) via `dj_database_url` |
| **Static Files** | WhiteNoise (compressed, cached) |
| **Media/Images** | Cloudinary CDN |
| **SEO** | Django Sitemap, JSON-LD Schema.org |
| **PWA** | Service Worker + manifest.json |
| **CI/CD** | GitHub Actions (Render wake ping) |

---

## 🔗 Key URLs

| URL | View | Purpose |
| :--- | :--- | :--- |
| `/` | `core:home` | Homepage |
| `/about/` | `agency:about` | About + Contact form |
| `/join-us/` | `agency:join_us` | Careers |
| `/blog/` | `blog:blog_index` | Blog listing |
| `/blog/<slug>/` | `blog:blog_detail` | Blog post |
| `/sitemap.xml` | Django Sitemap | SEO sitemap |
| `/robots.txt` | `core:robots_txt` | Crawler rules |
| `/admin/` | Django Admin | CMS |
