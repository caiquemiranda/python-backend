"""
Configuração de URLs principal do projeto app16.
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.api.urls')),  # Incluindo as URLs da API
] 