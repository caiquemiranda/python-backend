#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Configuração do Banco de Dados
Este módulo configura a conexão com o banco de dados SQLite usando SQLAlchemy.
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# URL de conexão com o banco de dados SQLite
# O SQLite é armazenado como um arquivo no sistema de arquivos
SQLALCHEMY_DATABASE_URL = "sqlite:///./tasks.db"

# Cria o engine do SQLAlchemy
# connect_args é específico para SQLite e evita problemas com threads
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Cria uma fábrica de sessões para interagir com o banco de dados
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Cria uma classe base para os modelos declarativos
Base = declarative_base() 