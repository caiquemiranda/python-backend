"""
Configuração de URLs principal do projeto.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Configuração do Swagger para documentação da API
schema_view = get_schema_view(
    openapi.Info(
        title="API de Gerenciamento de Projetos",
        default_version='v1',
        description="API para gerenciamento de projetos, tarefas e usuários",
        terms_of_service="https://www.example.com/terms/",
        contact=openapi.Contact(email="contact@example.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

# Definição das URLs principais
urlpatterns = [
    # Admin do Django
    path('admin/', admin.site.urls),
    
    # Autenticação e usuários
    path('api/users/', include('users.urls')),
    
    # APIs de projetos e tarefas
    path('api/projects/', include('projects.urls')),
    path('api/tasks/', include('tasks.urls')),
    
    # Documentação da API (Swagger)
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

# Adiciona as URLs para servir arquivos de mídia em desenvolvimento
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) 