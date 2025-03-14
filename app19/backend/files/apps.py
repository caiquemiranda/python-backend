"""
Configuração da aplicação files.
"""

from django.apps import AppConfig


class FilesConfig(AppConfig):
    """Configuração para o aplicativo de gerenciamento de arquivos."""
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'files'
    verbose_name = 'Gerenciamento de Arquivos' 