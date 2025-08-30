from django.contrib import admin
from .models import StrategyCallLead, AssessmentLead, JobPosition

@admin.register(StrategyCallLead)
class StrategyCallLeadAdmin(admin.ModelAdmin):
    list_display = ('name', 'company_name', 'email', 'submitted_at')
    list_filter = ('revenue_range', 'ideal_timeline')
    search_fields = ('name', 'company_name', 'email', 'biggest_challenge')
    readonly_fields = ('name', 'company_name', 'email', 'revenue_range', 'biggest_challenge', 'success_goal', 'ideal_timeline', 'submitted_at')

    def has_add_permission(self, request):
        return False

@admin.register(AssessmentLead)
class AssessmentLeadAdmin(admin.ModelAdmin):
    list_display = ('email', 'downloaded_at')
    search_fields = ('email',)
    readonly_fields = ('email', 'downloaded_at')

    def has_add_permission(self, request):
        return False

@admin.register(JobPosition)
class JobPositionAdmin(admin.ModelAdmin):
    list_display = ('title', 'location_tags', 'employment_type', 'is_active', 'posted_at')
    list_filter = ('is_active', 'employment_type')
    search_fields = ('title', 'description')