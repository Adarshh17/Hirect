from django.urls import path
from .views import SignUpView, LoginView, JobList, JobDetail, JobApplicationView, MyApplicationsView, JobSeekerDashboardView

urlpatterns = [
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('jobs/', JobList.as_view(), name='job-list'),
    path('jobs/<int:pk>/', JobDetail.as_view(), name='job-detail'),
    path('jobs/<int:pk>/apply/', JobApplicationView.as_view(), name='job-apply'),
    path('my-applications/', MyApplicationsView.as_view(), name='my-applications'),
    path('dashboard/', JobSeekerDashboardView.as_view(), name='job-seeker-dashboard'),
]
