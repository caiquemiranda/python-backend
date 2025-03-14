"""
Formulários para o app users.
"""

from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser


class CustomUserCreationForm(UserCreationForm):
    """
    Formulário para criação de novos usuários.
    """
    class Meta:
        model = CustomUser
        fields = ('email', 'first_name', 'last_name')


class CustomUserChangeForm(UserChangeForm):
    """
    Formulário para atualização de usuários.
    """
    class Meta:
        model = CustomUser
        fields = ('email', 'first_name', 'last_name', 'profile_picture') 