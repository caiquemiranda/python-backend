"""
CRUD com JSON
Este script implementa operações básicas de CRUD.
"""

import json
import os
import http.server
import socketserver
import urllib.parse
from http import HTTPStatus
from datetime import datetime
import uuid

PORT = 8000

DATA_DIR = 'dados'

TAREFAS_FILE = os.path.join(DATA_DIR, 'tarefas.json')

os.makedirs(DATA_DIR, exist_ok=True)

if not os.path.exists(TAREFAS_FILE):
    with open(TAREFAS_FILE, 'w', encoding='utf-8') as f:
        json.dump([], f)

def carregar_tarefas():
    """Carrega todas as tarefas do arquivo JSON."""

    try:
        with open(TAREFAS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except (json.JSONDecodeError, FileNotFoundError):
        return []

def salvar_tarefas(tarefas):
    """Salva a lista de tarefas no arquivo JSON."""

    with open(TAREFAS_FILE, 'w', encoding='utf-8') as f:
        json.dump(tarefas, f, ensure_ascii=False, indent=2)

def criar_tarefa(titulo, descricao):
    """Cria uma nova tarefa e adiciona ao arquivo."""

    tarefas = carregar_tarefas()
    
    nova_tarefa = {
        'id': str(uuid.uuid4()),
        'titulo': titulo,
        'descricao': descricao,
        'concluida': False,
        'criada_em': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    
    tarefas.append(nova_tarefa)
    salvar_tarefas(tarefas)
    return nova_tarefa

def ler_tarefa(tarefa_id):
    """Busca uma tarefa pelo ID."""

    tarefas = carregar_tarefas()
    for tarefa in tarefas:
        if tarefa['id'] == tarefa_id:
            return tarefa
    return None

def atualizar_tarefa(tarefa_id, titulo=None, descricao=None, concluida=None):
    """Atualiza uma tarefa existente pelo ID."""

    tarefas = carregar_tarefas()
    
    for i, tarefa in enumerate(tarefas):
        if tarefa['id'] == tarefa_id:
            if titulo is not None:
                tarefas[i]['titulo'] = titulo
            if descricao is not None:
                tarefas[i]['descricao'] = descricao
            if concluida is not None:
                tarefas[i]['concluida'] = concluida
            
            tarefas[i]['atualizada_em'] = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            
            salvar_tarefas(tarefas)
            return tarefas[i]
    
    return None

def deletar_tarefa(tarefa_id):
    """Remove uma tarefa pelo ID."""

    tarefas = carregar_tarefas()
    
    for i, tarefa in enumerate(tarefas):
        if tarefa['id'] == tarefa_id:
            tarefa_removida = tarefas.pop(i)
            salvar_tarefas(tarefas)
            return tarefa_removida
    
    return None

class CRUDHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        """Implementa o método GET para listar ou obter tarefas."""

        parsed_url = urllib.parse.urlparse(self.path)
        query_params = urllib.parse.parse_qs(parsed_url.query)
        
        if parsed_url.path == '/':
            self.send_response(HTTPStatus.OK)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            
            self.wfile.write(self._render_index_page().encode('utf-8'))
            
        elif parsed_url.path == '/api/tarefas':
            tarefas = carregar_tarefas()
            
            self.send_response(HTTPStatus.OK)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.end_headers()
            
            self.wfile.write(json.dumps(tarefas, ensure_ascii=False).encode('utf-8'))
            
        elif parsed_url.path.startswith('/api/tarefas/') and len(parsed_url.path.split('/')) == 4:
            tarefa_id = parsed_url.path.split('/')[3]
            tarefa = ler_tarefa(tarefa_id)
            
            if tarefa:
                self.send_response(HTTPStatus.OK)
                self.send_header('Content-type', 'application/json; charset=utf-8')
                self.end_headers()
                
                self.wfile.write(json.dumps(tarefa, ensure_ascii=False).encode('utf-8'))
            else:
                self.send_response(HTTPStatus.NOT_FOUND)
                self.send_header('Content-type', 'application/json; charset=utf-8')
                self.end_headers()
                
                self.wfile.write(json.dumps({"erro": "Tarefa não encontrada"}, ensure_ascii=False).encode('utf-8'))
        
        elif parsed_url.path == '/nova-tarefa':
            self.send_response(HTTPStatus.OK)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            
            self.wfile.write(self._render_form_page().encode('utf-8'))
        
        else:
            self.send_response(HTTPStatus.NOT_FOUND)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            
            self.wfile.write(self._render_not_found_page().encode('utf-8'))
    
    def do_POST(self):
        """Implementa o método POST para criar tarefas."""

        parsed_url = urllib.parse.urlparse(self.path)
        
        if parsed_url.path == '/api/tarefas':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length).decode('utf-8')
            
            if self.headers['Content-Type'] == 'application/x-www-form-urlencoded':
                data = urllib.parse.parse_qs(post_data)
                titulo = data.get('titulo', [''])[0]
                descricao = data.get('descricao', [''])[0]
            else:  # application/json
                try:
                    data = json.loads(post_data)
                    titulo = data.get('titulo', '')
                    descricao = data.get('descricao', '')
                except json.JSONDecodeError:
                    self.send_response(HTTPStatus.BAD_REQUEST)
                    self.send_header('Content-type', 'application/json; charset=utf-8')
                    self.end_headers()
                    
                    self.wfile.write(json.dumps({"erro": "Dados inválidos"}, ensure_ascii=False).encode('utf-8'))
                    return
            
            if not titulo:
                self.send_response(HTTPStatus.BAD_REQUEST)
                self.send_header('Content-type', 'application/json; charset=utf-8')
                self.end_headers()
                
                self.wfile.write(json.dumps({"erro": "Título é obrigatório"}, ensure_ascii=False).encode('utf-8'))
                return
            
            tarefa = criar_tarefa(titulo, descricao)
            
            self.send_response(HTTPStatus.CREATED)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.end_headers()
            
            self.wfile.write(json.dumps(tarefa, ensure_ascii=False).encode('utf-8'))
        
        else:
            self.send_response(HTTPStatus.NOT_FOUND)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.end_headers()
            
            self.wfile.write(json.dumps({"erro": "Rota não encontrada"}, ensure_ascii=False).encode('utf-8'))
    
    def do_PUT(self):
        """Implementa o método PUT para atualizar tarefas."""
        parsed_url = urllib.parse.urlparse(self.path)
        
        if parsed_url.path.startswith('/api/tarefas/') and len(parsed_url.path.split('/')) == 4:
            tarefa_id = parsed_url.path.split('/')[3]
            
            content_length = int(self.headers['Content-Length'])
            put_data = self.rfile.read(content_length).decode('utf-8')
            
            try:
                data = json.loads(put_data)
            except json.JSONDecodeError:
                self.send_response(HTTPStatus.BAD_REQUEST)
                self.send_header('Content-type', 'application/json; charset=utf-8')
                self.end_headers()
                
                self.wfile.write(json.dumps({"erro": "Dados inválidos"}, ensure_ascii=False).encode('utf-8'))
                return
            
            tarefa = atualizar_tarefa(
                tarefa_id,
                titulo=data.get('titulo'),
                descricao=data.get('descricao'),
                concluida=data.get('concluida')
            )
            
            if tarefa:
                self.send_response(HTTPStatus.OK)
                self.send_header('Content-type', 'application/json; charset=utf-8')
                self.end_headers()
                
                self.wfile.write(json.dumps(tarefa, ensure_ascii=False).encode('utf-8'))
            else:
                self.send_response(HTTPStatus.NOT_FOUND)
                self.send_header('Content-type', 'application/json; charset=utf-8')
                self.end_headers()
                
                self.wfile.write(json.dumps({"erro": "Tarefa não encontrada"}, ensure_ascii=False).encode('utf-8'))
        else:
            self.send_response(HTTPStatus.NOT_FOUND)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.end_headers()
            
            self.wfile.write(json.dumps({"erro": "Rota não encontrada"}, ensure_ascii=False).encode('utf-8'))
    
    def do_DELETE(self):
        """Implementa o método DELETE para remover tarefas."""

        parsed_url = urllib.parse.urlparse(self.path)
        
        if parsed_url.path.startswith('/api/tarefas/') and len(parsed_url.path.split('/')) == 4:
            tarefa_id = parsed_url.path.split('/')[3]
            
            tarefa = deletar_tarefa(tarefa_id)
            
            if tarefa:
                self.send_response(HTTPStatus.OK)
                self.send_header('Content-type', 'application/json; charset=utf-8')
                self.end_headers()
                
                self.wfile.write(json.dumps({"mensagem": "Tarefa removida com sucesso"}, ensure_ascii=False).encode('utf-8'))
            else:
                self.send_response(HTTPStatus.NOT_FOUND)
                self.send_header('Content-type', 'application/json; charset=utf-8')
                self.end_headers()
                
                self.wfile.write(json.dumps({"erro": "Tarefa não encontrada"}, ensure_ascii=False).encode('utf-8'))
        else:
            self.send_response(HTTPStatus.NOT_FOUND)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.end_headers()
            
            self.wfile.write(json.dumps({"erro": "Rota não encontrada"}, ensure_ascii=False).encode('utf-8'))
    
    def _render_index_page(self):
        """Renderiza a página inicial."""

        tarefas = carregar_tarefas()
        
        html = """
        <!DOCTYPE html>
        <html>
        <head>
            <title>Gerenciador de Tarefas</title>
            <meta charset="utf-8">
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
                .task {
                    background-color: #f9f9f9;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 15px;
                    margin-bottom: 10px;
                }
                .task h3 {
                    margin-top: 0;
                    color: #3498db;
                }
                .task p {
                    margin-bottom: 5px;
                }
                .completed {
                    text-decoration: line-through;
                    opacity: 0.7;
                }
                .actions {
                    margin-top: 10px;
                }
                .actions button {
                    background-color: #3498db;
                    color: white;
                    border: none;
                    padding: 5px 10px;
                    border-radius: 3px;
                    cursor: pointer;
                    margin-right: 5px;
                }
                .actions button.delete {
                    background-color: #e74c3c;
                }
                .add-task {
                    margin-bottom: 20px;
                }
                .add-task a {
                    display: inline-block;
                    background-color: #2ecc71;
                    color: white;
                    text-decoration: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Gerenciador de Tarefas</h1>
                
                <div class="add-task">
                    <a href="/nova-tarefa">+ Nova Tarefa</a>
                </div>
                
                <h2>Suas Tarefas</h2>
        """
        
        if not tarefas:
            html += """
                <p>Nenhuma tarefa encontrada. Comece criando uma nova tarefa!</p>
            """
        else:
            for tarefa in tarefas:
                task_class = "task completed" if tarefa.get('concluida') else "task"
                html += f"""
                <div class="{task_class}" id="tarefa-{tarefa['id']}">
                    <h3>{tarefa['titulo']}</h3>
                    <p>{tarefa['descricao']}</p>
                    <p><small>Criada em: {tarefa['criada_em']}</small></p>
                    <div class="actions">
                        <button onclick="alternarConcluida('{tarefa['id']}')">
                            {"Desmarcar" if tarefa.get('concluida') else "Concluir"}
                        </button>
                        <button class="delete" onclick="excluirTarefa('{tarefa['id']}')">Excluir</button>
                    </div>
                </div>
                """
        
        html += """
                <script>
                    // Função para marcar/desmarcar tarefa como concluída
                    function alternarConcluida(id) {
                        const taskElement = document.getElementById(`tarefa-${id}`);
                        const isCompleted = taskElement.classList.contains('completed');
                        
                        // Envia requisição PUT para atualizar o status da tarefa
                        fetch(`/api/tarefas/${id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                concluida: !isCompleted
                            })
                        })
                        .then(response => {
                            if (response.ok) {
                                // Atualiza a interface
                                if (isCompleted) {
                                    taskElement.classList.remove('completed');
                                    taskElement.querySelector('button').innerText = 'Concluir';
                                } else {
                                    taskElement.classList.add('completed');
                                    taskElement.querySelector('button').innerText = 'Desmarcar';
                                }
                            } else {
                                alert('Erro ao atualizar tarefa');
                            }
                        })
                        .catch(error => {
                            console.error('Erro:', error);
                            alert('Erro ao atualizar tarefa');
                        });
                    }
                    
                    // Função para excluir uma tarefa
                    function excluirTarefa(id) {
                        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
                            // Envia requisição DELETE para remover a tarefa
                            fetch(`/api/tarefas/${id}`, {
                                method: 'DELETE'
                            })
                            .then(response => {
                                if (response.ok) {
                                    // Remove o elemento da interface
                                    document.getElementById(`tarefa-${id}`).remove();
                                } else {
                                    alert('Erro ao excluir tarefa');
                                }
                            })
                            .catch(error => {
                                console.error('Erro:', error);
                                alert('Erro ao excluir tarefa');
                            });
                        }
                    }
                </script>
            </div>
        </body>
        </html>
        """
        
        return html
    
    def _render_form_page(self):
        """Renderiza a página de formulário para criar nova tarefa."""
        html = """
        <!DOCTYPE html>
        <html>
        <head>
            <title>Nova Tarefa</title>
            <meta charset="utf-8">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                    line-height: 1.6;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                }
                h1 {
                    color: #2c3e50;
                }
                .form-group {
                    margin-bottom: 15px;
                }
                label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: bold;
                }
                input[type="text"], textarea {
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    box-sizing: border-box;
                }
                textarea {
                    height: 100px;
                    resize: vertical;
                }
                button {
                    background-color: #3498db;
                    color: white;
                    border: none;
                    padding: 10px 15px;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .back-link {
                    display: inline-block;
                    margin-top: 20px;
                    color: #7f8c8d;
                    text-decoration: none;
                }
                .back-link:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Nova Tarefa</h1>
                
                <form id="taskForm">
                    <div class="form-group">
                        <label for="titulo">Título:</label>
                        <input type="text" id="titulo" name="titulo" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="descricao">Descrição:</label>
                        <textarea id="descricao" name="descricao"></textarea>
                    </div>
                    
                    <button type="submit">Salvar</button>
                </form>
                
                <a href="/" class="back-link">← Voltar para a lista de tarefas</a>
                
                <script>
                    // Manipula o envio do formulário
                    document.getElementById('taskForm').addEventListener('submit', function(e) {
                        e.preventDefault();
                        
                        const titulo = document.getElementById('titulo').value;
                        const descricao = document.getElementById('descricao').value;
                        
                        // Envia os dados para a API
                        fetch('/api/tarefas', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                titulo: titulo,
                                descricao: descricao
                            })
                        })
                        .then(response => {
                            if (response.ok) {
                                // Redireciona para a página inicial
                                window.location.href = '/';
                            } else {
                                return response.json().then(data => {
                                    throw new Error(data.erro || 'Erro ao criar tarefa');
                                });
                            }
                        })
                        .catch(error => {
                            alert(error.message);
                        });
                    });
                </script>
            </div>
        </body>
        </html>
        """
        
        return html
    
    def _render_not_found_page(self):
        """Renderiza a página de erro 404."""
        html = """
        <!DOCTYPE html>
        <html>
        <head>
            <title>Página não encontrada</title>
            <meta charset="utf-8">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                    line-height: 1.6;
                    text-align: center;
                }
                .container {
                    max-width: 600px;
                    margin: 50px auto;
                }
                h1 {
                    color: #e74c3c;
                    font-size: 36px;
                }
                p {
                    font-size: 18px;
                    color: #7f8c8d;
                }
                .back-link {
                    display: inline-block;
                    margin-top: 20px;
                    background-color: #3498db;
                    color: white;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>404 - Página não encontrada</h1>
                <p>A página que você está procurando não existe.</p>
                <a href="/" class="back-link">Voltar para a página inicial</a>
            </div>
        </body>
        </html>
        """
        
        return html

def iniciar_servidor():
    """Inicia o servidor HTTP na porta definida."""

    with socketserver.TCPServer(("", PORT), CRUDHandler) as httpd:
        print(f"Servidor rodando na porta {PORT}")
        print(f"Gerenciador de Tarefas disponível em: http://localhost:{PORT}")
        print("Pressione Ctrl+C para encerrar.")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("Servidor encerrado.")

if __name__ == "__main__":
    iniciar_servidor() 