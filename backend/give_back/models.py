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
    bio = models.TextField(blank=True, null=True)
    location = models.TextField(blank=True, null=True)
    service_preferences = models.ManyToManyField(Service, blank=True)

    def __str__(self):
        return self.user.username
    
class Organization(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    name = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    website = models.URLField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    city = models.TextField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    services = models.ManyToManyField(Service, blank=True)

    def __str__(self):
        return self.user.username

class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    # note sure what else we would need for a client yet

    def __str__(self):
        return self.user.username

class Event(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    location = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=(('open', 'Open'), ('completed', 'Completed')), default='open')
    service = models.ForeignKey(Service, on_delete=models.CASCADE, blank=True, null=True)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    volunteers = models.ManyToManyField(Volunteer, blank=True)

    def __str__(self):
        return self.name

class ImpactNote(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    note = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.event.name} - {self.client.user.username}'
