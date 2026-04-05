# Bug Report & Codebase Analysis

## Priority Levels
- **Critical**: Prevents application from running or causes severe data loss.
- **High**: Significant security risks or major functionality broken.
- **Medium**: Discrepancies between models/forms/views, unused code, or minor logic errors.
- **Low**: Best practices, style improvements, or minor UX quirks.

## 1. Critical Priority
### [Rendering] Global 500 Error (Footer Image)
- **Location**: `core/templates/base.html`
- **Issue**: Crash on `{{ site_config.footer_background_image.url }}` if image missing.
- **Recommendation**: Safety check wrapping.

### [Rendering] Blog/Team/Bento Page Crashes
- **Location**: `blog_index.html`, `team.html`, `home.html`
- **Issue**: Unsafe access to `.url` on nullable Image fields.
- **Recommendation**: Add safety checks.

### [Dysfunction] Job Positions "View Details" Dead Link
- **Location**: `agency/templates/agency/join_us.html` (Line 21)
- **Issue**: Dead link `#` for "View Details". Description never shown.
- **Recommendation**: Implement detail view.

## 2. High Priority
### [Dysfunction] About Us Form Failure
- **Location**: `agency/templates/agency/about.html` vs `agency/views.py`
- **Issue**: The HTML form asks for "Service" via a `<select>`, but `views.py` expects `request.POST.get('service')`.
- **Constraint**: `StrategyCallLead` model anticipates fields like `revenue_range`, `company_name` etc., but the form **omits** them entirely.
- **Impact**: The form submits technically, but almost all analytical data (revenue, goals) is lost because the HTML inputs simply don't exist.
- **Recommendation**: Expand the form to include all model fields.

### [Dysfunction] Chatbot XSS & Visibility
- **Location**: `core/templates/base.html` & `main.js`
- **Issue 1**: `{{ chatbot_qas_json|safe }}` is XSS risky.
- **Issue 2**: The chatbot logic relies on `chatbot-data` script tag. If `json.dumps` fails or returns empty, the bot breaks.
- **Issue 3**: User reporting "doesn't appear". It might be hidden by CSS `display: none` or blocked by Z-index issues on mobile.
- **Recommendation**: Use `json_script` standard and check z-index/display rules.

### [UX/UI] Blog Tags Flooding
- **Location**: `blog/templates/blog/blog_index.html`
- **Issue**: The "Tag Filters" section (`.tag-filters`) lists **ALL** tags globally. The user likely perceives this as "tags flooded under featured blog" if the list is long.
- **Recommendation**: Truncate list or use a dropdown.

### [SEO] AI Agent Invisibility (Semantic Weakness)
- **Location**: Global
- **Issue**:
    1.  No `meta_description`/`keywords` (Model fields missing).
    2.  No `sitemap.xml`.
    3.  No JSON-LD structured data (Schema.org).
    4.  Weak `robots.txt`.
- **Impact**: AI Agents (like Perplexity, ChatGPT Search) cannot "understand" the site content efficiently.
- **Recommendation**: Implement `django-seo` or custom meta tags + Sitemap + JSON-LD for "Agency" and "BlogPosting".

### [Infrastructure] Render Wake Failure ✅ FIXED
- **Location**: `.github/workflows/ping.yml`
- **Issues**:
    1. Default curl had no timeout (cold starts take 30-60s).
    2. No User-Agent header (requests blocked as bots).
    3. 14-minute schedule allowed service to sleep.
    4. No retries on failure.
- **Fix Applied**:
    - Schedule: Every 10 minutes
    - Timeout: 120 seconds
    - Retries: 3 with 10s delay
    - User-Agent: Browser-like header
    - Logging: Success timestamp

## 3. Medium Priority
### [Dysfunction] Strategy Call Data Loss
- **Location**: `agency/views.py`
- **Issue**: View ignores most model fields.

### [Logic] Home Page Content Missing
- **Location**: `core/views.py`
- **Issue**: Featured posts missing, services/stats hardcoded.

## 4. Low Priority
### [Accessibility] Missing ARIA
- **Location**: `base.html`
- **Issue**: Buttons lack labels.
