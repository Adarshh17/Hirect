from django.core.management.base import BaseCommand
from api.models import Job

class Command(BaseCommand):
    help = 'Seeds the database with sample jobs'

    def handle(self, *args, **options):
        self.stdout.write('Seeding jobs...')
        Job.objects.all().delete()
        jobs = [
            {
                'title': 'Software Engineer',
                'description': 'We are looking for a talented software engineer to join our team.',
                'company': 'Google',
                'location': 'Mountain View, CA',
                'salary': 150000.00,
            },
            {
                'title': 'Product Manager',
                'description': 'We are looking for an experienced product manager to lead our new product line.',
                'company': 'Facebook',
                'location': 'Menlo Park, CA',
                'salary': 180000.00,
            },
            {
                'title': 'Data Scientist',
                'description': 'We are looking for a data scientist to help us make better decisions.',
                'company': 'Netflix',
                'location': 'Los Gatos, CA',
                'salary': 160000.00,
            },
        ]
        for job_data in jobs:
            Job.objects.create(**job_data)
        self.stdout.write(self.style.SUCCESS('Successfully seeded jobs!'))
