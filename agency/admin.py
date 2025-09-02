from django.contrib import admin
from .models import StrategyCallLead, JobPosition, Brochure, BentoGridItem, ChatbotQA
from .forms import BrochureAdminForm

@admin.register(StrategyCallLead)
class StrategyCallLeadAdmin(admin.ModelAdmin):
    list_display = ('name', 'company_name', 'email', 'submitted_at')
    readonly_fields = ('name', 'company_name', 'email', 'revenue_range', 'biggest_challenge', 'success_goal', 'ideal_timeline', 'submitted_at')
    
    def has_add_permission(self, request):
        return False

@admin.register(JobPosition)
class JobPositionAdmin(admin.ModelAdmin):
    list_display = ('title', 'location_tags', 'employment_type', 'is_active', 'posted_at')
    list_filter = ('is_active', 'employment_type')
    search_fields = ('title', 'description')

@admin.register(Brochure)
class BrochureAdmin(admin.ModelAdmin):
    form = BrochureAdminForm
    
    def has_add_permission(self, request):
        return Brochure.objects.count() == 0

@admin.register(BentoGridItem)
class BentoGridItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'subtitle', 'display_order', 'column_span', 'row_span')

@admin.register(ChatbotQA)
class ChatbotQAAdmin(admin.ModelAdmin):
    list_display = ('keyword', 'question', 'display_order')