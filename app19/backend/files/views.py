"""
Views para o app files.
"""

from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import FileUpload
from .serializers import FileUploadSerializer


class FileUploadViewSet(viewsets.ModelViewSet):
    """
    API para gerenciamento de uploads de arquivos.
    
    Permite listar, visualizar, criar, atualizar e excluir arquivos.
    """
    queryset = FileUpload.objects.all()
    serializer_class = FileUploadSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['file_type']
    search_fields = ['title', 'description']
    ordering_fields = ['title', 'uploaded_at', 'size']
    ordering = ['-uploaded_at']
    
    @swagger_auto_schema(
        operation_description="Filtrar arquivos por tipo",
        manual_parameters=[
            openapi.Parameter(
                'type', 
                openapi.IN_QUERY,
                description="Tipo de arquivo (image, document, other)",
                type=openapi.TYPE_STRING,
                enum=[FileUpload.IMAGE, FileUpload.DOCUMENT, FileUpload.OTHER]
            )
        ]
    )
    @action(detail=False, methods=['get'])
    def filter_by_type(self, request):
        """
        Endpoint para filtrar arquivos por tipo.
        """
        file_type = request.query_params.get('type')
        
        if file_type not in [FileUpload.IMAGE, FileUpload.DOCUMENT, FileUpload.OTHER]:
            return Response(
                {"error": "Tipo de arquivo inválido. Use 'image', 'document' ou 'other'."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        queryset = self.queryset.filter(file_type=file_type)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def images(self, request):
        """
        Endpoint para listar apenas imagens.
        """
        queryset = self.queryset.filter(file_type=FileUpload.IMAGE)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def documents(self, request):
        """
        Endpoint para listar apenas documentos.
        """
        queryset = self.queryset.filter(file_type=FileUpload.DOCUMENT)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    def perform_create(self, serializer):
        """
        Customiza o processo de criação.
        """
        serializer.save()
        
    def perform_destroy(self, instance):
        """
        Customiza o processo de exclusão para garantir que o arquivo físico seja removido.
        """
        instance.delete()  # O método delete() sobrescrito no modelo cuidará de remover o arquivo 