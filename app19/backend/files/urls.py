"""
Configuração de URLs para o app files.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FileUploadViewSet

# Configuração do router
router = DefaultRouter()
router.register(r'', FileUploadViewSet)

urlpatterns = [
    # URLs geradas pelo router
    path('', include(router.urls)),
] 