from django.urls import path
from .views import VolunteerListCreateView, OrganizationListCreateView, ClientListCreateView

urlpatterns = [
    path('volunteers/', VolunteerListCreateView.as_view(), name='volunteer-list-create'),
    path('organizations/', OrganizationListCreateView.as_view(), name='organization-list-create'),
    path('clients/', ClientListCreateView.as_view(), name='client-list-create'),
]
