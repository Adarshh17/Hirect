#!/bin/bash
cd campus-compass-django
pip install -r requirements.txt
python manage.py collectstatic --noinput
