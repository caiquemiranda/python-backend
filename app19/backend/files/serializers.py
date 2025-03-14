"""
Serializadores para o app files.
"""

import os
import magic
from rest_framework import serializers
from .models import FileUpload


class FileUploadSerializer(serializers.ModelSerializer):
    """
    Serializador para criação e exibição de arquivos.
    """
    file_url = serializers.SerializerMethodField()
    file_size_display = serializers.SerializerMethodField()
    
    class Meta:
        model = FileUpload
        fields = [
            'id', 'title', 'description', 'file', 'file_type', 
            'content_type', 'size', 'file_size_display', 'file_url',
            'uploaded_at', 'updated_at', 'is_image', 'is_document'
        ]
        read_only_fields = ['content_type', 'size', 'file_url', 'uploaded_at', 
                           'updated_at', 'file_size_display', 'is_image', 'is_document']
    
    def get_file_url(self, obj):
        """
        Retorna a URL completa do arquivo.
        """
        request = self.context.get('request')
        if obj.file and hasattr(obj.file, 'url') and request:
            return request.build_absolute_uri(obj.file.url)
        return None
    
    def get_file_size_display(self, obj):
        """
        Formata o tamanho do arquivo para exibição.
        """
        size = obj.size
        if size < 1024:
            return f"{size} bytes"
        elif size < 1024 * 1024:
            return f"{size/1024:.2f} KB"
        elif size < 1024 * 1024 * 1024:
            return f"{size/(1024*1024):.2f} MB"
        else:
            return f"{size/(1024*1024*1024):.2f} GB"
    
    def create(self, validated_data):
        """
        Customiza o processo de criação para adicionar content_type e size.
        """
        file = validated_data.get('file')
        
        # Infere o tipo de arquivo a partir do conteúdo, se não especificado
        if 'file_type' not in validated_data or not validated_data['file_type']:
            # Verifica o mime type usando python-magic
            try:
                mime = magic.Magic(mime=True)
                mime_type = mime.from_buffer(file.read())
                file.seek(0)  # Reset o ponteiro do arquivo
                
                if mime_type.startswith('image/'):
                    validated_data['file_type'] = FileUpload.IMAGE
                elif mime_type.startswith(('application/', 'text/')):
                    validated_data['file_type'] = FileUpload.DOCUMENT
                else:
                    validated_data['file_type'] = FileUpload.OTHER
            except Exception:
                # Se algo der errado, mantém o padrão OTHER
                validated_data['file_type'] = FileUpload.OTHER
        
        # Cria o objeto no banco de dados
        instance = super().create(validated_data)
        
        # Atualiza os metadados do arquivo
        if file:
            instance.content_type = file.content_type
            instance.size = file.size
            instance.save()
        
        return instance 