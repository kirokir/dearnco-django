from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.urls import reverse
from .models import TeamMember, Project
from .forms import ProjectForm

def team_view(request):
    team_members = TeamMember.objects.all().order_by('display_order')
    context = {
        'team_members': team_members
    }
    return render(request, 'portfolio/team.html', context)

@login_required
def manage_project(request):
    if not request.user.is_staff:
        return redirect('home')
        
    if request.method == 'POST':
        project_id = request.POST.get('project_id')
        
        if project_id:
            project_instance = get_object_or_404(Project, pk=project_id)
            form = ProjectForm(request.POST, request.FILES, instance=project_instance)
        else:
            form = ProjectForm(request.POST, request.FILES)

        if form.is_valid():
            form.save()
            return redirect(reverse('home') + '#projects')

    return redirect('home')

@login_required
def delete_project(request, pk):
    if not request.user.is_staff:
        return redirect('home')
        
    project = get_object_or_404(Project, pk=pk)
    if request.method == 'POST':
        project.delete()
        return redirect(reverse('home') + '#projects')
    
    return redirect('home')