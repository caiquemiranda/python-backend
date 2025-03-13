import os
from datetime import timedelta


class Config:
    """Configuração base."""

    SECRET_KEY = os.environ.get('SECRET_KEY', 'chave-secreta-padrao-mudar-em-producao')
    
    DATABASE_URI = os.environ.get('DATABASE_URI', 'sqlite:///app.db')
    
    API_TITLE = 'API de Produtos'
    API_VERSION = 'v1'
    API_PREFIX = '/api/v1'
    
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', SECRET_KEY)
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)
    
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
    
    SECRET_KEY = os.environ.get('SECRET_KEY')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI')


config_by_name = {
    'development': DevelopmentConfig,
    'testing': TestingConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}

def get_config():
    """Retorna a configuração apropriada com base no ambiente."""

    env = os.environ.get('FLASK_ENV', 'development')
    return config_by_name.get(env, config_by_name['default'])
