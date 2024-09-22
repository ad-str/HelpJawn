from django.test import TestCase
from rest_framework.test import APITestCase
from django.urls import reverse
from django.contrib.auth import get_user_model
from .models import Volunteer

User = get_user_model()

class UserAuthTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser', 
            password='password123',
            first_name='Test',
            last_name='User',
            email='testuser@example.com',
            user_type='volunteer' 
        )

        self.volunteer = Volunteer.objects.create(
            user=self.user,
            bio='Test bio',
            location='Test location'
        )

    def test_login_user_success(self):
        # Test login with correct credentials
        url = reverse('login_user')  
        data = {'username': 'testuser', 'password': 'password123'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, 200)
        self.assertIn('message', response.data)
        self.assertIn('user', response.data)
        self.assertNotIn('password', response.data['user'])  

    def test_login_user_incorrect_password(self):
        # Test login with incorrect password
        url = reverse('login_user')
        data = {'username': 'testuser', 'password': 'wrongpassword'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data['error'], 'Password incorrect')

    def test_login_user_nonexistent_user(self):
        # Test login with non-existent user
        url = reverse('login_user')
        data = {'username': 'nonexistent', 'password': 'password123'}
        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data['error'], 'Username and password combination not found')

    def test_logout_user(self):
        # Test logout functionality
        self.client.login(username='testuser', password='password123') 
        url = reverse('logout_user')
        response = self.client.post(url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['message'], 'User logged out successfully')

    def test_update_volunteer_profile_success(self):
        # Test updating volunteer profile
        self.client.login(username='testuser', password='password123')  # Log in the user first
        url = reverse('update_profile')
        data = {
            'user_id': self.user.id,
            'first_name': 'UpdatedFirst',
            'last_name': 'UpdatedLast',
            'email': 'updated@example.com',
            'bio': 'Updated bio',
            'location': 'Updated location'
        }
        response = self.client.patch(url, data, format='json')

        self.assertEqual(response.status_code, 200)

        # Use .json() to get the response data instead of accessing response.data
        response_json = response.json()
        self.assertEqual(response_json['message'], 'Profile updated successfully')

    def test_update_volunteer_profile_user_not_found(self):
        # Test updating profile with a non-existent user
        self.client.login(username='testuser', password='password123')
        url = reverse('update_profile')
        data = {
            'user_id': 999,  # Non-existent user ID
            'first_name': 'UpdatedFirst',
            'last_name': 'UpdatedLast',
            'email': 'updated@example.com',
            'bio': 'Updated bio',
            'location': 'Updated location'
        }
        response = self.client.patch(url, data, format='json')

        self.assertEqual(response.status_code, 404)
        
        # Use .json() to get the response data
        response_json = response.json()
        self.assertEqual(response_json['error'], 'User not found')

    def test_update_volunteer_profile_volunteer_not_found(self):
        # Test updating profile when volunteer profile does not exist
        self.volunteer.delete()  # Delete the volunteer to simulate not found
        self.client.login(username='testuser', password='password123')
        url = reverse('update_profile')
        data = {
            'user_id': self.user.id,
            'first_name': 'UpdatedFirst',
            'last_name': 'UpdatedLast',
            'email': 'updated@example.com',
            'bio': 'Updated bio',
            'location': 'Updated location'
        }
        response = self.client.patch(url, data, format='json')

        self.assertEqual(response.status_code, 404)

        # Use .json() to get the response data
        response_json = response.json()
        self.assertEqual(response_json['error'], 'Volunteer profile not found')
