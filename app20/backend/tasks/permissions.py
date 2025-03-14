"""
Permissões personalizadas para o aplicativo de tarefas.
"""
from rest_framework import permissions
from .models import Task, Comment, TimeEntry

class IsTaskAssignee(permissions.BasePermission):
    """
    Permissão que verifica se o usuário está atribuído à tarefa.
    """
    
    def has_object_permission(self, request, view, obj):
        # Administradores têm permissão total
        if request.user.is_staff:
            return True
        
        # Verifica se o objeto é uma tarefa
        if isinstance(obj, Task):
            # Verifica se o usuário é o criador, está atribuído à tarefa ou é proprietário/membro do projeto
            return (
                obj.created_by == request.user or
                request.user in obj.assigned_to.all() or
                obj.project.owner == request.user or
                request.user in obj.project.members.all()
            )
        
        # Verifica se o objeto é um comentário
        elif isinstance(obj, Comment):
            # Verifica se o usuário é o autor do comentário ou está relacionado à tarefa
            return (
                obj.author == request.user or
                obj.task.created_by == request.user or
                request.user in obj.task.assigned_to.all() or
                obj.task.project.owner == request.user or
                request.user in obj.task.project.members.all()
            )
        
        # Verifica se o objeto é um registro de tempo
        elif isinstance(obj, TimeEntry):
            # Verifica se o usuário é o proprietário do registro ou está relacionado à tarefa
            return (
                obj.user == request.user or
                obj.task.created_by == request.user or
                request.user in obj.task.assigned_to.all() or
                obj.task.project.owner == request.user or
                request.user in obj.task.project.members.all()
            )
        
        return False


class IsTaskCreatorOrProjectAdmin(permissions.BasePermission):
    """
    Permissão que verifica se o usuário é o criador da tarefa ou administrador do projeto.
    """
    
    def has_object_permission(self, request, view, obj):
        # Administradores têm permissão total
        if request.user.is_staff:
            return True
        
        # Verifica se o objeto é uma tarefa
        if isinstance(obj, Task):
            # Verifica se o usuário é o criador da tarefa
            if obj.created_by == request.user:
                return True
            
            # Verifica se o usuário é o proprietário do projeto
            if obj.project.owner == request.user:
                return True
            
            # Verifica se o usuário é um administrador ou gerente do projeto
            for membership in obj.project.projectmembership_set.all():
                if membership.user == request.user and membership.role in ['admin', 'manager']:
                    return True
        
        return False


class IsCommentAuthor(permissions.BasePermission):
    """
    Permissão que verifica se o usuário é o autor do comentário.
    """
    
    def has_object_permission(self, request, view, obj):
        # Administradores têm permissão total
        if request.user.is_staff:
            return True
        
        # Verifica se o usuário é o autor do comentário
        return obj.author == request.user


class IsTimeEntryOwner(permissions.BasePermission):
    """
    Permissão que verifica se o usuário é o proprietário do registro de tempo.
    """
    
    def has_object_permission(self, request, view, obj):
        # Administradores têm permissão total
        if request.user.is_staff:
            return True
        
        # Verifica se o usuário é o proprietário do registro
        return obj.user == request.user 