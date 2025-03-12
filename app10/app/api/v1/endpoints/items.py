#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Endpoints para itens
Este módulo define as rotas para operações com itens.
"""

from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()


@router.get("/", response_model=List[schemas.Item])
def read_items(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    """
    Obtém múltiplos itens.
    
    Se o usuário é um superusuário, retorna todos os itens.
    Caso contrário, retorna apenas os itens do usuário atual.
    
    Args:
        db: Sessão do banco de dados.
        skip: Número de itens para pular.
        limit: Número máximo de itens para retornar.
        current_user: Usuário atual.
        
    Returns:
        List[Item]: Lista de itens.
    """
    if current_user.is_superuser:
        items = crud.item.get_multi(db, skip=skip, limit=limit)
    else:
        items = crud.item.get_multi_by_owner(
            db=db, owner_id=current_user.id, skip=skip, limit=limit
        )
    return items


@router.post("/", response_model=schemas.Item, status_code=status.HTTP_201_CREATED)
def create_item(
    *,
    db: Session = Depends(deps.get_db),
    item_in: schemas.ItemCreate,
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    """
    Cria um novo item.
    
    Args:
        db: Sessão do banco de dados.
        item_in: Dados para criação do item.
        current_user: Usuário atual.
        
    Returns:
        Item: Item criado.
    """
    item = crud.item.create_with_owner(
        db=db, obj_in=item_in, owner_id=current_user.id
    )
    return item


@router.get("/{item_id}", response_model=schemas.Item)
def read_item(
    *,
    db: Session = Depends(deps.get_db),
    item_id: int,
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    """
    Obtém um item pelo ID.
    
    Args:
        db: Sessão do banco de dados.
        item_id: ID do item.
        current_user: Usuário atual.
        
    Returns:
        Item: Dados do item.
        
    Raises:
        HTTPException: Se o item não for encontrado ou não pertencer ao usuário.
    """
    item = crud.item.get(db=db, id=item_id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item não encontrado",
        )
    if not current_user.is_superuser and (item.owner_id != current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Acesso não permitido"
        )
    return item


@router.put("/{item_id}", response_model=schemas.Item)
def update_item(
    *,
    db: Session = Depends(deps.get_db),
    item_id: int,
    item_in: schemas.ItemUpdate,
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    """
    Atualiza um item.
    
    Args:
        db: Sessão do banco de dados.
        item_id: ID do item a ser atualizado.
        item_in: Dados para atualização do item.
        current_user: Usuário atual.
        
    Returns:
        Item: Item atualizado.
        
    Raises:
        HTTPException: Se o item não for encontrado ou não pertencer ao usuário.
    """
    item = crud.item.get(db=db, id=item_id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item não encontrado",
        )
    if not current_user.is_superuser and (item.owner_id != current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Acesso não permitido"
        )
    item = crud.item.update(db=db, db_obj=item, obj_in=item_in)
    return item


@router.delete("/{item_id}", response_model=schemas.Item)
def delete_item(
    *,
    db: Session = Depends(deps.get_db),
    item_id: int,
    current_user: models.User = Depends(deps.get_current_user),
) -> Any:
    """
    Remove um item.
    
    Args:
        db: Sessão do banco de dados.
        item_id: ID do item a ser removido.
        current_user: Usuário atual.
        
    Returns:
        Item: Item removido.
        
    Raises:
        HTTPException: Se o item não for encontrado ou não pertencer ao usuário.
    """
    item = crud.item.get(db=db, id=item_id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item não encontrado",
        )
    if not current_user.is_superuser and (item.owner_id != current_user.id):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, 
            detail="Acesso não permitido"
        )
    item = crud.item.remove(db=db, id=item_id)
    return item 