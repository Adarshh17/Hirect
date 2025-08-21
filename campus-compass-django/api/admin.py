from django.contrib import admin
from .models import Job, JobApplication

class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'job', 'status')
    list_filter = ('status',)
    actions = ['accept_applications']

    def accept_applications(self, request, queryset):
        queryset.update(status='accepted')
    accept_applications.short_description = "Accept selected applications"

admin.site.register(Job)
admin.site.register(JobApplication, JobApplicationAdmin)