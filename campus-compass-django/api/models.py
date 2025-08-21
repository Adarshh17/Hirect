from django.db import models
from django.contrib.auth.models import User

class Job(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    responsibilities = models.TextField(null=True, blank=True)
    qualifications = models.TextField(null=True, blank=True)
    company = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    experience_level = models.CharField(max_length=20, choices=[('entry', 'Entry'), ('mid', 'Mid'), ('senior', 'Senior')], default='entry')
    posted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class JobApplication(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    applicant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='applications')
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    cover_letter = models.TextField()
    resume = models.FileField(upload_to='resumes/')
    applied_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[('applied', 'Applied'), ('reviewed', 'Reviewed'), ('rejected', 'Rejected'), ('accepted', 'Accepted')], default='applied')

    def __str__(self):
        return f'{self.full_name} - {self.job.title}'
