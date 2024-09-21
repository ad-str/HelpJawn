from django.db import models
from django.contrib.auth.models import AbstractUser


class Service(models.Model):
    # static table with predefined services:
    # food, shelter, clothing, education, health, transportation, legal, other

    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

class User(AbstractUser):
    # AbstractUser already has fields: username, first_name, last_name, email, password, groups, user_permissions,
    # is_staff, is_active, is_superuser, last_login, date_joined
    USER_TYPE_CHOICES = (
        ('volunteer', 'Volunteer'),
        ('organization', 'Organization'),
        ('client', 'Client')
    )

    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)

    # Set unique related names to avoid clashes
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='give_back_user_set',
        blank=True,
    )
    
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='give_back_user_permissions_set',
        blank=True,
    )

    def __str__(self):
        return self.username

class Volunteer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    bio = models.TextField(default='')
    location = models.TextField(default='')
    service_preferences = models.ManyToManyField(Service, blank=True)

    def __str__(self):
        return self.name
    
class Organization(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    name = models.CharField(max_length=100, default='')
    description = models.TextField(default='')
    website = models.URLField(default='')
    phone = models.CharField(max_length=20, default='')
    email = models.EmailField(default='')
    address = models.TextField(default='')
    services = models.ManyToManyField(Service, blank=True)

    def __str__(self):
        return self.name

class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    # note sure what else we would need for a client yet

    def __str__(self):
        return self.name

class Event(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateField()
    time = models.TimeField()
    location = models.TextField()
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    volunteers = models.ManyToManyField(Volunteer, blank=True)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=(('open', 'Open'), ('completed', 'Completed')), default='open')

    def __str__(self):
        return self.name

