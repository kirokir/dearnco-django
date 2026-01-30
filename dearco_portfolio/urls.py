from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.sitemaps.views import sitemap
from .sitemaps import StaticViewSitemap, BlogPostSitemap

sitemaps = {
    'static': StaticViewSitemap,
    'blog': BlogPostSitemap,
}

urlpatterns = [
    path('admin/', admin.site.urls),
    path('tinymce/', include('tinymce.urls')),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='django.contrib.sitemaps.views.sitemap'),
    path('', include('core.urls')),
    path('', include('blog.urls')),
    path('', include('portfolio.urls')),
    path('', include('agency.urls')),
    path(
        "sw.js",
        TemplateView.as_view(
            template_name="sw.js",
            content_type="application/javascript",
        ),
        name="sw.js",
    ),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)