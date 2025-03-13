"""
Upload com Flask
upload e gerenciamento de arquivos usando Flask.
"""

import os
import sqlite3
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, flash, g, send_from_directory
from werkzeug.utils import secure_filename
import uuid

app = Flask(__name__)
app.config['SECRET_KEY'] = 'chave-secreta-para-uploads'
app.config['DATABASE'] = os.path.join(app.root_path, 'arquivos.db')

app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, 'uploads')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB
app.config['ALLOWED_EXTENSIONS'] = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'doc', 'docx', 'xls', 'xlsx', 'zip'}

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

def get_db():
    """Estabelece uma conexão com o banco de dados."""

    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(app.config['DATABASE'])
        db.row_factory = sqlite3.Row  # Retorna linhas como dicionários
    return db

@app.teardown_appcontext
def close_connection(exception):
    """Fecha a conexão com o banco de dados ao final de cada requisição."""

    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def init_db():
    """Cria a tabela de arquivos se ela não existir."""

    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        
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

def extensao_permitida(filename):
    """Verifica se a extensão do arquivo é permitida."""

    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

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

def obter_extensao(filename):
    """Retorna a extensão do arquivo."""

    return '.' + filename.rsplit('.', 1)[1].lower() if '.' in filename else ''

@app.route('/')
def listar_arquivos():
    """Exibe a lista de todos os arquivos."""

    db = get_db()
    cursor = db.cursor()
    
    cursor.execute('SELECT * FROM arquivos ORDER BY data_upload DESC')
    arquivos = cursor.fetchall()
    
    return render_template('index.html', arquivos=arquivos, formatar_tamanho=formatar_tamanho)

@app.route('/upload', methods=['GET', 'POST'])
def upload_arquivo():
    """Exibe o formulário para fazer upload de um arquivo e processa o envio."""

    if request.method == 'POST':
        if 'arquivo' not in request.files:
            flash('Nenhum arquivo selecionado', 'error')
            return redirect(request.url)
        
        arquivo = request.files['arquivo']
        descricao = request.form.get('descricao', '')
        
        if arquivo.filename == '':
            flash('Nenhum arquivo selecionado', 'error')
            return redirect(request.url)
        
        if arquivo and extensao_permitida(arquivo.filename):
            nome_original = secure_filename(arquivo.filename)
            extensao = obter_extensao(nome_original)
            nome_armazenado = f"{str(uuid.uuid4())}{extensao}"
            
            caminho_arquivo = os.path.join(app.config['UPLOAD_FOLDER'], nome_armazenado)
            arquivo.save(caminho_arquivo)
            
            tamanho = os.path.getsize(caminho_arquivo)
            tipo_arquivo = arquivo.content_type
            
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

@app.route('/download/<int:arquivo_id>')
def download_arquivo(arquivo_id):
    """Permite o download de um arquivo pelo ID."""

    db = get_db()
    cursor = db.cursor()
    
    cursor.execute('SELECT * FROM arquivos WHERE id = ?', (arquivo_id,))
    arquivo = cursor.fetchone()
    
    if arquivo is None:
        flash('Arquivo não encontrado', 'error')
        return redirect(url_for('listar_arquivos'))
    
    try:
        cursor.execute('UPDATE arquivos SET downloads = downloads + 1 WHERE id = ?', (arquivo_id,))
        db.commit()
    except sqlite3.OperationalError:
        pass
    
    return send_from_directory(
        app.config['UPLOAD_FOLDER'],
        arquivo['nome_armazenado'],
        as_attachment=True,
        download_name=arquivo['nome_original']
    )

@app.route('/arquivo/<int:arquivo_id>')
def detalhes_arquivo(arquivo_id):
    """Exibe os detalhes de um arquivo específico."""

    db = get_db()
    cursor = db.cursor()
    
    cursor.execute('SELECT * FROM arquivos WHERE id = ?', (arquivo_id,))
    arquivo = cursor.fetchone()
    
    if arquivo is None:
        flash('Arquivo não encontrado', 'error')
        return redirect(url_for('listar_arquivos'))
    
    return render_template('detalhes.html', arquivo=arquivo, formatar_tamanho=formatar_tamanho)

@app.route('/excluir/<int:arquivo_id>', methods=['POST'])
def excluir_arquivo(arquivo_id):
    """Remove um arquivo do banco de dados e do sistema de arquivos."""

    db = get_db()
    cursor = db.cursor()
    
    cursor.execute('SELECT nome_armazenado FROM arquivos WHERE id = ?', (arquivo_id,))
    arquivo = cursor.fetchone()
    
    if arquivo is None:
        flash('Arquivo não encontrado', 'error')
        return redirect(url_for('listar_arquivos'))
    
    caminho_arquivo = os.path.join(app.config['UPLOAD_FOLDER'], arquivo['nome_armazenado'])
    try:
        if os.path.exists(caminho_arquivo):
            os.remove(caminho_arquivo)
    except Exception as e:
        flash(f'Erro ao excluir o arquivo do disco: {str(e)}', 'error')
        return redirect(url_for('listar_arquivos'))
    
    cursor.execute('DELETE FROM arquivos WHERE id = ?', (arquivo_id,))
    db.commit()
    
    flash('Arquivo excluído com sucesso!', 'success')
    return redirect(url_for('listar_arquivos'))

@app.route('/editar/<int:arquivo_id>', methods=['GET', 'POST'])
def editar_arquivo(arquivo_id):
    """Exibe o formulário para editar a descrição de um arquivo e processa a atualização."""

    db = get_db()
    cursor = db.cursor()
    
    cursor.execute('SELECT * FROM arquivos WHERE id = ?', (arquivo_id,))
    arquivo = cursor.fetchone()
    
    if arquivo is None:
        flash('Arquivo não encontrado', 'error')
        return redirect(url_for('listar_arquivos'))
    
    if request.method == 'POST':
        descricao = request.form.get('descricao', '')
        
        cursor.execute(
            'UPDATE arquivos SET descricao = ? WHERE id = ?',
            (descricao, arquivo_id)
        )
        db.commit()
        
        flash('Descrição atualizada com sucesso!', 'success')
        return redirect(url_for('detalhes_arquivo', arquivo_id=arquivo_id))
    
    return render_template('editar.html', arquivo=arquivo)

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=8000) 
