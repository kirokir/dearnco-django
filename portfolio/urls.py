from django.urls import path
from . import views

app_name = 'portfolio'
urlpatterns = [
    path('team/', views.team_view, name='team'),
    path('project/manage/', views.manage_project, name='manage_project'),
    path('project/delete/<int:pk>/', views.delete_project, name='delete_project'),
]