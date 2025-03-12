#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Configurações da aplicação
Este módulo gerencia as configurações da aplicação usando Pydantic Settings.
"""

import os
import secrets
from typing import Any, Dict, List, Optional, Union

from pydantic import AnyHttpUrl, BaseSettings, PostgresDsn, validator


class Settings(BaseSettings):
    """Configurações da aplicação usando Pydantic Settings."""
    
    # API
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 dias
    
    # CORS
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []
    
    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        """Validador para BACKEND_CORS_ORIGINS."""
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)
    
    # Banco de dados
    SQLALCHEMY_DATABASE_URL: str = "sqlite:///./app10.db"
    
    # Usuário admin padrão
    FIRST_SUPERUSER: str = "admin@example.com"
    FIRST_SUPERUSER_PASSWORD: str = "admin"
    
    class Config:
        """Configurações do Pydantic."""
        case_sensitive = True
        env_file = ".env"


# Instância das configurações
settings = Settings() 