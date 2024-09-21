from django.contrib import admin
from .models import Service, User, Volunteer, Organization, Client, Event


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name',)  # Display these fields in the list view
    search_fields = ('name',)  # Add a search bar for service names
    list_filter = ('name',)  # Allow filtering by service name


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'user_type', 'is_active') 
    search_fields = ('username', 'email') 
    list_filter = ('user_type', 'is_active')  

@admin.register(Volunteer)
class VolunteerAdmin(admin.ModelAdmin):
    list_display = ('user', 'bio', 'location')  
    search_fields = ('user__username', 'bio', 'location')  
    list_filter = ('location',)  
    filter_horizontal = ('service_preferences',) 

@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'phone', 'email', 'website')  
    search_fields = ('name', 'user__username', 'email')  
    list_filter = ('services',)  
    filter_horizontal = ('services',)  


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('user',) 
    search_fields = ('user__username',)  

# 6. Registering the Event model
@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'organization', 'date', 'time', 'status') 
    search_fields = ('name', 'organization__name', 'status')  
    list_filter = ('date', 'status')  
    filter_horizontal = ('volunteers',) 
