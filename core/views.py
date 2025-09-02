from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import TemplateView
from django.views.decorators.cache import cache_page
from portfolio.models import Project
from blog.models import BlogPost
from agency.models import BentoGridItem, ChatbotQA
import random
import json

def home_view(request):
    all_projects = Project.objects.all().order_by('display_order') # CORRECTED FIELD NAME
    primary_projects = [p for p in all_projects if p.project_type == 'primary']
    secondary_projects = [p for p in all_projects if p.project_type == 'secondary']

    all_posts = BlogPost.objects.select_related('author__profile').prefetch_related('tags').filter(is_published=True).order_by('-published_date')
    featured_posts = list(all_posts.filter(is_featured=True))
    random.shuffle(featured_posts)
    recent_posts = all_posts.filter(is_featured=False)[:6]

    bento_items = BentoGridItem.objects.all().order_by('order')

    services = [
        {'icon': 'saas-dev', 'title': 'SaaS Development', 'description': 'End-to-end platform creation, from architecture to deployment, built for scalability and user engagement.'},
        {'icon': 'ai-ml', 'title': 'AI & Machine Learning', 'description': 'Intelligent systems, predictive models, and NLP solutions to unlock data-driven insights and automation.'},
        {'icon': 'mobile-app', 'title': 'Mobile Applications', 'description': 'High-performance Android & iOS applications designed for exceptional user experience and market impact.'},
        {'icon': 'custom-algo', 'title': 'Custom Algorithms', 'description': 'Bespoke Python algorithms for data processing, optimization, and automation tailored to your unique challenges.'},
        {'icon': 'dev-tool', 'title': 'Developer Tooling', 'description': 'Creating powerful DSLs, linters, and internal tools that accelerate workflows and empower your teams.'},
        {'icon': 'graphic-design', 'title': 'Graphic Design', 'description': 'Visually compelling brand identities, UI/UX, and marketing materials that capture attention and tell your story.'}
    ]
    
    chatbot_qas_qs = ChatbotQA.objects.all()
    chatbot_qas_json = json.dumps(list(chatbot_qas_qs.values('keyword', 'answer')))

    context = {
        'primary_projects': primary_projects,
        'secondary_projects': secondary_projects,
        'featured_posts': featured_posts[:3],
        'recent_posts': recent_posts,
        'bento_items': bento_items,
        'services': services,
        'chatbot_qas_json': chatbot_qas_json,
    }
    return render(request, 'core/home.html', context)

def contact_view(request):
    context = {'breadcrumbs': [{'name': 'Contact', 'url': '#'}]}
    return render(request, 'core/contact.html', context)

def terms_view(request):
    context = {'breadcrumbs': [{'name': 'Terms & Conditions', 'url': '#'}]}
    return render(request, 'core/terms.html', context)

def privacy_view(request):
    context = {'breadcrumbs': [{'name': 'Privacy Policy', 'url': '#'}]}
    return render(request, 'core/privacy.html', context)

def faq_view(request):
    context = {'breadcrumbs': [{'name': 'FAQ', 'url': '#'}]}
    return render(request, 'core/faq.html', context)

@cache_page(60 * 15)
def robots_txt(request):
    lines = [
        "User-Agent: *",
        "Disallow: /admin/",
        "Sitemap: /sitemap.xml",
    ]
    return HttpResponse("\n".join(lines), content_type="text/plain")

class ServiceWorkerView(TemplateView):
    template_name = 'sw.js'
    content_type = 'application/javascript'