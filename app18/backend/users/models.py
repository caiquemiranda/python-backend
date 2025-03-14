"""
Modelos para o app users.
"""

from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):
    """
    Gerenciador de usuários personalizado onde email é o identificador único
    para autenticação em vez de usernames.
    """
    def create_user(self, email, password, **extra_fields):
        """
        Cria e salva um usuário com o email e senha fornecidos.
        """
        if not email:
            raise ValueError(_('O Email é obrigatório'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Cria e salva um superusuário com o email e senha fornecidos.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    """
    Modelo de usuário personalizado que usa email como identificador único para autenticação
    em vez de usernames.
    """
    username = None
    email = models.EmailField(_('endereço de email'), unique=True)
    profile_picture = models.ImageField(
        _('foto de perfil'),
        upload_to='profile_pictures/',
        blank=True,
        null=True
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email 