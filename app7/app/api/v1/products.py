#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Blueprint para Produtos
Este módulo contém as rotas para gerenciamento de produtos.
"""

from flask import Blueprint, request

from app.models.repository import product_repository
from app.utils.validation import validate_product
from app.utils.responses import (
    success_response, 
    error_response, 
    not_found_response, 
    validation_error_response
)

# Cria o blueprint para produtos
products_blueprint = Blueprint('products', __name__)


@products_blueprint.route('/', methods=['GET'])
def get_products():
    """
    Retorna a lista de produtos.
    
    Query params:
        category (str): Filtra produtos por categoria.
        in_stock (bool): Filtra produtos por disponibilidade em estoque.
    
    Returns:
        dict: Lista de produtos.
    """
    # Verifica se há parâmetros de filtro
    category = request.args.get('category')
    in_stock = request.args.get('in_stock')
    
    # Aplica filtros se fornecidos
    products = []
    
    if category:
        products = product_repository.get_by_category(category)
    elif in_stock is not None:
        # Converte string para booleano
        is_in_stock = in_stock.lower() == 'true'
        if is_in_stock:
            products = product_repository.get_in_stock()
        else:
            # Se in_stock=false, retorna produtos fora de estoque
            all_products = product_repository.get_all()
            products = [p for p in all_products if not p.in_stock]
    else:
        # Sem filtros, retorna todos os produtos
        products = product_repository.get_all()
    
    # Converte lista de produtos para dicionário
    products_dict = [product.to_dict() for product in products]
    
    return success_response(products_dict)


@products_blueprint.route('/<product_id>', methods=['GET'])
def get_product(product_id):
    """
    Retorna um produto pelo ID.
    
    Args:
        product_id (str): ID do produto.
    
    Returns:
        dict: Produto encontrado ou mensagem de erro.
    """
    product = product_repository.get_by_id(product_id)
    
    if not product:
        return not_found_response('Produto')
    
    return success_response(product.to_dict())


@products_blueprint.route('/', methods=['POST'])
def create_product():
    """
    Cria um novo produto.
    
    Request body:
        name (str): Nome do produto.
        price (float): Preço do produto.
        description (str, optional): Descrição do produto.
        category (str, optional): Categoria do produto.
        in_stock (bool, optional): Se o produto está em estoque.
    
    Returns:
        dict: Produto criado ou mensagem de erro.
    """
    data = request.get_json()
    
    if not data:
        return error_response('Dados inválidos. Esperado JSON.', 400)
    
    # Valida os dados do produto
    is_valid, error_message = validate_product(data)
    if not is_valid:
        return validation_error_response(error_message)
    
    # Cria o produto
    product = product_repository.create(data)
    
    return success_response(product.to_dict(), 201)


@products_blueprint.route('/<product_id>', methods=['PUT'])
def update_product(product_id):
    """
    Atualiza um produto existente.
    
    Args:
        product_id (str): ID do produto.
    
    Request body:
        name (str, optional): Nome do produto.
        price (float, optional): Preço do produto.
        description (str, optional): Descrição do produto.
        category (str, optional): Categoria do produto.
        in_stock (bool, optional): Se o produto está em estoque.
    
    Returns:
        dict: Produto atualizado ou mensagem de erro.
    """
    data = request.get_json()
    
    if not data:
        return error_response('Dados inválidos. Esperado JSON.', 400)
    
    # Verifica se o produto existe
    product = product_repository.get_by_id(product_id)
    if not product:
        return not_found_response('Produto')
    
    # Se o preço for fornecido, valida
    price = data.get('price')
    if price is not None:
        try:
            price_value = float(price)
            if price_value < 0:
                return validation_error_response("O preço deve ser um valor positivo.")
            data['price'] = price_value
        except (ValueError, TypeError):
            return validation_error_response("O preço deve ser um valor numérico.")
    
    # Atualiza o produto
    updated_product = product_repository.update(product_id, data)
    
    return success_response(updated_product.to_dict())


@products_blueprint.route('/<product_id>', methods=['DELETE'])
def delete_product(product_id):
    """
    Remove um produto pelo ID.
    
    Args:
        product_id (str): ID do produto.
    
    Returns:
        dict: Mensagem de sucesso ou erro.
    """
    # Verifica se o produto existe
    product = product_repository.get_by_id(product_id)
    if not product:
        return not_found_response('Produto')
    
    # Remove o produto
    success = product_repository.delete(product_id)
    
    if success:
        return success_response({'message': 'Produto removido com sucesso'})
    else:
        return error_response('Erro ao remover produto', 500) 