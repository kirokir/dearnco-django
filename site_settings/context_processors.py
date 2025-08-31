from .models import SiteConfiguration, OfficeLocation
from agency.models import ChatbotQA

def site_globals(request):
    try:
        config = SiteConfiguration.load()
        locations = OfficeLocation.objects.all()
        chatbot_qas = ChatbotQA.objects.all()
    except Exception:
        config = None
        locations = []
        chatbot_qas = []
    return {
        'site_config': config,
        'office_locations': locations,
        'chatbot_qas': chatbot_qas
    }