import json
from django.shortcuts import get_object_or_404, render, redirect
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .forms import UserForm, VolunteerForm
from .models import *
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate , logout, get_user_model
from rest_framework.decorators import api_view

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

        user = serializer.save()
        password = request.data.get('password')
        if password:
            user.set_password(password)
            user.save()

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

# api/event-signup/
@api_view(['POST'])
def event_signup(request):
    if request.method != 'POST':
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
    data = json.loads(request.body)  # Load the JSON data
    event_id = data.get('event_id')
    volunteer_id = data.get('volunteer_id')
    
    event = get_object_or_404(Event, pk=event_id)
    volunteer = get_object_or_404(Volunteer, pk=volunteer_id)
    event.volunteers.add(volunteer)
    return Response(status=status.HTTP_200_OK)

# /api/update-profile/
@csrf_exempt  
def update_volunteer_profile(request):
    if request.method == 'PATCH':
        try:
            data = json.loads(request.body) 

            # You can remove the authentication check here
            user_id = data.get('user_id') 
            user = User.objects.get(id=user_id)

            
            user_form = UserForm(data, instance=user)
            volunteer = Volunteer.objects.get(user=user)
            volunteer_form = VolunteerForm(data, instance=volunteer)

            if user_form.is_valid() and volunteer_form.is_valid():
                user_form.save() 
                volunteer_form.save()  
                return JsonResponse({'message': 'Profile updated successfully'}, status=200)
            else:
                return JsonResponse({'errors': user_form.errors + volunteer_form.errors}, status=400)

        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)

        except Volunteer.DoesNotExist:
            return JsonResponse({'error': 'Volunteer profile not found'}, status=404)

    return JsonResponse({'error': 'Invalid request method'}, status=405)

@api_view(['POST'])
def login_user(request):
    data = request.data  # Get data from the request body
    username = data.get('username')
    password = data.get('password')

    # Authenticate the user
    user = authenticate(username=username, password=password)

    if user is not None:
        user_data = UserSerializer(user).data 

        # returns the user object without the password field
        if 'password' in user_data:
            del user_data['password']

        return Response({
            'message': 'Login successful',
            'user': user_data  
        }, status=200)
    else:

        
        User = get_user_model()
        print(password)

        try:
            User.objects.get(username=username)
            return Response({'error': 'Password incorrect'}, status=400)
        except User.DoesNotExist:
            return Response({'error': 'Username and password combination not found'}, status=400)

@api_view(['POST'])
def logout_user(request):
    logout(request)
    return Response({'message': 'User logged out successfully'}, status=200)
