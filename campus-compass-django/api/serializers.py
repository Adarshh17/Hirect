from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Job, JobApplication

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class JobSerializer(serializers.ModelSerializer):
    is_applied = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = '__all__'

    def get_is_applied(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            return JobApplication.objects.filter(job=obj, applicant=user).exists()
        return False

class JobApplicationSerializer(serializers.ModelSerializer):
    job = JobSerializer(read_only=True)
    class Meta:
        model = JobApplication
        fields = '__all__'
        read_only_fields = ('applicant', 'status')

class JobApplicationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = ('full_name', 'email', 'phone', 'cover_letter', 'resume', 'job')

