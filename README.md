# Python Backend Learning Path

Este repositório contém uma série de aplicações backend e fullstack em Python organizadas em uma progressão didática, desde conceitos básicos até implementações avançadas. Cada aplicação (de `app1` até `app20`) introduz novos conceitos e tecnologias, formando um caminho de aprendizado completo para desenvolvimento com Python.

## Estrutura do Repositório

O repositório está organizado em várias aplicações independentes, cada uma construindo sobre os conceitos das anteriores:

### Aplicações Básicas (1-7): Fundamentos com Flask

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

### Aplicações Intermediárias (8-10): FastAPI

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

### Aplicações Avançadas (11-20): Projetos Completos

### App 11 - Blog com Django
- **Conceitos**: Django, MTV (Model-Template-View)
- **Tecnologias**: Django, SQLite
- **Funcionalidades**: Sistema de blog completo com autenticação

### App 12 - E-commerce com Django
- **Conceitos**: E-commerce, carrinhos de compra
- **Tecnologias**: Django, PostgreSQL
- **Funcionalidades**: Produtos, categorias, carrinhos, pedidos

### App 13 - API REST com Django REST Framework
- **Conceitos**: APIs REST em Django
- **Tecnologias**: Django, Django REST Framework
- **Funcionalidades**: Endpoints RESTful, serialização

### App 14 - Microsserviços com FastAPI e RabbitMQ
- **Conceitos**: Microsserviços, mensageria
- **Tecnologias**: FastAPI, RabbitMQ
- **Funcionalidades**: Comunicação assíncrona entre serviços

### App 15 - Aplicação Web em Tempo Real
- **Conceitos**: WebSockets, comunicação em tempo real
- **Tecnologias**: FastAPI, WebSockets
- **Funcionalidades**: Chat, notificações em tempo real

### App 16 - API GraphQL com Strawberry
- **Conceitos**: GraphQL, queries e mutations
- **Tecnologias**: FastAPI, Strawberry
- **Funcionalidades**: API GraphQL completa

### App 17 - Sistema de Autenticação OAuth2
- **Conceitos**: OAuth2, provedores de autenticação
- **Tecnologias**: FastAPI, OAuth2
- **Funcionalidades**: Login social, gestão de tokens

### App 18 - Aplicação React com Autenticação (Fullstack)
- **Conceitos**: Integração frontend/backend
- **Tecnologias**: React, Django REST Framework, JWT
- **Funcionalidades**: Sistema de autenticação completo, rotas protegidas, perfil de usuário

### App 19 - FileShare: Sistema de Upload de Arquivos (Fullstack)
- **Conceitos**: Upload e gerenciamento de arquivos, interface de usuário
- **Tecnologias**: React, Django REST Framework
- **Funcionalidades**: Upload, visualização e compartilhamento de arquivos, tema claro/escuro

### App 20 - TaskForge: Sistema de Gerenciamento de Projetos e Tarefas (Fullstack)
- **Conceitos**: Sistema completo de gestão, estruturas de dados complexas
- **Tecnologias**: React, Django REST Framework, Docker
- **Funcionalidades**: Gerenciamento de projetos, tarefas, equipes, dashboards e relatórios

## Progressão de Aprendizado

Este repositório apresenta uma progressão de aprendizado cuidadosamente estruturada:

1. **Fundamentos (Apps 1-7)**: Conceitos básicos de desenvolvimento web com Flask
2. **FastAPI (Apps 8-10)**: Transição para um framework moderno com tipagem e melhor desempenho
3. **Django (Apps 11-13)**: Framework completo com muitos recursos prontos para uso
4. **Padrões Avançados (Apps 14-17)**: Microsserviços, tempo real, GraphQL e autenticação avançada
5. **Projetos Fullstack (Apps 18-20)**: Aplicações completas com frontend e backend

## Análise dos Projetos

### Evolução Técnica
Há uma clara progressão nas tecnologias e conceitos apresentados, partindo de aplicações web simples até sistemas completos e de alta complexidade. As aplicações iniciais focam em conceitos unitários enquanto os projetos finais integram múltiplas tecnologias e padrões.

### Aprendizado Prático
Cada aplicação foi desenhada para ensinar conceitos específicos através da prática. Os apps mais complexos são desenvolvidos como produtos reais que poderiam ser usados em ambiente de produção.

### Tecnologias Cobertas
O repositório abrange os principais frameworks Python para desenvolvimento web:
- **Flask**: Microframework leve para aplicações simples
- **FastAPI**: Framework moderno com desempenho e tipagem
- **Django**: Framework completo para aplicações robustas

Além de tecnologias complementares como:
- Bancos de dados (SQLite, PostgreSQL)
- ORM (SQLAlchemy, Django ORM)
- Autenticação (JWT, OAuth2)
- Mensageria (RabbitMQ)
- Frontend (React)
- Contêineres (Docker)

### Destaque para os Projetos Fullstack

Os três projetos finais representam aplicações fullstack completas:

1. **App18 - Sistema de Autenticação**: Base fundamental para qualquer aplicação com usuários.
2. **App19 - FileShare**: Sistema de compartilhamento de arquivos com interface moderna.
3. **App20 - TaskForge**: Sistema completo de gerenciamento de projetos com funcionalidades avançadas.

Estes projetos demonstram a integração entre frontend e backend, gerenciamento de estado, autenticação e práticas modernas de desenvolvimento.

## Como Utilizar

Cada aplicação está contida em seu próprio diretório e pode ser executada independentemente. Consulte o README.md em cada diretório para instruções específicas.

### Requisitos gerais
- Python 3.8+
- pip (gerenciador de pacotes Python)
- Ambiente virtual (recomendado)
- Node.js 16+ (para projetos com frontend)

### Instalação e execução (geral)
1. Navegue até o diretório da aplicação desejada:
   ```bash
   cd app{número}
   ```

2. Crie e ative um ambiente virtual:
   ```bash
   # No Windows
   python -m venv venv
   venv\Scripts\activate

   # No Linux/Mac
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```

4. Execute a aplicação:
   ```bash
   # Para aplicações Flask
   python app.py
   
   # Para aplicações FastAPI
   python main.py
   
   # Para aplicações Django
   python manage.py runserver
   ```

5. Para projetos fullstack, também precisa configurar o frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorar este repositório de aprendizado.

## Licença

Este repositório está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
