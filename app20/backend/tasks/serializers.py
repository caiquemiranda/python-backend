"""
Serializers para o aplicativo de tarefas.
"""
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils import timezone
from .models import Task, Comment, Tag, TimeEntry
from projects.serializers import UserMiniSerializer

User = get_user_model()

class TagSerializer(serializers.ModelSerializer):
    """
    Serializer para o modelo de tag.
    """
    class Meta:
        model = Tag
        fields = ['id', 'name', 'color']


class TaskListSerializer(serializers.ModelSerializer):
    """
    Serializer para listagem de tarefas.
    """
    assigned_to = UserMiniSerializer(read_only=True)
    created_by = UserMiniSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    project_name = serializers.CharField(source='project.name', read_only=True)
    is_overdue = serializers.BooleanField(read_only=True)
    comment_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Task
        fields = [
            'id', 'title', 'status', 'priority', 'due_date',
            'assigned_to', 'created_by', 'project', 'project_name',
            'tags', 'created_at', 'updated_at', 'is_overdue',
            'comment_count', 'order'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def get_comment_count(self, obj):
        """Retorna o número de comentários da tarefa."""
        return obj.comments.count()


class TaskDetailSerializer(serializers.ModelSerializer):
    """
    Serializer para detalhes de uma tarefa.
    """
    assigned_to = UserMiniSerializer(read_only=True)
    assigned_to_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        write_only=True,
        source='assigned_to',
        required=False,
        allow_null=True
    )
    created_by = UserMiniSerializer(read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(),
        write_only=True,
        source='tags',
        many=True,
        required=False
    )
    project_name = serializers.CharField(source='project.name', read_only=True)
    is_overdue = serializers.BooleanField(read_only=True)
    
    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'status', 'priority',
            'due_date', 'assigned_to', 'assigned_to_id', 'created_by',
            'project', 'project_name', 'tags', 'tag_ids', 'order',
            'estimated_hours', 'created_at', 'updated_at', 
            'completed_at', 'is_overdue'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'completed_at']
    
    def update(self, instance, validated_data):
        """
        Atualiza a tarefa e gerencia o campo completed_at.
        """
        # Se o status mudou para 'completed', define completed_at
        if 'status' in validated_data and validated_data['status'] == 'completed' and instance.status != 'completed':
            validated_data['completed_at'] = timezone.now()
        
        # Se o status mudou de 'completed' para outro, limpa completed_at
        elif 'status' in validated_data and validated_data['status'] != 'completed' and instance.status == 'completed':
            validated_data['completed_at'] = None
        
        return super().update(instance, validated_data)


class TaskCreateSerializer(serializers.ModelSerializer):
    """
    Serializer para criação de tarefas.
    """
    assigned_to_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='assigned_to',
        required=False,
        allow_null=True
    )
    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(),
        source='tags',
        many=True,
        required=False
    )
    
    class Meta:
        model = Task
        fields = [
            'title', 'description', 'status', 'priority',
            'due_date', 'assigned_to_id', 'project', 'tag_ids',
            'order', 'estimated_hours'
        ]
    
    def create(self, validated_data):
        """
        Cria uma nova tarefa e define o usuário atual como criador.
        """
        tags = None
        if 'tags' in validated_data:
            tags = validated_data.pop('tags')
        
        user = self.context['request'].user
        task = Task.objects.create(created_by=user, **validated_data)
        
        if tags:
            task.tags.set(tags)
        
        return task


class CommentSerializer(serializers.ModelSerializer):
    """
    Serializer para o modelo de comentário.
    """
    author = UserMiniSerializer(read_only=True)
    
    class Meta:
        model = Comment
        fields = ['id', 'task', 'author', 'content', 'created_at', 'updated_at']
        read_only_fields = ['id', 'author', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        """
        Cria um novo comentário e define o usuário atual como autor.
        """
        user = self.context['request'].user
        comment = Comment.objects.create(author=user, **validated_data)
        return comment


class TimeEntrySerializer(serializers.ModelSerializer):
    """
    Serializer para o modelo de registro de tempo.
    """
    user = UserMiniSerializer(read_only=True)
    task_title = serializers.CharField(source='task.title', read_only=True)
    
    class Meta:
        model = TimeEntry
        fields = ['id', 'task', 'task_title', 'user', 'description', 'hours', 'date', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']
    
    def create(self, validated_data):
        """
        Cria um novo registro de tempo e define o usuário atual.
        """
        user = self.context['request'].user
        time_entry = TimeEntry.objects.create(user=user, **validated_data)
        return time_entry 