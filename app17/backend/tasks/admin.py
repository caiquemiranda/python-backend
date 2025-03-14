"""
Configuração da interface de administração para o app tasks.
"""

from django.contrib import admin
from .models import Task, Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """Admin para o modelo Category."""
    list_display = ('name', 'description', 'created_at')
    search_fields = ('name', 'description')
    list_filter = ('created_at',)

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    """Admin para o modelo Task."""
    list_display = ('title', 'category', 'status', 'priority', 'due_date', 'created_at')
    list_filter = ('status', 'priority', 'category', 'due_date', 'created_at')
    search_fields = ('title', 'description', 'category__name')
    date_hierarchy = 'due_date' 