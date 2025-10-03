import json
from .models import SiteConfiguration, OfficeLocation
from agency.models import ChatbotQA

def site_globals(request):
    config = SiteConfiguration.load()
    locations = OfficeLocation.objects.all()
    
    # FIX: Fetch and serialize Chatbot Q&A data for the frontend.
    chatbot_qas_queryset = ChatbotQA.objects.all().order_by('display_order')
    chatbot_qas_list = list(chatbot_qas_queryset.values('keyword', 'question', 'answer'))
    chatbot_qas_json = json.dumps(chatbot_qas_list)

    return {
        'site_config': config,
        'office_locations': locations,
        'chatbot_qas_json': chatbot_qas_json, # Pass JSON string to template
    }