"""
Serializers para o aplicativo de projetos.
"""
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Project, ProjectMembership, Category

User = get_user_model()

class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer para o modelo de categoria.
    """
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'color']


class UserMiniSerializer(serializers.ModelSerializer):
    """
    Serializer simplificado para o modelo de usuário.
    """
    name = serializers.CharField(source='get_full_name', read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'email', 'avatar_url']
        read_only_fields = fields


class ProjectMembershipSerializer(serializers.ModelSerializer):
    """
    Serializer para o modelo de associação de projeto.
    """
    user = UserMiniSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        write_only=True,
        source='user'
    )
    
    class Meta:
        model = ProjectMembership
        fields = ['id', 'user', 'user_id', 'role', 'joined_at']
        read_only_fields = ['id', 'joined_at']


class ProjectListSerializer(serializers.ModelSerializer):
    """
    Serializer para listagem de projetos.
    """
    owner = UserMiniSerializer(read_only=True)
    member_count = serializers.SerializerMethodField()
    task_count = serializers.IntegerField(read_only=True)
    completed_task_count = serializers.IntegerField(read_only=True)
    progress = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Project
        fields = [
            'id', 'name', 'slug', 'description', 'status',
            'start_date', 'end_date', 'owner', 'priority',
            'is_archived', 'created_at', 'updated_at',
            'member_count', 'task_count', 'completed_task_count',
            'progress'
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']
    
    def get_member_count(self, obj):
        """Retorna o número de membros do projeto."""
        return obj.members.count()


class ProjectDetailSerializer(serializers.ModelSerializer):
    """
    Serializer para detalhes de um projeto.
    """
    owner = UserMiniSerializer(read_only=True)
    owner_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        write_only=True,
        source='owner'
    )
    memberships = ProjectMembershipSerializer(many=True, read_only=True)
    task_count = serializers.IntegerField(read_only=True)
    completed_task_count = serializers.IntegerField(read_only=True)
    progress = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Project
        fields = [
            'id', 'name', 'slug', 'description', 'status',
            'start_date', 'end_date', 'owner', 'owner_id',
            'memberships', 'priority', 'is_archived',
            'created_at', 'updated_at', 'task_count',
            'completed_task_count', 'progress'
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']


class ProjectCreateSerializer(serializers.ModelSerializer):
    """
    Serializer para criação de projetos.
    """
    class Meta:
        model = Project
        fields = [
            'name', 'description', 'status', 'start_date',
            'end_date', 'priority'
        ]
    
    def create(self, validated_data):
        """Cria um novo projeto e adiciona o usuário atual como proprietário."""
        user = self.context['request'].user
        project = Project.objects.create(owner=user, **validated_data)
        
        # Adiciona o proprietário como membro administrador
        ProjectMembership.objects.create(
            user=user,
            project=project,
            role='admin'
        )
        
        return project


class ProjectUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer para atualização de projetos.
    """
    class Meta:
        model = Project
        fields = [
            'name', 'description', 'status', 'start_date',
            'end_date', 'priority', 'is_archived'
        ] 