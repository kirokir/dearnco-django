from django.urls import path
from . import views

app_name = 'blog' # This is important for namespacing

urlpatterns = [
    # URL for the main blog listing page
    path('blog/', views.blog_index_view, name='blog_index'),
    
    # URL for a single blog post, using its slug
    path('blog/<slug:slug>/', views.blog_post_detail_view, name='blog_post_detail'),
]