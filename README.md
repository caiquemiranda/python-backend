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

# FileShare - Sistema de Upload de Arquivos

FileShare é um aplicativo web para upload e gerenciamento de arquivos (imagens e documentos) desenvolvido com Django REST Framework no backend e React no frontend. O sistema permite fazer upload, visualizar, organizar e compartilhar seus arquivos de forma simples e eficiente.

## Sobre o Projeto

Este projeto foi desenvolvido como uma ferramenta de aprendizado para demonstrar a integração entre um backend Django REST Framework e um frontend React. O sistema inclui recursos como:

- Upload de arquivos (imagens e documentos)
- Visualização de arquivos com preview para imagens e documentos
- Categorização de arquivos por tipo
- Interface moderna e responsiva
- Tema claro/escuro
- Gerenciamento de usuários e autenticação

## O Que Este Projeto Ensina

### Backend (Django REST Framework)
- Criação de APIs RESTful com Django REST Framework
- Upload e gerenciamento de arquivos com Django
- Serialização e validação de dados
- Documentação de API com Swagger/OpenAPI
- Autenticação e autorização com JWT
- Filtragem e ordenação de recursos

### Frontend (React)
- Desenvolvimento de interfaces modernas com React
- Gerenciamento de estado com React Context API
- Chamadas a APIs com Axios
- Validação de formulários com Formik e Yup
- Sistema de rotas com React Router
- Preview de arquivos (imagens e documentos PDF)
- Alternância de temas (claro/escuro)
- Design responsivo

## Requisitos

### Para o Backend
- Python 3.8+
- Django 4.2+
- Django REST Framework
- Outras dependências listadas em `requirements.txt`

### Para o Frontend
- Node.js 16+ e npm/yarn
- React 18+
- Outras dependências listadas em `package.json`

## Como Executar o Projeto

### Configuração Inicial

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/fileshare.git
cd fileshare
```

2. Crie um arquivo `.env` na raiz do projeto backend com as seguintes variáveis:
```
DEBUG=True
SECRET_KEY=sua-chave-secreta-aqui
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

### Executando o Backend (Django)

1. Crie e ative um ambiente virtual Python:
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

2. Instale as dependências:
```bash
cd app19/backend
pip install -r requirements.txt
```

3. Execute as migrações:
```bash
python manage.py migrate
```

4. Crie um superusuário (opcional):
```bash
python manage.py createsuperuser
```

5. Inicie o servidor:
```bash
python manage.py runserver
```

O backend estará disponível em `http://localhost:8000`.
A documentação da API estará disponível em `http://localhost:8000/swagger/`.

### Executando o Frontend (React)

1. Instale as dependências:
```bash
cd app19/frontend
npm install
# ou
yarn install
```

2. Inicie o servidor de desenvolvimento:
```bash
npm start
# ou
yarn start
```

O frontend estará disponível em `http://localhost:3000`.

## Estrutura do Projeto

### Backend (Django)

```
app19/backend/
│
├── core/                   # Configuração principal do projeto
│   ├── settings.py         # Configurações do Django
│   ├── urls.py             # URLs principais
│   └── ...
│
├── files/                  # Aplicativo de gerenciamento de arquivos
│   ├── models.py           # Modelos de dados
│   ├── serializers.py      # Serializers para API
│   ├── views.py            # Views e ViewSets
│   ├── urls.py             # URLs do aplicativo
│   └── ...
│
└── manage.py               # Script de gerenciamento do Django
```

### Frontend (React)

```
app19/frontend/
│
├── public/                 # Arquivos públicos
│
├── src/                    # Código fonte
│   ├── components/         # Componentes React
│   │   ├── auth/           # Componentes de autenticação
│   │   ├── files/          # Componentes de gerenciamento de arquivos
│   │   ├── layout/         # Componentes de layout (Header, Footer, etc.)
│   │   └── ui/             # Componentes de UI reutilizáveis
│   │
│   ├── contexts/           # Contextos React (AuthContext, ThemeContext)
│   │
│   ├── pages/              # Páginas da aplicação
│   │
│   ├── services/           # Serviços para comunicação com a API
│   │
│   ├── styles/             # Estilos globais CSS
│   │
│   ├── App.js              # Componente principal
│   └── index.js            # Ponto de entrada da aplicação
│
└── package.json            # Dependências e scripts
```

## Recursos e Funcionalidades

### Backend
1. **API RESTful**
   - CRUD completo para gerenciamento de arquivos
   - Filtros por tipo de arquivo, tamanho, data, etc.
   - Documentação automática com Swagger

2. **Upload de Arquivos**
   - Suporte para diversos tipos de arquivos
   - Validação de tamanho e tipo
   - Categorização automática (imagem, documento, etc.)

3. **Segurança**
   - Autenticação com JWT
   - Validação de permissões
   - Proteção contra uploads maliciosos

### Frontend
1. **Interface de Usuário**
   - Design moderno e responsivo
   - Alternância entre temas claro e escuro
   - Componentes reutilizáveis

2. **Upload e Gerenciamento**
   - Upload via drag-and-drop
   - Visualização em lista ou grade
   - Preview de imagens e documentos
   - Organização por tipo e data

3. **Autenticação**
   - Login/Registro de usuários
   - Recuperação de senha
   - Perfil de usuário
   - Proteção de rotas

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias.

## Licença

Este projeto está licenciado sob a licença MIT.
