from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from django.utils import timezone
from blog.models import BlogPost


class StaticViewSitemap(Sitemap):
    """Sitemap for static pages."""
    priority = 0.7
    changefreq = 'weekly'

    def items(self):
        return ['core:home', 'agency:about', 'agency:join_us', 'blog:blog_index']

    def location(self, item):
        return reverse(item)


class BlogPostSitemap(Sitemap):
    """Sitemap for blog posts."""
    changefreq = 'weekly'
    priority = 0.8

    def items(self):
        return BlogPost.objects.filter(published_date__lte=timezone.now()).order_by('-published_date')

    def lastmod(self, obj):
        return obj.published_date

    def location(self, obj):
        return obj.get_absolute_url()
