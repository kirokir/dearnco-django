#!/usr/bin/env bash
# exit on error
set -o errexit

echo "---> Building project..."

# Upgrade pip
pip install --upgrade pip

# Install dependencies
pip install -r requirements.txt

# Create migration files (this is safe to run even if they exist)
echo "---> Creating migration files..."
python manage.py makemmigrations

# Apply database migrations
echo "---> Applying database migrations..."
python manage.py migrate

# Create the superuser
echo "---> Ensuring superuser exists..."
python manage.py createsu

# Collect static files
echo "---> Collecting static files..."
python manage.py collectstatic --no-input

echo "---> Build finished."