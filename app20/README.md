# Sistema de Gerenciamento de Projetos e Tarefas

Um sistema completo de gerenciamento de projetos e tarefas desenvolvido com Django (backend) e React (frontend). Adequado para equipes de desenvolvimento, departamentos de TI ou qualquer equipe que precise organizar e rastrear tarefas e projetos de forma eficiente.

## Características Principais

- **Interface Moderna e Responsiva**
  - Design responsivo que funciona em desktop, tablet e dispositivos móveis
  - Tema claro/escuro personalizável por usuário
  - Interface intuitiva com arrastar-e-soltar para gerenciamento de tarefas

- **Gerenciamento de Usuários**
  - Registro e autenticação segura com JWT
  - Perfis personalizados com foto, biografia e preferências
  - Gerenciamento de permissões por papel (role-based)
  - Personalização de tema e notificações

- **Gerenciamento de Projetos**
  - Criação e edição de projetos com fluxo de trabalho personalizável
  - Categorização e priorização 
  - Gerenciamento de membros com diferentes papéis
  - Estatísticas e gráficos de progresso
  - Arquivamento de projetos concluídos

- **Gerenciamento de Tarefas**
  - Visualização Kanban com arrastar-e-soltar
  - Atribuição de tarefas a membros da equipe
  - Priorização, categorização com etiquetas
  - Sistema de comentários para comunicação
  - Rastreamento de tempo dedicado às tarefas
  - Notificações de prazos próximos

- **Análise e Relatórios**
  - Dashboard interativo com estatísticas
  - Gráficos de distribuição de tarefas por status
  - Métricas de progresso e produtividade
  - Monitoramento de prazos e marcos

## Arquitetura do Sistema

### Backend (Django + Django REST Framework)

- **Estrutura organizada em apps reutilizáveis:**
  - `users`: Gerenciamento de usuários e autenticação
  - `projects`: Gerenciamento de projetos e membros
  - `tasks`: Gerenciamento de tarefas, comentários, tags e tempo

- **API RESTful:**
  - Endpoints bem definidos para todas as operações
  - Documentação automática com Swagger/drf-yasg
  - Filtragem, ordenação e paginação de resultados

- **Autenticação e Segurança:**
  - Tokens JWT para autenticação
  - Permissões granulares baseadas em papéis
  - Sistema de validação de dados

### Frontend (React)

- **Arquitetura modular:**
  - Componentes reutilizáveis
  - Contextos para gerenciamento de estado (Auth, UI, etc.)
  - Serviços para comunicação com a API

- **Interface de usuário:**
  - Componentes de UI responsivos e acessíveis
  - Formulários com validação
  - Visualizações especializadas (Kanban, calendário, etc.)
  - Feedback visual para ações do usuário

## Estrutura Detalhada do Projeto

### Backend

```
backend/
├── core/                  # Configurações do projeto Django
│   ├── settings.py        # Configurações principais
│   ├── urls.py            # URLs do projeto
│   └── ...
├── users/                 # App de gerenciamento de usuários
│   ├── models.py          # Modelo de usuário personalizado
│   ├── serializers.py     # Serializers para API
│   ├── views.py           # Endpoints de usuários
│   ├── urls.py            # URLs de usuários
│   └── ...
├── projects/              # App de gerenciamento de projetos
│   ├── models.py          # Modelos de projetos e membros
│   ├── serializers.py     # Serializers para API
│   ├── views.py           # Endpoints de projetos
│   ├── permissions.py     # Permissões personalizadas
│   └── ...
├── tasks/                 # App de gerenciamento de tarefas
│   ├── models.py          # Modelos de tarefas, comentários, etc.
│   ├── serializers.py     # Serializers para API
│   ├── views.py           # Endpoints de tarefas
│   └── ...
├── manage.py              # Script de gerenciamento do Django
└── requirements.txt       # Dependências do projeto
```

### Frontend

```
frontend/
├── public/                # Arquivos estáticos públicos
└── src/
    ├── components/        # Componentes reutilizáveis
    │   ├── common/        # Componentes comuns (botões, formulários, etc.)
    │   ├── layout/        # Componentes de layout (Navbar, Sidebar, etc.)
    │   ├── projects/      # Componentes relacionados a projetos
    │   ├── tasks/         # Componentes relacionados a tarefas
    │   ├── charts/        # Componentes de visualização de dados
    │   └── ...
    ├── context/           # Contextos do React para gerenciamento de estado
    │   ├── AuthContext.js # Contexto de autenticação
    │   └── ...
    ├── pages/             # Páginas da aplicação
    │   ├── auth/          # Páginas de autenticação (login, registro)
    │   ├── dashboard/     # Dashboard principal
    │   ├── projects/      # Páginas de projetos
    │   ├── tasks/         # Páginas de tarefas
    │   └── ...
    ├── services/          # Serviços para comunicação com API
    │   ├── api.js         # Configuração do Axios e rotas base
    │   └── ...
    ├── styles/            # Estilos globais e variáveis
    │   ├── variables.css  # Variáveis CSS (cores, espaçamentos, etc.)
    │   └── ...
    ├── utils/             # Funções utilitárias
    ├── App.js             # Componente principal
    ├── index.js           # Ponto de entrada
    └── ...
```

## Tecnologias Utilizadas

