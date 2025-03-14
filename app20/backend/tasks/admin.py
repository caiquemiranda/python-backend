"""
Configuração do admin para o aplicativo de tarefas.
"""
from django.contrib import admin
from .models import Task, Comment, Tag, TimeEntry

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    """
    Configuração do admin para o modelo Task.
    """
    list_display = ('title', 'status', 'priority', 'project', 'due_date', 'created_by')
    list_filter = ('status', 'priority', 'project', 'due_date')
    search_fields = ('title', 'description')
    readonly_fields = ('created_at', 'updated_at')
    filter_horizontal = ('assigned_to', 'tags')
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('title', 'description', 'status', 'priority', 'order')
        }),
        ('Relacionamentos', {
            'fields': ('project', 'assigned_to', 'tags', 'created_by')
        }),
        ('Datas', {
            'fields': ('due_date', 'created_at', 'updated_at')
        }),
    )


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    """
    Configuração do admin para o modelo Comment.
    """
    list_display = ('task', 'author', 'created_at')
    list_filter = ('task', 'author', 'created_at')
    search_fields = ('content', 'task__title', 'author__username')
    readonly_fields = ('created_at',)


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    """
    Configuração do admin para o modelo Tag.
    """
    list_display = ('name', 'color')
    search_fields = ('name',)


@admin.register(TimeEntry)
class TimeEntryAdmin(admin.ModelAdmin):
    """
    Configuração do admin para o modelo TimeEntry.
    """
    list_display = ('task', 'user', 'date', 'hours', 'minutes')
    list_filter = ('task', 'user', 'date')
    search_fields = ('description', 'task__title', 'user__username')
    readonly_fields = ('created_at',)
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('task', 'user', 'date', 'hours', 'minutes')
        }),
        ('Detalhes', {
            'fields': ('description', 'created_at')
        }),
    ) 