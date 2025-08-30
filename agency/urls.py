from django.urls import path
from . import views

app_name = 'agency'
urlpatterns = [
    path('about/', views.about_view, name='about'),
    path('join-us/', views.join_us_view, name='join_us'),
]