# App 10 - API Avançada com FastAPI, SQLAlchemy e JWT

## O que este projeto faz

Este projeto implementa uma API RESTful avançada utilizando FastAPI, com recursos completos de autenticação JWT, CRUD de usuários e itens, relacionamentos entre modelos, estrutura de projeto bem organizada, logs e tratamento de erros. Esta aplicação representa o ponto mais avançado da série, incluindo:

- Autenticação JWT com papéis de usuário (superusuário e usuário comum)
- Operações CRUD completas para usuários e itens com permissões baseadas em papel
- Organização modular seguindo boas práticas de design
- Classes base genéricas para operações CRUD
- Relacionamentos entre modelos de dados
- Tratamento avançado de erros e validação
- Configuração completa com variáveis de ambiente
- Sistema de logs
- Documentação automática com Swagger/OpenAPI

## O que este projeto ensina

- **Autenticação JWT**: Como implementar autenticação segura com tokens JWT
- **Controle de acesso**: Como implementar controle de acesso baseado em papéis
- **Arquitetura Modular**: Como estruturar um projeto FastAPI em módulos bem organizados
- **Classes genéricas**: Como criar classes base genéricas para operações CRUD
- **Middleware CORS**: Como configurar CORS para permitir acesso seguro à API
- **Configuração com Pydantic**: Como usar Pydantic para configuração robusta da aplicação
- **Tratamento de erros**: Como implementar um sistema avançado de tratamento de erros
- **Logs**: Como configurar um sistema de logs para monitoramento
- **Type Hints**: Como usar dicas de tipo Python para aumentar a segurança e a manutenibilidade
- **Documentação avançada**: Como documentar uma API de forma completa e interativa

## Conceitos importantes

- **Arquitetura em camadas**: Separação clara de responsabilidades (modelos, rotas, CRUD, schemas)
- **Dependency Injection**: Uso extensivo de injeção de dependência para modularidade
- **JWT (JSON Web Tokens)**: Tokens seguros para autenticação stateless
- **Tipos genéricos**: Uso de tipos genéricos para criar classes base reutilizáveis
- **Classes base abstratas**: Criação de classes abstratas para herança e especialização
- **Segurança avançada**: Hashing de senhas, autenticação OAuth2, controle de acesso
- **Unit testing**: Estrutura preparada para testes unitários
- **Migrations**: Compatibilidade com Alembic para migrations de banco de dados

## Como rodar o projeto

### Pré-requisitos

- Python 3.6 ou superior
- pip (gerenciador de pacotes do Python)
- Ambiente virtual (recomendado)

### Passos para executar

1. Clone o repositório (se aplicável) ou navegue até a pasta do projeto:
   ```
   cd app10
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

#### Autenticação

- `POST /api/v1/login/access-token`: Obtém um token de acesso JWT
- `POST /api/v1/login/test-token`: Testa se um token é válido

#### Usuários

- `GET /api/v1/users/`: Lista todos os usuários (somente superusuário)
- `POST /api/v1/users/`: Cria um novo usuário (somente superusuário)
- `GET /api/v1/users/me`: Obtém dados do usuário logado
- `PUT /api/v1/users/me`: Atualiza dados do usuário logado
- `GET /api/v1/users/{user_id}`: Obtém dados de um usuário específico (somente superusuário)
- `PUT /api/v1/users/{user_id}`: Atualiza um usuário específico (somente superusuário)
- `DELETE /api/v1/users/{user_id}`: Remove um usuário (somente superusuário)

#### Itens

- `GET /api/v1/items/`: Lista todos os itens
- `POST /api/v1/items/`: Cria um novo item
- `GET /api/v1/items/{item_id}`: Obtém dados de um item específico
- `PUT /api/v1/items/{item_id}`: Atualiza um item específico
- `DELETE /api/v1/items/{item_id}`: Remove um item

### Exemplos de uso com cURL

#### Obter token de acesso:
```bash
curl -X POST http://localhost:8000/api/v1/login/access-token \
  -d "username=admin@example.com&password=admin" \
  -H "Content-Type: application/x-www-form-urlencoded"
