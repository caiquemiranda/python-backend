"""
Mini API com Flask
uma API simples usando o framework Flask.
"""

from flask import Flask, jsonify, request
from produtos import produtos

app = Flask(__name__)


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


@app.route('/api/produtos', methods=['GET'])
def listar_produtos():
    """Retorna a lista de todos os produtos."""
    return jsonify(produtos)


@app.route('/api/produtos/<int:produto_id>', methods=['GET'])
def obter_produto(produto_id):
    """Retorna um produto específico pelo ID."""

    produto = next((p for p in produtos if p['id'] == produto_id), None)
    

    if produto is None:
        return jsonify({"erro": "Produto não encontrado"}), 404
    
    return jsonify(produto)


@app.route('/api/produtos', methods=['POST'])
def criar_produto():
    """Cria um novo produto."""
    
    if not request.is_json:
        return jsonify({"erro": "O conteúdo deve ser JSON"}), 400
    
    
    dados = request.get_json()
    
    
    if 'nome' not in dados or 'preco' not in dados:
        return jsonify({"erro": "Campos obrigatórios: nome, preco"}), 400
    
    
    novo_id = max(p['id'] for p in produtos) + 1
    

    novo_produto = {
        "id": novo_id,
        "nome": dados['nome'],
        "preco": dados['preco'],
        "disponivel": dados.get('disponivel', True)  # Campo opcional
    }
    

    produtos.append(novo_produto)
    

    return jsonify(novo_produto), 201


@app.route('/api/produtos/<int:produto_id>', methods=['PUT'])
def atualizar_produto(produto_id):
    """Atualiza um produto existente."""

    if not request.is_json:
        return jsonify({"erro": "O conteúdo deve ser JSON"}), 400
    

    produto = next((p for p in produtos if p['id'] == produto_id), None)
    

    if produto is None:
        return jsonify({"erro": "Produto não encontrado"}), 404
    

    dados = request.get_json()
    

    if 'nome' in dados:
        produto['nome'] = dados['nome']
    if 'preco' in dados:
        produto['preco'] = dados['preco']
    if 'disponivel' in dados:
        produto['disponivel'] = dados['disponivel']
    

    return jsonify(produto)


@app.route('/api/produtos/<int:produto_id>', methods=['DELETE'])
def remover_produto(produto_id):
    """Remove um produto pelo ID."""

    for i, produto in enumerate(produtos):
        if produto['id'] == produto_id:

            produtos.pop(i)
            return jsonify({"mensagem": "Produto removido com sucesso"}), 200
    

    return jsonify({"erro": "Produto não encontrado"}), 404

if __name__ == '__main__':
    app.run(debug=True, port=8000) 