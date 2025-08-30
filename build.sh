#!/usr/bin/env bash
# Exit immediately if a command exits with a non-zero status.
set -o errexit

echo "--- STARTING BUILD PROCESS ---"

# Install dependencies
echo "--- Installing packages ---"
pip install -r requirements.txt

# Create migration files. This is crucial.
# If this command says "No changes detected", it's okay.
echo "--- Creating migrations ---"
python manage.py makemigrations

# Apply database migrations. The --no-input flag is important for non-interactive environments.
echo "--- Applying database migrations ---"
python manage.py migrate --no-input

# Create the superuser
echo "--- Ensuring superuser exists ---"
python manage.py createsu

# Collect static files
echo "--- Collecting static files ---"
python manage.py collectstatic --no-input --clear

echo "--- BUILD PROCESS COMPLETED ---"