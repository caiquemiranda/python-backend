#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Modelo de Tarefa
Este módulo define o modelo de dados para tarefas usando SQLAlchemy ORM.
"""

from sqlalchemy import Boolean, Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

from app.database.database import Base


class Task(Base):
    """Modelo SQLAlchemy para representar uma tarefa."""
    
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False, index=True)
    description = Column(Text, nullable=True)
    completed = Column(Boolean, default=False)
    priority = Column(Integer, default=1)  # 1=Baixa, 2=Média, 3=Alta
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now()) 