"""
Views para o aplicativo de gerenciamento de tarefas.
"""

from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone

from .models import Task, Category
from .serializers import TaskSerializer, CategorySerializer

class CategoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet para operações CRUD em categorias.
    
    Fornece os métodos padrão: list, create, retrieve, update, partial_update, destroy.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['name']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']

class TaskViewSet(viewsets.ModelViewSet):
    """
    ViewSet para operações CRUD em tarefas.
    
    Fornece os métodos padrão: list, create, retrieve, update, partial_update, destroy.
    Adiciona ações personalizadas como 'mark_completed' para marcar uma tarefa como concluída.
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'priority', 'category', 'due_date']
    search_fields = ['title', 'description']
    ordering_fields = ['title', 'due_date', 'priority', 'created_at']
    
    @action(detail=True, methods=['post'])
    def mark_completed(self, request, pk=None):
        """
        Ação personalizada para marcar uma tarefa como concluída.
        
        Esta ação é acessada via POST para /api/tasks/{id}/mark_completed/
        """
        task = self.get_object()
        task.status = 'concluida'
        task.completed_at = timezone.now()
        task.save()
        
        serializer = self.get_serializer(task)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_status(self, request):
        """
        Ação personalizada para listar tarefas agrupadas por status.
        
        Esta ação é acessada via GET para /api/tasks/by_status/
        """
        # Contar tarefas por status
        pending = Task.objects.filter(status='pendente').count()
        in_progress = Task.objects.filter(status='em_andamento').count()
        completed = Task.objects.filter(status='concluida').count()
        cancelled = Task.objects.filter(status='cancelada').count()
        
        data = {
            'pendente': pending,
            'em_andamento': in_progress,
            'concluida': completed,
            'cancelada': cancelled,
            'total': pending + in_progress + completed + cancelled
        }
        
        return Response(data) 