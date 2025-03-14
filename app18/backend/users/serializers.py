"""
Serializadores para o app users.
"""

from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator

User = get_user_model()


class UserDetailSerializer(serializers.ModelSerializer):
    """
    Serializador para exibir detalhes de um usuário.
    """
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'profile_picture', 'date_joined', 'last_login')
        read_only_fields = ('id', 'date_joined', 'last_login')


class UserUpdateSerializer(serializers.ModelSerializer):
    """
    Serializador para atualização de usuários.
    """
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'profile_picture')


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializador para registro de novos usuários.
    """
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all(), message="Este email já está em uso.")]
    )
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    password2 = serializers.CharField(
        write_only=True, 
        required=True,
        style={'input_type': 'password'}
    )

    class Meta:
        model = User
        fields = ('email', 'password', 'password2', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        """
        Valida se as duas senhas fornecidas são iguais.
        """
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "As senhas não conferem."})
        return attrs

    def create(self, validated_data):
        """
        Cria um novo usuário com os dados validados.
        """
        user = User.objects.create(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializador para alteração de senha.
    """
    old_password = serializers.CharField(required=True, style={'input_type': 'password'})
    new_password = serializers.CharField(required=True, validators=[validate_password], style={'input_type': 'password'})
    new_password2 = serializers.CharField(required=True, style={'input_type': 'password'})

    def validate(self, attrs):
        """
        Valida se as duas novas senhas fornecidas são iguais.
        """
        if attrs['new_password'] != attrs['new_password2']:
            raise serializers.ValidationError({"new_password": "As senhas não conferem."})
        return attrs 