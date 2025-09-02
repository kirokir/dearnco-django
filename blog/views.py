from django.shortcuts import render, get_object_or_404
from django.utils import timezone # Import timezone
from .models import BlogPost, Tag
import random

def blog_index_view(request):
    # CORRECTED FILTER: Use published_date__lte instead of is_published
    all_posts = BlogPost.objects.select_related('author__profile').prefetch_related('tags').filter(published_date__lte=timezone.now()).order_by('-published_date')
    
    featured_posts = list(all_posts.filter(is_featured=True))
    random.shuffle(featured_posts)
    
    non_featured_posts = all_posts.filter(is_featured=False)
    all_tags = Tag.objects.all()

    context = {
        'featured_posts': featured_posts,
        'non_featured_posts': non_featured_posts,
        'all_tags': all_tags
    }
    return render(request, 'blog/blog_index.html', context)

def blog_post_detail_view(request, slug):
    # CORRECTED FILTER: Use published_date__lte instead of is_published
    post = get_object_or_404(
        BlogPost.objects.select_related('author__profile').prefetch_related('tags'),
        slug=slug, 
        published_date__lte=timezone.now()
    )
    
    context = {
        'post': post,
        'body_class': 'blog-body-bg'
    }
    return render(request, 'blog/blog_post_detail.html', context)