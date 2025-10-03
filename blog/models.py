from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from tinymce.models import HTMLField
from cloudinary.models import CloudinaryField
import uuid

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    header_image = CloudinaryField('blog_headers')
    content = HTMLField()
    published_date = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(unique=True, max_length=255, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)
    is_featured = models.BooleanField(default=False, help_text="Check this to feature the post in the Blog page carousel.")

    class Meta:
        ordering = ['-published_date']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        # IMPROVEMENT: Make slug generation robust against duplicates.
        if not self.slug:
            base_slug = slugify(self.title)
            unique_slug = base_slug
            # Check if slug exists and append a unique suffix if it does
            while BlogPost.objects.filter(slug=unique_slug).exists():
                unique_slug = f'{base_slug}-{uuid.uuid4().hex[:4]}'
            self.slug = unique_slug
        super().save(*args, **kwargs)