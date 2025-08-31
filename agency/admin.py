from django.contrib import admin
from .models import StrategyCallLead, Brochure, BentoGridItem, ChatbotQA

@admin.register(StrategyCallLead)
class StrategyCallLeadAdmin(admin.ModelAdmin):
    list_display = ('name', 'company_name', 'email', 'submitted_at')
    readonly_fields = ('name', 'company_name', 'email', 'revenue_range', 'biggest_challenge', 'success_goal', 'ideal_timeline', 'submitted_at')
    def has_add_permission(self, request):
        return False

@admin.register(Brochure)
class BrochureAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return Brochure.objects.count() == 0

@admin.register(BentoGridItem)
class BentoGridItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'subtitle', 'display_order', 'column_span', 'row_span')

@admin.register(ChatbotQA)
class ChatbotQAAdmin(admin.ModelAdmin):
    list_display = ('keyword', 'question', 'display_order')