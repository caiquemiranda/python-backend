#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Modelo de Produto
Este módulo define o modelo de dados para produtos.
"""

import uuid
from datetime import datetime


class Product:
    """Modelo para produtos."""

    def __init__(self, name, price, description=None, category=None, in_stock=True):
        """
        Inicializa um novo produto.
        
        Args:
            name (str): Nome do produto.
            price (float): Preço do produto.
            description (str, optional): Descrição do produto.
            category (str, optional): Categoria do produto.
            in_stock (bool, optional): Se o produto está em estoque. Padrão é True.
        """
        self.id = str(uuid.uuid4())
        self.name = name
        self.price = price
        self.description = description
        self.category = category
        self.in_stock = in_stock
        self.created_at = datetime.now()
        self.updated_at = self.created_at

    def update(self, **kwargs):
        """
        Atualiza os atributos do produto.
        
        Args:
            **kwargs: Pares chave-valor para atualizar.
        """
        for key, value in kwargs.items():
            if hasattr(self, key) and key not in ('id', 'created_at'):
                setattr(self, key, value)
        
        self.updated_at = datetime.now()

    def to_dict(self):
        """
        Converte o produto para um dicionário.
        
        Returns:
            dict: Representação em dicionário do produto.
        """
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'description': self.description,
            'category': self.category,
            'in_stock': self.in_stock,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        } 