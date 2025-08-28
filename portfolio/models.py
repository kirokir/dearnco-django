from django.db import models

class Project(models.Model):
    PROJECT_TYPE_CHOICES = (
        ('primary', 'Primary'),
        ('secondary', 'Secondary'),
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    project_url = models.URLField(max_length=200, blank=True, null=True)
    image = models.ImageField(upload_to='project_images/')
    project_type = models.CharField(max_length=10, choices=PROJECT_TYPE_CHOICES, default='primary')
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.title

class TeamMember(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    image = models.ImageField(upload_to='team_images/')
    display_order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.name