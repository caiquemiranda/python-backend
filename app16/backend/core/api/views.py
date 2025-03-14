"""
Views da API para o projeto app16.
"""

from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def hello_world(request):
    """
    Uma simples view que retorna uma mensagem 'Hello, World!'.
    
    Esta é uma API básica para demonstrar a integração entre Django e React.
    """
    return Response({
        'message': 'Hello, World!',
        'info': 'Este é um exemplo de integração entre Django REST Framework e React'
    }) 