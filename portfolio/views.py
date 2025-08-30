from django.shortcuts import render
from .models import TeamMember, Project

def portfolio_all_view(request):
    primary_projects = Project.objects.filter(project_type='primary').order_by('display_order')
    secondary_projects = Project.objects.filter(project_type='secondary').order_by('display_order')
    breadcrumbs = [{'name': 'Our Work'}]
    context = {
        'primary_projects': primary_projects,
        'secondary_projects': secondary_projects,
        'breadcrumbs': breadcrumbs,
    }
    return render(request, 'portfolio/portfolio_all.html', context)
    
def team_view(request):
    team_members = TeamMember.objects.all().order_by('display_order')
    breadcrumbs = [{'name': 'Our Team'}]
    context = {
        'team_members': team_members,
        'breadcrumbs': breadcrumbs,
    }
    return render(request, 'portfolio/team.html', context)