from django import forms
from .models import Project

class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = [
            'title', 
            'description', 
            'project_url', 
            'image', 
            'project_type', 
            'display_order'
        ]
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control'}),
            'description': forms.Textarea(attrs={'class': 'form-control', 'rows': 4}),
            'project_url': forms.URLInput(attrs={'class': 'form-control', 'placeholder': 'https://example.com'}),
            'image': forms.ClearableFileInput(attrs={'class': 'form-control'}),
            'project_type': forms.Select(attrs={'class': 'form-control'}),
            'display_order': forms.NumberInput(attrs={'class': 'form-control'}),
        }