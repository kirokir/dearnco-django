from .models import SiteConfiguration, OfficeLocation

def site_globals(request):
    try:
        config = SiteConfiguration.load()
        locations = OfficeLocation.objects.all()
    except Exception:
        config = None
        locations = []
    return {
        'site_config': config,
        'office_locations': locations
    }