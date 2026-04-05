from django.contrib import admin
from .models import BlogPost, Tag

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'published_date', 'is_featured')
    list_filter = ('is_featured', 'author', 'tags')
    search_fields = ('title', 'content')
    # This automatically creates the slug from the title in the admin
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_date'
    # Helps with selecting the author
    raw_id_fields = ('author',)

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    search_fields = ('name',)