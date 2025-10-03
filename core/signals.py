from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Profile

@receiver(post_save, sender=User)
def handle_user_profile(sender, instance, created, **kwargs):
    """
    Handles the creation and updating of a user's profile.
    Creates a profile for a new user, and saves the profile for an existing user.
    """
    if created:
        # If the user was just created, create a corresponding profile.
        Profile.objects.create(user=instance)
    else:
        # If the user already exists, ensure their profile is saved.
        # This handles updates made via the User admin.
        # Use a try-except block for maximum safety.
        try:
            instance.profile.save()
        except Profile.DoesNotExist:
            # If for any reason the profile is missing, create it.
            Profile.objects.create(user=instance)
```**Why this works:** This consolidates the logic into one function that correctly handles both creation (`if created`) and updates (`else`). It is no longer ambiguous and will work reliably every time.

---

#### Step 2: Create the Data Fix Command

This step is essential to fix your *current* data. Create the file `core/management/commands/ensure_profiles.py` if you haven't already.

**File: `core/management/commands/ensure_profiles.py`**
```python
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from core.models import Profile

class Command(BaseCommand):
    help = 'Ensures that every user has a profile. Creates one if missing.'

    def handle(self, *args, **options):
        users_without_profile = User.objects.filter(profile__isnull=True)
        
        if not users_without_profile.exists():
            self.stdout.write(self.style.SUCCESS('All users already have a profile. No action needed.'))
            return

        self.stdout.write(f'Found {users_without_profile.count()} user(s) without a profile. Creating now...')
        
        count = 0
        for user in users_without_profile:
            Profile.objects.create(user=user)
            count += 1
            self.stdout.write(f'  - Created profile for: {user.username}')
            
        self.stdout.write(self.style.SUCCESS(f'Successfully created {count} missing profile(s).'))