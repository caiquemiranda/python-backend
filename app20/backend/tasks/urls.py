"""
Configuração de URLs para o aplicativo de tarefas.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, CommentViewSet, TagViewSet, TimeEntryViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'tags', TagViewSet)
router.register(r'time-entries', TimeEntryViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 