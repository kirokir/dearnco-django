from django.shortcuts import render
from django.http import HttpResponse
from portfolio.models import Project
from blog.models import BlogPost
from site_settings.models import SiteConfiguration

def home_view(request):
    all_primary = Project.objects.filter(project_type='primary').order_by('display_order')
    all_secondary = Project.objects.filter(project_type='secondary').order_by('display_order')
    
    primary_projects = all_primary[:3]
    secondary_projects = all_secondary[:3]
    
    primary_projects_count = all_primary.count()
    secondary_projects_count = all_secondary.count()
    
    featured_posts = BlogPost.objects.filter(is_featured=True).order_by('-published_date')
    recent_posts = BlogPost.objects.filter(is_featured=False).order_by('-published_date')[:6]

    site_config = SiteConfiguration.load()
    hero_opacity_value = site_config.hero_image_opacity / 100.0 if site_config else 0.2

    context = {
        'primary_projects': primary_projects,
        'secondary_projects': secondary_projects,
        'primary_projects_count_remaining': primary_projects_count - 3 if primary_projects_count > 3 else 0,
        'secondary_projects_count_remaining': secondary_projects_count - 3 if secondary_projects_count > 3 else 0,
        'featured_posts': featured_posts,
        'recent_posts': recent_posts,
        'is_homepage': True,
        'hero_opacity': hero_opacity_value,
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

def faq_view(request):
    breadcrumbs = [{'name': 'FAQ'}]
    return render(request, 'core/faq.html', {'breadcrumbs': breadcrumbs})

def robots_txt(request):
    lines = ["User-Agent: *", "Disallow: /admin/"]
    return HttpResponse("\n".join(lines), content_type="text/plain")