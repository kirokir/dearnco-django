from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.urls import reverse # CRITICAL: Import reverse
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
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="blog_posts")
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

    # CRITICAL FIX: This method is required for templates to generate post URLs.
    def get_absolute_url(self):
        return reverse('blog:blog_post_detail', kwargs={'slug': self.slug})

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            unique_slug = base_slug
            # Ensure slugs are unique if titles are the same
            while BlogPost.objects.filter(slug=unique_slug).exists():
                unique_slug = f'{base_slug}-{uuid.uuid4().hex[:4]}'
            self.slug = unique_slug
        super().save(*args, **kwargs)