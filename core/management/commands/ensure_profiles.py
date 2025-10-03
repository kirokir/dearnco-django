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