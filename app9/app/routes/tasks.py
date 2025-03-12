#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Rotas para Tarefas
Este módulo define as rotas da API para operações CRUD em tarefas.
"""

from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, Path
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.task import Task as TaskModel
from app.schemas.task import Task, TaskCreate, TaskUpdate, PriorityEnum

# Cria um router para as rotas de tarefas
router = APIRouter(
    prefix="/tasks",
    tags=["tasks"],
    responses={404: {"description": "Tarefa não encontrada"}},
)

# Dependency para obter a sessão do banco de dados
def get_db():
    """
    Dependency para obter uma sessão do banco de dados.
    
    Yields:
        Session: Sessão do banco de dados.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=List[Task])
async def read_tasks(
    skip: int = Query(0, ge=0, description="Número de tarefas para pular"),
    limit: int = Query(100, ge=1, le=100, description="Número máximo de tarefas para retornar"),
    completed: Optional[bool] = Query(None, description="Filtrar por status de conclusão"),
    priority: Optional[int] = Query(None, ge=1, le=3, description="Filtrar por prioridade"),
    db: Session = Depends(get_db)
):
    """
    Recupera uma lista de tarefas com opções de filtragem e paginação.
    
    Args:
        skip: Número de tarefas para pular (para paginação).
        limit: Número máximo de tarefas para retornar.
        completed: Filtrar por status de conclusão (opcional).
        priority: Filtrar por nível de prioridade (opcional).
        db: Sessão do banco de dados.
        
    Returns:
        List[Task]: Lista de tarefas.
    """
    query = db.query(TaskModel)
    
    # Aplica filtros se fornecidos
    if completed is not None:
        query = query.filter(TaskModel.completed == completed)
    
    if priority is not None:
        query = query.filter(TaskModel.priority == priority)
    
    # Ordena por prioridade (decrescente) e depois por data de criação (decrescente)
    query = query.order_by(TaskModel.priority.desc(), TaskModel.created_at.desc())
    
    # Aplica paginação
    tasks = query.offset(skip).limit(limit).all()
    
    return tasks


@router.get("/{task_id}", response_model=Task)
async def read_task(
    task_id: int = Path(..., ge=1, description="ID da tarefa para recuperar"),
    db: Session = Depends(get_db)
):
    """
    Recupera uma tarefa específica pelo ID.
    
    Args:
        task_id: ID da tarefa.
        db: Sessão do banco de dados.
        
    Returns:
        Task: A tarefa encontrada.
        
    Raises:
        HTTPException: Se a tarefa não for encontrada.
    """
    task = db.query(TaskModel).filter(TaskModel.id == task_id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    return task


@router.post("/", response_model=Task, status_code=201)
async def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db)
):
    """
    Cria uma nova tarefa.
    
    Args:
        task: Dados da tarefa a ser criada.
        db: Sessão do banco de dados.
        
    Returns:
        Task: A tarefa criada.
    """
    db_task = TaskModel(
        title=task.title,
        description=task.description,
        priority=task.priority
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


@router.put("/{task_id}", response_model=Task)
async def update_task(
    task_id: int = Path(..., ge=1, description="ID da tarefa para atualizar"),
    task_update: TaskUpdate = None,
    db: Session = Depends(get_db)
):
    """
    Atualiza uma tarefa existente.
    
    Args:
        task_id: ID da tarefa a ser atualizada.
        task_update: Dados para atualização da tarefa.
        db: Sessão do banco de dados.
        
    Returns:
        Task: A tarefa atualizada.
        
    Raises:
        HTTPException: Se a tarefa não for encontrada.
    """
    db_task = db.query(TaskModel).filter(TaskModel.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    
    # Atualiza apenas os campos que foram fornecidos
    task_data = task_update.dict(exclude_unset=True)
    for field, value in task_data.items():
        setattr(db_task, field, value)
    
    db.commit()
    db.refresh(db_task)
    return db_task


@router.delete("/{task_id}", status_code=204)
async def delete_task(
    task_id: int = Path(..., ge=1, description="ID da tarefa para excluir"),
    db: Session = Depends(get_db)
):
    """
    Remove uma tarefa.
    
    Args:
        task_id: ID da tarefa a ser removida.
        db: Sessão do banco de dados.
        
    Raises:
        HTTPException: Se a tarefa não for encontrada.
    """
    db_task = db.query(TaskModel).filter(TaskModel.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    
    db.delete(db_task)
    db.commit()
    return None


@router.patch("/{task_id}/complete", response_model=Task)
async def complete_task(
    task_id: int = Path(..., ge=1, description="ID da tarefa para marcar como concluída"),
    db: Session = Depends(get_db)
):
    """
    Marca uma tarefa como concluída.
    
    Args:
        task_id: ID da tarefa.
        db: Sessão do banco de dados.
        
    Returns:
        Task: A tarefa atualizada.
        
    Raises:
        HTTPException: Se a tarefa não for encontrada.
    """
    db_task = db.query(TaskModel).filter(TaskModel.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    
    db_task.completed = True
    db.commit()
    db.refresh(db_task)
    return db_task


@router.patch("/{task_id}/incomplete", response_model=Task)
async def incomplete_task(
    task_id: int = Path(..., ge=1, description="ID da tarefa para marcar como não concluída"),
    db: Session = Depends(get_db)
):
    """
    Marca uma tarefa como não concluída.
    
    Args:
        task_id: ID da tarefa.
        db: Sessão do banco de dados.
        
    Returns:
        Task: A tarefa atualizada.
        
    Raises:
        HTTPException: Se a tarefa não for encontrada.
    """
    db_task = db.query(TaskModel).filter(TaskModel.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada")
    
    db_task.completed = False
    db.commit()
    db.refresh(db_task)
    return db_task 