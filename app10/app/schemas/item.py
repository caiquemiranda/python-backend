#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Schemas para Itens
Este módulo define os schemas Pydantic para validação e serialização de itens.
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


# Propriedades compartilhadas
class ItemBase(BaseModel):
    """Schema base para itens."""
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    description: Optional[str] = None


# Propriedades para criação de item
class ItemCreate(ItemBase):
    """Schema para criar um novo item."""
    title: str = Field(..., min_length=1, max_length=100)


# Propriedades para atualização de item
class ItemUpdate(ItemBase):
    """Schema para atualizar um item existente."""
    pass


# Propriedades para item armazenado no banco de dados
class ItemInDBBase(ItemBase):
    """Schema base para item armazenado no banco de dados."""
    id: int
    title: str
    owner_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        """Configuração para o Pydantic ler dados do ORM."""
        orm_mode = True


# Propriedades para retorno ao cliente
class Item(ItemInDBBase):
    """Schema para representação pública de um item."""
    pass


# Propriedades adicionais armazenadas no banco de dados
class ItemInDB(ItemInDBBase):
    """Schema para item armazenado no banco de dados."""
    pass 