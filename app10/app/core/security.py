#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Utilidades de Segurança
Este módulo fornece funções para gerenciar senhas e tokens JWT.
"""

from datetime import datetime, timedelta
from typing import Any, Union

from jose import jwt
from passlib.context import CryptContext

from app.core.config import settings

# Contexto para hashing de senha usando bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Algoritmo para geração do token JWT
ALGORITHM = "HS256"


def create_access_token(
    subject: Union[str, Any], expires_delta: timedelta = None
) -> str:
    """
    Cria um token de acesso JWT.
    
    Args:
        subject: Identificador do usuário (geralmente o ID).
        expires_delta: Tempo de expiração do token.
        
    Returns:
        str: Token JWT codificado.
    """
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    
    # Constrói o payload do token
    to_encode = {"exp": expire, "sub": str(subject)}
    
    # Codifica o token usando a chave secreta
    encoded_jwt = jwt.encode(
        to_encode, settings.SECRET_KEY, algorithm=ALGORITHM
    )
    return encoded_jwt


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifica se uma senha em texto plano corresponde ao hash armazenado.
    
    Args:
        plain_password: Senha em texto plano.
        hashed_password: Hash da senha armazenada.
        
    Returns:
        bool: True se a senha corresponder ao hash, False caso contrário.
    """
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """
    Gera um hash para uma senha em texto plano.
    
    Args:
        password: Senha em texto plano.
        
    Returns:
        str: Hash da senha.
    """
    return pwd_context.hash(password) 