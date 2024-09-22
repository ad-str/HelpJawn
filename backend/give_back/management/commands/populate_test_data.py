from django.core.management.base import BaseCommand
from give_back.models import *
import random

class Command(BaseCommand):
    help = 'Populates the database with test data'

    SERVICES = ['Food', 'Shelter', 'Clothing', 'Medical', 'Education', 'Transportation', 'Legal', 'Counseling', 'Other']
    LOCATIONS = ['Philadelphia, PA', 'New York City, NY', 'Chicago, IL', 'Los Angeles, CA', 'Houston, TX']
    ORG_NAMES = ['Helping Hands Network', 'Community Outreach', 'City Relief', 'Urban Aid', 'Hope Services']

    def handle(self, *args, **kwargs):
        self.create_services()
        self.create_volunteers()
        self.create_organizations()
        self.create_clients()
        self.create_events()
        self.create_impact_notes()

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with test data'))

    def create_services(self):
        
        for service_name in self.SERVICES:
            Service.objects.create(name=service_name)

    def create_volunteers(self):
        names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve']
        volunteer_bios = [
            "I’m passionate about helping others and love being part of community events. In my free time, I enjoy hiking and exploring new places. Volunteering allows me to connect with amazing people and make a positive impact.",
            "I’m a retired teacher who believes in giving back to the community. I volunteer to support those in need, and I find joy in sharing my skills and experiences with others. I love reading and gardening in my spare time.",
            "As a recent college graduate, I’m excited to contribute to meaningful causes. I enjoy working with people and have a background in social work. I’m here to learn and grow while making a difference.",
            "I have a background in healthcare and volunteer to help improve access to medical services for underserved communities. When I'm not volunteering, I enjoy playing soccer and spending time with my family.",
            "I’m a stay-at-home mom who loves to support my community. Volunteering allows me to teach my kids the importance of helping others. I enjoy crafting and baking, and I often bring treats to share at events!"
        ]

        for i, name in enumerate(names):
            user = User.objects.create(username=f'volunteer{i}', user_type='volunteer', first_name=name)
            user.set_password('password')
            user.save()
            Volunteer.objects.create(user=user, bio=volunteer_bios[i], location=self.LOCATIONS[i])

    def create_organizations(self):
        descriptions = [
            "We are a nonprofit organization dedicated to supporting local communities through volunteer-driven initiatives. Our mission is to provide essential services and resources to those in need.",
            "Community Outreach is committed to fostering connections and empowering individuals through community-driven programs. We believe in the power of collaboration and compassion.",
            "City Relief is a leading provider of shelter and support services for homeless individuals in urban areas. Our programs are designed to help those in need find stability and hope.",
            "Urban Aid works to address the unique challenges faced by underserved communities in urban environments. We offer a range of services to support individuals and families in need.",
            "Hope Services is dedicated to promoting wellness and empowerment through education and outreach. Our programs are designed to inspire hope and create positive change."
        ]
        websites = ['https://helpinghandsnetwork.org', 'https://communityoutreach.org', 'https://cityrelief.org', 'https://urbanaid.org', 'https://hopeservices.org']
        addresses = ['123 Main St', '456 Elm St', '789 Oak St', '101 Pine St', '202 Maple St']
        phones = ['(123) 456-7890', '(234) 567-8901', '(345) 678-9012', '(456) 789-0123', '(567) 890-1234']
        emails = ['helpinghands@email.com', 'communityoutreach@email.com', 'cityrelief@email.com', 'urbanaid@email.com', 'hopeservices@email.com']

        for i, org_name in enumerate(self.ORG_NAMES):
            user = User.objects.create(username=f'organization{i}', user_type='organization')
            user.set_password('password')
            user.save()
            org = Organization.objects.create(
                user=user,
                name=org_name,
                description=descriptions[i],
                website=websites[i],
                address=addresses[i],
                phone=phones[i],
                email=emails[i],
                city=self.LOCATIONS[i]
            )

            selected_services = random.sample(self.SERVICES, 3)

            # Associate the selected services with the organization
            for service_name in selected_services:
                service = Service.objects.get(name=service_name)
                org.services.add(service)


    def create_clients(self):
        for i in range(5):
            user = User.objects.create(username=f'client{i}', user_type='client')
            user.set_password('password')
            user.save()
            Client.objects.create(user=user)

    def create_events(self):
        events_data = [
            {
                'name': 'Harvest Feast: Community Meal',
                'description': 'Join us for a warm, community-driven meal where neighbors come together to share delicious food and build connections. Everyone is welcome!',
                'location': 'Philadelphia, PA',
                'date': '2021-12-01',
                'start_time': '09:00:00',
                'end_time': '12:00:00',
                'service_name': 'Food',
            },
            {
                'name': 'Shelter & Safety: NYC Outreach',
                'description': 'Help us provide a safe haven for those in need. Volunteer your time to support our shelter services and make a meaningful impact in the heart of the city.',
                'location': 'New York City, NY',
                'date': '2021-12-02',
                'start_time': '10:00:00',
                'end_time': '13:00:00',
                'service_name': 'Shelter',
            },
            {
                'name': 'Clothing Drive: Share the Warmth',
                'description': 'Donate gently used clothing and help us outfit those in need this winter. Together, we can make sure everyone stays warm and stylish!',
                'location': 'Chicago, IL',
                'date': '2021-12-03',
                'start_time': '11:00:00',
                'end_time': '14:00:00',
                'service_name': 'Clothing',
            },
            {
                'name': 'Health & Wellness Fair',
                'description': 'Access vital health services and information at our free medical fair. Enjoy screenings, consultations, and wellness workshops in a supportive environment.',
                'location': 'Los Angeles, CA',
                'date': '2021-12-04',
                'start_time': '12:00:00',
                'end_time': '15:00:00',
                'service_name': 'Medical',
            },
            {
                'name': 'Empowerment Through Education Workshop',
                'description': 'Join us for an inspiring workshop designed to provide essential skills and knowledge to underserved communities. Together, we can foster learning and growth!',
                'location': 'Houston, TX',
                'date': '2021-12-05',
                'start_time': '13:00:00',
                'end_time': '16:00:00',
                'service_name': 'Education',
            },
        ]

        for i, event_data in enumerate(events_data):
            org = Organization.objects.get(name=self.ORG_NAMES[i])
            service = Service.objects.get(name=random.choice(self.SERVICES))
            org.event_set.create(
                name=event_data['name'],
                description=event_data['description'],
                location=event_data['location'],
                date=event_data['date'],
                start_time=event_data['start_time'],
                end_time=event_data['end_time'],
                service=service
            )

    def create_impact_notes(self):
        messages = [
            'This event really changed my perspective!',
            'I met some amazing people here.',
            'The services provided were incredibly helpful.',
            'I learned so much today; thank you!',
            'I felt truly supported and appreciated.',
            'This experience has motivated me to give back more.',
            'I loved being part of this community effort!',
            'The staff was very kind and attentive.',
            'I left feeling inspired and hopeful.',
            'This event made a big difference in my life.'
        ]

        for i in range(5):
            event = Event.objects.get(id=i + 1)
            for j in range(3):
                client = Client.objects.get(user__username=f'client{j}')
                note = random.choice(messages)  # Select a random message
                ImpactNote.objects.create(event=event, client=client, note=note)
