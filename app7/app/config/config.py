#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Configurações do aplicativo Flask
Este módulo contém as configurações para diferentes ambientes.
"""

import os
from datetime import timedelta


class Config:
    """Configuração base."""
    # Chave secreta para proteger sessões, tokens, etc.
    SECRET_KEY = os.environ.get('SECRET_KEY', 'chave-secreta-padrao-mudar-em-producao')
    
    # Configurações do banco de dados
    DATABASE_URI = os.environ.get('DATABASE_URI', 'sqlite:///app.db')
    
    # Configurações da API
    API_TITLE = 'API de Produtos'
    API_VERSION = 'v1'
    API_PREFIX = '/api/v1'
    
    # Configurações do JWT
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', SECRET_KEY)
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)
    
    # Log nível DEBUG por padrão
    LOG_LEVEL = 'DEBUG'


class DevelopmentConfig(Config):
    """Configuração para ambiente de desenvolvimento."""
    DEBUG = True
    TESTING = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI', 'sqlite:///dev.db')


class TestingConfig(Config):
    """Configuração para ambiente de testes."""
    DEBUG = False
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'


class ProductionConfig(Config):
    """Configuração para ambiente de produção."""
    DEBUG = False
    TESTING = False
    LOG_LEVEL = 'INFO'
    
    # Em produção, as chaves secretas DEVEM ser definidas via variáveis de ambiente
    SECRET_KEY = os.environ.get('SECRET_KEY')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI')


# Mapeamento de configurações por ambiente
config_by_name = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}

# Configuração padrão é 'development'
def get_config():
    """Retorna a configuração apropriada com base no ambiente."""
    env = os.environ.get('FLASK_ENV', 'development')
    return config_by_name.get(env, config_by_name['default']) 