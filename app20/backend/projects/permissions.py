"""
Permissões personalizadas para o aplicativo de projetos.
"""
from rest_framework import permissions

class IsProjectMember(permissions.BasePermission):
    """
    Permissão que verifica se o usuário é membro do projeto.
    """
    def has_object_permission(self, request, view, obj):
        """
        Verifica se o usuário é membro do projeto.
        """
        # Administradores do sistema têm acesso a tudo
        if request.user.is_staff:
            return True
        
        # Verifica se o usuário é o proprietário ou membro do projeto
        return (obj.owner == request.user or 
                obj.members.filter(id=request.user.id).exists())


class IsProjectAdmin(permissions.BasePermission):
    """
    Permissão que verifica se o usuário é administrador do projeto.
    """
    def has_object_permission(self, request, view, obj):
        """
        Verifica se o usuário é administrador do projeto.
        """
        # Administradores do sistema têm acesso a tudo
        if request.user.is_staff:
            return True
        
        # Verifica se o usuário é o proprietário do projeto
        if obj.owner == request.user:
            return True
        
        # Verifica se o usuário é um membro com papel de administrador
        return obj.memberships.filter(
            user=request.user, 
            role__in=['admin', 'manager']
        ).exists() 