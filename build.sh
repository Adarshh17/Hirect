#!/bin/bash
cd campus-compass-django
pip install -r requirements.txt
pip install gunicorn
python manage.py collectstatic --noinput
