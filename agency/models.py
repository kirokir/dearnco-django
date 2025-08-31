from django.db import models
from cloudinary.models import CloudinaryField
from core.models import SingletonModel

class StrategyCallLead(models.Model):
    name = models.CharField(max_length=200)
    company_name = models.CharField(max_length=200, blank=True)
    email = models.EmailField()
    revenue_range = models.CharField(max_length=100, blank=True)
    biggest_challenge = models.TextField()
    success_goal = models.TextField()
    ideal_timeline = models.CharField(max_length=100, blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.company_name}"
    
    class Meta:
        verbose_name_plural = "Strategy Call Leads"
        ordering = ['-submitted_at']

class AssessmentLead(models.Model):
    email = models.EmailField(unique=True)
    downloaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = "Assessment Leads"
        ordering = ['-downloaded_at']

class Brochure(SingletonModel):
    title = models.CharField(max_length=200, default="Our Free Brochure")
    pdf_file = CloudinaryField(resource_type='raw', null=True, blank=True, help_text="Upload the brochure PDF file here.")
    
    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Brochure"

class BentoGridItem(models.Model):
    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=255)
    image = CloudinaryField('bento_grid_images')
    link_url = models.URLField(max_length=500, blank=True)
    display_order = models.PositiveIntegerField(default=0)
    column_span = models.PositiveIntegerField(default=1, help_text="How many columns this item should span (e.g., 1, 2).")
    row_span = models.PositiveIntegerField(default=1, help_text="How many rows this item should span (e.g., 1, 2).")

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.title

class ChatbotQA(models.Model):
    keyword = models.CharField(max_length=100, help_text="The short keyword/bubble text.")
    question = models.CharField(max_length=255, help_text="The full question for autocompletion.")
    answer = models.TextField()
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order']
        verbose_name_plural = "Chatbot Q&A"

    def __str__(self):
        return self.keyword

class JobPosition(models.Model):
    title = models.CharField(max_length=200)
    location_tags = models.CharField(max_length=100, help_text="e.g., Remote (US), On-site")
    employment_type = models.CharField(max_length=100, help_text="e.g., Full-Time, Contract")
    description = models.TextField(help_text="Full job description, supports basic HTML.")
    is_active = models.BooleanField(default=True)
    posted_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "Job Positions"
        ordering = ['-posted_at']