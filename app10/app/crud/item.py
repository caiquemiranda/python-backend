#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
CRUD para Itens
Este módulo fornece funções CRUD específicas para o modelo Item.
"""

from typing import List, Optional

from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.item import Item
from app.schemas.item import ItemCreate, ItemUpdate


class CRUDItem(CRUDBase[Item, ItemCreate, ItemUpdate]):
    """
    Classe CRUD para itens, estende a classe CRUDBase.
    """
    
    def create_with_owner(
        self, db: Session, *, obj_in: ItemCreate, owner_id: int
    ) -> Item:
        """
        Cria um novo item associado a um dono (usuário).
        
        Args:
            db: Sessão do banco de dados.
            obj_in: Dados para criação do item.
            owner_id: ID do dono (usuário) do item.
            
        Returns:
            Item: Item criado.
        """
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data, owner_id=owner_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi_by_owner(
        self, db: Session, *, owner_id: int, skip: int = 0, limit: int = 100
    ) -> List[Item]:
        """
        Obtém múltiplos itens por dono (usuário) com paginação.
        
        Args:
            db: Sessão do banco de dados.
            owner_id: ID do dono (usuário) dos itens.
            skip: Número de registros para pular.
            limit: Número máximo de registros para retornar.
            
        Returns:
            List[Item]: Lista de itens do dono.
        """
        return (
            db.query(self.model)
            .filter(Item.owner_id == owner_id)
            .offset(skip)
            .limit(limit)
            .all()
        )


# Instância para exportação
item = CRUDItem(Item) 