```

#### Listar itens com token:
```bash
curl -X GET http://localhost:8000/api/v1/items/ \
  -H "Authorization: Bearer {seu_token_aqui}"
```

#### Criar um novo item:
```bash
curl -X POST http://localhost:8000/api/v1/items/ \
  -H "Authorization: Bearer {seu_token_aqui}" \
  -H "Content-Type: application/json" \
  -d '{"title": "Novo Item", "description": "Descrição do novo item"}'
```

## Estrutura do projeto

```
app10/
├── app/                      # Pacote principal da aplicação
│   ├── __init__.py           # Inicialização do pacote
│   ├── main.py               # Arquivo principal da aplicação FastAPI
│   ├── api/                  # Pacote para APIs e endpoints
│   │   ├── __init__.py       # Inicialização do pacote api
│   │   ├── deps.py           # Dependências para injeção
│   │   └── v1/               # Versão 1 da API
│   │       ├── __init__.py   # Inicialização do pacote v1
│   │       ├── api.py        # Configuração principal da API v1
│   │       └── endpoints/    # Endpoints específicos da API
│   │           ├── __init__.py  # Inicialização do pacote endpoints
│   │           ├── items.py     # Endpoints para itens
│   │           ├── login.py     # Endpoints para autenticação
│   │           └── users.py     # Endpoints para usuários
│   ├── core/                 # Configurações centrais
│   │   ├── __init__.py       # Inicialização do pacote core
│   │   ├── config.py         # Configurações da aplicação
│   │   └── security.py       # Utilitários de segurança
│   ├── crud/                 # Operações CRUD
│   │   ├── __init__.py       # Inicialização do pacote crud
│   │   ├── base.py           # Classe base para operações CRUD
│   │   ├── item.py           # Operações CRUD para itens
│   │   └── user.py           # Operações CRUD para usuários
│   ├── db/                   # Configuração do banco de dados
│   │   ├── __init__.py       # Inicialização do pacote db
│   │   ├── base.py           # Configuração base do SQLAlchemy
│   │   └── session.py        # Gerenciamento de sessões
│   ├── logs/                 # Diretório para arquivos de log
│   ├── models/               # Modelos SQLAlchemy
│   │   ├── __init__.py       # Inicialização do pacote models
│   │   ├── item.py           # Modelo de item
│   │   └── user.py           # Modelo de usuário
│   ├── schemas/              # Schemas Pydantic
│   │   ├── __init__.py       # Inicialização do pacote schemas
│   │   ├── item.py           # Schemas para itens
│   │   ├── token.py          # Schemas para tokens
│   │   └── user.py           # Schemas para usuários
│   ├── tests/                # Testes automatizados
│   └── utils/                # Funções utilitárias
├── main.py                   # Script para executar a aplicação
└── requirements.txt          # Dependências do projeto
```

## Diferenças entre este projeto e os anteriores

- **Autenticação e Autorização**: Implementação completa de autenticação JWT e autorização baseada em papéis
- **Organização**: Estrutura de projeto avançada e modular
- **Tipos genéricos**: Uso de tipos genéricos para criar classes base reutilizáveis
- **Tratamento de erros**: Sistema avançado e centralizado de tratamento de erros
- **Logs**: Sistema de logs para monitoramento
- **Configuração**: Uso de Pydantic Settings para configuração robusta
- **Testes**: Estrutura preparada para testes unitários
- **Middlewares**: Implementação de CORS e outros middlewares

## Próximos passos

Após dominar este projeto, você terá uma base sólida para desenvolvimento de APIs web com FastAPI. Alguns tópicos avançados que você pode explorar incluem:

- Implementação de cache com Redis
- Filas de tarefas assíncronas com Celery
- Autenticação com provedores OAuth externos (Google, Facebook, etc.)
- Implantação em ambientes de produção (Docker, Kubernetes)
- CI/CD com GitHub Actions ou GitLab CI
- Microserviços e comunicação entre serviços
- WebSockets para comunicação em tempo real 