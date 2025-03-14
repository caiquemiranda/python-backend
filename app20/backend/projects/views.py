"""
Views para o aplicativo de projetos.
"""
from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count, Q
from django_filters.rest_framework import DjangoFilterBackend
from .models import Project, ProjectMembership, Category
from .serializers import (
    ProjectListSerializer, ProjectDetailSerializer, ProjectCreateSerializer,
    ProjectUpdateSerializer, ProjectMembershipSerializer, CategorySerializer
)
from .permissions import IsProjectMember, IsProjectAdmin

class ProjectViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciamento de projetos.
    """
    queryset = Project.objects.all()
    serializer_class = ProjectListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'is_archived', 'priority']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at', 'priority', 'start_date', 'end_date']
    ordering = ['-created_at']
    
    def get_queryset(self):
        """
        Filtra os projetos com base no usuário autenticado.
        Adiciona contagens de tarefas para cálculo de progresso.
        """
        user = self.request.user
        
        # Administradores podem ver todos os projetos
        if user.is_staff:
            queryset = Project.objects.all()
        else:
            # Usuários normais veem apenas seus projetos
            queryset = Project.objects.filter(
                Q(owner=user) | Q(members=user)
            ).distinct()
        
        # Adiciona contagens para cálculo de progresso
        queryset = queryset.annotate(
            task_count=Count('tasks'),
            completed_task_count=Count('tasks', filter=Q(tasks__status='completed'))
        )
        
        return queryset
    
    def get_serializer_class(self):
        """
        Retorna o serializer apropriado com base na ação.
        """
        if self.action == 'retrieve':
            return ProjectDetailSerializer
        elif self.action == 'create':
            return ProjectCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return ProjectUpdateSerializer
        return ProjectListSerializer
    
    def get_permissions(self):
        """
        Define permissões com base na ação.
        """
        if self.action == 'create':
            return [permissions.IsAuthenticated()]
        elif self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsProjectAdmin()]
        elif self.action in ['retrieve', 'list']:
            return [permissions.IsAuthenticated(), IsProjectMember()]
        return [permissions.IsAuthenticated()]
    
    @action(detail=True, methods=['get', 'post', 'delete'], permission_classes=[permissions.IsAuthenticated(), IsProjectAdmin()])
    def members(self, request, pk=None):
        """
        Gerencia membros do projeto.
        GET: Lista membros
        POST: Adiciona membro
        DELETE: Remove membro
        """
        project = self.get_object()
        
        if request.method == 'GET':
            memberships = project.memberships.all()
            serializer = ProjectMembershipSerializer(memberships, many=True)
            return Response(serializer.data)
        
        elif request.method == 'POST':
            serializer = ProjectMembershipSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(project=project)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        elif request.method == 'DELETE':
            user_id = request.data.get('user_id')
            if not user_id:
                return Response(
                    {'detail': 'ID do usuário é obrigatório.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            try:
                membership = project.memberships.get(user_id=user_id)
                membership.delete()
                return Response(status=status.HTTP_204_NO_CONTENT)
            except ProjectMembership.DoesNotExist:
                return Response(
                    {'detail': 'Membro não encontrado.'},
                    status=status.HTTP_404_NOT_FOUND
                )
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated()])
    def my_projects(self, request):
        """
        Retorna os projetos do usuário autenticado.
        """
        queryset = self.get_queryset().filter(
            Q(owner=request.user) | Q(members=request.user)
        ).distinct()
        
        # Filtra por status se fornecido
        status_param = request.query_params.get('status')
        if status_param:
            queryset = queryset.filter(status=status_param)
        
        # Filtra por arquivado se fornecido
        archived = request.query_params.get('archived')
        if archived is not None:
            is_archived = archived.lower() == 'true'
            queryset = queryset.filter(is_archived=is_archived)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciamento de categorias.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name']
    ordering = ['name'] 