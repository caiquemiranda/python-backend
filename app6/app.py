#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Upload de arquivos com Flask
Este script implementa um sistema de upload e gerenciamento de arquivos usando Flask.
"""

import os
import sqlite3
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, flash, g, send_from_directory
from werkzeug.utils import secure_filename
import uuid

# Inicializa o aplicativo Flask
app = Flask(__name__)
app.config['SECRET_KEY'] = 'chave-secreta-para-uploads'
app.config['DATABASE'] = os.path.join(app.root_path, 'arquivos.db')

# Configurações para upload de arquivos
app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'uploads')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB
app.config['ALLOWED_EXTENSIONS'] = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'doc', 'docx', 'xls', 'xlsx', 'zip'}

# Garante que a pasta de uploads existe
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

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
    """Cria a tabela de arquivos se ela não existir."""
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        
        # Cria a tabela de arquivos
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS arquivos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_original TEXT NOT NULL,
            nome_armazenado TEXT NOT NULL,
            tipo_arquivo TEXT,
            tamanho INTEGER,
            descricao TEXT,
            data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        ''')
        
        db.commit()

# Função para verificar se o arquivo possui uma extensão permitida
def extensao_permitida(filename):
    """Verifica se a extensão do arquivo é permitida."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

# Função para formatar o tamanho do arquivo
def formatar_tamanho(tamanho_bytes):
    """Formata o tamanho do arquivo em KB, MB ou GB."""
    if tamanho_bytes < 1024:
        return f"{tamanho_bytes} bytes"
    elif tamanho_bytes < 1024 * 1024:
        return f"{tamanho_bytes/1024:.1f} KB"
    elif tamanho_bytes < 1024 * 1024 * 1024:
        return f"{tamanho_bytes/(1024*1024):.1f} MB"
    else:
        return f"{tamanho_bytes/(1024*1024*1024):.1f} GB"

# Função para obter a extensão de um arquivo
def obter_extensao(filename):
    """Retorna a extensão do arquivo."""
    return '.' + filename.rsplit('.', 1)[1].lower() if '.' in filename else ''

# Rota para a página inicial que lista todos os arquivos
@app.route('/')
def listar_arquivos():
    """Exibe a lista de todos os arquivos."""
    db = get_db()
    cursor = db.cursor()
    
    # Recupera todos os arquivos
    cursor.execute('SELECT * FROM arquivos ORDER BY data_upload DESC')
    arquivos = cursor.fetchall()
    
    return render_template('index.html', arquivos=arquivos, formatar_tamanho=formatar_tamanho)

# Rota para o formulário de upload de arquivo
@app.route('/upload', methods=['GET', 'POST'])
def upload_arquivo():
    """Exibe o formulário para fazer upload de um arquivo e processa o envio."""
    if request.method == 'POST':
        # Verifica se o post tem o arquivo
        if 'arquivo' not in request.files:
            flash('Nenhum arquivo selecionado', 'error')
            return redirect(request.url)
        
        arquivo = request.files['arquivo']
        descricao = request.form.get('descricao', '')
        
        # Se o usuário não selecionar um arquivo, o navegador
        # pode enviar um arquivo sem nome
        if arquivo.filename == '':
            flash('Nenhum arquivo selecionado', 'error')
            return redirect(request.url)
        
        if arquivo and extensao_permitida(arquivo.filename):
            # Gera um nome seguro para o arquivo
            nome_original = secure_filename(arquivo.filename)
            extensao = obter_extensao(nome_original)
            nome_armazenado = f"{str(uuid.uuid4())}{extensao}"
            
            # Salva o arquivo no servidor
            caminho_arquivo = os.path.join(app.config['UPLOAD_FOLDER'], nome_armazenado)
            arquivo.save(caminho_arquivo)
            
            # Obtém o tamanho e tipo do arquivo
            tamanho = os.path.getsize(caminho_arquivo)
            tipo_arquivo = arquivo.content_type
            
            # Salva informações no banco de dados
            db = get_db()
            cursor = db.cursor()
            cursor.execute(
                'INSERT INTO arquivos (nome_original, nome_armazenado, tipo_arquivo, tamanho, descricao) VALUES (?, ?, ?, ?, ?)',
                (nome_original, nome_armazenado, tipo_arquivo, tamanho, descricao)
            )
            db.commit()
            
            flash('Arquivo enviado com sucesso!', 'success')
            return redirect(url_for('listar_arquivos'))
        else:
            extensoes = ', '.join(app.config['ALLOWED_EXTENSIONS'])
            flash(f'Extensão de arquivo não permitida. Permitidas: {extensoes}', 'error')
            return redirect(request.url)
    
    return render_template('upload.html')

