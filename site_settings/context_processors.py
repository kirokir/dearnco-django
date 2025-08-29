from .models import SiteConfiguration

def site_globals(request):
    try:
        config = SiteConfiguration.load()
    except Exception:
        config = None
    return {
        'site_config': config
    }