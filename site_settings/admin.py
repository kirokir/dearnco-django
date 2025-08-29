from django.contrib import admin
from .models import SiteConfiguration
from singleton_model.admin import SingletonModelAdmin

@admin.register(SiteConfiguration)
class SiteConfigurationAdmin(SingletonModelAdmin):
    fieldsets = (
        ('Global Site Identity', {'fields': ('logo',)}),
        ('Homepage Hero Section', {'fields': ('hero_image', 'hero_image_opacity', 'hero_image_blur')}),
        ('Contact & Social Media', {'fields': ('email', 'whatsapp', 'instagram', 'facebook', 'linkedin', 'behance', 'discord', 'youtube')}),
    )