"""
Views para o aplicativo de usuários.
"""
from rest_framework import viewsets, generics, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from .serializers import (
    UserSerializer, UserCreateSerializer, UserUpdateSerializer,
    PasswordChangeSerializer, CustomTokenObtainPairSerializer
)

User = get_user_model()

class CustomTokenObtainPairView(TokenObtainPairView):
    """
    View personalizada para obtenção de tokens JWT.
    Usa o serializer personalizado que inclui informações adicionais do usuário.
    """
    serializer_class = CustomTokenObtainPairSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gerenciamento de usuários.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_serializer_class(self):
        """
        Retorna o serializer apropriado com base na ação.
        """
        if self.action == 'create':
            return UserCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return UserUpdateSerializer
        return UserSerializer
    
    def get_permissions(self):
        """
        Define permissões com base na ação.
        """
        if self.action == 'create':
            return [permissions.AllowAny()]
        elif self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return [permissions.IsAdminUser()]
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        """
        Retorna os dados do usuário autenticado.
        """
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
    
    @action(detail=False, methods=['put'], permission_classes=[permissions.IsAuthenticated])
    def update_profile(self, request):
        """
        Atualiza o perfil do usuário autenticado.
        """
        user = request.user
        serializer = UserUpdateSerializer(user, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def change_password(self, request):
        """
        Altera a senha do usuário autenticado.
        """
        user = request.user
        serializer = PasswordChangeSerializer(data=request.data)
        
        if serializer.is_valid():
            # Verifica se a senha atual está correta
            if not user.check_password(serializer.validated_data['old_password']):
                return Response(
                    {'old_password': ['Senha atual incorreta.']},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Define a nova senha
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            
            return Response({'detail': 'Senha alterada com sucesso.'})
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'], permission_classes=[permissions.AllowAny])
    def register(self, request):
        """
        Registra um novo usuário.
        """
        serializer = UserCreateSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(
                {'detail': 'Usuário registrado com sucesso.'},
                status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 