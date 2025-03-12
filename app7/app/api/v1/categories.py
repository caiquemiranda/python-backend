#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Blueprint para Categorias
Este módulo contém as rotas para gerenciamento de categorias de produtos.
"""

from flask import Blueprint, jsonify

from app.models.repository import product_repository

# Cria o blueprint para categorias
categories_blueprint = Blueprint('categories', __name__)


@categories_blueprint.route('/', methods=['GET'])
def get_categories():
    """
    Retorna a lista de categorias disponíveis.
    
    Returns:
        dict: Lista de categorias.
    """
    # Obtém todos os produtos
    products = product_repository.get_all()
    
    # Extrai categorias únicas
    categories = set()
    for product in products:
        if product.category:
            categories.add(product.category)
    
    # Converte para lista e ordena
    categories_list = sorted(list(categories))
    
    return jsonify({
        'status': 'success',
        'data': categories_list
    })


@categories_blueprint.route('/<category_name>/products', methods=['GET'])
def get_products_by_category(category_name):
    """
    Retorna a lista de produtos de uma categoria específica.
    
    Args:
        category_name (str): Nome da categoria.
    
    Returns:
        dict: Lista de produtos da categoria.
    """
    # Obtém produtos da categoria
    products = product_repository.get_by_category(category_name)
    
    # Converte para dicionário
    products_dict = [product.to_dict() for product in products]
    
    return jsonify({
        'status': 'success',
        'data': {
            'category': category_name,
            'products': products_dict,
            'count': len(products_dict)
        }
    }) 