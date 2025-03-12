#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
CRUD Base
Este módulo fornece classes e funções base para operações CRUD.
"""

from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union

from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.db.base import Base

# Define tipos genéricos para modelos e schemas
ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    """
    Classe base para operações CRUD.
    
    Implementa operações create, read, update e delete genéricas.
    """

    def __init__(self, model: Type[ModelType]):
        """
        Inicializa a classe CRUD base.
        
        Args:
            model: Modelo SQLAlchemy a ser gerenciado.
        """
        self.model = model

    def get(self, db: Session, id: Any) -> Optional[ModelType]:
        """
        Obtém um registro pelo ID.
        
        Args:
            db: Sessão do banco de dados.
            id: ID do registro.
            
        Returns:
            Optional[ModelType]: O registro encontrado ou None.
        """
        return db.query(self.model).filter(self.model.id == id).first()

    def get_multi(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> List[ModelType]:
        """
        Obtém múltiplos registros com paginação.
        
        Args:
            db: Sessão do banco de dados.
            skip: Número de registros para pular.
            limit: Número máximo de registros para retornar.
            
        Returns:
            List[ModelType]: Lista de registros.
        """
        return db.query(self.model).offset(skip).limit(limit).all()

    def create(self, db: Session, *, obj_in: CreateSchemaType) -> ModelType:
        """
        Cria um novo registro.
        
        Args:
            db: Sessão do banco de dados.
            obj_in: Dados para criação do registro.
            
        Returns:
            ModelType: O registro criado.
        """
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data)  # type: ignore
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: ModelType,
        obj_in: Union[UpdateSchemaType, Dict[str, Any]]
    ) -> ModelType:
        """
        Atualiza um registro existente.
        
        Args:
            db: Sessão do banco de dados.
            db_obj: Objeto existente no banco de dados.
            obj_in: Dados para atualização do registro.
            
        Returns:
            ModelType: O registro atualizado.
        """
        obj_data = jsonable_encoder(db_obj)
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        
        for field in obj_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])
        
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Session, *, id: int) -> ModelType:
        """
        Remove um registro pelo ID.
        
        Args:
            db: Sessão do banco de dados.
            id: ID do registro.
            
        Returns:
            ModelType: O registro removido.
        """
        obj = db.query(self.model).get(id)
        db.delete(obj)
        db.commit()
        return obj 