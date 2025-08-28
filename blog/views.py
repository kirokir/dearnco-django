from django.shortcuts import render, get_object_or_404
from .models import BlogPost

def blog_post_detail_view(request, slug):
    post = get_object_or_404(BlogPost, slug=slug)
    context = {
        'post': post
    }
    return render(request, 'blog/blog_post_detail.html', context)