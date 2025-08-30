from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('tinymce/', include('tinymce.urls')),
    path('', include('core.urls')),
    path('', include('blog.urls')),
    path('', include('portfolio.urls')),
    path('', include('agency.urls')),
]

# This is the crucial change.
# This line will only be active during local development (DEBUG=True)
# and will be ignored in production, which is the correct behavior.
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)