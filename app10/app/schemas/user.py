#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Schemas para Usuários
Este módulo define os schemas Pydantic para validação e serialização de usuários.
"""

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, EmailStr, Field


# Propriedades compartilhadas
class UserBase(BaseModel):
    """Schema base para usuários."""
    email: Optional[EmailStr] = None
    is_active: Optional[bool] = True
    is_superuser: bool = False
    full_name: Optional[str] = None


# Propriedades para criação de usuário
class UserCreate(UserBase):
    """Schema para criar um novo usuário."""
    email: EmailStr
    password: str = Field(..., min_length=8)


# Propriedades para atualização de usuário
class UserUpdate(UserBase):
    """Schema para atualizar um usuário existente."""
    password: Optional[str] = Field(None, min_length=8)


# Propriedades para usuário armazenado no banco de dados
class UserInDBBase(UserBase):
    """Schema base para usuário armazenado no banco de dados."""
    id: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        """Configuração para o Pydantic ler dados do ORM."""
        orm_mode = True


# Propriedades para retorno ao cliente
class User(UserInDBBase):
    """Schema para representação pública de um usuário."""
    pass


# Propriedades adicionais armazenadas no banco de dados
class UserInDB(UserInDBBase):
    """Schema para usuário armazenado no banco de dados com senha hasheada."""
    hashed_password: str 