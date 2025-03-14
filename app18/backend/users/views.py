"""
Views para o app users.
"""

from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .serializers import (
    UserDetailSerializer,
    UserUpdateSerializer,
    RegisterSerializer,
    ChangePasswordSerializer
)

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    """
    View para registrar um novo usuário.
    """
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    View para recuperar e atualizar o perfil do usuário atualmente autenticado.
    """
    serializer_class = UserDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        """
        Retorna o usuário atualmente autenticado.
        """
        return self.request.user

    def get_serializer_class(self):
        """
        Retorna o serializador apropriado com base no método HTTP.
        """
        if self.request.method == 'PUT' or self.request.method == 'PATCH':
            return UserUpdateSerializer
        return UserDetailSerializer


class ChangePasswordView(generics.UpdateAPIView):
    """
    View para alteração de senha do usuário autenticado.
    """
    serializer_class = ChangePasswordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        """
        Retorna o usuário atualmente autenticado.
        """
        return self.request.user

    def update(self, request, *args, **kwargs):
        """
        Atualiza a senha do usuário após validação.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Verifica se a senha antiga está correta
        user = self.get_object()
        if not user.check_password(serializer.validated_data['old_password']):
            return Response(
                {"old_password": "Senha antiga incorreta."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Define a nova senha
        user.set_password(serializer.validated_data['new_password'])
        user.save()
        return Response(
            {"detail": "Senha alterada com sucesso."},
            status=status.HTTP_200_OK
        )


class LogoutView(APIView):
    """
    View para logout do usuário.
    
    Como estamos usando JWT, o logout é gerenciado pelo cliente
    simplesmente descartando o token. Esta view é apenas
    para fins educacionais.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        return Response(
            {"detail": "Logout realizado com sucesso."},
            status=status.HTTP_200_OK
        ) 