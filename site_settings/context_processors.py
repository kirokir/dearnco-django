from .models import SiteConfiguration

def site_globals(request):
    return {
        'site_config': SiteConfiguration.load()
    }