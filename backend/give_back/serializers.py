from rest_framework import serializers
from .models import *

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'  # Or specify the fields you want to expose

class VolunteerSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Volunteer
        fields = '__all__'

class OrganizationSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Organization
        fields = '__all__'

class ClientSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    
    class Meta:
        model = Client
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'