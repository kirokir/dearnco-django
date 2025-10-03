from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Profile

@receiver(post_save, sender=User)
def handle_user_profile(sender, instance, created, **kwargs):
    """
    Handles the creation and updating of a user's profile.
    Creates a profile for a new user, and saves the profile for an existing user.
    This consolidated function prevents race conditions and errors.
    """
    if created:
        # If the user was just created, create a corresponding profile.
        Profile.objects.create(user=instance)
    else:
        # If the user already exists, ensure their profile is saved.
        # This is wrapped in a try-except for maximum safety, ensuring
        # that even if a profile is manually deleted, it will be recreated.
        try:
            instance.profile.save()
        except Profile.DoesNotExist:
            Profile.objects.create(user=instance)