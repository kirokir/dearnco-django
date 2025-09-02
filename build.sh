#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --no-input

# Apply database migrations
python manage.py migrate

# Create a superuser from environment variables if it doesn't exist
# This command is part of a custom management command you should create.
# Since one wasn't provided, we will use a simple Python script approach.

cat <<EOF | python manage.py shell
import os
from django.contrib.auth import get_user_model

User = get_user_model()

username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

if username and email and password:
    if not User.objects.filter(username=username).exists():
        print(f"Creating superuser {username}")
        User.objects.create_superuser(username=username, email=email, password=password)
    else:
        print(f"Superuser {username} already exists.")
else:
    print("Superuser environment variables not set. Skipping creation.")

EOF