from django.contrib import admin
from .models import SiteConfiguration

# We are defining the Admin class without the decorator
class SiteConfigurationAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        # Allow adding only if no instance exists
        return SiteConfiguration.objects.count() == 0
        
    def has_delete_permission(self, request, obj=None):
        # Prevent deletion of the singleton object
        return False
        
    fieldsets = (
        ('Global Site Identity', {'fields': ('logo',)}),
        ('Theme & Appearance', {'fields': ('enable_dark_mode',)}),
        ('Homepage Hero Section', {'fields': ('hero_image', 'hero_image_opacity', 'hero_image_blur')}),
        ('Footer Configuration', {'fields': ('footer_background_image', 'company_address', 'google_maps_link')}),
        ('Contact & Social Media', {'fields': ('email', 'whatsapp', 'instagram', 'facebook', 'linkedin', 'behance', 'discord', 'youtube')}),
    )

# Now, we register the model and its admin class together.
# This is the traditional method and avoids the double-registration conflict.
admin.site.register(SiteConfiguration, SiteConfigurationAdmin)