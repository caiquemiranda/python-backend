#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Configuração da API v1
Este módulo configura o roteador principal da API v1 e inclui todos os endpoints.
"""

from fastapi import APIRouter

from app.api.v1.endpoints import items, login, users

# Cria o roteador principal da API v1
api_router = APIRouter()

# Inclui os routers de cada grupo de endpoints
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(items.router, prefix="/items", tags=["items"]) 