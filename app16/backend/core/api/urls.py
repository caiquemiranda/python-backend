"""
Configuração de URLs da API.
"""

from django.urls import path
from .views import hello_world

urlpatterns = [
    path('hello/', hello_world, name='hello_world'),  # Endpoint simples de Hello World
] 