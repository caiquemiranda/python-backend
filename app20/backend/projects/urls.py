"""
Configuração de URLs para o aplicativo de projetos.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, CategoryViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'', ProjectViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 