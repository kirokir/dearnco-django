from django.urls import path
from . import views

app_name = 'blog'
urlpatterns = [
    path('blog/', views.blog_index_view, name='blog_index'),
    path('blog/<slug:slug>/', views.blog_post_detail_view, name='blog_post_detail'),
]