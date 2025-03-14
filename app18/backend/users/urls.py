"""
Configuração de URLs para o app users.
"""

from django.urls import path
from .views import (
    RegisterView,
    UserProfileView,
    ChangePasswordView,
    LogoutView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('logout/', LogoutView.as_view(), name='logout'),
] 