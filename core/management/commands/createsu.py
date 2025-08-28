import os
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from core.models import Profile # Import the Profile model

class Command(BaseCommand):
    help = 'Creates a superuser from environment variables and ensures a profile exists.'

    def handle(self, *args, **options):
        username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
        email = os.environ.get('DJANGO_SUPERUSER_EMAIL')
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

        if not all([username, email, password]):
            self.stdout.write(self.style.ERROR('Superuser environment variables not set. Skipping.'))
            return

        if not User.objects.filter(username=username).exists():
            self.stdout.write(self.style.SUCCESS(f'Creating superuser: {username}'))
            user = User.objects.create_superuser(
                username=username,
                email=email,
                password=password
            )
            # The signal should handle this, but we do it manually to be safe.
            Profile.objects.get_or_create(user=user)
            self.stdout.write(self.style.SUCCESS(f'Ensured profile exists for {username}'))
        else:
            self.stdout.write(self.style.WARNING(f'Superuser {username} already exists. Skipping creation.'))
            # Still, ensure the profile exists even for an existing user.
            user = User.objects.get(username=username)
            created = Profile.objects.get_or_create(user=user)[1]
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created missing profile for existing user {username}'))