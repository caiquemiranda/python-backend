# App 9 - CRUD com FastAPI + SQLite

## O que este projeto faz

Este projeto implementa uma API RESTful completa para gerenciamento de tarefas utilizando FastAPI com persistência de dados em SQLite. A aplicação segue uma arquitetura bem estruturada com separação de responsabilidades e demonstra como criar uma aplicação com operações CRUD completas, incluindo:

- Criação, leitura, atualização e exclusão de tarefas (CRUD)
- Filtragem e paginação de resultados
- Validação de dados com Pydantic
- Mapeamento objeto-relacional (ORM) com SQLAlchemy
- Banco de dados SQLite para persistência de dados
- Operações específicas para gerenciamento de tarefas (marcar como concluída/não concluída)

A API é documentada automaticamente e segue as melhores práticas de desenvolvimento para APIs REST.

## O que este projeto ensina

- **Integração com bancos de dados**: Como conectar uma API FastAPI a um banco de dados SQLite usando SQLAlchemy
- **ORM com SQLAlchemy**: Como usar SQLAlchemy para mapeamento objeto-relacional
- **Esquemas Pydantic avançados**: Como criar modelos de validação para entrada e saída de dados
- **Dependency Injection**: Como usar o sistema de dependências do FastAPI para gerenciar sessões de banco de dados
- **Organização de projeto**: Como estruturar um projeto FastAPI em módulos e pacotes
- **Operações assíncronas**: Como implementar funções assíncronas em uma API web
- **Filtragem e paginação**: Como implementar filtragem e paginação de resultados
- **Tratamento de erros**: Como lidar com exceções e retornar respostas de erro apropriadas
- **Middleware**: Como adicionar middleware, como CORS, para melhorar a segurança e funcionalidade

## Conceitos importantes

- **Arquitetura em camadas**: Separação entre modelos, schemas e rotas
- **ORM (Object-Relational Mapping)**: Mapeamento entre objetos Python e tabelas de banco de dados
- **Migrations implícitas**: Criação automática de tabelas no banco de dados
- **Validação de modelos**: Validação de dados de entrada e saída com Pydantic
- **Dependency Injection**: Técnica para fornecer dependências para funções
- **Middlewares**: Componentes intermediários que processam requisições e respostas
- **HTTP Status Codes**: Uso apropriado de códigos de status HTTP
- **Query Parameters**: Parâmetros para filtragem e paginação de resultados

## Como rodar o projeto

### Pré-requisitos

- Python 3.6 ou superior
- pip (gerenciador de pacotes do Python)
- Ambiente virtual (recomendado)

### Passos para executar

1. Clone o repositório (se aplicável) ou navegue até a pasta do projeto:
   ```
   cd app9
   ```

2. Crie e ative um ambiente virtual (opcional mas recomendado):
   ```
   # No Windows
   python -m venv venv
   venv\Scripts\activate

   # No Linux/Mac
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Instale as dependências:
   ```
   pip install -r requirements.txt
   ```

4. Execute a aplicação:
   ```
   python main.py
   ```

5. A API estará disponível em `http://localhost:8000`

### Explorando a API

Após iniciar o servidor, você pode acessar:

- **Documentação interativa Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **Documentação alternativa ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

### Endpoints disponíveis

#### Tarefas

- `GET /tasks/`: Lista todas as tarefas com suporte para filtragem e paginação
  - Query params: `skip`, `limit`, `completed`, `priority`
- `GET /tasks/{task_id}`: Obtém uma tarefa específica pelo ID
- `POST /tasks/`: Cria uma nova tarefa
- `PUT /tasks/{task_id}`: Atualiza uma tarefa existente
- `DELETE /tasks/{task_id}`: Remove uma tarefa pelo ID
- `PATCH /tasks/{task_id}/complete`: Marca uma tarefa como concluída
- `PATCH /tasks/{task_id}/incomplete`: Marca uma tarefa como não concluída

### Exemplos de uso com cURL

#### Listar todas as tarefas:
```bash
curl http://localhost:8000/tasks/
```

#### Filtrar tarefas concluídas:
```bash
curl http://localhost:8000/tasks/?completed=true
```

#### Filtrar tarefas por prioridade:
```bash
curl http://localhost:8000/tasks/?priority=3
```

#### Criar uma nova tarefa:
```bash
curl -X POST http://localhost:8000/tasks/ \
  -H "Content-Type: application/json" \
  -d '{"title": "Estudar FastAPI", "description": "Aprender desenvolvimento de APIs com FastAPI", "priority": 2}'
```

#### Atualizar uma tarefa:
```bash
curl -X PUT http://localhost:8000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Estudar FastAPI avançado", "description": "Aprofundar no desenvolvimento de APIs com FastAPI", "priority": 3}'
```

#### Marcar tarefa como concluída:
```bash
curl -X PATCH http://localhost:8000/tasks/1/complete
```

#### Excluir uma tarefa:
```bash
curl -X DELETE http://localhost:8000/tasks/1
```

## Estrutura do projeto

```
app9/
├── app/                     # Pacote principal da aplicação
│   ├── __init__.py          # Inicialização do pacote
│   ├── main.py              # Arquivo principal da aplicação FastAPI
│   ├── database/            # Pacote para configuração de banco de dados
│   │   ├── __init__.py      # Inicialização do pacote database
│   │   └── database.py      # Configuração do SQLAlchemy e sessão
│   ├── models/              # Pacote para modelos ORM
│   │   ├── __init__.py      # Inicialização do pacote models
│   │   └── task.py          # Modelo ORM para tarefas
│   ├── schemas/             # Pacote para schemas Pydantic
│   │   ├── __init__.py      # Inicialização do pacote schemas
│   │   └── task.py          # Schemas Pydantic para tarefas
│   └── routes/              # Pacote para rotas da API
│       ├── __init__.py      # Inicialização do pacote routes
│       └── tasks.py         # Rotas para operações de tarefas
├── main.py                  # Script para executar a aplicação
└── requirements.txt         # Dependências do projeto
```

## Diferenças entre este projeto e os anteriores

- **Persistência de dados**: Diferente do app8, que armazenava dados em memória, este projeto persiste dados em um banco de dados SQLite
- **Arquitetura estruturada**: Organização em pacotes e módulos seguindo uma arquitetura em camadas
- **ORM**: Uso de SQLAlchemy para mapeamento objeto-relacional
- **Schemas avançados**: Definição separada de schemas para criar, atualizar e visualizar dados
- **Endpoints especializados**: Implementação de endpoints específicos para operações como marcar tarefas como concluídas

## Próximos passos

Após entender este projeto CRUD com FastAPI e SQLite, você estará preparado para avançar para tópicos mais avançados como:

- Autenticação e autorização com JWT
- Testes automatizados para APIs
- Migrations explícitas com Alembic
- Implementação de relacionamentos mais complexos no banco de dados
- Deploy em ambientes de produção 