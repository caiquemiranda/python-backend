#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Blueprint para Healthcheck
Este módulo contém as rotas para verificação de saúde da API.
"""

from flask import Blueprint, jsonify
import datetime

# Cria o blueprint para healthcheck
healthcheck_blueprint = Blueprint('healthcheck', __name__)


@healthcheck_blueprint.route('/', methods=['GET'])
def health_check():
    """
    Verifica a saúde da API.
    
    Returns:
        dict: Informações sobre o status da API.
    """
    return jsonify({
        'status': 'online',
        'service': 'Product API',
        'version': 'v1',
        'timestamp': datetime.datetime.now().isoformat()
    }) 