# Python Backend Learning Path

Este repositório contém uma série de aplicações backend e fullstack em Python organizadas em uma progressão didática, desde conceitos básicos até implementações avançadas. Cada aplicação (de `app1` até `app20`) introduz novos conceitos e tecnologias, formando um caminho de aprendizado completo para desenvolvimento com Python.

## Estrutura do Repositório

O repositório está organizado em várias aplicações independentes, cada uma construindo sobre os conceitos das anteriores:

### Aplicações Básicas (1-7): Fundamentos com Python e Flask

### App 1 - Servidor HTTP Básico com Python Puro
- **Conceitos**: Fundamentos de HTTP, servidores web, sockets
- **Tecnologias**: Python puro (módulo http.server)
- **Funcionalidades**: Servidor web básico com rotas simples e resposta HTML

### App 2 - CRUD com Arquivos Locais
- **Conceitos**: Operações CRUD, armazenamento de dados em arquivo
- **Tecnologias**: Python puro, JSON
- **Funcionalidades**: Gerenciador de tarefas com armazenamento em arquivos JSON

### App 3 - Mini API com Flask Básico
- **Conceitos**: APIs REST, framework web, rotas
- **Tecnologias**: Flask
- **Funcionalidades**: API REST simples para gerenciar um catálogo de produtos

### App 4 - CRUD com Flask e SQLite
- **Conceitos**: Banco de dados, modelos de dados, templates
- **Tecnologias**: Flask, SQLite, Jinja2
- **Funcionalidades**: Aplicação web completa de gerenciamento de tarefas com interface e API

### App 5 - Autenticação Simples com Flask
- **Conceitos**: Autenticação de usuários, sessões, segurança
- **Tecnologias**: Flask, SQLite, hashing de senhas
- **Funcionalidades**: Sistema de registro, login e área protegida com permissões básicas

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
- **Conceitos**: FastAPI, documentação automática, Pydantic
- **Tecnologias**: FastAPI, Pydantic
- **Funcionalidades**: API REST com validação de dados e documentação automática

### App 9 - CRUD com FastAPI e SQLite
- **Conceitos**: ORM, validação de dados
- **Tecnologias**: FastAPI, SQLAlchemy, Pydantic
- **Funcionalidades**: CRUD completo com banco de dados, filtragem, paginação

### App 10 - API Avançada com FastAPI, SQLAlchemy e JWT
- **Conceitos**: Autenticação, autorização, arquitetura modular
- **Tecnologias**: FastAPI, SQLAlchemy, JWT, Pydantic
- **Funcionalidades**: Autenticação JWT, controle de acesso, CRUD avançado, tratamento de erros

### Aplicações Fullstack (11-15): Integração Frontend/Backend

### App 11 - Comunicação Básica entre Flask e React
- **Conceitos**: Integração frontend/backend básica
- **Tecnologias**: Flask, React, CORS
- **Funcionalidades**: Comunicação simples entre frontend React e backend Flask

### App 12 - Formulário React enviando dados para FastAPI
- **Conceitos**: Formulários, validação de dados
- **Tecnologias**: FastAPI, React, Pydantic
- **Funcionalidades**: Formulário React enviando dados para backend FastAPI com validação

### App 13 - CRUD Completo com Flask e React
- **Conceitos**: Operações CRUD fullstack
- **Tecnologias**: Flask, React, SQLAlchemy
- **Funcionalidades**: Sistema de gerenciamento de tarefas com interface React e backend Flask

### App 14 - Aplicação de Notas com Autenticação
- **Conceitos**: Autenticação JWT, rotas protegidas
- **Tecnologias**: FastAPI, React, JWT
- **Funcionalidades**: Sistema de notas com autenticação, criação e compartilhamento

### App 15 - Dashboard de Visualização de Dados
- **Conceitos**: Visualização de dados, gráficos interativos
- **Tecnologias**: FastAPI, React, Recharts
- **Funcionalidades**: Dashboard interativo com diversos tipos de gráficos e visualizações

### Aplicações Avançadas (16-20): Django e Projetos Completos

### App 16 - Integração Django e React
- **Conceitos**: Django REST Framework introdução
- **Tecnologias**: Django, Django REST Framework, React
- **Funcionalidades**: Integração básica entre Django REST Framework e React

### App 17 - Gerenciador de Tarefas com Django e React
- **Conceitos**: CRUD completo com Django
- **Tecnologias**: Django, Django REST Framework, React, Formik
- **Funcionalidades**: Gerenciador de tarefas e categorias com interface moderna

### App 18 - Aplicação React com Autenticação (Fullstack)
- **Conceitos**: Autenticação JWT com Django
- **Tecnologias**: Django REST Framework, React, JWT
- **Funcionalidades**: Sistema de autenticação completo, rotas protegidas, perfil de usuário

### App 19 - FileShare: Sistema de Upload de Arquivos (Fullstack)
- **Conceitos**: Upload e gerenciamento de arquivos, interface de usuário
- **Tecnologias**: Django REST Framework, React
- **Funcionalidades**: Upload, visualização e compartilhamento de arquivos, tema claro/escuro

### App 20 - TaskForge: Sistema de Gerenciamento de Projetos e Tarefas (Fullstack)
- **Conceitos**: Sistema completo de gestão, estruturas de dados complexas
- **Tecnologias**: Django REST Framework, React, Docker
- **Funcionalidades**: Gerenciamento de projetos, tarefas, equipes, dashboards e relatórios

## Progressão de Aprendizado

Este repositório apresenta uma progressão de aprendizado cuidadosamente estruturada:

1. **Fundamentos (Apps 1-2)**: Conceitos básicos de desenvolvimento web com Python puro
2. **Flask e Persistência (Apps 3-7)**: Desenvolvimento com Flask, banco de dados e autenticação
3. **FastAPI (Apps 8-10)**: Framework moderno com tipagem e melhor desempenho
4. **Integração Frontend/Backend (Apps 11-15)**: Projetos fullstack com React e Flask/FastAPI
5. **Django e Aplicações Avançadas (Apps 16-17)**: Introdução ao Django e Django REST Framework
6. **Projetos Completos (Apps 18-20)**: Aplicações fullstack complexas com Django e React

## Análise dos Projetos

### Evolução Técnica
Há uma clara progressão nas tecnologias e conceitos apresentados, partindo de aplicações web simples até sistemas completos e de alta complexidade. As aplicações iniciais focam em conceitos unitários enquanto os projetos finais integram múltiplas tecnologias e padrões.

### Aprendizado Prático
Cada aplicação foi desenhada para ensinar conceitos específicos através da prática. Os apps mais complexos são desenvolvidos como produtos reais que poderiam ser usados em ambiente de produção.

### Tecnologias Cobertas
O repositório abrange os principais frameworks Python para desenvolvimento web:
- **Python puro**: Módulos http.server e socketserver para fundamentos
- **Flask**: Microframework leve para aplicações simples
- **FastAPI**: Framework moderno com desempenho e tipagem
- **Django**: Framework completo para aplicações robustas (a partir do App 16)
- **Django REST Framework**: Toolkit para APIs RESTful

Além de tecnologias complementares como:
- Bancos de dados (SQLite, PostgreSQL)
- ORM (SQLAlchemy, Django ORM)
- Autenticação (JWT, OAuth2)
- Frontend (React)
- Visualização de dados (Recharts)
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
   # Para aplicações Python puro
   python app.py
   # ou
   python simple_http_server.py
   
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

6. Para projetos com Docker:
   ```bash
   docker-compose up -d
   ```

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests para melhorar este repositório de aprendizado.

## Licença

Este repositório está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
