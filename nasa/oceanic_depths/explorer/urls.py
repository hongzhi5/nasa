

from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('api/features/', views.get_features, name='get_features'),
]
