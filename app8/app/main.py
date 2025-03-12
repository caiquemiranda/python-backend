#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Introdução ao FastAPI
Este módulo implementa uma API simples usando o framework FastAPI.
"""

from typing import Optional
from fastapi import FastAPI, Path, Query, HTTPException
from pydantic import BaseModel, Field
import uvicorn

# Cria a aplicação FastAPI
app = FastAPI(
    title="Introdução ao FastAPI",
    description="API simples para demonstrar os fundamentos do FastAPI",
    version="0.1.0"
)

# Modelo Pydantic para um item
class Item(BaseModel):
    """Modelo para representar um item."""
    name: str = Field(..., title="Nome do item", description="Nome do item, deve ser único")
    description: Optional[str] = Field(None, title="Descrição do item", description="Descrição detalhada do item")
    price: float = Field(..., gt=0, title="Preço do item", description="Preço do item, deve ser maior que zero")
    tax: Optional[float] = Field(None, ge=0, title="Taxa do item", description="Taxa aplicada ao item")

    class Config:
        schema_extra = {
            "example": {
                "name": "Smartphone",
                "description": "Um smartphone de última geração",
                "price": 1000.0,
                "tax": 10.5
            }
        }

# Dicionário para armazenar itens em memória
items = {}

# Rota raiz
@app.get("/")
async def read_root():
    """Retorna uma mensagem de boas-vindas."""
    return {"message": "Bem-vindo à API de introdução ao FastAPI!"}

# Rota Hello World
@app.get("/hello")
async def read_hello():
    """Retorna uma mensagem Hello World."""
    return {"message": "Hello World from FastAPI!"}

# Rota com parâmetro de caminho
@app.get("/hello/{name}")
async def read_hello_name(name: str):
    """Retorna uma saudação personalizada com o nome especificado.
    
    Args:
        name (str): Nome para personalizar a saudação
    
    Returns:
        dict: Mensagem de saudação personalizada
    """
    return {"message": f"Hello, {name}!"}

# Rota com parâmetros de consulta (query parameters)
@app.get("/items")
async def read_items(skip: int = 0, limit: int = 10, search: Optional[str] = None):
    """Retorna a lista de itens com suporte para paginação e busca.
    
    Args:
        skip (int, optional): Número de itens para pular. Padrão: 0
        limit (int, optional): Número máximo de itens para retornar. Padrão: 10
        search (str, optional): Termo de busca para filtrar itens por nome
    
    Returns:
        dict: Lista de itens filtrados
    """
    result = list(items.values())
    
    # Filtra por termo de busca se fornecido
    if search:
        result = [item for item in result if search.lower() in item["name"].lower()]
    
    # Aplica paginação
    return {"items": result[skip : skip + limit], "total": len(result)}

# Rota para obter um item específico por ID
@app.get("/items/{item_id}")
async def read_item(
    item_id: int = Path(..., title="ID do item", description="ID do item a ser recuperado", ge=1)
):
    """Retorna um item específico pelo ID.
    
    Args:
        item_id (int): ID do item a ser recuperado
    
    Raises:
        HTTPException: Se o item não for encontrado
    
    Returns:
        dict: Item encontrado
    """
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item não encontrado")
    return items[item_id]

# Rota para criar um novo item
@app.post("/items", status_code=201)
async def create_item(item: Item):
    """Cria um novo item.
    
    Args:
        item (Item): Dados do item a ser criado
    
    Raises:
        HTTPException: Se já existir um item com o mesmo ID
    
    Returns:
        dict: Item criado
    """
    # Gera um novo ID (simplificado para exemplo)
    if items:
        new_id = max(items.keys()) + 1
    else:
        new_id = 1
    
    # Verifica se já existe um item com o mesmo nome
    for existing_item in items.values():
        if existing_item["name"] == item.name:
            raise HTTPException(status_code=400, detail="Um item com este nome já existe")
    
    # Adiciona o novo item
    items[new_id] = {
        "id": new_id,
        "name": item.name,
        "description": item.description,
        "price": item.price,
        "tax": item.tax
    }
    return items[new_id]

# Rota para atualizar um item
@app.put("/items/{item_id}")
async def update_item(
    item_id: int = Path(..., title="ID do item", description="ID do item a ser atualizado", ge=1),
    item: Item = None
):
    """Atualiza um item existente.
    
    Args:
        item_id (int): ID do item a ser atualizado
        item (Item): Novos dados do item
    
    Raises:
        HTTPException: Se o item não for encontrado
    
    Returns:
        dict: Item atualizado
    """
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item não encontrado")
    
    # Atualiza o item
    items[item_id] = {
        "id": item_id,
        "name": item.name,
        "description": item.description,
        "price": item.price,
        "tax": item.tax
    }
    return items[item_id]

# Rota para excluir um item
@app.delete("/items/{item_id}")
async def delete_item(
    item_id: int = Path(..., title="ID do item", description="ID do item a ser excluído", ge=1)
):
    """Exclui um item pelo ID.
    
    Args:
        item_id (int): ID do item a ser excluído
    
    Raises:
        HTTPException: Se o item não for encontrado
    
    Returns:
        dict: Mensagem de confirmação
    """
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item não encontrado")
    
    # Remove o item
    del items[item_id]
    return {"message": "Item excluído com sucesso"}

# Rota para calcular o preço total de um item
@app.get("/items/{item_id}/price")
async def calculate_item_price(
    item_id: int = Path(..., title="ID do item", description="ID do item para calcular o preço", ge=1),
    quantity: int = Query(1, title="Quantidade", description="Quantidade de itens", ge=1)
):
    """Calcula o preço total de um item com base na quantidade e taxas.
    
    Args:
        item_id (int): ID do item para calcular o preço
        quantity (int, optional): Quantidade de itens. Padrão: 1
    
    Raises:
        HTTPException: Se o item não for encontrado
    
    Returns:
        dict: Informações de preço calculado
    """
    if item_id not in items:
        raise HTTPException(status_code=404, detail="Item não encontrado")
    
    item = items[item_id]
    
    # Calcula o preço base
    price = item["price"] * quantity
    
    # Adiciona taxa se existir
    if item["tax"]:
        price_with_tax = price * (1 + item["tax"] / 100)
    else:
        price_with_tax = price
    
    return {
        "item_id": item_id,
        "name": item["name"],
        "quantity": quantity,
        "price_per_item": item["price"],
        "tax_rate": item["tax"],
        "price_without_tax": price,
        "price_with_tax": price_with_tax
    }

# Adiciona alguns itens de exemplo quando o aplicativo inicia
@app.on_event("startup")
async def startup_event():
    """Adiciona alguns itens de exemplo quando o aplicativo inicia."""
    items[1] = {
        "id": 1,
        "name": "Smartphone",
        "description": "Um smartphone de última geração",
        "price": 1000.0,
        "tax": 10.5
    }
    items[2] = {
        "id": 2,
        "name": "Notebook",
        "description": "Notebook leve e potente",
        "price": 3500.0,
        "tax": 12.0
    }
    items[3] = {
        "id": 3,
        "name": "Fones de Ouvido",
        "description": "Fones de ouvido sem fio com cancelamento de ruído",
        "price": 250.0,
        "tax": 8.5
    }

if __name__ == "__main__":
    # Executa o servidor com Uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 