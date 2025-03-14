"""
Configuração do aplicativo projects.
"""
from django.apps import AppConfig

class ProjectsConfig(AppConfig):
    """Configuração para o aplicativo de gerenciamento de projetos."""
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'projects'
    verbose_name = 'Gerenciamento de Projetos' 