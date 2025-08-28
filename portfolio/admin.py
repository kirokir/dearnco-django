from django.contrib import admin
from .models import Project, TeamMember

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'project_type', 'display_order')
    list_filter = ('project_type',)
    search_fields = ('title', 'description')

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'display_order')
    search_fields = ('name', 'role')