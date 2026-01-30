from django.shortcuts import render, redirect
from django.contrib import messages
from .models import StrategyCallLead, AssessmentLead, Brochure, JobPosition
from portfolio.models import TeamMember

def about_view(request):
    """
    Handles the logic for the About page, displaying team members.
    """
    # FIX: Corrected field name from 'order' to 'display_order'
    team_members = TeamMember.objects.all().order_by('display_order')
    context = {
        'team_members': team_members,
    }
    return render(request, 'agency/about.html', context)

def join_us_view(request):
    """
    Handles the logic for the Join Us/Careers page, displaying open job positions.
    """
    # FIX: Corrected field name from 'created_at' to '-posted_at' for descending order
    job_positions = JobPosition.objects.filter(is_active=True).order_by('-posted_at')
    context = {
        'job_positions': job_positions,
    }
    return render(request, 'agency/join_us.html', context)

def contact_submit_view(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        company_name = request.POST.get('company_name', '')
        revenue_range = request.POST.get('revenue_range', '')
        interest = request.POST.get('interest', '')
        biggest_challenge = request.POST.get('biggest_challenge', '')
        success_goal = request.POST.get('success_goal', '')
        ideal_timeline = request.POST.get('ideal_timeline', '')
        message_text = request.POST.get('message', '')

        if name and email:
            StrategyCallLead.objects.create(
                name=name,
                email=email,
                company_name=company_name,
                revenue_range=revenue_range,
                interest=interest,
                biggest_challenge=biggest_challenge,
                success_goal=success_goal,
                ideal_timeline=ideal_timeline,
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
            AssessmentLead.objects.get_or_create(email=email) # Use get_or_create to avoid duplicate errors
            brochure = Brochure.objects.first()
            if brochure and brochure.pdf_file:
                return redirect(brochure.pdf_file.url)
            else:
                messages.error(request, "Sorry, the brochure is currently unavailable.")
                return redirect('agency:about')
        else:
            messages.error(request, "Please provide a valid email address.")
    return redirect('agency:about')