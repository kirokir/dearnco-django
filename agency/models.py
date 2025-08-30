from django.db import models

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