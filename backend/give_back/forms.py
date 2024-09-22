# forms.py
from django import forms
from django.contrib.auth.models import User
from .models import*

class UserForm(forms.ModelForm):
    """
    A form to update the User model with first name, last name, and email.
    """
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']  


class VolunteerForm(forms.ModelForm):
    """
    A form to update the Volunteer model with bio and location.
    """
    class Meta:
        model = Volunteer
        fields = ['bio', 'location']  

class OrganizationForm(forms.ModelForm):
    class Meta:
        model = Organization
        fields = ['name', 'city', 'address', 'phone', 'email']