### Backend
- **Django 4.2**: Framework web Python de alto nível
- **Django REST Framework**: Toolkit para construção de APIs RESTful
- **djangorestframework-simplejwt**: Implementação de tokens JWT
- **django-cors-headers**: Suporte a CORS
- **drf-yasg**: Documentação automática da API com Swagger
- **Pillow**: Processamento de imagens
- **psycopg2-binary**: Adaptador PostgreSQL
- **python-dotenv**: Gerenciamento de variáveis de ambiente

### Frontend
- **React 18**: Biblioteca JavaScript para construção de interfaces
- **React Router 6**: Roteamento no lado do cliente
- **Axios**: Cliente HTTP para comunicação com a API
- **Formik e Yup**: Gerenciamento e validação de formulários
- **React Icons**: Conjunto de ícones
- **React Beautiful DnD**: Funcionalidade de arrastar e soltar
- **Chart.js e React-Chartjs-2**: Visualização de dados e gráficos
- **date-fns**: Manipulação de datas

### DevOps
- **Docker e Docker Compose**: Containerização e orquestração
- **PostgreSQL**: Banco de dados relacional
- **Nginx**: Servidor web para produção (opcional)

## Padrões de Design e Boas Práticas

- **Arquitetura em Camadas**: Separação clara entre modelos, serializers, views e lógica de negócio
- **API RESTful**: Endpoints seguindo padrões RESTful
- **Componentes Reutilizáveis**: Desenvolvimento orientado a componentes no frontend
- **Código Limpo**: Padrões consistentes de nomenclatura e estilo
- **Testabilidade**: Design que permite testes unitários e integração
- **Segurança**: Boas práticas como validação de entrada, sanitização e autorização adequada
- **Responsividade**: Design que funciona em diferentes tamanhos de tela

## Instalação e Execução

### Usando Docker (Recomendado)

1. **Pré-requisitos:**
   - Docker e Docker Compose instalados

2. **Configuração:**
   - Clone o repositório
   - Crie um arquivo `.env` baseado no `.env.example`

3. **Iniciar os serviços:**
   ```bash
   docker-compose up -d
   ```

4. **Criar um superusuário (opcional):**
   ```bash
   docker-compose exec backend python manage.py createsuperuser
   ```

5. **Acesso:**
   - Frontend: http://localhost:3000
   - API: http://localhost:8000/api/
   - Admin Django: http://localhost:8000/admin/
   - Documentação da API: http://localhost:8000/swagger/

### Instalação Manual

#### Backend

1. **Pré-requisitos:**
   - Python 3.11+
   - PostgreSQL (opcional, pode usar SQLite para desenvolvimento)

2. **Configuração:**
   ```bash
   # Criar ambiente virtual
   python -m venv venv
   source venv/bin/activate  # No Windows: venv\Scripts\activate
   
   # Instalar dependências
   pip install -r requirements.txt
   
   # Aplicar migrações
   python manage.py migrate
   
   # Criar superusuário
   python manage.py createsuperuser
   
   # Iniciar servidor
   python manage.py runserver
   ```

#### Frontend

1. **Pré-requisitos:**
   - Node.js 16+
   - npm ou yarn

2. **Configuração:**
   ```bash
   # Instalar dependências
   cd frontend
   npm install  # ou yarn install
   
   # Iniciar servidor de desenvolvimento
   npm start  # ou yarn start
   ```

## API Endpoints

### Autenticação
- `POST /api/users/token/` - Obter token JWT
- `POST /api/users/token/refresh/` - Atualizar token JWT
- `POST /api/users/register/` - Registrar novo usuário

### Usuários
- `GET /api/users/me/` - Obter dados do usuário autenticado
- `PUT /api/users/update-profile/` - Atualizar perfil
- `POST /api/users/change-password/` - Alterar senha

### Projetos
- `GET /api/projects/` - Listar projetos
- `POST /api/projects/` - Criar projeto
- `GET /api/projects/{id}/` - Detalhes do projeto
- `PUT /api/projects/{id}/` - Atualizar projeto
- `DELETE /api/projects/{id}/` - Excluir projeto
- `GET /api/projects/my-projects/` - Listar projetos do usuário
- `GET /api/projects/{id}/members/` - Listar membros do projeto
- `POST /api/projects/{id}/members/` - Adicionar membro
- `DELETE /api/projects/{id}/members/` - Remover membro

### Tarefas
- `GET /api/tasks/tasks/` - Listar tarefas
- `POST /api/tasks/tasks/` - Criar tarefa
- `GET /api/tasks/tasks/{id}/` - Detalhes da tarefa
- `PUT /api/tasks/tasks/{id}/` - Atualizar tarefa
- `DELETE /api/tasks/tasks/{id}/` - Excluir tarefa
- `GET /api/tasks/tasks/my-tasks/` - Listar tarefas do usuário
- `GET /api/tasks/tasks/by-project/` - Listar tarefas por projeto
- `POST /api/tasks/tasks/{id}/change-status/` - Alterar status
- `GET /api/tasks/comments/` - Listar comentários
- `POST /api/tasks/comments/` - Adicionar comentário
- `GET /api/tasks/tags/` - Listar tags
- `GET /api/tasks/time-entries/` - Listar registros de tempo
- `POST /api/tasks/time-entries/` - Adicionar registro de tempo

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE.md para mais detalhes.

## Contribuições

Contribuições são bem-vindas! Por favor, sinta-se à vontade para enviar um Pull Request.

## Contato

Para sugestões, dúvidas ou colaborações, por favor abra uma issue ou entre em contato através de [seu-email@exemplo.com]. 