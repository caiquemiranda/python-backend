from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
from datetime import datetime

# Inicialização do aplicativo Flask
app = Flask(__name__)
CORS(app)  # Habilita CORS para permitir requisições do frontend

# Configuração do banco de dados SQLite
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'tarefas.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicialização do SQLAlchemy
db = SQLAlchemy(app)

# Modelo de dados para Tarefa
class Tarefa(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text, nullable=True)
    concluida = db.Column(db.Boolean, default=False)
    prioridade = db.Column(db.String(20), default='média')  # alta, média, baixa
    data_criacao = db.Column(db.DateTime, default=datetime.now)
    
    def to_dict(self):
        return {
            'id': self.id,
            'titulo': self.titulo,
            'descricao': self.descricao,
            'concluida': self.concluida,
            'prioridade': self.prioridade,
            'data_criacao': self.data_criacao.strftime('%Y-%m-%d %H:%M:%S')
        }

# Cria o banco de dados se não existir
with app.app_context():
    db.create_all()

# Rotas da API

# Listar todas as tarefas
@app.route('/api/tarefas', methods=['GET'])
def listar_tarefas():
    try:
        tarefas = Tarefa.query.all()
        return jsonify([tarefa.to_dict() for tarefa in tarefas])
    except Exception as e:
        return jsonify({'erro': str(e)}), 500

# Obter uma tarefa específica
@app.route('/api/tarefas/<int:id>', methods=['GET'])
def obter_tarefa(id):
    try:
        tarefa = Tarefa.query.get(id)
        if tarefa:
            return jsonify(tarefa.to_dict())
        return jsonify({'erro': 'Tarefa não encontrada'}), 404
    except Exception as e:
        return jsonify({'erro': str(e)}), 500

# Criar uma nova tarefa
@app.route('/api/tarefas', methods=['POST'])
def criar_tarefa():
    try:
        dados = request.json
        nova_tarefa = Tarefa(
            titulo=dados['titulo'],
            descricao=dados.get('descricao', ''),
            prioridade=dados.get('prioridade', 'média'),
            concluida=dados.get('concluida', False)
        )
        db.session.add(nova_tarefa)
        db.session.commit()
        return jsonify(nova_tarefa.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'erro': str(e)}), 500

# Atualizar uma tarefa existente
@app.route('/api/tarefas/<int:id>', methods=['PUT'])
def atualizar_tarefa(id):
    try:
        tarefa = Tarefa.query.get(id)
        if not tarefa:
            return jsonify({'erro': 'Tarefa não encontrada'}), 404
        
        dados = request.json
        tarefa.titulo = dados.get('titulo', tarefa.titulo)
        tarefa.descricao = dados.get('descricao', tarefa.descricao)
        tarefa.concluida = dados.get('concluida', tarefa.concluida)
        tarefa.prioridade = dados.get('prioridade', tarefa.prioridade)
        
        db.session.commit()
        return jsonify(tarefa.to_dict())
    except Exception as e:
        db.session.rollback()
        return jsonify({'erro': str(e)}), 500

# Excluir uma tarefa
@app.route('/api/tarefas/<int:id>', methods=['DELETE'])
def excluir_tarefa(id):
    try:
        tarefa = Tarefa.query.get(id)
        if not tarefa:
            return jsonify({'erro': 'Tarefa não encontrada'}), 404
        
        db.session.delete(tarefa)
        db.session.commit()
        return jsonify({'mensagem': 'Tarefa excluída com sucesso'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'erro': str(e)}), 500

# Concluir/desmarcar tarefa (endpoint específico para alternar o status)
@app.route('/api/tarefas/<int:id>/alternar-status', methods=['PATCH'])
def alternar_status_tarefa(id):
    try:
        tarefa = Tarefa.query.get(id)
        if not tarefa:
            return jsonify({'erro': 'Tarefa não encontrada'}), 404
        
        tarefa.concluida = not tarefa.concluida
        db.session.commit()
        return jsonify(tarefa.to_dict())
    except Exception as e:
        db.session.rollback()
        return jsonify({'erro': str(e)}), 500

# Rota para adicionar tarefas de exemplo (útil para testes)
@app.route('/api/tarefas/exemplo', methods=['POST'])
def adicionar_tarefas_exemplo():
    try:
        tarefas_exemplo = [
            Tarefa(titulo="Estudar Python", descricao="Revisar conceitos de Flask e SQLAlchemy", prioridade="alta"),
            Tarefa(titulo="Fazer compras", descricao="Comprar itens para a semana", prioridade="média"),
            Tarefa(titulo="Ler livro", descricao="Terminar capítulo 5", prioridade="baixa"),
            Tarefa(titulo="Reunião de equipe", descricao="Preparar apresentação", prioridade="alta", concluida=True)
        ]
        
        for tarefa in tarefas_exemplo:
            db.session.add(tarefa)
        
        db.session.commit()
        return jsonify({'mensagem': 'Tarefas de exemplo adicionadas com sucesso'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'erro': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 