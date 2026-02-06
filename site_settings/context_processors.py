import json
from .models import SiteConfiguration, OfficeLocation

def site_globals(request):
    config = SiteConfiguration.load()
    locations = OfficeLocation.objects.all()
    
    return {
        'site_config': config,
        'office_locations': locations,
    }