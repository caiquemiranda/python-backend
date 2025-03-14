"""
Modelos para o app files.
"""

import os
import uuid
from django.db import models
from django.utils.translation import gettext_lazy as _


def file_upload_path(instance, filename):
    """
    Gera o caminho para o upload de arquivos, organizando-os por tipo em subdiretórios.
    
    Args:
        instance: Instância do modelo FileUpload
        filename: Nome original do arquivo
    
    Returns:
        Caminho para salvar o arquivo no formato: uploads/tipo/uuid-nome_original.extensao
    """
    # Obtém a extensão do arquivo original
    ext = filename.split('.')[-1]
    # Gera um nome único para o arquivo com UUID
    unique_filename = f"{uuid.uuid4()}-{filename}"
    # Retorna o caminho do arquivo organizado por tipo
    return os.path.join('uploads', instance.file_type, unique_filename)


class FileUpload(models.Model):
    """
    Modelo para armazenar informações sobre arquivos enviados.
    """
    # Tipos de arquivo
    IMAGE = 'image'
    DOCUMENT = 'document'
    OTHER = 'other'
    
    FILE_TYPE_CHOICES = [
        (IMAGE, _('Imagem')),
        (DOCUMENT, _('Documento')),
        (OTHER, _('Outro')),
    ]
    
    # Campos do modelo
    title = models.CharField(_('título'), max_length=255)
    description = models.TextField(_('descrição'), blank=True)
    file = models.FileField(_('arquivo'), upload_to=file_upload_path)
    file_type = models.CharField(
        _('tipo do arquivo'), 
        max_length=20, 
        choices=FILE_TYPE_CHOICES,
        default=OTHER
    )
    content_type = models.CharField(_('tipo de conteúdo'), max_length=100, blank=True)
    size = models.PositiveIntegerField(_('tamanho'), default=0)  # tamanho em bytes
    uploaded_at = models.DateTimeField(_('data de upload'), auto_now_add=True)
    updated_at = models.DateTimeField(_('data de atualização'), auto_now=True)
    
    class Meta:
        verbose_name = _('Upload de Arquivo')
        verbose_name_plural = _('Uploads de Arquivos')
        ordering = ['-uploaded_at']
    
    def __str__(self):
        return self.title
    
    def delete(self, *args, **kwargs):
        """
        Sobrescreve o método delete para remover o arquivo físico ao excluir o registro.
        """
        # Armazena o caminho do arquivo
        file_path = self.file.path
        
        # Remove o registro do banco de dados
        super().delete(*args, **kwargs)
        
        # Remove o arquivo físico, se existir
        if os.path.isfile(file_path):
            os.remove(file_path)
    
    @property
    def filename(self):
        """
        Retorna o nome do arquivo original.
        """
        return os.path.basename(self.file.name)
    
    @property
    def file_extension(self):
        """
        Retorna a extensão do arquivo.
        """
        name = self.file.name
        return os.path.splitext(name)[1].lower() if '.' in name else ''
    
    @property
    def is_image(self):
        """
        Verifica se o arquivo é uma imagem com base no tipo de conteúdo.
        """
        return self.file_type == self.IMAGE or self.content_type.startswith('image/')
    
    @property
    def is_document(self):
        """
        Verifica se o arquivo é um documento com base no tipo de conteúdo.
        """
        return self.file_type == self.DOCUMENT 