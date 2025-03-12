#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Modelo de Item
Este módulo define o modelo de dados para itens usando SQLAlchemy ORM.
"""

from sqlalchemy import Column, ForeignKey, Integer, String, Text, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base import Base


class Item(Base):
    """Modelo SQLAlchemy para representar um item."""
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), index=True, nullable=False)
    description = Column(Text, nullable=True)
    owner_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relacionamento com o usuário (owner)
    owner = relationship("User", back_populates="items") 