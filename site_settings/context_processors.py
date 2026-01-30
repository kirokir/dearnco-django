import json
from .models import SiteConfiguration, OfficeLocation
from agency.models import ChatbotQA

def site_globals(request):
    config = SiteConfiguration.load()
    locations = OfficeLocation.objects.all()
    
    # FIX: Pass the list directly so the template can use the json_script filter safely.
    chatbot_qas_queryset = ChatbotQA.objects.all().order_by('display_order')
    chatbot_qas_list = list(chatbot_qas_queryset.values('keyword', 'question', 'answer'))

    return {
        'site_config': config,
        'office_locations': locations,
        'chatbot_qas_json': chatbot_qas_list, # Pass list for json_script filter
    }