from django.contrib import admin
from .models import Profile

# We will no longer use a custom UserAdmin with an inline profile.
# Instead, we will manage Profiles directly.
# This avoids the race condition with the signal on user creation.

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'image_preview')
    readonly_fields = ('user',) # You can't change the user a profile is linked to.
    
    # A little helper to show the image in the list view
    def image_preview(self, obj):
        from django.utils.html import format_html
        if obj.image:
            return format_html('<img src="{}" width="50" height="50" style="object-fit: cover; border-radius: 50%;" />', obj.image.url)
        return "No Image"
    image_preview.short_description = 'Profile Picture'