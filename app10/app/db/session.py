#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Funções para gerenciar as sessões do banco de dados
"""

from typing import Generator

from app.db.base import SessionLocal


def get_db() -> Generator:
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