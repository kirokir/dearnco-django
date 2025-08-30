*Dear&Co Dynamic Agency Website*

A sophisticated, full-stack Django web application that transforms a static HTML page into a dynamic, content-manageable professional agency website. Built with modern web technologies and enterprise-grade architecture.
🌟 Key Features
Content Management

Dynamic Site Configuration: Centralized admin control for themes, logos, and site-wide settings
Blog System: Featured post carousels, tag-based categorization, SEO optimization
Portfolio Showcase: Project galleries with categorization and technology documentation
Team Management: Dynamic team member profiles with social media integration

User Experience

Dark Mode Support: Admin-controlled site-wide theme switching
Responsive Design: Mobile-first approach with hamburger navigation
Accessibility Compliant: WCAG 2.1 AA standards implementation
SEO Optimized: Meta tags, breadcrumbs, robots.txt generation

Business Features

Lead Generation: Strategy call forms, assessment requests, contact management
Career Portal: Dynamic job posting system with expandable details
Social Integration: WhatsApp, Instagram, LinkedIn, Twitter connectivity
Performance Monitoring: Automated uptime checking and health monitoring

🏗️ Architecture
Technology Stack

Backend: Django 4.2+ (Python 3.11+)
Database: PostgreSQL 14+ (Supabase hosted)
Media Storage: Cloudinary CDN
Hosting: Render.com Platform-as-a-Service
Frontend: HTML5, CSS3, JavaScript ES6+, SwiperJS

Application Structure
dear_co_website/
├── core/                   # Homepage and core functionality
├── blog/                   # Blog management system
├── portfolio/              # Portfolio and team showcase
├── agency/                 # Business operations (careers, leads)
├── site_settings/          # Global configuration management
├── static/                 # Static assets (CSS, JS, images)
├── templates/              # Django templates
└── requirements.txt        # Python dependencies
🚀 Quick Start
Prerequisites

Python 3.11+
PostgreSQL 14+
Git
Virtual environment tool (venv, virtualenv, or conda)

Installation

Clone the repository
bashgit clone https://github.com/yourusername/dear-co-website.git
cd dear-co-website

Create virtual environment
bashpython -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

Install dependencies
bashpip install -r requirements.txt

Environment Configuration
Create a .env file in the root directory:
envSECRET_KEY=your-secret-key-here
DEBUG=True
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
DB_PORT=5432

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

Database Setup
bashpython manage.py migrate
python manage.py createsuperuser
python manage.py collectstatic

Run Development Server
bashpython manage.py runserver


Visit http://localhost:8000 to view the application and http://localhost:8000/admin for the admin panel.
📁 Project Structure
Core Applications
core/ - Homepage & Base Functionality

Homepage views and templates
Static page management (About, FAQ, T&C)
User profile management
Base templates and global context

blog/ - Content Management System

Blog post creation and management
Tag system and categorization
SEO metadata handling
Featured post functionality

portfolio/ - Portfolio & Team Showcase

Project management (Primary/Secondary categories)
Team member profiles
Image galleries and project documentation
Technology stack tracking

agency/ - Business Operations

Job position management
Lead generation forms
Contact form handling
Career portal functionality

site_settings/ - Global Configuration

Singleton configuration model
Theme management (Dark mode toggle)
Social media integration
Footer and header settings

Key Features Implementation
Dynamic Site Configuration
python# Singleton pattern for global settings
class SiteConfiguration(SingletonModel):
    site_logo = CloudinaryField('image')
    enable_dark_mode = models.BooleanField(default=False)
    hero_image = CloudinaryField('image')
    # ... additional configuration fields
Responsive Navigation

Mobile-first design approach
Hamburger menu for mobile devices
Smooth animations and transitions
Accessibility-compliant navigation

Blog System

Featured post carousel using SwiperJS
Tag-based filtering system
SEO-optimized URLs and metadata
Admin-friendly content management

🔧 Configuration
Environment Variables
VariableDescriptionRequiredSECRET_KEYDjango secret keyYesDEBUGDebug mode (True/False)YesALLOWED_HOSTSComma-separated allowed hostsProductionDB_NAMEDatabase nameYesDB_USERDatabase userYesDB_PASSWORDDatabase passwordYesDB_HOSTDatabase hostYesDB_PORTDatabase portNo (default: 5432)CLOUDINARY_CLOUD_NAMECloudinary cloud nameYesCLOUDINARY_API_KEYCloudinary API keyYesCLOUDINARY_API_SECRETCloudinary API secretYes
Admin Configuration
After creating a superuser, access the admin panel to configure:

Site Configuration

Upload site logo and hero images
Configure dark mode settings
Set social media links
Configure footer settings


Content Management

Create blog posts and tags
Add portfolio projects
Manage team members
Post job openings



🚀 Deployment
Render.com Deployment

Connect Repository

Fork this repository to your GitHub account
Connect your Render account to GitHub
Create a new Web Service in Render


Environment Configuration
Build Command: pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate
Start Command: gunicorn core.wsgi:application

Environment Variables
Set all required environment variables in Render dashboard
Database Setup

Create PostgreSQL database in Render or use Supabase
Update database environment variables



Production Considerations

Set DEBUG=False in production
Configure proper ALLOWED_HOSTS
Set up SSL certificates (automatic with Render)
Configure database backups
Set up monitoring and logging

🧪 Testing
Running Tests
bash# Run all tests
python manage.py test

# Run specific app tests
python manage.py test blog

# Run with coverage
coverage run --source='.' manage.py test
coverage report
coverage html
Test Coverage
The project includes comprehensive test coverage for:

Model validation and methods
View functionality and permissions
Form validation and processing
Template rendering
URL routing

📊 Performance Features
Optimization Strategies

Database Optimization: Query optimization with select_related/prefetch_related
Caching: View-level and template fragment caching
Static Files: WhiteNoise for efficient static file serving
Media Optimization: Cloudinary automatic image optimization
Performance Monitoring: Built-in performance tracking

Keep-Alive System
GitHub Actions workflow automatically pings the application every 14 minutes to prevent free-tier hosting from sleeping.
🔒 Security Features

CSRF protection enabled
SQL injection prevention
XSS protection with secure headers
HTTPS enforcement in production
Secure session management
Input validation and sanitization
Content Security Policy implementation

🤝 Contributing

Fork the repository
Create a feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

Development Guidelines

Follow PEP 8 coding standards
Write tests for new features
Update documentation as needed
Ensure responsive design compatibility
Maintain accessibility standards

📚 Documentation

Technical Specification
API Documentation
Deployment Guide
User Manual

🐛 Known Issues

Mobile carousel navigation requires touch optimization
Large image uploads may timeout on slow connections
Admin dark mode styling needs refinement

🗺️ Roadmap
Upcoming Features

 Multi-language support (i18n)
 Advanced SEO analytics integration
 Email newsletter system
 Client portal functionality
 Advanced search functionality
 API endpoints for mobile app

Performance Improvements

 Implement Redis caching
 Database query optimization
 Progressive Web App features
 Advanced image lazy loading

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
🙏 Acknowledgments

Django community for the robust framework
Render.com for reliable hosting platform
Cloudinary for media management services
SwiperJS for carousel functionality
Bootstrap community for design inspiration

📞 Support
For support and questions:

Create an issue in this repository
Email: support@dearco.agency
Documentation: Project Wiki


Built with ❤️ using Django and modern web technologies
