from django.contrib import admin
from .models import BlogPost, Tag

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'published_date', 'is_featured')
    list_filter = ('tags', 'author', 'is_featured')
    search_fields = ('title', 'content')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_date'

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    search_fields = ('name',)