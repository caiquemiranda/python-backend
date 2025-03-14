# Sistema de Gerenciamento de Projetos e Tarefas

Um sistema completo de gerenciamento de projetos e tarefas desenvolvido com Django (backend) e React (frontend).

## Funcionalidades

- **Gerenciamento de Usuários**
  - Registro e autenticação de usuários
  - Perfis personalizados
  - Controle de permissões

- **Gerenciamento de Projetos**
  - Criação e edição de projetos
  - Categorização
  - Gerenciamento de membros e permissões
  - Acompanhamento de progresso

- **Gerenciamento de Tarefas**
  - Criação e atribuição de tarefas
  - Priorização e ordenação
  - Comentários e discussões
  - Etiquetas para organização
  - Registro de tempo

## Estrutura do Projeto

### Backend (Django)

```
backend/
├── core/               # Configurações principais do projeto
├── users/              # Aplicativo de gerenciamento de usuários
├── projects/           # Aplicativo de gerenciamento de projetos
└── tasks/              # Aplicativo de gerenciamento de tarefas
```

### Frontend (React)

```
frontend/
├── public/             # Arquivos públicos
└── src/
    ├── components/     # Componentes reutilizáveis
    ├── pages/          # Páginas da aplicação
    ├── services/       # Serviços para comunicação com a API
    └── styles/         # Estilos globais e variáveis
```

## Tecnologias Utilizadas

### Backend
- Django
- Django REST Framework
- JWT para autenticação
- SQLite (desenvolvimento) / PostgreSQL (produção)

### Frontend
- React
- React Router
- Axios
- Formik e Yup para validação de formulários

## Instalação e Execução

### Backend

1. Clone o repositório
2. Crie um ambiente virtual:
   ```
   python -m venv venv
   source venv/bin/activate  # No Windows: venv\Scripts\activate
   ```
3. Instale as dependências:
   ```
   pip install -r requirements.txt
   ```
4. Execute as migrações:
   ```
   python manage.py migrate
   ```
5. Crie um superusuário:
   ```
   python manage.py createsuperuser
   ```
6. Inicie o servidor:
   ```
   python manage.py runserver
   ```

### Frontend

1. Navegue até a pasta do frontend:
   ```
   cd frontend
   ```
2. Instale as dependências:
   ```
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```
   npm start
   ```

## API Endpoints

### Autenticação
- `POST /api/users/token/` - Obter token JWT
- `POST /api/users/token/refresh/` - Atualizar token JWT

### Usuários
- `GET /api/users/me/` - Obter dados do usuário autenticado
- `PUT /api/users/update-profile/` - Atualizar perfil
- `POST /api/users/change-password/` - Alterar senha
- `POST /api/users/register/` - Registrar novo usuário

### Projetos
- `GET /api/projects/` - Listar projetos
- `POST /api/projects/` - Criar projeto
- `GET /api/projects/{id}/` - Detalhes do projeto
- `PUT /api/projects/{id}/` - Atualizar projeto
- `DELETE /api/projects/{id}/` - Excluir projeto
- `GET /api/projects/my-projects/` - Listar projetos do usuário
- `GET /api/projects/{id}/members/` - Listar membros do projeto
- `POST /api/projects/{id}/members/` - Adicionar membro ao projeto
- `DELETE /api/projects/{id}/members/{user_id}/` - Remover membro do projeto
- `GET /api/projects/categories/` - Listar categorias

### Tarefas
- `GET /api/tasks/tasks/` - Listar tarefas
- `POST /api/tasks/tasks/` - Criar tarefa
- `GET /api/tasks/tasks/{id}/` - Detalhes da tarefa
- `PUT /api/tasks/tasks/{id}/` - Atualizar tarefa
- `DELETE /api/tasks/tasks/{id}/` - Excluir tarefa
- `GET /api/tasks/tasks/my-tasks/` - Listar tarefas do usuário
- `GET /api/tasks/tasks/by-project/` - Listar tarefas por projeto
- `POST /api/tasks/tasks/{id}/change-status/` - Alterar status da tarefa
- `GET /api/tasks/comments/` - Listar comentários
- `GET /api/tasks/tags/` - Listar etiquetas
- `GET /api/tasks/time-entries/` - Listar registros de tempo
- `GET /api/tasks/time-entries/my-entries/` - Listar registros de tempo do usuário

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes. 