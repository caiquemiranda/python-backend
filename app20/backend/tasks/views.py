"""
Views para o aplicativo de tarefas.
"""
from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from .models import Task, Comment, Tag, TimeEntry
from .serializers import (
    TaskListSerializer, TaskDetailSerializer, TaskCreateSerializer,
    CommentSerializer, TagSerializer, TimeEntrySerializer
)
from projects.permissions import IsProjectMember

class TaskViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciamento de tarefas.
    """
    queryset = Task.objects.all()
    serializer_class = TaskListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'priority', 'project', 'assigned_to']
    search_fields = ['title', 'description']
    ordering_fields = ['title', 'created_at', 'due_date', 'priority', 'status', 'order']
    ordering = ['status', '-priority', 'order', 'due_date']
    
    def get_queryset(self):
        """
        Filtra as tarefas com base no usuário autenticado.
        """
        user = self.request.user
        
        # Administradores podem ver todas as tarefas
        if user.is_staff:
            return Task.objects.all()
        
        # Usuários normais veem apenas tarefas de seus projetos
        return Task.objects.filter(
            Q(project__owner=user) | 
            Q(project__members=user) |
            Q(assigned_to=user) |
            Q(created_by=user)
        ).distinct()
    
    def get_serializer_class(self):
        """
        Retorna o serializer apropriado com base na ação.
        """
        if self.action == 'retrieve':
            return TaskDetailSerializer
        elif self.action == 'create':
            return TaskCreateSerializer
        return TaskListSerializer
    
    def get_permissions(self):
        """
        Define permissões com base na ação.
        """
        return [permissions.IsAuthenticated(), IsProjectMember()]
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated()])
    def my_tasks(self, request):
        """
        Retorna as tarefas atribuídas ao usuário autenticado.
        """
        queryset = self.get_queryset().filter(assigned_to=request.user)
        
        # Filtra por status se fornecido
        status_param = request.query_params.get('status')
        if status_param:
            queryset = queryset.filter(status=status_param)
        
        # Filtra por projeto se fornecido
        project_param = request.query_params.get('project')
        if project_param:
            queryset = queryset.filter(project_id=project_param)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated()])
    def by_project(self, request):
        """
        Retorna as tarefas de um projeto específico.
        """
        project_id = request.query_params.get('project_id')
        if not project_id:
            return Response(
                {'detail': 'ID do projeto é obrigatório.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        queryset = self.get_queryset().filter(project_id=project_id)
        
        # Filtra por status se fornecido
        status_param = request.query_params.get('status')
        if status_param:
            queryset = queryset.filter(status=status_param)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated()])
    def change_status(self, request, pk=None):
        """
        Altera o status de uma tarefa.
        """
        task = self.get_object()
        new_status = request.data.get('status')
        
        if not new_status:
            return Response(
                {'detail': 'Status é obrigatório.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if new_status not in dict(Task.STATUS_CHOICES):
            return Response(
                {'detail': 'Status inválido.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        task.status = new_status
        task.save()
        
        serializer = self.get_serializer(task)
        return Response(serializer.data)


class CommentViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciamento de comentários.
    """
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['task']
    ordering_fields = ['created_at']
    ordering = ['-created_at']
    
    def get_queryset(self):
        """
        Filtra os comentários com base no usuário autenticado.
        """
        user = self.request.user
        
        # Administradores podem ver todos os comentários
        if user.is_staff:
            return Comment.objects.all()
        
        # Usuários normais veem apenas comentários de tarefas de seus projetos
        return Comment.objects.filter(
            Q(task__project__owner=user) | 
            Q(task__project__members=user) |
            Q(task__assigned_to=user) |
            Q(task__created_by=user) |
            Q(author=user)
        ).distinct()
    
    def perform_create(self, serializer):
        """
        Define o autor do comentário como o usuário autenticado.
        """
        serializer.save(author=self.request.user)
    
    def perform_update(self, serializer):
        """
        Verifica se o usuário é o autor do comentário.
        """
        comment = self.get_object()
        if comment.author != self.request.user and not self.request.user.is_staff:
            self.permission_denied(
                self.request,
                message='Você não tem permissão para editar este comentário.'
            )
        serializer.save()
    
    def perform_destroy(self, instance):
        """
        Verifica se o usuário é o autor do comentário.
        """
        if instance.author != self.request.user and not self.request.user.is_staff:
            self.permission_denied(
                self.request,
                message='Você não tem permissão para excluir este comentário.'
            )
        instance.delete()


class TagViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciamento de tags.
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name']
    ordering = ['name']


class TimeEntryViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciamento de registros de tempo.
    """
    queryset = TimeEntry.objects.all()
    serializer_class = TimeEntrySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['task', 'user', 'date']
    ordering_fields = ['date', 'created_at']
    ordering = ['-date', '-created_at']
    
    def get_queryset(self):
        """
        Filtra os registros de tempo com base no usuário autenticado.
        """
        user = self.request.user
        
        # Administradores podem ver todos os registros
        if user.is_staff:
            return TimeEntry.objects.all()
        
        # Usuários normais veem apenas seus registros e os de tarefas de seus projetos
        return TimeEntry.objects.filter(
            Q(user=user) |
            Q(task__project__owner=user) | 
            Q(task__project__memberships__user=user, task__project__memberships__role__in=['admin', 'manager'])
        ).distinct()
    
    def perform_create(self, serializer):
        """
        Define o usuário do registro como o usuário autenticado.
        """
        serializer.save(user=self.request.user)
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated()])
    def my_entries(self, request):
        """
        Retorna os registros de tempo do usuário autenticado.
        """
        queryset = self.get_queryset().filter(user=request.user)
        
        # Filtra por tarefa se fornecido
        task_param = request.query_params.get('task')
        if task_param:
            queryset = queryset.filter(task_id=task_param)
        
        # Filtra por data se fornecido
        date_param = request.query_params.get('date')
        if date_param:
            queryset = queryset.filter(date=date_param)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data) 