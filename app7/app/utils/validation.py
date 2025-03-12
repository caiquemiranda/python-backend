#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Utilitários de Validação
Este módulo contém funções para validação de dados da API.
"""


def validate_product(data):
    """
    Valida os dados de um produto.
    
    Args:
        data (dict): Dados do produto a validar.
        
    Returns:
        tuple: (bool, str) - (válido, mensagem de erro)
    """
    # Verifica se o nome foi fornecido
    if not data.get('name'):
        return False, "O campo 'name' é obrigatório."
    
    # Verifica se o preço foi fornecido e é válido
    price = data.get('price')
    if price is None:
        return False, "O campo 'price' é obrigatório."
    
    try:
        price_value = float(price)
        if price_value < 0:
            return False, "O preço deve ser um valor positivo."
    except (ValueError, TypeError):
        return False, "O preço deve ser um valor numérico."
    
    # Verifica se estoque é booleano quando fornecido
    in_stock = data.get('in_stock')
    if in_stock is not None and not isinstance(in_stock, bool):
        return False, "O campo 'in_stock' deve ser um valor booleano."
    
    return True, ""


def validate_category(data):
    """
    Valida os dados de uma categoria.
    
    Args:
        data (dict): Dados da categoria a validar.
        
    Returns:
        tuple: (bool, str) - (válido, mensagem de erro)
    """
    # Verifica se o nome foi fornecido
    if not data.get('name'):
        return False, "O campo 'name' é obrigatório."
    
    return True, "" 