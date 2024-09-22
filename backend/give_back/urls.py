from django.urls import path
from .views import *

urlpatterns = [
    path('users/', UserList.as_view(), name='user-list'),
    path('volunteers/', VolunteerList.as_view(), name='volunteer-list'),
    path('organizations/', OrganizationList.as_view(), name='organization-list'),
    path('clients/', ClientList.as_view(), name='client-list'),
    path('update-profile/', update_volunteer_profile, name='update_profile'),
    path('events/', EventList.as_view(), name='event-list'),
    path('event-signup/', event_signup, name='event-signup'),
    path('login/', login_user, name='login_user'), 
    path('logout/', logout_user, name='logout_user'),  
]
