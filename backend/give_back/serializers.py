from rest_framework import serializers
from .models import *

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class VolunteerSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Volunteer
        fields = '__all__'
        extra_kwargs = {
            'bio': {'required': False}, 
            'location': {'required': False}
        }

class OrganizationSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Organization
        fields = '__all__'
        extra_kwargs = {
            'name': {'required': False}, 
            'description': {'required': False}, 
            'website': {'required': False}, 
            'phone': {'required': False}, 
            'email': {'required': False}, 
            'address': {'required': False}
        }

class ClientSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Client
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class ImpactNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImpactNote
        fields = '__all__'
