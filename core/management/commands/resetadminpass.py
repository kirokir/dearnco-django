import os
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Resets the password for a specific admin user from environment variables.'

    def handle(self, *args, **options):
        username = os.environ.get('ADMIN_USERNAME_TO_RESET')
        new_password = os.environ.get('NEW_ADMIN_PASSWORD')

        if not username or not new_password:
            self.stdout.write('Password reset variables not set. Skipping.')
            return

        try:
            user = User.objects.get(username=username)
            user.set_password(new_password)
            user.save()
            self.stdout.write(self.style.SUCCESS(f'Successfully reset password for user: {username}'))
        except User.DoesNotExist:
            self.stdout.write(self.style.ERROR(f'User "{username}" not found. Could not reset password.'))