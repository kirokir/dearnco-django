# Frontend Assets and UI Structure

## Design System
The website uses a modern, premium design with support for **Dark Mode**. It leverages:
- **Vanilla CSS**: Global styles in `static/css/`.
- **SwiperJS**: For carousels (Blog, Heroes).
- **Glassmorphism**: Subtle effects applied via CSS.
- **Responsive Layouts**: Mobile-first design using CSS Flexbox and Grid.

## Template Hierarchy
The project uses Django's template inheritance:
- **`templates/base.html`**: Root layout with navbar, footer, and core scripts.
- **`templates/partials/`**: Reusable components like metadata, nav, and footers.
- **App Templates**:
    - `core/templates/`: Homepage (`home.html`), legal pages, and contact.
    - `blog/templates/blog/`: Listing and detail views.
    - `portfolio/templates/portfolio/`: Projects and team.
    - `agency/templates/agency/`: About and Join Us.

## Static Assets
- **CSS**: Located in `static/css/`. Contains theme variables, component styles, and dark mode toggles.
- **JS**: Located in `static/js/`. Handles navbar interactions, theme switching, and SwiperJS initialization.
- **Images**: Local assets in `static/img/`. Note: Most dynamic content (Blogs, Projects) is served via **Cloudinary CDN**.

## PWA Capabilities
- `sw.js`: Service worker for basic offline capabilities or performance optimization.
- `manifest.json`: (If present) defines the app appearance on mobile devices.
