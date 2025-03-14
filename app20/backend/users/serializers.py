"""
Serializers para o aplicativo de usuários.
"""
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer para o modelo de usuário.
    """
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name', 
            'avatar', 'avatar_url', 'bio', 'position', 'department', 
            'phone', 'email_notifications', 'dark_mode', 'date_joined'
        ]
        read_only_fields = ['id', 'date_joined', 'avatar_url']
        extra_kwargs = {
            'password': {'write_only': True}
        }


class UserCreateSerializer(serializers.ModelSerializer):
    """
    Serializer para criação de usuários.
    """
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        validators=[validate_password]
    )
    password_confirm = serializers.CharField(
        write_only=True, 
        required=True
    )

    class Meta:
        model = User
        fields = [
            'username', 'email', 'password', 'password_confirm',
            'first_name', 'last_name'
        ]

    def validate(self, attrs):
        """Valida se as senhas coincidem."""
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError(
                {"password": "As senhas não coincidem."}
            )
        return attrs

    def create(self, validated_data):
        """Cria um novo usuário com senha criptografada."""
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user


class UserUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer para atualização de usuários.
    """
    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'email', 'avatar', 
            'bio', 'position', 'department', 'phone', 
            'email_notifications', 'dark_mode'
        ]


class PasswordChangeSerializer(serializers.Serializer):
    """
    Serializer para alteração de senha.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(
        required=True, 
        validators=[validate_password]
    )
    new_password_confirm = serializers.CharField(required=True)

    def validate(self, attrs):
        """Valida se as novas senhas coincidem."""
        if attrs['new_password'] != attrs['new_password_confirm']:
            raise serializers.ValidationError(
                {"new_password": "As senhas não coincidem."}
            )
        return attrs


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Serializer personalizado para obtenção de tokens JWT.
    Inclui informações adicionais do usuário no token.
    """
    @classmethod
    def get_token(cls, user):
        """Adiciona claims personalizados ao token."""
        token = super().get_token(user)

        # Adiciona claims personalizados
        token['username'] = user.username
        token['email'] = user.email
        token['name'] = user.get_full_name()
        token['is_staff'] = user.is_staff
        token['dark_mode'] = user.dark_mode

        return token
        
    def validate(self, attrs):
        """Adiciona informações do usuário à resposta."""
        data = super().validate(attrs)
        
        # Adiciona informações do usuário
        user = self.user
        data['user'] = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'name': user.get_full_name(),
            'is_staff': user.is_staff,
            'avatar_url': user.avatar_url,
            'dark_mode': user.dark_mode
        }
        
        return data 