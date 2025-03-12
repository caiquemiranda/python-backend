#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Utilidades para Respostas da API
Este módulo contém funções para padronizar as respostas da API.
"""

from flask import jsonify


def success_response(data, status_code=200):
    """
    Cria uma resposta de sucesso.
    
    Args:
        data: Dados a incluir na resposta.
        status_code (int): Código de status HTTP.
        
    Returns:
        tuple: (response, status_code)
    """
    response = {
        'status': 'success',
        'data': data
    }
    return jsonify(response), status_code


def error_response(message, status_code=400):
    """
    Cria uma resposta de erro.
    
    Args:
        message (str): Mensagem de erro.
        status_code (int): Código de status HTTP.
        
    Returns:
        tuple: (response, status_code)
    """
    response = {
        'status': 'error',
        'message': message
    }
    return jsonify(response), status_code


def not_found_response(resource='Recurso'):
    """
    Cria uma resposta para recurso não encontrado.
    
    Args:
        resource (str): Nome do recurso não encontrado.
        
    Returns:
        tuple: (response, status_code)
    """
    return error_response(f"{resource} não encontrado", 404)


def validation_error_response(message):
    """
    Cria uma resposta para erro de validação.
    
    Args:
        message (str): Mensagem de erro de validação.
        
    Returns:
        tuple: (response, status_code)
    """
    return error_response(message, 422) 