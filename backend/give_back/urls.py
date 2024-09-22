from django.urls import path
from .views import *

urlpatterns = [
    path('services/', ServiceList.as_view(), name='service-list'),
    path('users/', UserList.as_view(), name='user-list'),
    path('volunteers/', VolunteerList.as_view(), name='volunteer-list'),
    path('organizations/', OrganizationList.as_view(), name='organization-list'),
    path('clients/', ClientList.as_view(), name='client-list'),
    path('events/', EventList.as_view(), name='event-list'),
    path('impact-notes/', ImpactNoteList.as_view(), name='impact-note-list'),
    path('login/', login_user, name='login_user'), 
    path('logout/', logout_user, name='logout_user'),
    path('update-profile/', update_volunteer_profile, name='update_profile'),
    path('event-signup/', event_signup, name='event-signup'),
    path('org-events/<int:user_id>/', org_events, name='org-events'),
    path('volunteer-impact/<int:user_id>/', volunteer_impact, name='volunteer-impact'),
]
