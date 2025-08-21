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
        # Data for visualizations
        jobs = Job.objects.all()
        job_data = pd.DataFrame(list(jobs.values('experience_level', 'salary', 'location')))

        # Map experience level to numerical values
        experience_map = {'entry': 1, 'mid': 2, 'senior': 3}
        job_data['experience_numeric'] = job_data['experience_level'].map(experience_map)
        job_data.dropna(subset=['salary', 'experience_numeric'], inplace=True)


        # 1. Salary vs. Experience Level
        plt.figure(figsize=(10, 6))
        sns.scatterplot(data=job_data, x='experience_numeric', y='salary')
        
        # Linear Regression
        X = job_data[['experience_numeric']].values
        y = job_data['salary'].values
        if len(X) > 0:
            model = LinearRegression()
            model.fit(X, y)
            plt.plot(X, model.predict(X), color='red')
        
        plt.title('Salary vs. Experience Level')
        plt.xlabel('Experience Level')
        plt.ylabel('Salary')
        plt.xticks(ticks=list(experience_map.values()), labels=list(experience_map.keys()))
        
        salary_exp_path = os.path.join(settings.MEDIA_ROOT, 'visualizations', 'salary_vs_experience.png')
        os.makedirs(os.path.dirname(salary_exp_path), exist_ok=True)
        plt.savefig(salary_exp_path)
        plt.close()

        # 2. Salary Distribution by Location
        plt.figure(figsize=(12, 7))
        sns.boxplot(data=job_data, x='location', y='salary')
        plt.title('Salary Distribution by Location')
        plt.xlabel('Location')
        plt.ylabel('Salary')
        plt.xticks(rotation=45)
        
        salary_loc_path = os.path.join(settings.MEDIA_ROOT, 'visualizations', 'salary_by_location.png')
        os.makedirs(os.path.dirname(salary_loc_path), exist_ok=True)
        plt.savefig(salary_loc_path)
        plt.close()

        # Data for My Applications
        applications = JobApplication.objects.filter(applicant=request.user)
        app_data = pd.DataFrame(list(applications.values('status', 'applied_at')))

        # 3. Application Status Breakdown
        if not app_data.empty and 'status' in app_data:
            plt.figure(figsize=(8, 8))
            app_data['status'].value_counts().plot.pie(autopct='%1.1f%%')
            plt.title('My Application Status')
            plt.ylabel('')
            app_status_path = os.path.join(settings.MEDIA_ROOT, 'visualizations', f'user_{request.user.id}_application_status.png')
            plt.savefig(app_status_path)
            plt.close()
        else:
            app_status_path = None

        return Response({
            'salary_vs_experience_plot': request.build_absolute_uri(settings.MEDIA_URL + 'visualizations/salary_vs_experience.png'),
            'salary_by_location_plot': request.build_absolute_uri(settings.MEDIA_URL + 'visualizations/salary_by_location.png'),
            'application_status_plot': request.build_absolute_uri(settings.MEDIA_URL + f'visualizations/user_{request.user.id}_application_status.png') if app_status_path else None,
        })