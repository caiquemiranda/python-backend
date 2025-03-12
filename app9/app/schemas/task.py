#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Schemas para Tarefas
Este módulo define os schemas Pydantic para validação e serialização de tarefas.
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, validator


class TaskBase(BaseModel):
    """Schema base para tarefas."""
    title: str = Field(..., min_length=1, max_length=100, description="Título da tarefa")
    description: Optional[str] = Field(None, description="Descrição detalhada da tarefa")
    priority: int = Field(1, ge=1, le=3, description="Prioridade da tarefa (1=Baixa, 2=Média, 3=Alta)")


class TaskCreate(TaskBase):
    """Schema para criar uma nova tarefa."""
    pass


class TaskUpdate(BaseModel):
    """Schema para atualizar uma tarefa existente."""
    title: Optional[str] = Field(None, min_length=1, max_length=100, description="Título da tarefa")
    description: Optional[str] = Field(None, description="Descrição detalhada da tarefa")
    completed: Optional[bool] = Field(None, description="Status de conclusão da tarefa")
    priority: Optional[int] = Field(None, ge=1, le=3, description="Prioridade da tarefa (1=Baixa, 2=Média, 3=Alta)")


class TaskInDB(TaskBase):
    """Schema para tarefa armazenada no banco de dados."""
    id: int
    completed: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        """Configuração para o Pydantic ler dados do ORM."""
        orm_mode = True


class Task(TaskInDB):
    """Schema para representação pública de uma tarefa."""
    pass


class PriorityEnum:
    LOW = 1
    MEDIUM = 2
    HIGH = 3 