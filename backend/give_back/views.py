from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import *
from .serializers import *

# /api/services/
class ServiceList(APIView):
    def get(self, request):
        services = Service.objects.all()
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)

# /api/users/
class UserList(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save() # save a new user

        # also save them to respective user type table
        user_type = request.data['user_type']
        if user_type == 'volunteer':
            # get the user
            user = User.objects.get(username=request.data['username'])
            # create a new volunteer object
            volunteer = Volunteer(user=user)
            # save the volunteer object
            volunteer.save()
        elif user_type == 'organization':
            # get the user
            user = User.objects.get(username=request.data['username'])
            # create a new organization object
            organization = Organization(user=user)
            # save the organization object
            organization.save()
        elif user_type == 'client':
            # get the user
            user = User.objects.get(username=request.data['username'])
            # create a new client object
            client = Client(user=user)
            # save the client object
            client.save()
            
        # success
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# /api/volunteers/
class VolunteerList(APIView):
    def get(self, request):
        volunteers = Volunteer.objects.all()
        serializer = VolunteerSerializer(volunteers, many=True)
        return Response(serializer.data)

    def patch(self, request):
        user_id = request.data.get("user")

        # Retrieve the associated user
        user = get_object_or_404(User, id=user_id)

        # Retrieve the existing volunteer record associated with the user
        volunteer = get_object_or_404(Volunteer, user=user)

        # Partially update the volunteer with the data from the request
        serializer = VolunteerSerializer(volunteer, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        # Return errors if the data is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# /api/organizations/
class OrganizationList(APIView):
    def get(self, request):
        organizations = Organization.objects.all()
        serializer = OrganizationSerializer(organizations, many=True)
        return Response(serializer.data)
    
    def patch(self, request):
        user_id = request.data.get("user")

        # Retrieve the associated user
        user = get_object_or_404(User, id=user_id)

        # Retrieve the existing organization record associated with the user
        organization = get_object_or_404(Organization, user=user)

        # Partially update the organization with the data from the request
        serializer = OrganizationSerializer(organization, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        # Return errors if the data is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# /api/clients/
class ClientList(APIView):
    def get(self, request):
        clients = Client.objects.all()
        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)
    
    def patch(self, request):
        user_id = request.data.get("user")

        # Retrieve the associated user
        user = get_object_or_404(User, id=user_id)

        # Retrieve the existing client record associated with the user
        client = get_object_or_404(Client, user=user)

        # Partially update the client with the data from the request
        serializer = ClientSerializer(client, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        # Return errors if the data is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# /api/events/
class EventList(APIView):
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
