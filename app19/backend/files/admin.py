"""
Configuração da interface de administração para o app files.
"""

from django.contrib import admin
from django.utils.html import format_html
from .models import FileUpload


@admin.register(FileUpload)
class FileUploadAdmin(admin.ModelAdmin):
    """
    Configuração do admin para o modelo FileUpload.
    """
    list_display = ('title', 'file_type', 'content_type', 'size_display', 'file_preview', 'uploaded_at')
    list_filter = ('file_type', 'uploaded_at')
    search_fields = ('title', 'description')
    readonly_fields = ('file_preview', 'size_display', 'content_type', 'uploaded_at')
    fieldsets = (
        (None, {
            'fields': ('title', 'description', 'file', 'file_type')
        }),
        ('Informações do Arquivo', {
            'fields': ('file_preview', 'content_type', 'size_display', 'uploaded_at', 'updated_at')
        }),
    )
    
    def size_display(self, obj):
        """
        Formata o tamanho do arquivo para exibição.
        """
        # Converte bytes para KB, MB, etc.
        size = obj.size
        if size < 1024:
            return f"{size} bytes"
        elif size < 1024 * 1024:
            return f"{size/1024:.2f} KB"
        elif size < 1024 * 1024 * 1024:
            return f"{size/(1024*1024):.2f} MB"
        else:
            return f"{size/(1024*1024*1024):.2f} GB"
    
    size_display.short_description = 'Tamanho'
    
    def file_preview(self, obj):
        """
        Exibe uma prévia do arquivo no admin.
        """
        if obj.is_image:
            return format_html('<img src="{}" width="150" height="auto" />', obj.file.url)
        elif obj.is_document:
            return format_html('<a href="{}" target="_blank">Ver documento</a>', obj.file.url)
        else:
            return format_html('<a href="{}" target="_blank">Download do arquivo</a>', obj.file.url)
    
    file_preview.short_description = 'Prévia' 