# Rota para fazer download de um arquivo
@app.route('/download/<int:arquivo_id>')
def download_arquivo(arquivo_id):
    """Permite o download de um arquivo pelo ID."""
    db = get_db()
    cursor = db.cursor()
    
    # Busca o arquivo pelo ID
    cursor.execute('SELECT * FROM arquivos WHERE id = ?', (arquivo_id,))
    arquivo = cursor.fetchone()
    
    if arquivo is None:
        flash('Arquivo não encontrado', 'error')
        return redirect(url_for('listar_arquivos'))
    
    # Incrementa o registro de downloads (se existir esse campo)
    try:
        cursor.execute('UPDATE arquivos SET downloads = downloads + 1 WHERE id = ?', (arquivo_id,))
        db.commit()
    except sqlite3.OperationalError:
        # O campo downloads não existe, ignora o erro
        pass
    
    # Retorna o arquivo para download
    return send_from_directory(
        app.config['UPLOAD_FOLDER'],
        arquivo['nome_armazenado'],
        as_attachment=True,
        download_name=arquivo['nome_original']
    )

# Rota para visualizar detalhes do arquivo
@app.route('/arquivo/<int:arquivo_id>')
def detalhes_arquivo(arquivo_id):
    """Exibe os detalhes de um arquivo específico."""
    db = get_db()
    cursor = db.cursor()
    
    # Busca o arquivo pelo ID
    cursor.execute('SELECT * FROM arquivos WHERE id = ?', (arquivo_id,))
    arquivo = cursor.fetchone()
    
    if arquivo is None:
        flash('Arquivo não encontrado', 'error')
        return redirect(url_for('listar_arquivos'))
    
    return render_template('detalhes.html', arquivo=arquivo, formatar_tamanho=formatar_tamanho)

# Rota para excluir um arquivo
@app.route('/excluir/<int:arquivo_id>', methods=['POST'])
def excluir_arquivo(arquivo_id):
    """Remove um arquivo do banco de dados e do sistema de arquivos."""
    db = get_db()
    cursor = db.cursor()
    
    # Busca o arquivo pelo ID
    cursor.execute('SELECT nome_armazenado FROM arquivos WHERE id = ?', (arquivo_id,))
    arquivo = cursor.fetchone()
    
    if arquivo is None:
        flash('Arquivo não encontrado', 'error')
        return redirect(url_for('listar_arquivos'))
    
    # Remove o arquivo do sistema de arquivos
    caminho_arquivo = os.path.join(app.config['UPLOAD_FOLDER'], arquivo['nome_armazenado'])
    try:
        if os.path.exists(caminho_arquivo):
            os.remove(caminho_arquivo)
    except Exception as e:
        flash(f'Erro ao excluir o arquivo do disco: {str(e)}', 'error')
        return redirect(url_for('listar_arquivos'))
    
    # Remove o registro do banco de dados
    cursor.execute('DELETE FROM arquivos WHERE id = ?', (arquivo_id,))
    db.commit()
    
    flash('Arquivo excluído com sucesso!', 'success')
    return redirect(url_for('listar_arquivos'))

# Rota para editar a descrição de um arquivo
@app.route('/editar/<int:arquivo_id>', methods=['GET', 'POST'])
def editar_arquivo(arquivo_id):
    """Exibe o formulário para editar a descrição de um arquivo e processa a atualização."""
    db = get_db()
    cursor = db.cursor()
    
    # Busca o arquivo pelo ID
    cursor.execute('SELECT * FROM arquivos WHERE id = ?', (arquivo_id,))
    arquivo = cursor.fetchone()
    
    if arquivo is None:
        flash('Arquivo não encontrado', 'error')
        return redirect(url_for('listar_arquivos'))
    
    if request.method == 'POST':
        descricao = request.form.get('descricao', '')
        
        # Atualiza a descrição no banco de dados
        cursor.execute(
            'UPDATE arquivos SET descricao = ? WHERE id = ?',
            (descricao, arquivo_id)
        )
        db.commit()
        
        flash('Descrição atualizada com sucesso!', 'success')
        return redirect(url_for('detalhes_arquivo', arquivo_id=arquivo_id))
    
    return render_template('editar.html', arquivo=arquivo)

if __name__ == '__main__':
    # Inicializa o banco de dados
    init_db()
    
    # Inicia o servidor Flask
    app.run(debug=True, port=8000) 