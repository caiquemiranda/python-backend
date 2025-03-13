# App 8 - Introdução ao FastAPI

## O que este projeto faz

Este projeto implementa uma API RESTful básica usando o framework FastAPI, oferecendo funcionalidades simples para gerenciar uma coleção de itens. A aplicação demonstra os conceitos fundamentais do FastAPI, incluindo:

- Criação de endpoints REST
- Definição de rotas com diferentes métodos HTTP (GET, POST, PUT, DELETE)
- Uso de parâmetros de caminho (path parameters)
- Uso de parâmetros de consulta (query parameters)
- Validação de dados com Pydantic
- Documentação automática interativa

A API permite realizar operações CRUD (Create, Read, Update, Delete) em uma coleção de itens armazenados em memória, com exemplos de dados pré-carregados para facilitar os testes.

## O que este projeto ensina

- **Introdução ao FastAPI**: Fundamentos do framework FastAPI e suas vantagens
- **Endpoints REST**: Como criar endpoints REST para diferentes operações
- **Modelos Pydantic**: Como definir e validar modelos de dados com Pydantic
- **Parâmetros de Path/Query**: Como receber e validar diferentes tipos de parâmetros
- **Documentação automática**: Como a documentação OpenAPI é gerada automaticamente
- **Validação de dados**: Como o FastAPI gerencia a validação de dados de entrada
- **Funcionalidades assíncronas**: Como usar funções assíncronas com FastAPI

## Conceitos importantes

- **FastAPI**: Framework moderno, rápido e de alto desempenho para APIs
- **Pydantic**: Biblioteca para validação de dados e configurações
- **Async/Await**: Programação assíncrona em Python
- **OpenAPI/Swagger**: Especificação e interface para documentação de APIs
- **RESTful API**: Princípios e implementação de APIs RESTful
- **Validação de tipos**: Tipagem forte em Python com Type Hints
- **HTTP Status Codes**: Códigos de status apropriados para cada operação

## Como rodar o projeto

### Pré-requisitos

- Python 3.6 ou superior
- pip (gerenciador de pacotes do Python)
- Ambiente virtual (recomendado)

### Passos para executar

1. Clone o repositório (se aplicável) ou navegue até a pasta do projeto:
   ```
   cd app8
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

- `GET /`: Rota raiz, retorna mensagem de boas-vindas
- `GET /hello`: Hello World básico
- `GET /hello/{name}`: Hello World personalizado com parâmetro de caminho
- `GET /items`: Lista todos os itens com suporte para paginação e busca
  - Query params: `skip`, `limit`, `search`
- `GET /items/{item_id}`: Obtém um item específico pelo ID
- `POST /items`: Cria um novo item
- `PUT /items/{item_id}`: Atualiza um item existente
- `DELETE /items/{item_id}`: Remove um item pelo ID
- `GET /items/{item_id}/price`: Calcula o preço total de um item
  - Query param: `quantity`

### Exemplos de uso

#### Listar todos os itens:
```bash
curl http://localhost:8000/items
```

#### Criar um novo item:
```bash
curl -X POST http://localhost:8000/items \
  -H "Content-Type: application/json" \
  -d '{"name": "Mouse Gamer", "description": "Mouse gamer com 5 botões", "price": 120.0, "tax": 5.0}'
```

#### Obter um item específico:
```bash
curl http://localhost:8000/items/1
```

#### Atualizar um item:
```bash
curl -X PUT http://localhost:8000/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Smartphone Pro", "description": "Versão atualizada do smartphone", "price": 1200.0, "tax": 10.5}'
```

#### Excluir um item:
```bash
curl -X DELETE http://localhost:8000/items/1
```

## Diferenças entre FastAPI e Flask

O FastAPI difere do Flask em vários aspectos importantes:

1. **Desempenho**: FastAPI é construído sobre Starlette e Uvicorn, oferecendo desempenho muito superior
2. **Validação automática**: Validação de dados integrada com Pydantic
3. **Documentação automática**: Geração automática de documentação OpenAPI/Swagger
4. **Type Hints**: Uso extensivo de tipagem para validação e autocompletar em IDEs
5. **Async/Await**: Suporte nativo a operações assíncronas
6. **Validação de parâmetros**: Validação automática de parâmetros de caminho, consulta e corpo

## Próximos passos

Após entender os conceitos básicos do FastAPI apresentados neste exemplo, você estará preparado para explorar recursos mais avançados como:

- Integração com bancos de dados
- Autenticação e autorização
- Middleware e dependências
- Gerenciamento de arquivos e uploads
- WebSockets
- Backgound tasks 