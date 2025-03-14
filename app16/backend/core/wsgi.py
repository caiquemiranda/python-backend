"""
Configuração WSGI para o projeto app16.

Expõe a interface WSGI do WSGI como uma variável de nível de módulo chamada ``application``.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

application = get_wsgi_application() 