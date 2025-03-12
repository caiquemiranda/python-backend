#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Dependências da API
Este módulo fornece funções de dependência para a API FastAPI.
"""

from typing import Generator

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app import models, schemas
from app.core import security
from app.core.config import settings
from app.db.session import get_db

# OAuth2 para autenticação com senha
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/login/access-token"
)


def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
) -> models.User:
    """
    Valida o token de acesso e retorna o usuário atual.
    
    Args:
        db: Sessão do banco de dados.
        token: Token JWT de autenticação.
    
    Returns:
        models.User: Usuário autenticado.
        
    Raises:
        HTTPException: Se o token for inválido ou o usuário não existir.
    """
    try:
        # Decodifica o token JWT
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[security.ALGORITHM]
        )
        token_data = schemas.TokenPayload(**payload)
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Não foi possível validar as credenciais",
        )
    
    # Busca o usuário no banco de dados
    user = db.query(models.User).filter(models.User.id == token_data.sub).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado",
        )
    
    # Verifica se o usuário está ativo
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Usuário inativo",
        )
    
    return user


def get_current_active_superuser(
    current_user: models.User = Depends(get_current_user),
) -> models.User:
    """
    Verifica se o usuário atual é um superusuário ativo.
    
    Args:
        current_user: Usuário atual autenticado.
    
    Returns:
        models.User: Superusuário autenticado.
        
    Raises:
        HTTPException: Se o usuário não for um superusuário.
    """
    if not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="O usuário não tem privilégios suficientes",
        )
    
    return current_user 