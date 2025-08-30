from django.shortcuts import render
from django.http import HttpResponse
from portfolio.models import Project
from blog.models import BlogPost
from site_settings.models import SiteConfiguration

def home_view(request):
    all_primary = Project.objects.filter(project_type='primary').order_by('display_order')
    all_secondary = Project.objects.filter(project_type='secondary').order_by('display_order')
    
    recent_posts = BlogPost.objects.all().order_by('-published_date')[:4]

    site_config = SiteConfiguration.load()
    hero_opacity_value = site_config.hero_image_opacity / 100.0 if site_config else 0.2

    context = {
        'primary_projects': all_primary,
        'secondary_projects': all_secondary,
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