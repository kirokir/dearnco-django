from django import forms
from cloudinary.forms import CloudinaryFileField
from .models import StrategyCallLead, AssessmentLead, Brochure

class BrochureAdminForm(forms.ModelForm):
    # This field no longer needs special parameters.
    # The 'resource_type' is now correctly handled by the CloudinaryField in the model.
    pdf_file = CloudinaryFileField(
        required=False,
        label="Brochure PDF"
    )
    class Meta:
        model = Brochure
        fields = '__all__'

class StrategyCallForm(forms.ModelForm):
    class Meta:
        model = StrategyCallLead
        fields = ['name', 'company_name', 'email', 'revenue_range', 'biggest_challenge', 'success_goal', 'ideal_timeline']
        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'Enter your full name'}),
            'company_name': forms.TextInput(attrs={'placeholder': 'Your company name'}),
            'email': forms.EmailInput(attrs={'placeholder': 'your@email.com'}),
            'biggest_challenge': forms.Textarea(attrs={'rows': 4, 'placeholder': 'Describe your main website challenge (e.g., low conversions, poor user experience...)'}),
            'success_goal': forms.Textarea(attrs={'rows': 4, 'placeholder': 'Be specific about your goals (e.g., 50% more qualified leads...)'}),
        }

class AssessmentForm(forms.ModelForm):
    class Meta:
        model = AssessmentLead
        fields = ['email']