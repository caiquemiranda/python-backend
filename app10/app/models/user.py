#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Modelo de Usuário
Este módulo define o modelo de dados para usuários usando SQLAlchemy ORM.
"""

from sqlalchemy import Boolean, Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base import Base


class User(Base):
    """Modelo SQLAlchemy para representar um usuário."""
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, index=True)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relacionamento com os itens
    items = relationship("Item", back_populates="owner", cascade="all, delete-orphan") 