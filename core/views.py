from django.shortcuts import render
from portfolio.models import Project
from portfolio.forms import ProjectForm
from blog.models import BlogPost

def home_view(request):
    all_projects = Project.objects.all().order_by('display_order')
    primary_projects = all_projects.filter(project_type='primary')
    secondary_projects = all_projects.filter(project_type='secondary')
    recent_posts = BlogPost.objects.all().order_by('-published_date')[:4]
    add_project_form = ProjectForm()
    context = {
        'primary_projects': primary_projects,
        'secondary_projects': secondary_projects,
        'recent_posts': recent_posts,
        'add_project_form': add_project_form,
        'is_homepage': True,
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