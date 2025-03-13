#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Inicialização da Aplicação Flask
Este módulo inicializa a aplicação Flask e configura os Blueprints.
"""

from flask import Flask
from flask_cors import CORS

from app.config.config import get_config


def create_app():
    """
    Cria e configura a aplicação Flask.
    
    Returns:
        Flask: A aplicação Flask configurada.
    """
    app = Flask(__name__)
    
    # Carrega configurações
    config = get_config()
    app.config.from_object(config)
    
    # Configuração do CORS
    CORS(app)
    
    # Registra os Blueprints
    from app.api.v1.products import products_blueprint
    from app.api.v1.categories import categories_blueprint
    from app.api.v1.healthcheck import healthcheck_blueprint
    
    app.register_blueprint(products_blueprint, url_prefix='/api/v1/products')
    app.register_blueprint(categories_blueprint, url_prefix='/api/v1/categories')
    app.register_blueprint(healthcheck_blueprint, url_prefix='/api/v1/health')
    
    # Registra handler para tratamento de erros 404
    @app.errorhandler(404)
    def not_found(error):
        """Handler para erros 404."""
        return {'error': 'Recurso não encontrado'}, 404
    
    # Registra handler para tratamento de erros 500
    @app.errorhandler(500)
    def server_error(error):
        """Handler para erros 500."""
        return {'error': 'Erro interno do servidor'}, 500
    
    return app 