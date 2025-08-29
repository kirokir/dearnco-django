from django.db import models
from cloudinary.models import CloudinaryField # Import CloudinaryField

class Project(models.Model):
    PROJECT_TYPE_CHOICES = (
        ('primary', 'Primary'),
        ('secondary', 'Secondary'),
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    project_url = models.URLField(max_length=200, blank=True, null=True)
    
    # This line is changed from ImageField to CloudinaryField
    image = CloudinaryField('project_images')
    
    project_type = models.CharField(max_length=10, choices=PROJECT_TYPE_CHOICES, default='primary')
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.title

class TeamMember(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    
    # This line is changed from ImageField to CloudinaryField
    image = CloudinaryField('team_images')
    
    display_order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.name