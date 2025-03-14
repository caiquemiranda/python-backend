"""
Configuração do admin para o aplicativo de projetos.
"""
from django.contrib import admin
from .models import Project, ProjectMembership, Category

class ProjectMembershipInline(admin.TabularInline):
    """
    Configuração inline para membros do projeto.
    """
    model = ProjectMembership
    extra = 1
    autocomplete_fields = ['user']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """
    Configuração do admin para o modelo Project.
    """
    list_display = ('name', 'status', 'owner', 'created_at', 'is_archived')
    list_filter = ('status', 'is_archived', 'created_at', 'category')
    search_fields = ('name', 'description', 'owner__username')
    readonly_fields = ('created_at', 'updated_at')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProjectMembershipInline]
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('name', 'slug', 'description', 'status', 'priority', 'category')
        }),
        ('Propriedade', {
            'fields': ('owner',)
        }),
        ('Datas', {
            'fields': ('created_at', 'updated_at')
        }),
        ('Configurações', {
            'fields': ('is_archived',),
            'classes': ('collapse',)
        }),
    )


@admin.register(ProjectMembership)
class ProjectMembershipAdmin(admin.ModelAdmin):
    """
    Configuração do admin para o modelo ProjectMembership.
    """
    list_display = ('project', 'user', 'role', 'created_at')
    list_filter = ('project', 'role', 'created_at')
    search_fields = ('project__name', 'user__username', 'user__email')
    readonly_fields = ('created_at',)
    autocomplete_fields = ['user', 'project']


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """
    Configuração do admin para o modelo Category.
    """
    list_display = ('name', 'color')
    search_fields = ('name', 'description')
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('name', 'description', 'color')
        }),
    ) 