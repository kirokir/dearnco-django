from django.urls import path
from . import views

app_name = 'portfolio'
urlpatterns = [
    path('team/', views.team_view, name='team'),
    path('portfolio/', views.portfolio_all_view, name='portfolio_all'),
]