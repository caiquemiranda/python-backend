"""
Modelos para o aplicativo de usuários.
"""
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    """
    Modelo de usuário estendido com campos adicionais.
    """
    # Campos adicionais para perfil de usuário
    avatar = models.ImageField(
        _('avatar'), 
        upload_to='avatars/', 
        null=True, 
        blank=True
    )
    bio = models.TextField(
        _('biografia'), 
        max_length=500, 
        blank=True
    )
    position = models.CharField(
        _('cargo'), 
        max_length=100, 
        blank=True
    )
    department = models.CharField(
        _('departamento'), 
        max_length=100, 
        blank=True
    )
    phone = models.CharField(
        _('telefone'), 
        max_length=20, 
        blank=True
    )
    
    # Campos para controle de notificações
    email_notifications = models.BooleanField(
        _('notificações por email'), 
        default=True
    )
    
    # Campos para tema de interface
    dark_mode = models.BooleanField(
        _('modo escuro'), 
        default=False
    )
    
    class Meta:
        verbose_name = _('usuário')
        verbose_name_plural = _('usuários')
        
    def __str__(self):
        """Representação em string do usuário."""
        return f"{self.get_full_name() or self.username}"
        
    @property
    def name(self):
        """Retorna o nome completo ou o username, se o nome não estiver definido."""
        return self.get_full_name() or self.username
        
    @property
    def avatar_url(self):
        """Retorna a URL do avatar, se existir."""
        if self.avatar and hasattr(self.avatar, 'url'):
            return self.avatar.url
        return None 