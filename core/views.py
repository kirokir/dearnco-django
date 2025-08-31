from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import TemplateView
from portfolio.models import Project
from blog.models import BlogPost
from site_settings.models import SiteConfiguration
from agency.models import BentoGridItem

class Service:
    def __init__(self, icon, title, description):
        self.icon = icon
        self.title = title
        self.description = description
      

class ServiceWorkerView(TemplateView):
    template_name = 'sw.js'
    content_type = 'application/javascript'

def home_view(request):
    primary_projects = Project.objects.filter(project_type='primary').order_by('display_order')
    secondary_projects = Project.objects.filter(project_type='secondary').order_by('display_order')
    services_data = [
        Service(icon='saas', title='SaaS Development', description='End-to-end platform creation, from architecture to deployment, built for scalability and user engagement.'),
        Service(icon='ai', title='AI & Machine Learning', description='Intelligent systems, predictive models, and NLP solutions to unlock data-driven insights and automation.'),
        Service(icon='mobile', title='Mobile Applications', description='High-performance Android & iOS applications designed for exceptional user experience and market impact.'),
        Service(icon='algo', title='Custom Algorithms', description='Bespoke Python algorithms for data processing, optimization, and automation tailored to your unique challenges.'),
        Service(icon='dev', title='Developer Tooling', description='Creating powerful DSLs, linters, and internal tools that accelerate workflows and empower your teams.')
    ]
    bento_items = BentoGridItem.objects.all()

    site_config = SiteConfiguration.load()
    hero_opacity_value = site_config.hero_image_opacity / 100.0 if site_config else 0.2

    context = {
        'primary_projects': primary_projects,
        'secondary_projects': secondary_projects,
        'services': services_data,
        'bento_items': bento_items,
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