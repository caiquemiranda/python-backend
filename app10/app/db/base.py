#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Configuração do Banco de Dados
Este módulo configura a conexão com o banco de dados SQLite usando SQLAlchemy.
"""

from typing import Any

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import as_declarative, declared_attr
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

# Cria o engine do SQLAlchemy
engine = create_engine(
    settings.SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False}
)

# Cria uma fábrica de sessões para interagir com o banco de dados
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@as_declarative()
class Base:
    """Classe base para todos os modelos SQLAlchemy."""
    id: Any
    __name__: str
    
    # Gera automaticamente o nome da tabela baseado no nome da classe
    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower() 