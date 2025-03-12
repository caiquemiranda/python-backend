# App 4 - CRUD com Flask e SQLite

## O que este projeto faz
Este projeto implementa uma aplicação web completa de gerenciamento de tarefas com persistência de dados em SQLite. A aplicação oferece interface web completa e também endpoints API para todas as operações CRUD (Create, Read, Update, Delete).

## O que este projeto ensina
- Como conectar um aplicativo Flask a um banco de dados SQLite
- Como implementar operações CRUD em um banco de dados relacional
- Como usar templates Jinja2 para gerar HTML dinâmico
- Como trabalhar com templates, formulários e validação de dados
- Como implementar feedback ao usuário usando flash messages
- Como estruturar endpoints API REST no mesmo aplicativo
- Como gerenciar conexões de banco de dados em um aplicativo web

## Conceitos importantes
- **Template Engine**: Jinja2 para renderizar HTML dinâmico
- **SQLite**: Banco de dados SQL leve e embutido
- **Flashing**: Mecanismo para fornecer feedback ao usuário
- **Redirecionamentos**: Direcionamento do usuário após operações
- **URL Building**: Construção dinâmica de URLs com `url_for()`
- **Variáveis de contexto**: Passando dados para templates
- **API REST**: Endpoints para acessar a mesma funcionalidade via API

## Como rodar o projeto

### Pré-requisitos
- Python 3.x instalado
- pip (gerenciador de pacotes do Python)

### Passos para executar
1. Navegue até a pasta do projeto:
   ```
   cd app4
   ```

2. Instale as dependências:
   ```
   pip install -r requirements.txt
   ```

3. Execute o aplicativo Flask:
   ```
   python app.py
   ```

4. Abra seu navegador e acesse:
   ```
   http://localhost:8000
   ```

5. Explore a interface para:
   - Listar todas as tarefas
   - Adicionar novas tarefas
   - Editar tarefas existentes
   - Marcar tarefas como concluídas/não concluídas
   - Excluir tarefas

## Testando a API
A aplicação também oferece uma API REST para integração com outros sistemas:

### Listar todas as tarefas
```
GET http://localhost:8000/api/tarefas
```

### Obter uma tarefa específica
```
GET http://localhost:8000/api/tarefas/1
```

### Criar uma nova tarefa
```
POST http://localhost:8000/api/tarefas
Content-Type: application/json

{
  "titulo": "Nova tarefa via API",
  "descricao": "Esta tarefa foi criada via API"
}
```

### Atualizar uma tarefa
```
PUT http://localhost:8000/api/tarefas/1
Content-Type: application/json

{
  "titulo": "Tarefa atualizada",
  "concluida": true
}
```

### Excluir uma tarefa
```
DELETE http://localhost:8000/api/tarefas/1
```

## Estrutura do banco de dados
A aplicação utiliza uma tabela SQLite simples:

```sql
CREATE TABLE tarefas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descricao TEXT,
    concluida INTEGER DEFAULT 0,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## Estrutura do projeto
- `app.py`: Código principal da aplicação
- `templates/`: Diretório de templates HTML
  - `index.html`: Lista de tarefas
  - `formulario.html`: Formulário para adicionar/editar tarefas
- `tarefas.db`: Banco de dados SQLite (criado automaticamente)

## Próximos passos
Após dominar este exemplo CRUD com Flask e SQLite, você estará pronto para avançar para o próximo projeto, onde adicionaremos autenticação de usuários para proteger rotas e dados. 