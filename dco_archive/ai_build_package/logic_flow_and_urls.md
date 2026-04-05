# Logic Flow and URL Mapping

## Core Logic Flow
The website is structured as a collection of specialized apps (`core`, `blog`, `portfolio`, `agency`) coordinated by the root `dearco_portfolio/urls.py`.

### 1. Homepage (`core:home`)
- **Logic**: Aggregates data from multiple sources:
    - Lists `Project` items (Primary and Secondary).
    - Shows the 4 most recent `BlogPost` items.
    - Renders hardcoded `Service` objects for SaaS, AI, Mobile, etc.
    - Loads `BentoGridItem` objects for a dynamic grid section.
    - Loads global `SiteConfiguration`.
- **Template**: `home.html`

### 2. Strategy Call & Leads (`agency:contact_submit`)
- **Action**: Receives POST data from contact forms.
- **Processing**:
    - Creates a `StrategyCallLead` entry.
    - Includes fields for name, email, interest (service), and message.
    - Simple validation ensures required fields are present.
- **Redirect**: Returns to the `agency:about` page with a success/error message.

### 3. Brochure Download (`agency:brochure_download`)
- **Action**: Receives POST email from the brochure section.
- **Processing**:
    - Records the email in `AssessmentLead` (using `get_or_create`).
    - Redirects the user directly to the `pdf_file` URL stored in the `Brochure` singleton.
- **Handling**: If no brochure is configured, redirects to `agency:about` with an error.

### 4. Blog System (`blog:blog_index`, `blog:blog_post_detail`)
- **Listing**:
    - Fetches only posts with `published_date <= now`.
    - Separates "Featured" posts (shuffled for dynamic feel) from "Non-featured" posts.
- **Detail**:
    - Fetches post by `slug`.
    - Uses `select_related` for performance.
- **Template**: `blog/blog_index.html` and `blog/blog_post_detail.html`.

### 5. Portfolio & Team (`portfolio:portfolio_all`, `portfolio:team`)
- **Portfolio**: Displays all projects categorized by type and ordered by `display_order`.
- **Team**: Lists all `TeamMember` objects.
- **Template**: `portfolio/portfolio_all.html` and `portfolio/team.html`.

## URL Structure Summary
| Path | Name | Description |
|------|------|-------------|
| `/` | `core:home` | Main landing page |
| `/blog/` | `blog:blog_index` | Blog list page |
| `/blog/<slug>/` | `blog:blog_post_detail` | Single blog post |
| `/portfolio/` | `portfolio:portfolio_all` | Project showcase |
| `/team/` | `portfolio:team` | Team listing |
| `/about/` | `agency:about` | Agency info and Team |
| `/contact/` | `core:contact` | Contact page |
| `/contact-submit/`| `agency:contact_submit` | POST-only lead capture |
| `/brochure-download/`| `agency:brochure_download` | POST-only file access |
