"""
Configuração da aplicação users.
"""

from django.apps import AppConfig


class UsersConfig(AppConfig):
    """Configuração para o aplicativo de usuários."""
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'
    verbose_name = 'Usuários' 