from django.test import TestCase, Client
from django.urls import reverse
from .models import User, Volunteer, Organization
import json

class UpdateProfileTest(TestCase):

    def setUp(self):
        # Set up client
        self.client = Client()

        # Create a test user (volunteer)
        self.volunteer_user = User.objects.create(
            username='volunteeruser',
            email='volunteer@example.com',
            first_name='John',
            last_name='Doe',
            user_type='volunteer'
        )
        self.volunteer_profile = Volunteer.objects.create(
            user=self.volunteer_user,
            location='Test City',
            bio='Test bio for volunteer'
        )

        # Create a test user (organization)
        self.organization_user = User.objects.create(
            username='organizationuser',
            email='organization@example.com',
            first_name='Jane',
            last_name='Smith',
            user_type='organization'
        )
        self.organization_profile = Organization.objects.create(
            user=self.organization_user,
            name='Test Org',
            city='Org City',
            address='1234 Test St',
            phone='123-456-7890'
        )

        # URL for the update_profile view
        self.volunteer_url = reverse('update_profile', kwargs={'user_id': self.volunteer_user.id})
        self.organization_url = reverse('update_profile', kwargs={'user_id': self.organization_user.id})

    def test_get_volunteer_profile(self):
        # Test GET request for volunteer user using URL parameters
        response = self.client.get(self.volunteer_url)

        self.assertEqual(response.status_code, 200)
        response_data = response.json()

        # Assert the correct fields for volunteer
        self.assertEqual(response_data['first_name'], 'John')
        self.assertEqual(response_data['last_name'], 'Doe')
        self.assertEqual(response_data['email'], 'volunteer@example.com')
        self.assertEqual(response_data['user_type'], 'volunteer')
        self.assertEqual(response_data['location'], 'Test City')
        self.assertEqual(response_data['bio'], 'Test bio for volunteer')

    def test_get_organization_profile(self):
        # Test GET request for organization user using URL parameters
        response = self.client.get(self.organization_url)

        self.assertEqual(response.status_code, 200)
        response_data = response.json()

        # Assert the correct fields for organization
        self.assertEqual(response_data['first_name'], 'Jane')
        self.assertEqual(response_data['last_name'], 'Smith')
        self.assertEqual(response_data['email'], 'organization@example.com')
        self.assertEqual(response_data['user_type'], 'organization')
        self.assertEqual(response_data['name'], 'Test Org')
        self.assertEqual(response_data['city'], 'Org City')
        self.assertEqual(response_data['address'], '1234 Test St')
        self.assertEqual(response_data['phone'], '123-456-7890')

    def test_patch_volunteer_profile(self):
        # Test PATCH request for updating a volunteer profile
        new_data = {
            'first_name': 'John Updated',
            'last_name': 'Doe Updated',
            'location': 'New City',
            'bio': 'Updated bio'
        }

        response = self.client.patch(self.volunteer_url, json.dumps(new_data), content_type="application/json")
        self.assertEqual(response.status_code, 200)

        # Refresh volunteer user and profile from the database
        self.volunteer_user.refresh_from_db()
        self.volunteer_profile.refresh_from_db()

        # Check that the data has been updated
        self.assertEqual(self.volunteer_user.first_name, 'John Updated')
        self.assertEqual(self.volunteer_user.last_name, 'Doe Updated')
        self.assertEqual(self.volunteer_profile.location, 'New City')
        self.assertEqual(self.volunteer_profile.bio, 'Updated bio')

    def test_patch_organization_profile(self):
        # Test PATCH request for updating an organization profile
        new_data = {
            'first_name': 'Jane Updated',
            'last_name': 'Smith Updated',
            'name': 'New Org Name',
            'city': 'New Org City',
            'address': 'New Address',
            'phone': '987-654-3210'
        }

        response = self.client.patch(self.organization_url, json.dumps(new_data), content_type="application/json")
        self.assertEqual(response.status_code, 200)

        # Refresh organization user and profile from the database
        self.organization_user.refresh_from_db()
        self.organization_profile.refresh_from_db()

        # Check that the data has been updated
        self.assertEqual(self.organization_user.first_name, 'Jane Updated')
        self.assertEqual(self.organization_user.last_name, 'Smith Updated')
        self.assertEqual(self.organization_profile.name, 'New Org Name')
        self.assertEqual(self.organization_profile.city, 'New Org City')
        self.assertEqual(self.organization_profile.address, 'New Address')
        self.assertEqual(self.organization_profile.phone, '987-654-3210')

    def test_invalid_user(self):
        # Test GET request for non-existent user
        invalid_url = reverse('update_profile', kwargs={'user_id': 999})  # Invalid user ID
        response = self.client.get(invalid_url)

        self.assertEqual(response.status_code, 404)
        response_data = response.json()
        self.assertEqual(response_data['error'], 'User not found')

