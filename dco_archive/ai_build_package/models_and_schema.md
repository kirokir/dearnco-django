# Database Schema: Models and Relationships

## Core App (`core`)
- **SingletonModel (Abstract)**: Base model for singleton configurations (ensures only one instance exists).
- **Profile**: Extends the default Django `User` model with a `CloudinaryField` for profile pictures.

## Blog App (`blog`)
- **Tag**: Stores blog categories/tags (`name`).
- **BlogPost**: Core blogging model.
    - Fields: `title`, `subtitle`, `author` (User FK), `header_image` (Cloudinary), `content` (HTMLField), `published_date`, `slug` (Unique), `tags` (M2M), `is_featured`.
    - Logic: Custom `save()` method for automatic slug generation.

## Portfolio App (`portfolio`)
- **Project**: Represents portfolio items.
    - Fields: `title`, `description`, `project_url`, `image` (Cloudinary), `project_type` (Primary/Secondary), `display_order`.
- **TeamMember**: Agency staff members.
    - Fields: `name`, `role`, `image` (Cloudinary), `display_order`.

## Agency App (`agency`)
- **StrategyCallLead**: Captures leads from the "Strategy Call" form.
    - Fields: `name`, `company_name`, `email`, `interest`, `message`, `revenue_range`, `biggest_challenge`, `success_goal`, `ideal_timeline`, `submitted_at`.
- **AssessmentLead**: Captures emails for brochure downloads.
    - Fields: `email`, `downloaded_at`.
- **Brochure (Singleton)**: Stores the downloadable brochure PDF.
- **BentoGridItem**: Dynamic items for a grid layout.
    - Fields: `title`, `subtitle`, `image`, `link_url`, `display_order`, `column_span`, `row_span`.
- **ChatbotQA**: Predefined Q&A for the site's chatbot logic.
    - Fields: `keyword`, `question`, `answer`, `display_order`.
- **JobPosition**: Hiring/Careers management.
    - Fields: `title`, `location_tags`, `employment_type`, `description`, `is_active`, `posted_at`.

## Site Settings App (`site_settings`)
- **OfficeLocation**: Physical office addresses.
    - Fields: `name`, `address`, `google_maps_link`, `display_order`.
- **SiteConfiguration (Singleton)**: Global site state.
    - Fields: `logo`, `hero_image`, `hero_image_opacity`, `hero_image_blur`, `enable_dark_mode`, `footer_background_image`, `email`, `phone_number`, `whatsapp`, `instagram`, `facebook`, `linkedin`, `behance`, `discord`, `youtube`.
