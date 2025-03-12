# Python Backend Learning Path

Este repositório contém uma série de aplicações backend em Python organizadas em uma progressão didática, desde conceitos básicos até implementações avançadas. Cada aplicação (`app1` até `app10`) introduz novos conceitos e tecnologias, formando um caminho de aprendizado completo para desenvolvimento backend com Python.

## Estrutura do Repositório

O repositório está organizado em 10 projetos independentes, cada um construindo sobre os conceitos dos anteriores:

### App 1 - Hello World com Flask
- **Conceitos**: Introdução ao desenvolvimento web, rotas básicas
- **Tecnologias**: Flask
- **Funcionalidades**: Servidor web básico com rota "Hello World"

### App 2 - Flask com Templates
- **Conceitos**: Templates, renderização de HTML
- **Tecnologias**: Flask, Jinja2
- **Funcionalidades**: Renderização de páginas HTML usando templates

### App 3 - Flask com Formulários
- **Conceitos**: Processamento de formulários, requisições POST
- **Tecnologias**: Flask, Jinja2, WTForms
- **Funcionalidades**: Formulários para envio de dados, validação básica

### App 4 - Flask com SQLite
- **Conceitos**: Banco de dados, modelo de dados
- **Tecnologias**: Flask, SQLite, SQLAlchemy
- **Funcionalidades**: CRUD completo, persistência de dados

### App 5 - RESTful API com Flask
- **Conceitos**: APIs REST, serialização de dados
- **Tecnologias**: Flask, Flask-RESTful
- **Funcionalidades**: Endpoints RESTful, JSON

### App 6 - Sistema de Upload de Arquivos
- **Conceitos**: Upload e gerenciamento de arquivos
- **Tecnologias**: Flask, Flask-Upload
- **Funcionalidades**: Upload, download, listagem e exclusão de arquivos

### App 7 - API Estruturada com Flask e Blueprints
- **Conceitos**: Modularização, organização de código
- **Tecnologias**: Flask, Blueprints
- **Funcionalidades**: API organizada em módulos, versionamento de API

### App 8 - Introdução ao FastAPI
- **Conceitos**: FastAPI, documentação automática
- **Tecnologias**: FastAPI, Pydantic
- **Funcionalidades**: CRUD com documentação OpenAPI/Swagger

### App 9 - CRUD com FastAPI e SQLite
- **Conceitos**: ORM, validação de dados
- **Tecnologias**: FastAPI, SQLAlchemy, Pydantic
- **Funcionalidades**: CRUD completo com banco de dados, filtragem, paginação

### App 10 - API Avançada com FastAPI, SQLAlchemy e JWT
- **Conceitos**: Autenticação, autorização, arquitetura modular
- **Tecnologias**: FastAPI, SQLAlchemy, JWT, Pydantic
- **Funcionalidades**: Autenticação, controle de acesso, CRUD avançado, tratamento de erros

## Como utilizar

Cada aplicação está contida em seu próprio diretório e pode ser executada independentemente. Consulte o README.md em cada diretório para instruções específicas.

### Requisitos gerais
- Python 3.6+
- pip (gerenciador de pacotes Python)
- Ambiente virtual (recomendado)

### Instalação e execução (geral)
1. Navegue até o diretório da aplicação desejada:
   ```
   cd app{número}
   ```

2. Crie e ative um ambiente virtual:
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
   # Para aplicações Flask
   python app.py
   
   # Para aplicações FastAPI
   python main.py
   ```

## Progressão de aprendizado

Esta série de aplicações foi projetada para uma progressão gradual de aprendizado:

1. **Fundamentos** (App 1-3): Conceitos básicos de desenvolvimento web
2. **Persistência de dados** (App 4): Introdução a bancos de dados
3. **APIs RESTful** (App 5): Construção de APIs para comunicação entre sistemas
4. **Tópicos avançados** (App 6-7): Uploads de arquivos e organização de código
5. **FastAPI** (App 8-10): Desenvolvimento com framework moderno, tipagem e desempenho

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorar este repositório de aprendizado.
