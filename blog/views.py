from django.shortcuts import render, get_object_or_404
from .models import BlogPost, Tag

def blog_index_view(request):
    featured_posts = BlogPost.objects.filter(is_featured=True).order_by('?')
    all_other_posts = BlogPost.objects.filter(is_featured=False).order_by('-published_date')
    all_tags = Tag.objects.all()
    breadcrumbs = [{'name': 'Blog'}]
    context = {
        'featured_posts': featured_posts,
        'all_posts': all_other_posts,
        'all_tags': all_tags,
        'breadcrumbs': breadcrumbs,
    }
    return render(request, 'blog/blog_index.html', context)

def blog_post_detail_view(request, slug):
    post = get_object_or_404(BlogPost, slug=slug)
    breadcrumbs = [
        {'name': 'Blog', 'url': '/blog/'},
        {'name': post.title}
    ]
    context = {
        'post': post,
        'breadcrumbs': breadcrumbs,
        'body_class': 'blog-body-bg',
    }
    return render(request, 'blog/blog_post_detail.html', context)