from django.core.management.base import BaseCommand
from give_back.models import Service, User, Volunteer, Organization, Client, Event

class Command(BaseCommand):
    help = 'Populates the database with test data'

    VOLUNTEER_NAMES = ['Alice', 'Bob', 'Charlie', 'David', 'Eve']
    LOCATIONS = ['Philadelphia, PA', 'New York City, NY', 'Chicago, IL', 'Los Angeles, CA', 'Houston, TX']
    ORG_NAMES = ['Helping Hands Network', 'Community Outreach', 'City Relief', 'Urban Aid', 'Hope Services']

    def handle(self, *args, **kwargs):
        # Create test data for Services
        Service.objects.create(name='Food')
        Service.objects.create(name='Shelter')
        Service.objects.create(name='Clothing')
        Service.objects.create(name='Medical')
        Service.objects.create(name='Education')
        Service.objects.create(name='Transportation')
        Service.objects.create(name='Legal')
        Service.objects.create(name='Counseling')
        Service.objects.create(name='Other')

        # Create test data for Volunteers
        for i in range(5):
            user = User.objects.create(username=f'volunteer{i}', password='password', user_type='volunteer', first_name=self.VOLUNTEER_NAMES[i])
            Volunteer.objects.create(user=user, bio=f'Volunteer {i} bio', location=self.LOCATIONS[i])

        # Create test data for Organizations
        for i in range(5):
            user = User.objects.create(username=f'organization{i}', password='password', user_type='organization')
            Organization.objects.create(user=user, name=self.ORG_NAMES[i], city=self.LOCATIONS[i])

        # Create test data for Clients
        for i in range(5):
            user = User.objects.create(username=f'client{i}', password='password', user_type='client')
            Client.objects.create(user=user)
        
        # Create test data for Events
        Organization.objects.get(name=self.ORG_NAMES[0]).event_set.create(
            name='Event 1',
            description='Event 1 description',
            location='Philadelphia, PA',
            date='2021-12-01',
            start_time='09:00:00',
            end_time='12:00:00',
            service=Service.objects.get(name='Food')
        )
        Organization.objects.get(name=self.ORG_NAMES[1]).event_set.create(
            name='Event 2',
            description='Event 2 description',
            location='New York City, NY',
            date='2021-12-02',
            start_time='10:00:00',
            end_time='13:00:00',
            service=Service.objects.get(name='Shelter')
        )
        Organization.objects.get(name=self.ORG_NAMES[2]).event_set.create(
            name='Event 3',
            description='Event 3 description',
            location='Chicago, IL',
            date='2021-12-03',
            start_time='11:00:00',
            end_time='14:00:00',
            service=Service.objects.get(name='Clothing')
        )
        Organization.objects.get(name=self.ORG_NAMES[3]).event_set.create(
            name='Event 4',
            description='Event 4 description',
            location='Los Angeles, CA',
            date='2021-12-04',
            start_time='12:00:00',
            end_time='15:00:00',
            service=Service.objects.get(name='Medical')
        )
        Organization.objects.get(name=self.ORG_NAMES[4]).event_set.create(
            name='Event 5',
            description='Event 5 description',
            location='Houston, TX',
            date='2021-12-05',
            start_time='13:00:00',
            end_time='16:00:00',
            service=Service.objects.get(name='Education')
        )

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with test data'))
