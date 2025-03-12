#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
CRUD com Flask e SQLite
Este script implementa uma aplicação web CRUD utilizando Flask e SQLite para
gerenciar uma lista de tarefas.
"""

import os
import sqlite3
from flask import Flask, render_template, request, redirect, url_for, flash, g, jsonify

# Inicializa o aplicativo Flask
app = Flask(__name__)
app.config['SECRET_KEY'] = 'chave-secreta-da-aplicacao'
app.config['DATABASE'] = os.path.join(app.root_path, 'tarefas.db')

# Função para obter uma conexão com o banco de dados
def get_db():
    """Estabelece uma conexão com o banco de dados."""
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(app.config['DATABASE'])
        db.row_factory = sqlite3.Row  # Retorna linhas como dicionários
    return db

# Função para fechar a conexão com o banco de dados
@app.teardown_appcontext
def close_connection(exception):
    """Fecha a conexão com o banco de dados ao final de cada requisição."""
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# Função para inicializar o banco de dados
def init_db():
    """Cria a tabela de tarefas se ela não existir."""
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        
        # Cria a tabela de tarefas
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS tarefas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            descricao TEXT,
            concluida INTEGER DEFAULT 0,
            data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        ''')
        
        db.commit()

# Rota para a página inicial que lista todas as tarefas
@app.route('/')
def listar_tarefas():
    """Exibe a lista de todas as tarefas."""
    db = get_db()
    cursor = db.cursor()
    
    # Recupera todas as tarefas
    cursor.execute('SELECT * FROM tarefas ORDER BY concluida, id DESC')
    tarefas = cursor.fetchall()
    
    return render_template('index.html', tarefas=tarefas)

# Rota para o formulário de nova tarefa
@app.route('/nova', methods=['GET', 'POST'])
def nova_tarefa():
    """Exibe o formulário para criar uma nova tarefa e processa o envio."""
    if request.method == 'POST':
        titulo = request.form['titulo']
        descricao = request.form['descricao']
        
        # Validação básica
        if not titulo:
            flash('O título é obrigatório!', 'error')
            return render_template('formulario.html')
        
        # Insere a nova tarefa no banco de dados
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            'INSERT INTO tarefas (titulo, descricao) VALUES (?, ?)',
            (titulo, descricao)
        )
        db.commit()
        
        flash('Tarefa criada com sucesso!', 'success')
        return redirect(url_for('listar_tarefas'))
    
    return render_template('formulario.html')

# Rota para editar uma tarefa existente
@app.route('/editar/<int:tarefa_id>', methods=['GET', 'POST'])
def editar_tarefa(tarefa_id):
    """Exibe o formulário para editar uma tarefa e processa a atualização."""
    db = get_db()
    cursor = db.cursor()
    
    # Recupera a tarefa a ser editada
    cursor.execute('SELECT * FROM tarefas WHERE id = ?', (tarefa_id,))
    tarefa = cursor.fetchone()
    
    if tarefa is None:
        flash('Tarefa não encontrada!', 'error')
        return redirect(url_for('listar_tarefas'))
    
    if request.method == 'POST':
        titulo = request.form['titulo']
        descricao = request.form['descricao']
        
        # Validação básica
        if not titulo:
            flash('O título é obrigatório!', 'error')
            return render_template('formulario.html', tarefa=tarefa)
        
        # Atualiza a tarefa no banco de dados
        cursor.execute(
            'UPDATE tarefas SET titulo = ?, descricao = ? WHERE id = ?',
            (titulo, descricao, tarefa_id)
        )
        db.commit()
        
        flash('Tarefa atualizada com sucesso!', 'success')
        return redirect(url_for('listar_tarefas'))
    
    return render_template('formulario.html', tarefa=tarefa)

# Rota para marcar uma tarefa como concluída ou não concluída
@app.route('/alternar/<int:tarefa_id>')
def alternar_status(tarefa_id):
    """Alterna o status de uma tarefa entre concluída e não concluída."""
    db = get_db()
    cursor = db.cursor()
    
    # Recupera o status atual da tarefa
    cursor.execute('SELECT concluida FROM tarefas WHERE id = ?', (tarefa_id,))
    tarefa = cursor.fetchone()
    
    if tarefa is None:
        flash('Tarefa não encontrada!', 'error')
        return redirect(url_for('listar_tarefas'))
    
    # Inverte o status da tarefa
    novo_status = 0 if tarefa['concluida'] else 1
    
    # Atualiza o status no banco de dados
    cursor.execute(
        'UPDATE tarefas SET concluida = ? WHERE id = ?',
        (novo_status, tarefa_id)
    )
    db.commit()
    
    flash('Status da tarefa atualizado!', 'success')
    return redirect(url_for('listar_tarefas'))

# Rota para excluir uma tarefa
@app.route('/excluir/<int:tarefa_id>')
def excluir_tarefa(tarefa_id):
    """Remove uma tarefa do banco de dados."""
    db = get_db()
    cursor = db.cursor()
    
    # Verifica se a tarefa existe
    cursor.execute('SELECT id FROM tarefas WHERE id = ?', (tarefa_id,))
    tarefa = cursor.fetchone()
    
    if tarefa is None:
        flash('Tarefa não encontrada!', 'error')
        return redirect(url_for('listar_tarefas'))
    
    # Remove a tarefa do banco de dados
    cursor.execute('DELETE FROM tarefas WHERE id = ?', (tarefa_id,))
    db.commit()
    
    flash('Tarefa excluída com sucesso!', 'success')
    return redirect(url_for('listar_tarefas'))

# API REST endpoints

# Endpoint para listar todas as tarefas
@app.route('/api/tarefas', methods=['GET'])
def api_listar_tarefas():
    """API para listar todas as tarefas."""
    db = get_db()
    cursor = db.cursor()
    
    cursor.execute('SELECT * FROM tarefas ORDER BY id DESC')
    tarefas = [dict(tarefa) for tarefa in cursor.fetchall()]
    
    return jsonify(tarefas)

# Endpoint para obter uma tarefa específica
@app.route('/api/tarefas/<int:tarefa_id>', methods=['GET'])
def api_obter_tarefa(tarefa_id):
    """API para obter uma tarefa específica."""
    db = get_db()
    cursor = db.cursor()
    
    cursor.execute('SELECT * FROM tarefas WHERE id = ?', (tarefa_id,))
    tarefa = cursor.fetchone()
    
    if tarefa is None:
        return jsonify({"erro": "Tarefa não encontrada"}), 404
    
    return jsonify(dict(tarefa))

# Endpoint para criar uma nova tarefa
@app.route('/api/tarefas', methods=['POST'])
def api_criar_tarefa():
    """API para criar uma nova tarefa."""
    if not request.is_json:
        return jsonify({"erro": "O conteúdo deve ser JSON"}), 400
    
    dados = request.get_json()
    
    # Validação básica
    if 'titulo' not in dados:
        return jsonify({"erro": "O título é obrigatório"}), 400
    
    titulo = dados['titulo']
    descricao = dados.get('descricao', '')
    
    # Insere a nova tarefa no banco de dados
    db = get_db()
    cursor = db.cursor()
    cursor.execute(
        'INSERT INTO tarefas (titulo, descricao) VALUES (?, ?)',
        (titulo, descricao)
    )
    db.commit()
    
    # Recupera a tarefa recém-criada
    nova_tarefa_id = cursor.lastrowid
    cursor.execute('SELECT * FROM tarefas WHERE id = ?', (nova_tarefa_id,))
    nova_tarefa = cursor.fetchone()
    
    return jsonify(dict(nova_tarefa)), 201

# Endpoint para atualizar uma tarefa
@app.route('/api/tarefas/<int:tarefa_id>', methods=['PUT'])
def api_atualizar_tarefa(tarefa_id):
    """API para atualizar uma tarefa existente."""
    if not request.is_json:
        return jsonify({"erro": "O conteúdo deve ser JSON"}), 400
    
    db = get_db()
    cursor = db.cursor()
    
    # Verifica se a tarefa existe
    cursor.execute('SELECT * FROM tarefas WHERE id = ?', (tarefa_id,))
    tarefa = cursor.fetchone()
    
    if tarefa is None:
        return jsonify({"erro": "Tarefa não encontrada"}), 404
    
    dados = request.get_json()
    
    # Atualiza apenas os campos fornecidos
    campos_para_atualizar = []
    valores = []
    
    if 'titulo' in dados:
        campos_para_atualizar.append('titulo = ?')
        valores.append(dados['titulo'])
    
    if 'descricao' in dados:
        campos_para_atualizar.append('descricao = ?')
        valores.append(dados['descricao'])
    
    if 'concluida' in dados:
        campos_para_atualizar.append('concluida = ?')
        valores.append(1 if dados['concluida'] else 0)
    
    if not campos_para_atualizar:
        return jsonify({"erro": "Nenhum campo para atualizar fornecido"}), 400
    
    # Constrói a query de atualização
    query = f"UPDATE tarefas SET {', '.join(campos_para_atualizar)} WHERE id = ?"
    valores.append(tarefa_id)
    
    # Executa a atualização
    cursor.execute(query, valores)
    db.commit()
    
    # Recupera a tarefa atualizada
    cursor.execute('SELECT * FROM tarefas WHERE id = ?', (tarefa_id,))
    tarefa_atualizada = cursor.fetchone()
    
    return jsonify(dict(tarefa_atualizada))

# Endpoint para excluir uma tarefa
@app.route('/api/tarefas/<int:tarefa_id>', methods=['DELETE'])
def api_excluir_tarefa(tarefa_id):
    """API para excluir uma tarefa."""
    db = get_db()
    cursor = db.cursor()
    
    # Verifica se a tarefa existe
    cursor.execute('SELECT id FROM tarefas WHERE id = ?', (tarefa_id,))
    tarefa = cursor.fetchone()
    
    if tarefa is None:
        return jsonify({"erro": "Tarefa não encontrada"}), 404
    
    # Remove a tarefa do banco de dados
    cursor.execute('DELETE FROM tarefas WHERE id = ?', (tarefa_id,))
    db.commit()
    
    return jsonify({"mensagem": "Tarefa excluída com sucesso"})

if __name__ == '__main__':
    # Inicializa o banco de dados
    init_db()
    
    # Inicia o servidor Flask
    app.run(debug=True, port=8000) 