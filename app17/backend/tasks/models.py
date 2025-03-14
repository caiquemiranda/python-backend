"""
Modelos para o aplicativo de gerenciamento de tarefas.
"""

from django.db import models

class Category(models.Model):
    """
    Modelo para categorias de tarefas.
    
    As categorias permitem organizar as tarefas em grupos lógicos,
    como 'Trabalho', 'Estudos', 'Pessoal', etc.
    """
    name = models.CharField('Nome', max_length=100)
    description = models.TextField('Descrição', blank=True, null=True)
    created_at = models.DateTimeField('Criado em', auto_now_add=True)
    
    class Meta:
        verbose_name = 'Categoria'
        verbose_name_plural = 'Categorias'
        ordering = ['name']
    
    def __str__(self):
        return self.name

class Task(models.Model):
    """
    Modelo para tarefas.
    
    As tarefas são os itens principais do sistema, contendo informações
    como título, descrição, data de vencimento, prioridade, etc.
    """
    # Choices para o campo status
    STATUS_CHOICES = (
        ('pendente', 'Pendente'),
        ('em_andamento', 'Em Andamento'),
        ('concluida', 'Concluída'),
        ('cancelada', 'Cancelada'),
    )
    
    # Choices para o campo prioridade
    PRIORITY_CHOICES = (
        ('baixa', 'Baixa'),
        ('media', 'Média'),
        ('alta', 'Alta'),
        ('urgente', 'Urgente'),
    )
    
    title = models.CharField('Título', max_length=200)
    description = models.TextField('Descrição', blank=True, null=True)
    status = models.CharField('Status', max_length=20, choices=STATUS_CHOICES, default='pendente')
    priority = models.CharField('Prioridade', max_length=20, choices=PRIORITY_CHOICES, default='media')
    due_date = models.DateField('Data de Vencimento', blank=True, null=True)
    completed_at = models.DateTimeField('Concluída em', blank=True, null=True)
    created_at = models.DateTimeField('Criada em', auto_now_add=True)
    updated_at = models.DateTimeField('Atualizada em', auto_now=True)
    category = models.ForeignKey(
        Category, 
        verbose_name='Categoria',
        on_delete=models.SET_NULL, 
        blank=True, 
        null=True,
        related_name='tasks'
    )
    attachment = models.FileField('Anexo', upload_to='task_attachments/', blank=True, null=True)
    
    class Meta:
        verbose_name = 'Tarefa'
        verbose_name_plural = 'Tarefas'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title
    
    def mark_as_completed(self):
        """
        Marca a tarefa como concluída e define a data de conclusão.
        """
        from django.utils import timezone
        
        self.status = 'concluida'
        self.completed_at = timezone.now()
        self.save() 