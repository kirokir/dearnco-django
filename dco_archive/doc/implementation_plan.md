# Implementation Plan: Fix All Bugs

## Goal
Fix all bugs identified in `bug_report.md` in priority order without breaking the site.

## Proposed Changes

### Critical Priority

#### [MODIFY] [base.html](file:///c:/Users/Arjun/Desktop/New%20folder/dco/core/templates/base.html)
- Wrap footer image in `{% if site_config.footer_background_image %}` check.

#### [MODIFY] [blog_index.html](file:///c:/Users/Arjun/Desktop/New%20folder/dco/blog/templates/blog/blog_index.html)
- Wrap `post.header_image.url` in safety check.

#### [MODIFY] [team.html](file:///c:/Users/Arjun/Desktop/New%20folder/dco/portfolio/templates/portfolio/team.html)
- Wrap `member.image.url` in safety check.

#### [MODIFY] [home.html](file:///c:/Users/Arjun/Desktop/New%20folder/dco/core/templates/home.html)
- Wrap `item.image.url` in safety check for Bento Grid.

#### [MODIFY] [join_us.html](file:///c:/Users/Arjun/Desktop/New%20folder/dco/agency/templates/agency/join_us.html)
- Replace dead link with expandable section showing job description.

---

### High Priority

#### [MODIFY] [about.html](file:///c:/Users/Arjun/Desktop/New%20folder/dco/agency/templates/agency/about.html)
- Expand form to include all `StrategyCallLead` model fields.

#### [MODIFY] [base.html](file:///c:/Users/Arjun/Desktop/New%20folder/dco/core/templates/base.html)
- Replace `{{ chatbot_qas_json|safe }}` with Django's `json_script` tag.

#### [MODIFY] [blog_index.html](file:///c:/Users/Arjun/Desktop/New%20folder/dco/blog/templates/blog/blog_index.html)
- Change tag filters to a dropdown for cleaner UI.

#### [MODIFY] [models.py](file:///c:/Users/Arjun/Desktop/New%20folder/dco/site_settings/models.py)
- Add `meta_description` and `meta_keywords` fields to `SiteConfiguration`.

#### [NEW] Migration for SiteConfiguration meta fields.

#### [MODIFY] [urls.py](file:///c:/Users/Arjun/Desktop/New%20folder/dco/dearco_portfolio/urls.py)
- Add sitemap URL.

#### [MODIFY] [views.py](file:///c:/Users/Arjun/Desktop/New%20folder/dco/core/views.py)
- Improve `robots_txt_view` to include Sitemap.
- Add JSON-LD structured data context.

#### [NEW] [sitemaps.py](file:///c:/Users/Arjun/Desktop/New%20folder/dco/dearco_portfolio/sitemaps.py)
- Create sitemap for static pages and blog posts.

---

### Medium Priority

#### [MODIFY] [views.py](file:///c:/Users/Arjun/Desktop/New%20folder/dco/agency/views.py)
- Update `contact_submit_view` to save all model fields.

#### [MODIFY] [views.py](file:///c:/Users/Arjun/Desktop/New%20folder/dco/core/views.py)
- Pass `featured_posts` to home view context.

---

### Low Priority

#### [MODIFY] [base.html](file:///c:/Users/Arjun/Desktop/New%20folder/dco/core/templates/base.html)
- Add `aria-label` attributes to all interactive buttons.

## Verification Plan
- Run `python manage.py check` after changes.
- Manually test each affected page.
