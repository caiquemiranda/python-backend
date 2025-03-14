"""
Modelos para o aplicativo de tarefas.
"""
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings

class Task(models.Model):
    """
    Modelo para tarefas.
    """
    # Status possíveis para uma tarefa
    STATUS_CHOICES = (
        ('backlog', _('Backlog')),
        ('todo', _('A Fazer')),
        ('in_progress', _('Em Andamento')),
        ('review', _('Em Revisão')),
        ('completed', _('Concluída')),
        ('cancelled', _('Cancelada')),
    )
    
    # Prioridades possíveis
    PRIORITY_CHOICES = (
        (1, _('Baixa')),
        (2, _('Média')),
        (3, _('Alta')),
        (4, _('Urgente')),
    )
    
    # Informações básicas da tarefa
    title = models.CharField(
        _('título'), 
        max_length=200
    )
    description = models.TextField(
        _('descrição'), 
        blank=True
    )
    status = models.CharField(
        _('status'), 
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='todo'
    )
    
    # Datas da tarefa
    due_date = models.DateField(
        _('data de vencimento'), 
        null=True, 
        blank=True
    )
    
    # Relações com outros modelos
    project = models.ForeignKey(
        'projects.Project',
        on_delete=models.CASCADE,
        related_name='tasks',
        verbose_name=_('projeto')
    )
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='assigned_tasks',
        verbose_name=_('atribuído a')
    )
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name='created_tasks',
        verbose_name=_('criado por')
    )
    
    # Campos para organização
    priority = models.PositiveSmallIntegerField(
        _('prioridade'), 
        choices=PRIORITY_CHOICES, 
        default=2
    )
    order = models.PositiveIntegerField(
        _('ordem'), 
        default=0,
        help_text=_('Ordem de exibição da tarefa')
    )
    tags = models.ManyToManyField(
        'Tag',
        blank=True,
        related_name='tasks',
        verbose_name=_('tags')
    )
    
    # Campos para controle de progresso
    estimated_hours = models.DecimalField(
        _('horas estimadas'),
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True
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
    completed_at = models.DateTimeField(
        _('concluído em'), 
        null=True, 
        blank=True
    )

    class Meta:
        verbose_name = _('tarefa')
        verbose_name_plural = _('tarefas')
        ordering = ['status', '-priority', 'order', 'due_date']

    def __str__(self):
        """Representação em string da tarefa."""
        return self.title
        
    @property
    def is_completed(self):
        """Verifica se a tarefa está concluída."""
        return self.status == 'completed'
        
    @property
    def is_overdue(self):
        """Verifica se a tarefa está atrasada."""
        from django.utils import timezone
        if self.due_date and not self.is_completed:
            return self.due_date < timezone.now().date()
        return False


class Comment(models.Model):
    """
    Modelo para comentários em tarefas.
    """
    task = models.ForeignKey(
        'Task',
        on_delete=models.CASCADE,
        related_name='comments',
        verbose_name=_('tarefa')
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='task_comments',
        verbose_name=_('autor')
    )
    content = models.TextField(
        _('conteúdo')
    )
    created_at = models.DateTimeField(
        _('criado em'), 
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        _('atualizado em'), 
        auto_now=True
    )
    
    class Meta:
        verbose_name = _('comentário')
        verbose_name_plural = _('comentários')
        ordering = ['-created_at']
        
    def __str__(self):
        """Representação em string do comentário."""
        return f"Comentário de {self.author.username} em {self.task.title}"


class Tag(models.Model):
    """
    Modelo para tags de tarefas.
    """
    name = models.CharField(
        _('nome'), 
        max_length=50, 
        unique=True
    )
    color = models.CharField(
        _('cor'), 
        max_length=20, 
        default='#3498db'
    )
    
    class Meta:
        verbose_name = _('tag')
        verbose_name_plural = _('tags')
        ordering = ['name']
        
    def __str__(self):
        """Representação em string da tag."""
        return self.name


class TimeEntry(models.Model):
    """
    Modelo para registros de tempo em tarefas.
    """
    task = models.ForeignKey(
        'Task',
        on_delete=models.CASCADE,
        related_name='time_entries',
        verbose_name=_('tarefa')
    )
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='time_entries',
        verbose_name=_('usuário')
    )
    description = models.CharField(
        _('descrição'), 
        max_length=255, 
        blank=True
    )
    hours = models.DecimalField(
        _('horas'),
        max_digits=5,
        decimal_places=2
    )
    date = models.DateField(
        _('data')
    )
    created_at = models.DateTimeField(
        _('criado em'), 
        auto_now_add=True
    )
    
    class Meta:
        verbose_name = _('registro de tempo')
        verbose_name_plural = _('registros de tempo')
        ordering = ['-date', '-created_at']
        
    def __str__(self):
        """Representação em string do registro de tempo."""
        return f"{self.hours}h por {self.user.username} em {self.task.title}" 