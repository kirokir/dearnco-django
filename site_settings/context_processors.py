from .models import SiteConfiguration
from django.db import connection
from django.db.utils import OperationalError

def site_globals(request):
    config = None
    try:
        # Check if the required table exists before querying it.
        # This prevents errors during startup commands like 'collectstatic'.
        if SiteConfiguration._meta.db_table in connection.introspection.table_names():
            config = SiteConfiguration.get_solo()
    except OperationalError:
        # This can happen if the database isn't fully ready.
        # It's safe to ignore here; the config will be None.
        pass
        
    return {
        'site_config': config
    }