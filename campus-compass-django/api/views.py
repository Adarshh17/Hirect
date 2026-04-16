from django.contrib.auth import authenticate
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django_filters.rest_framework import DjangoFilterBackend
from .filters import JobFilter
from .models import Job, JobApplication
from .serializers import JobSerializer, UserSerializer, JobApplicationSerializer, JobApplicationCreateSerializer
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.linear_model import LinearRegression
import numpy as np
import pandas as pd
from django.conf import settings
import os

class SignUpView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = []

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {'token': token.key},
            status=status.HTTP_201_CREATED,
            headers=headers
        )

class LoginView(APIView):
    permission_classes = []
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class JobList(generics.ListAPIView):
    serializer_class = JobSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = JobFilter

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            applied_job_ids = JobApplication.objects.filter(applicant=user).values_list('job_id', flat=True)
            return Job.objects.exclude(id__in=applied_job_ids)
        return Job.objects.all()

class JobDetail(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class JobApplicationView(generics.CreateAPIView):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationCreateSerializer

    def perform_create(self, serializer):
        serializer.save(applicant=self.request.user)

class MyApplicationsView(generics.ListAPIView):
    serializer_class = JobApplicationSerializer

    def get_queryset(self):
        return JobApplication.objects.filter(applicant=self.request.user)
class JobSeekerDashboardView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request, *args, **kwargs):
        # Set a consistent theme for all plots
        sns.set_theme(style="whitegrid", palette="pastel")

        # Data for visualizations
        jobs = Job.objects.all()
        job_data = pd.DataFrame(list(jobs.values('experience_level', 'salary', 'location', 'company')))

        # Ensure data is cleaned
        job_data.dropna(subset=['salary', 'experience_level'], inplace=True)

        # Map experience level to numerical values
        experience_map = {'entry': 1, 'mid': 2, 'senior': 3}
        job_data['experience_numeric'] = job_data['experience_level'].map(experience_map)
        job_data.dropna(subset=['salary', 'experience_numeric'], inplace=True)

        # 1. Salary vs. Experience Level with Linear Regression
        plt.figure(figsize=(10, 6))
        sns.scatterplot(data=job_data, x='experience_numeric', y='salary', alpha=0.6)
        plt.title('Salary vs. Experience Level', fontsize=14)
        plt.xlabel('Experience Level', fontsize=12)
        plt.ylabel('Salary', fontsize=12)
        plt.xticks(ticks=list(experience_map.values()), labels=list(experience_map.keys()), fontsize=10)
        plt.yticks(fontsize=10)

        model = None
        if 'experience_numeric' in job_data.columns and not job_data.empty:
            X = job_data[['experience_numeric']].values
            y = job_data['salary'].values
            if len(X) > 1: # Need at least 2 points for a line
                model = LinearRegression()
                model.fit(X, y)
                plt.plot(X, model.predict(X), color='red', linewidth=2)
        
        salary_exp_path = os.path.join(settings.MEDIA_ROOT, 'visualizations', 'salary_vs_experience.png')
        os.makedirs(os.path.dirname(salary_exp_path), exist_ok=True)
        plt.savefig(salary_exp_path, dpi=300, bbox_inches='tight')
        plt.close()

        # 2. Improved Salary Distribution by Location: Enhance boxplot with swarmplot for individual data points
        # This adds visibility to data density without overlapping too much
        plt.figure(figsize=(12, 7))
        sns.boxplot(data=job_data, x='location', y='salary', width=0.5)
        sns.swarmplot(data=job_data, x='location', y='salary', color=".2", size=4, alpha=0.7)
        plt.title('Salary Distribution by Location', fontsize=14)
        plt.xlabel('Location', fontsize=12)
        plt.ylabel('Salary', fontsize=12)
        plt.xticks(rotation=45, ha='right', fontsize=10)
        plt.yticks(fontsize=10)
        
        salary_loc_path = os.path.join(settings.MEDIA_ROOT, 'visualizations', 'salary_by_location.png')
        os.makedirs(os.path.dirname(salary_loc_path), exist_ok=True)
        plt.savefig(salary_loc_path, dpi=300, bbox_inches='tight')
        plt.close()

        # Data for My Applications
        applications = JobApplication.objects.filter(applicant=request.user)
        app_data = pd.DataFrame(list(applications.values('status', 'applied_at')))

        # 3. Improved Application Status Breakdown: Use bar chart instead of pie for better readability and comparison
        # Bars are easier to label and compare, especially if statuses increase
        app_status_path = None
        if not app_data.empty and 'status' in app_data:
            status_counts = app_data['status'].value_counts()
            plt.figure(figsize=(8, 6))
            sns.barplot(x=status_counts.index, y=status_counts.values)
            plt.title('My Application Status Breakdown', fontsize=14)
            plt.xlabel('Status', fontsize=12)
            plt.ylabel('Count', fontsize=12)
            plt.xticks(fontsize=10, rotation=45)
            plt.yticks(fontsize=10)
            for i, v in enumerate(status_counts.values):
                plt.text(i, v + 0.1, str(v), ha='center', fontsize=10)
            
            app_status_path = os.path.join(settings.MEDIA_ROOT, 'visualizations', f'user_{request.user.id}_application_status.png')
            os.makedirs(os.path.dirname(app_status_path), exist_ok=True)
            plt.savefig(app_status_path, dpi=300, bbox_inches='tight')
            plt.close()

        # 4. Job Postings by Company
        plt.figure(figsize=(12, 7))
        sns.countplot(data=job_data, y='company', order=job_data['company'].value_counts().index)
        plt.title('Job Postings by Company', fontsize=14)
        plt.xlabel('Number of Job Postings', fontsize=12)
        plt.ylabel('Company', fontsize=12)
        plt.xticks(fontsize=10)
        plt.yticks(fontsize=10)
        
        company_postings_path = os.path.join(settings.MEDIA_ROOT, 'visualizations', 'company_postings.png')
        os.makedirs(os.path.dirname(company_postings_path), exist_ok=True)
        plt.savefig(company_postings_path, dpi=300, bbox_inches='tight')
        plt.close()

        return Response({
            'salary_vs_experience_plot': request.build_absolute_uri(settings.MEDIA_URL + 'visualizations/salary_vs_experience.png'),
            'salary_by_location_plot': request.build_absolute_uri(settings.MEDIA_URL + 'visualizations/salary_by_location.png'),
            'application_status_plot': request.build_absolute_uri(settings.MEDIA_URL + f'visualizations/user_{request.user.id}_application_status.png') if app_status_path else None,
            'company_postings_plot': request.build_absolute_uri(settings.MEDIA_URL + 'visualizations/company_postings.png'),
        })