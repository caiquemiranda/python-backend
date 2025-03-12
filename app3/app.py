#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Mini API com Flask básico
Este script implementa uma API simples usando o framework Flask.
"""

from flask import Flask, jsonify, request

# Inicializa o aplicativo Flask
app = Flask(__name__)

# Lista de produtos como exemplo de dados
produtos = [
    {"id": 1, "nome": "Notebook", "preco": 3500.0, "disponivel": True},
    {"id": 2, "nome": "Smartphone", "preco": 1500.0, "disponivel": True},
    {"id": 3, "nome": "Tablet", "preco": 2000.0, "disponivel": False},
    {"id": 4, "nome": "Fones de Ouvido", "preco": 200.0, "disponivel": True},
    {"id": 5, "nome": "Monitor", "preco": 800.0, "disponivel": True}
]

# Rota para a página inicial
@app.route('/')
def index():
    """Retorna uma mensagem de boas-vindas."""
    return """
    <html>
    <head>
        <title>Mini API Flask</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                line-height: 1.6;
            }
            .container {
                max-width: 800px;
                margin: 0 auto;
            }
            h1 {
                color: #2c3e50;
            }
            code {
                background-color: #f8f8f8;
                padding: 2px 5px;
                border-radius: 3px;
                font-family: monospace;
            }
            ul {
                margin-top: 20px;
            }
            li {
                margin-bottom: 10px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Bem-vindo à Mini API Flask</h1>
            <p>Esta é uma API simples para exemplificar o uso do Flask.</p>
            
            <h2>Endpoints disponíveis:</h2>
            <ul>
                <li><code>GET /api/produtos</code> - Lista todos os produtos</li>
                <li><code>GET /api/produtos/&lt;id&gt;</code> - Obtém um produto pelo ID</li>
                <li><code>POST /api/produtos</code> - Cria um novo produto</li>
                <li><code>PUT /api/produtos/&lt;id&gt;</code> - Atualiza um produto existente</li>
                <li><code>DELETE /api/produtos/&lt;id&gt;</code> - Remove um produto</li>
            </ul>
            
            <h2>Exemplo de uso:</h2>
            <p>Para listar todos os produtos, acesse: <a href="/api/produtos">/api/produtos</a></p>
        </div>
    </body>
    </html>
    """

# Rota para listar todos os produtos
@app.route('/api/produtos', methods=['GET'])
def listar_produtos():
    """Retorna a lista de todos os produtos."""
    return jsonify(produtos)

# Rota para obter um produto específico pelo ID
@app.route('/api/produtos/<int:produto_id>', methods=['GET'])
def obter_produto(produto_id):
    """Retorna um produto específico pelo ID."""
    # Busca o produto pelo ID
    produto = next((p for p in produtos if p['id'] == produto_id), None)
    
    # Se o produto não foi encontrado, retorna erro 404
    if produto is None:
        return jsonify({"erro": "Produto não encontrado"}), 404
    
    return jsonify(produto)

# Rota para criar um novo produto
@app.route('/api/produtos', methods=['POST'])
def criar_produto():
    """Cria um novo produto."""
    # Verifica se os dados foram enviados como JSON
    if not request.is_json:
        return jsonify({"erro": "O conteúdo deve ser JSON"}), 400
    
    # Obtém os dados do corpo da requisição
    dados = request.get_json()
    
    # Validação básica dos dados recebidos
    if 'nome' not in dados or 'preco' not in dados:
        return jsonify({"erro": "Campos obrigatórios: nome, preco"}), 400
    
    # Gera um novo ID (simplificado para exemplo)
    novo_id = max(p['id'] for p in produtos) + 1
    
    # Cria o novo produto
    novo_produto = {
        "id": novo_id,
        "nome": dados['nome'],
        "preco": dados['preco'],
        "disponivel": dados.get('disponivel', True)  # Campo opcional
    }
    
    # Adiciona o produto à lista
    produtos.append(novo_produto)
    
    # Retorna o produto criado com status 201 (Created)
    return jsonify(novo_produto), 201

# Rota para atualizar um produto
@app.route('/api/produtos/<int:produto_id>', methods=['PUT'])
def atualizar_produto(produto_id):
    """Atualiza um produto existente."""
    # Verifica se os dados foram enviados como JSON
    if not request.is_json:
        return jsonify({"erro": "O conteúdo deve ser JSON"}), 400
    
    # Busca o produto pelo ID
    produto = next((p for p in produtos if p['id'] == produto_id), None)
    
    # Se o produto não foi encontrado, retorna erro 404
    if produto is None:
        return jsonify({"erro": "Produto não encontrado"}), 404
    
    # Obtém os dados do corpo da requisição
    dados = request.get_json()
    
    # Atualiza os campos do produto
    if 'nome' in dados:
        produto['nome'] = dados['nome']
    if 'preco' in dados:
        produto['preco'] = dados['preco']
    if 'disponivel' in dados:
        produto['disponivel'] = dados['disponivel']
    
    # Retorna o produto atualizado
    return jsonify(produto)

# Rota para remover um produto
@app.route('/api/produtos/<int:produto_id>', methods=['DELETE'])
def remover_produto(produto_id):
    """Remove um produto pelo ID."""
    # Busca o índice do produto na lista
    for i, produto in enumerate(produtos):
        if produto['id'] == produto_id:
            # Remove o produto da lista
            produtos.pop(i)
            return jsonify({"mensagem": "Produto removido com sucesso"}), 200
    
    # Se o produto não foi encontrado, retorna erro 404
    return jsonify({"erro": "Produto não encontrado"}), 404

if __name__ == '__main__':
    # Inicia o servidor Flask
    app.run(debug=True, port=8000) 