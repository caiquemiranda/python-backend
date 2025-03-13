"""
Autenticação com Flask
incluindo registro, login, logout e proteção de rotas.
"""

import os
import sqlite3
from flask import Flask, render_template, request, redirect, url_for, flash, g, session
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps

app = Flask(__name__)
app.config['SECRET_KEY'] = 'chave-secreta-muito-segura'
app.config['DATABASE'] = os.path.join(app.root_path, 'users.db')

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
    """Cria a tabela de usuários se ela não existir."""

    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            senha TEXT NOT NULL,
            data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        ''')
        
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            conteudo TEXT NOT NULL,
            usuario_id INTEGER NOT NULL,
            data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
        )
        ''')
        
        db.commit()

def login_required(f):

    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'usuario_id' not in session:
            flash('Por favor, faça login para acessar esta página.', 'warning')
            return redirect(url_for('login', next=request.url))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/')
def index():
    """Exibe a página inicial."""

    return render_template('index.html')

@app.route('/registrar', methods=['GET', 'POST'])
def registrar():
    """Exibe o formulário de registro e processa o registro de novos usuários."""

    if request.method == 'POST':
        nome = request.form['nome']
        email = request.form['email']
        senha = request.form['senha']
        confirmacao = request.form['confirmacao']
        
        erro = None
        if not nome:
            erro = 'Nome é obrigatório.'
        elif not email:
            erro = 'E-mail é obrigatório.'
        elif not senha:
            erro = 'Senha é obrigatória.'
        elif senha != confirmacao:
            erro = 'As senhas não coincidem.'
        
        if erro is None:
            db = get_db()
            cursor = db.cursor()
            cursor.execute('SELECT id FROM usuarios WHERE email = ?', (email,))
            usuario = cursor.fetchone()
            
            if usuario is not None:
                erro = f'O e-mail {email} já está registrado.'
            else:
                senha_hash = generate_password_hash(senha)
                cursor.execute(
                    'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
                    (nome, email, senha_hash)
                )
                db.commit()
                
                flash('Registro realizado com sucesso! Agora você pode fazer login.', 'success')
                return redirect(url_for('login'))
        
        flash(erro, 'error')
    
    return render_template('registrar.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    """Exibe o formulário de login e processa a autenticação de usuários."""

    if request.method == 'POST':
        email = request.form['email']
        senha = request.form['senha']
        
        erro = None
        if not email:
            erro = 'E-mail é obrigatório.'
        elif not senha:
            erro = 'Senha é obrigatória.'
        
        if erro is None:
            db = get_db()
            cursor = db.cursor()
            cursor.execute('SELECT * FROM usuarios WHERE email = ?', (email,))
            usuario = cursor.fetchone()
            
            if usuario is None or not check_password_hash(usuario['senha'], senha):
                erro = 'E-mail ou senha incorretos.'
            else:
                session.clear()
                session['usuario_id'] = usuario['id']
                session['nome_usuario'] = usuario['nome']
                
                next_page = request.args.get('next', None)
                if next_page:
                    return redirect(next_page)
                
                flash(f'Bem-vindo, {usuario["nome"]}!', 'success')
                return redirect(url_for('painel'))
        
        flash(erro, 'error')
    
    return render_template('login.html')

@app.route('/logout')
def logout():
    """Encerra a sessão do usuário."""

    session.clear()
    flash('Você saiu da sua conta.', 'info')
    return redirect(url_for('index'))

@app.route('/painel')
@login_required
def painel():
    """Exibe o painel do usuário com conteúdo protegido."""

    db = get_db()
    cursor = db.cursor()
    
    cursor.execute(
        'SELECT * FROM posts WHERE usuario_id = ? ORDER BY data_criacao DESC',
        (session['usuario_id'],)
    )
    posts = cursor.fetchall()
    
    return render_template('painel.html', posts=posts)

@app.route('/posts/novo', methods=['GET', 'POST'])
@login_required
def novo_post():
    """Exibe o formulário para criar um novo post e processa o envio."""

    if request.method == 'POST':
        titulo = request.form['titulo']
        conteudo = request.form['conteudo']
        
        erro = None
        if not titulo:
            erro = 'Título é obrigatório.'
        elif not conteudo:
            erro = 'Conteúdo é obrigatório.'
        
        if erro is None:
            db = get_db()
            cursor = db.cursor()
            cursor.execute(
                'INSERT INTO posts (titulo, conteudo, usuario_id) VALUES (?, ?, ?)',
                (titulo, conteudo, session['usuario_id'])
            )
            db.commit()
            
            flash('Post criado com sucesso!', 'success')
            return redirect(url_for('painel'))
        
        flash(erro, 'error')
    
    return render_template('formulario_post.html')

@app.route('/posts/editar/<int:post_id>', methods=['GET', 'POST'])
@login_required
def editar_post(post_id):
    """Exibe o formulário para editar um post e processa a atualização."""

    db = get_db()
    cursor = db.cursor()
    
    cursor.execute(
        'SELECT * FROM posts WHERE id = ? AND usuario_id = ?',
        (post_id, session['usuario_id'])
    )
    post = cursor.fetchone()
    
    if post is None:
        flash('Post não encontrado ou você não tem permissão para editá-lo.', 'error')
        return redirect(url_for('painel'))
    
    if request.method == 'POST':
        titulo = request.form['titulo']
        conteudo = request.form['conteudo']
        
        erro = None
        if not titulo:
            erro = 'Título é obrigatório.'
        elif not conteudo:
            erro = 'Conteúdo é obrigatório.'
        
        if erro is None:
            cursor.execute(
                'UPDATE posts SET titulo = ?, conteudo = ? WHERE id = ?',
                (titulo, conteudo, post_id)
            )
            db.commit()
            
            flash('Post atualizado com sucesso!', 'success')
            return redirect(url_for('painel'))
        
        flash(erro, 'error')
    
    return render_template('formulario_post.html', post=post)

@app.route('/posts/excluir/<int:post_id>')
@login_required
def excluir_post(post_id):
    """Remove um post do banco de dados."""

    db = get_db()
    cursor = db.cursor()
    
    cursor.execute(
        'SELECT id FROM posts WHERE id = ? AND usuario_id = ?',
        (post_id, session['usuario_id'])
    )
    post = cursor.fetchone()
    
    if post is None:
        flash('Post não encontrado ou você não tem permissão para excluí-lo.', 'error')
        return redirect(url_for('painel'))
    
    cursor.execute('DELETE FROM posts WHERE id = ?', (post_id,))
    db.commit()
    
    flash('Post excluído com sucesso!', 'success')
    return redirect(url_for('painel'))

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=8000) 
    