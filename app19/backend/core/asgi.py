"""
Configuração ASGI para o projeto app19.

Expõe a interface ASGI como uma variável de nível de módulo chamada ``application``.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

application = get_asgi_application() 