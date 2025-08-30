from django.db import models
from cloudinary.models import CloudinaryField
from core.models import SingletonModel

class SiteConfiguration(SingletonModel):
    logo = CloudinaryField('logo', null=True, blank=True, help_text="Your site's primary logo. Should be a transparent PNG.")
    hero_image = CloudinaryField('hero_image', null=True, blank=True, help_text="The main background image for the homepage hero section.")
    hero_image_opacity = models.PositiveIntegerField(default=20, help_text="Opacity of the hero image (0-100). 20 is a good starting point.")
    hero_image_blur = models.PositiveIntegerField(default=5, help_text="Blur effect on the hero image in pixels (0-20). 5 is a good starting point.")
    email = models.EmailField(default="thedearandco@gmail.com")
    whatsapp = models.URLField(max_length=255, blank=True, help_text="e.g., https://wa.me/919846547132")
    instagram = models.URLField(max_length=255, blank=True, help_text="e.g., https://www.instagram.com/thedearandco/")
    facebook = models.URLField(max_length=255, blank=True)
    linkedin = models.URLField(max_length=255, blank=True)
    behance = models.URLField(max_length=255, default="https://www.behance.net/dearandco", blank=True)
    discord = models.URLField(max_length=255, default="https://discord.com/users/magenta_35298", blank=True)
    youtube = models.URLField(max_length=255, default="http://www.youtube.com/@DEAR-CO", blank=True)
    enable_dark_mode = models.BooleanField(default=True, help_text="Enable the dark mode theme for the entire site.")

    def __str__(self):
        return "Site Configuration"

    class Meta:
        verbose_name_plural = "Site Configuration"