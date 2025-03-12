#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Endpoints para autenticação
Este módulo define as rotas para autenticação de usuários.
"""

from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app import crud, schemas
from app.api import deps
from app.core import security
from app.core.config import settings

router = APIRouter()


@router.post("/login/access-token", response_model=schemas.Token)
def login_access_token(
    db: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    Obtém um token de acesso OAuth2 JWT.
    
    Args:
        db: Sessão do banco de dados.
        form_data: Dados do formulário de autenticação.
        
    Returns:
        Token: Token JWT para autenticação.
        
    Raises:
        HTTPException: Se as credenciais forem inválidas.
    """
    user = crud.user.authenticate(
        db, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Usuário inativo"
        )
    
    # Cria o token JWT
    access_token_expires = timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )
    return {
        "access_token": security.create_access_token(
            user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }


@router.post("/login/test-token", response_model=schemas.User)
def test_token(current_user: schemas.User = Depends(deps.get_current_user)) -> Any:
    """
    Testa se o token de acesso é válido.
    
    Args:
        current_user: Usuário autenticado.
        
    Returns:
        User: Dados do usuário autenticado.
    """
    return current_user 