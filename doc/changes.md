# All Changes Made to Dear&Co Codebase

## Summary
**Total Bugs Fixed:** 16 (15 from original bug report + 1 Render wake fix)
**Files Modified:** 14
**Files Created:** 2

---

## Critical Priority Fixes (5)

### 1. Footer Image Crash
- **File:** `core/templates/base.html`
- **Change:** Added safety check `{% if site_config.footer_background_image %}` around image URL

### 2. Blog Index Image Crash
- **File:** `blog/templates/blog/blog_index.html`
- **Change:** Added `{% if post.header_image %}` checks with fallback placeholder divs for both featured and non-featured posts

### 3. Team Page Image Crash
- **File:** `portfolio/templates/portfolio/team.html`
- **Change:** Added `{% if member.image %}` with fallback avatar showing member initial

### 4. About Page Team Image Crash
- **File:** `agency/templates/agency/about.html` (Line 20)
- **Change:** Added `{% if member.image %}` with fallback avatar

### 5. Bento Grid Image Crash
- **File:** `core/templates/home.html`
- **Change:** Added `{% if item.image %}` around background-image style

### 6. Job Positions Dead Link
- **File:** `agency/templates/agency/join_us.html`
- **Change:** Replaced dead `#` link with `<details>` element showing job description + "Apply Now" mailto

---

## High Priority Fixes (7)

### 7. About Us Form Expansion
- **File:** `agency/templates/agency/about.html`
- **Change:** Expanded form to include all StrategyCallLead fields:
  - company_name, revenue_range, interest, biggest_challenge, success_goal, ideal_timeline, message

### 8. Contact Submit Data Loss
- **File:** `agency/views.py`
- **Change:** Updated `contact_submit_view` to save all form fields to StrategyCallLead model

### 9. Chatbot XSS Vulnerability
- **Files:** `core/templates/base.html`, `site_settings/context_processors.py`
- **Change:** 
  - Replaced `{{ chatbot_qas_json|safe }}` with `{{ chatbot_qas_json|json_script:"chatbot-data" }}`
  - Context processor now passes list instead of pre-serialized JSON

### 10. Blog Tags UI
- **Files:** `blog/templates/blog/blog_index.html`, `static/js/main.js`
- **Change:** Replaced button list with dropdown select for cleaner UX

### 11. Sitemap Implementation
- **Files:** `dearco_portfolio/sitemaps.py` (NEW), `dearco_portfolio/urls.py`
- **Change:** Created Django sitemap with StaticViewSitemap and BlogPostSitemap

### 12. JSON-LD Structured Data
- **File:** `core/templates/base.html`
- **Change:** Added Organization schema.org structured data in head

### 13. Robots.txt Improvement
- **File:** `core/views.py`
- **Change:** Enhanced robots.txt with sitemap URL and blocked /tinymce/

---

## Medium Priority Fixes (2)

### 14. Home Page Missing Featured Posts
- **File:** `core/views.py`
- **Change:** Added `featured_posts` query to home_view context

### 15. Strategy Call Data Loss (duplicate of #8)
- Already fixed in #8

---

## Low Priority Fixes (1)

### 16. ARIA Labels
- **File:** `core/templates/base.html`
- **Change:** Added aria-label attributes to scrollToTop, WhatsApp, chatbot, and dark mode buttons

---

## Infrastructure Fixes (1)

### 17. Render Wake Workflow
- **File:** `.github/workflows/ping.yml`
- **Changes:**
  - Schedule: Every 10 minutes (was 14)
  - Timeout: 120 seconds with `--max-time`
  - Retries: 3 with 10s delay
  - User-Agent: Browser-like header added
  - Logging: Success timestamp

---

## Files Modified
1. `core/templates/base.html` - Image safety, JSON-LD, XSS fix, ARIA labels
2. `core/templates/home.html` - Bento grid image safety
3. `core/views.py` - Featured posts, robots.txt improvement
4. `blog/templates/blog/blog_index.html` - Image safety, tag dropdown
5. `portfolio/templates/portfolio/team.html` - Image safety
6. `agency/templates/agency/about.html` - Image safety, form expansion
7. `agency/templates/agency/join_us.html` - Job details expansion
8. `agency/views.py` - Form data handling
9. `site_settings/context_processors.py` - Chatbot data format
10. `static/js/main.js` - Tag filter dropdown logic
11. `dearco_portfolio/urls.py` - Sitemap URL
12. `.github/workflows/ping.yml` - Render wake reliability

## Files Created
1. `dearco_portfolio/sitemaps.py` - Django sitemap classes
2. `doc/changes.md` - This file

---

## Footer Year
The footer uses Django's `{% now "Y" %}` template tag which dynamically displays the current year (2026).
