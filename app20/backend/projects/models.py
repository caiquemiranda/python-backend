"""
Modelos para o aplicativo de projetos.
"""
from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _
from django.conf import settings

class Project(models.Model):
    """
    Modelo para projetos.
    """
    # Status possíveis para um projeto
    STATUS_CHOICES = (
        ('planning', _('Planejamento')),
        ('in_progress', _('Em Andamento')),
        ('paused', _('Pausado')),
        ('completed', _('Concluído')),
        ('cancelled', _('Cancelado')),
    )
    
    # Informações básicas do projeto
    name = models.CharField(
        _('nome'), 
        max_length=200
    )
    slug = models.SlugField(
        _('slug'), 
        max_length=255, 
        unique=True
    )
    description = models.TextField(
        _('descrição'), 
        blank=True
    )
    status = models.CharField(
        _('status'), 
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='planning'
    )
    
    # Datas do projeto
    start_date = models.DateField(
        _('data de início'), 
        null=True, 
        blank=True
    )
    end_date = models.DateField(
        _('data de término'), 
        null=True, 
        blank=True
    )
    
    # Relações com outros modelos
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='owned_projects',
        verbose_name=_('proprietário')
    )
    members = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through='ProjectMembership',
        related_name='projects',
        verbose_name=_('membros')
    )
    
    # Campos para organização
    priority = models.PositiveSmallIntegerField(
        _('prioridade'), 
        default=1, 
        help_text=_('Quanto maior o número, maior a prioridade')
    )
    is_archived = models.BooleanField(
        _('arquivado'), 
        default=False
    )
    
    # Campos de controle de criação/alteração
    created_at = models.DateTimeField(
        _('criado em'), 
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        _('atualizado em'), 
        auto_now=True
    )

    class Meta:
        verbose_name = _('projeto')
        verbose_name_plural = _('projetos')
        ordering = ['-priority', 'name']

    def __str__(self):
        """Representação em string do projeto."""
        return self.name
        
    def save(self, *args, **kwargs):
        """Sobrescreve o método save para criar o slug automaticamente."""
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
        
    @property
    def task_count(self):
        """Retorna o número total de tarefas do projeto."""
        return self.tasks.count()
        
    @property
    def completed_task_count(self):
        """Retorna o número de tarefas concluídas do projeto."""
        return self.tasks.filter(status='completed').count()
        
    @property
    def progress(self):
        """Calcula e retorna o progresso do projeto em porcentagem."""
        total = self.task_count
        if total == 0:
            return 0
        return int((self.completed_task_count / total) * 100)


class ProjectMembership(models.Model):
    """
    Modelo para representar a associação entre usuários e projetos.
    """
    # Tipos de papel no projeto
    ROLE_CHOICES = (
        ('admin', _('Administrador')),
        ('manager', _('Gerente')),
        ('member', _('Membro')),
        ('viewer', _('Visualizador')),
    )
    
    # Relações
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='project_memberships',
        verbose_name=_('usuário')
    )
    project = models.ForeignKey(
        'Project',
        on_delete=models.CASCADE,
        related_name='memberships',
        verbose_name=_('projeto')
    )
    
    # Campos para definir o papel e acesso
    role = models.CharField(
        _('papel'), 
        max_length=20, 
        choices=ROLE_CHOICES, 
        default='member'
    )
    
    # Controle de tempo
    joined_at = models.DateTimeField(
        _('entrou em'), 
        auto_now_add=True
    )
    
    class Meta:
        verbose_name = _('associação ao projeto')
        verbose_name_plural = _('associações ao projeto')
        unique_together = ('user', 'project')
        
    def __str__(self):
        """Representação em string da associação."""
        return f"{self.user.username} - {self.project.name} ({self.get_role_display()})"


class Category(models.Model):
    """
    Modelo para categorias de projetos.
    """
    name = models.CharField(
        _('nome'), 
        max_length=100
    )
    description = models.TextField(
        _('descrição'), 
        blank=True
    )
    color = models.CharField(
        _('cor'), 
        max_length=20, 
        default='#3498db'
    )
    
    class Meta:
        verbose_name = _('categoria')
        verbose_name_plural = _('categorias')
        ordering = ['name']
        
    def __str__(self):
        """Representação em string da categoria."""
        return self.name 