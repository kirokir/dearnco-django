from django.shortcuts import render, redirect
from django.contrib import messages
from .models import JobPosition, Brochure, ChatbotQA
from .forms import StrategyCallForm, AssessmentForm

def about_view(request):
    strategy_form = StrategyCallForm()
    brochure = Brochure.load()
    
    if 'strategy_form_submit' in request.POST:
        strategy_form = StrategyCallForm(request.POST)
        if strategy_form.is_valid():
            strategy_form.save()
            messages.success(request, "Thank you! We've received your request and will be in touch shortly.")
            return redirect('agency:about')

    breadcrumbs = [{'name': 'About Us'}]
    context = {
        'breadcrumbs': breadcrumbs,
        'strategy_form': strategy_form,
        'brochure': brochure,
    }
    return render(request, 'agency/about.html', context)

def join_us_view(request):
    active_positions = JobPosition.objects.filter(is_active=True)
    breadcrumbs = [{'name': 'Join Us'}]
    context = {
        'breadcrumbs': breadcrumbs,
        'positions': active_positions,
    }
    return render(request, 'agency/join_us.html', context)