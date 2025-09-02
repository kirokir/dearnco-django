from django.shortcuts import render, redirect
from django.contrib import messages
from .models import StrategyCallLead, AssessmentLead, Brochure, JobPosition
from portfolio.models import TeamMember

def about_view(request):
    """
    Handles the logic for the About page, displaying team members.
    """
    team_members = TeamMember.objects.all().order_by('order')
    context = {
        'team_members': team_members,
    }
    return render(request, 'agency/about.html', context)

def join_us_view(request):
    """
    Handles the logic for the Join Us/Careers page, displaying open job positions.
    """
    job_positions = JobPosition.objects.filter(is_active=True).order_by('created_at')
    context = {
        'job_positions': job_positions,
    }
    return render(request, 'agency/join_us.html', context)

def contact_submit_view(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        service = request.POST.get('service')
        message_text = request.POST.get('message')

        if name and email and message_text:
            StrategyCallLead.objects.create(
                name=name,
                email=email,
                interest=service,
                message=message_text
            )
            messages.success(request, "Thank you! Your message has been received. We'll be in touch shortly.")
        else:
            messages.error(request, "Please fill out all required fields.")
        return redirect('agency:about')
    return redirect('agency:about')

def brochure_download_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        if email:
            AssessmentLead.objects.create(email=email)
            brochure = Brochure.objects.first()
            if brochure:
                return redirect(brochure.pdf_file.url)
            else:
                messages.error(request, "Sorry, the brochure is currently unavailable.")
                return redirect('agency:about')
        else:
            messages.error(request, "Please provide a valid email address.")
    return redirect('agency:about')