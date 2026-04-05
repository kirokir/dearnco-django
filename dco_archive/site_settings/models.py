from django.db import models
from cloudinary.models import CloudinaryField
from core.models import SingletonModel

class OfficeLocation(models.Model):
    name = models.CharField(max_length=100, help_text="e.g., Headquarters, Design Studio")
    address = models.CharField(max_length=255)
    google_maps_link = models.URLField(max_length=500)
    display_order = models.PositiveIntegerField(default=0)
    class Meta:
        ordering = ['display_order']
    def __str__(self):
        return self.name

class SiteConfiguration(SingletonModel):
    logo = CloudinaryField('logo', null=True, blank=True)
    hero_image = CloudinaryField('hero_image', null=True, blank=True)
    hero_image_opacity = models.PositiveIntegerField(default=20)
    hero_image_blur = models.PositiveIntegerField(default=5)
    enable_dark_mode = models.BooleanField(default=True)
    footer_background_image = CloudinaryField('footer_background', null=True, blank=True)
    email = models.EmailField(default="thedearandco@gmail.com")
    phone_number = models.CharField(max_length=20, blank=True, default="9846547132", help_text="Enter phone number without country code or symbols.")
    whatsapp = models.URLField(max_length=255, blank=True, help_text="e.g., https://wa.me/919846547132")
    instagram = models.URLField(max_length=255, blank=True)
    facebook = models.URLField(max_length=255, blank=True)
    linkedin = models.URLField(max_length=255, blank=True)
    behance = models.URLField(max_length=255, blank=True)
    discord = models.URLField(max_length=255, blank=True)
    youtube = models.URLField(max_length=255, blank=True)

    def __str__(self):
        return "Site Configuration"

    class Meta:
        verbose_name_plural = "Site Configuration"