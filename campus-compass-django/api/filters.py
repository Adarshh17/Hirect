from django_filters import rest_framework as filters
from .models import Job

class JobFilter(filters.FilterSet):
    title = filters.CharFilter(field_name='title', lookup_expr='icontains')
    company = filters.CharFilter(field_name='company', lookup_expr='icontains')

    class Meta:
        model = Job
        fields = ['title', 'location', 'company']