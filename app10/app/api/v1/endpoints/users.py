#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Endpoints para usuários
Este módulo define as rotas para operações com usuários.
"""

from typing import Any, List

from fastapi import APIRouter, Body, Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder
from pydantic import EmailStr
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps
from app.core.config import settings

router = APIRouter()


@router.get("/", response_model=List[schemas.User])
def read_users(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Obtém múltiplos usuários com paginação.
    
    Args:
        db: Sessão do banco de dados.
        skip: Número de usuários para pular.
        limit: Número máximo de usuários para retornar.
        current_user: Usuário atual (superusuário).
        
    Returns:
        List[User]: Lista de usuários.
    """
    users = crud.user.get_multi(db, skip=skip, limit=limit)
    return users


@router.post("/", response_model=schemas.User, status_code=status.HTTP_201_CREATED)
def create_user(
    *,
    db: Session = Depends(deps.get_db),
    user_in: schemas.UserCreate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Cria um novo usuário.
    
    Args:
        db: Sessão do banco de dados.
        user_in: Dados para criação do usuário.
        current_user: Usuário atual (superusuário).
        
    Returns:
        User: Usuário criado.
        
    Raises:
        HTTPException: Se o email já estiver em uso.
    """
    user = crud.user.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Um usuário com este email já existe no sistema.",
        )
    user = crud.user.create(db, obj_in=user_in)
    return user


@router.get("/me", response_model=schemas.User)
def read_user_me(
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    """
    Obtém o usuário logado.
    
    Args:
        current_user: Usuário atual.
        
    Returns:
        User: Dados do usuário logado.
    """
    return current_user


@router.put("/me", response_model=schemas.User)
def update_user_me(
    *,
    db: Session = Depends(deps.get_db),
    password: str = Body(None),
    full_name: str = Body(None),
    email: EmailStr = Body(None),
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    """
    Atualiza os próprios dados do usuário.
    
    Args:
        db: Sessão do banco de dados.
        password: Nova senha.
        full_name: Novo nome completo.
        email: Novo email.
        current_user: Usuário atual.
        
    Returns:
        User: Usuário atualizado.
    """
    current_user_data = jsonable_encoder(current_user)
    user_in = schemas.UserUpdate(**current_user_data)
    
    if password is not None:
        user_in.password = password
    if full_name is not None:
        user_in.full_name = full_name
    if email is not None:
        user_in.email = email
    
    user = crud.user.update(db, db_obj=current_user, obj_in=user_in)
    return user


@router.get("/{user_id}", response_model=schemas.User)
def read_user(
    user_id: int,
    current_user: models.User = Depends(deps.get_current_active_superuser),
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Obtém um usuário pelo ID.
    
    Args:
        user_id: ID do usuário.
        current_user: Usuário atual (superusuário).
        db: Sessão do banco de dados.
        
    Returns:
        User: Dados do usuário.
        
    Raises:
        HTTPException: Se o usuário não for encontrado.
    """
    user = crud.user.get(db, id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado",
        )
    return user


@router.put("/{user_id}", response_model=schemas.User)
def update_user(
    *,
    db: Session = Depends(deps.get_db),
    user_id: int,
    user_in: schemas.UserUpdate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Atualiza um usuário.
    
    Args:
        db: Sessão do banco de dados.
        user_id: ID do usuário a ser atualizado.
        user_in: Dados para atualização do usuário.
        current_user: Usuário atual (superusuário).
        
    Returns:
        User: Usuário atualizado.
        
    Raises:
        HTTPException: Se o usuário não for encontrado.
    """
    user = crud.user.get(db, id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado",
        )
    user = crud.user.update(db, db_obj=user, obj_in=user_in)
    return user


@router.delete("/{user_id}", response_model=schemas.User)
def delete_user(
    *,
    db: Session = Depends(deps.get_db),
    user_id: int,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Remove um usuário.
    
    Args:
        db: Sessão do banco de dados.
        user_id: ID do usuário a ser removido.
        current_user: Usuário atual (superusuário).
        
    Returns:
        User: Usuário removido.
        
    Raises:
        HTTPException: Se o usuário não for encontrado.
    """
    user = crud.user.get(db, id=user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado",
        )
    user = crud.user.remove(db, id=user_id)
    return user 