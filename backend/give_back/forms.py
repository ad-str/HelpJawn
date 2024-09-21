# forms.py
from django import forms
from django.contrib.auth.models import User
from .models import Volunteer

class UserForm(forms.ModelForm):
    """
    A form to update the User model with first name, last name, and email.
    """
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']  # Fields from User model


class VolunteerForm(forms.ModelForm):
    """
    A form to update the Volunteer model with bio and location.
    """
    class Meta:
        model = Volunteer
        fields = ['bio', 'location']  # Fields from Volunteer model
