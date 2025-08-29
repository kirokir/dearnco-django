from django.shortcuts import render
from portfolio.models import Project
from blog.models import BlogPost
from site_settings.models import SiteConfiguration # Import the SiteConfiguration model

def home_view(request):
    all_projects = Project.objects.all().order_by('display_order')
    primary_projects = all_projects.filter(project_type='primary')
    secondary_projects = all_projects.filter(project_type='secondary')
    recent_posts = BlogPost.objects.all().order_by('-published_date')[:4]
    
    # Get the site configuration
    site_config = SiteConfiguration.load()
    
    # Perform the opacity calculation here in the view
    hero_opacity_value = site_config.hero_image_opacity / 100.0 if site_config else 0.2

    context = {
        'primary_projects': primary_projects,
        'secondary_projects': secondary_projects,
        'recent_posts': recent_posts,
        'is_homepage': True,
        'hero_opacity': hero_opacity_value, # Pass the calculated value to the template
    }
    return render(request, 'home.html', context)

def contact_view(request):
    breadcrumbs = [{'name': 'Contact Us'}]
    return render(request, 'core/contact.html', {'breadcrumbs': breadcrumbs})

def terms_view(request):
    breadcrumbs = [{'name': 'Terms & Conditions'}]
    return render(request, 'core/terms.html', {'breadcrumbs': breadcrumbs})

def privacy_view(request):
    breadcrumbs = [{'name': 'Privacy Policy'}]
    return render(request, 'core/privacy.html', {'breadcrumbs': breadcrumbs})