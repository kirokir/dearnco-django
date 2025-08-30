from django.contrib import admin
from .models import SiteConfiguration

@admin.register(SiteConfiguration)
class SiteConfigurationAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return SiteConfiguration.objects.count() == 0
    def has_delete_permission(self, request, obj=None):
        return False
        
    fieldsets = (
        ('Global Site Identity', {'fields': ('logo',)}),
        ('Theme & Appearance', {'fields': ('enable_dark_mode',)}),
        ('Homepage Hero Section', {'fields': ('hero_image', 'hero_image_opacity', 'hero_image_blur')}),
        ('Contact & Social Media', {'fields': ('email', 'whatsapp', 'instagram', 'facebook', 'linkedin', 'behance', 'discord', 'youtube')}),
    )