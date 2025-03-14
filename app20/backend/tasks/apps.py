"""
Configuração do aplicativo tasks.
"""
from django.apps import AppConfig

class TasksConfig(AppConfig):
    """Configuração para o aplicativo de gerenciamento de tarefas."""
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'tasks'
    verbose_name = 'Gerenciamento de Tarefas' 