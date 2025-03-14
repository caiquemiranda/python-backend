# Backend do Sistema de Gerenciamento de Projetos e Tarefas

Backend desenvolvido com Django e Django REST Framework para fornecer uma API RESTful completa para o sistema de gerenciamento de projetos e tarefas.

## Estrutura do Projeto

O backend está organizado em três aplicações principais:

- **users**: Gerenciamento de usuários e autenticação
- **projects**: Gerenciamento de projetos e membros da equipe
- **tasks**: Gerenciamento de tarefas, comentários e tempo

## Funcionalidades Principais

### Usuários e Autenticação
- Registro e login de usuários
- Autenticação via tokens JWT
- Gerenciamento de perfil
- Controle de permissões baseado em papéis

### Projetos
- CRUD completo de projetos
- Gerenciamento de membros da equipe
- Categorização de projetos
- Estatísticas de projetos

### Tarefas
- CRUD completo de tarefas
- Comentários em tarefas
- Registro de tempo gasto
- Tags e etiquetas
- Atribuição a usuários
- Diferentes visualizações (lista, kanban)

## Endpoints da API

### Autenticação
- `POST /api/auth/token/` - Obter token JWT
- `POST /api/auth/token/refresh/` - Atualizar token JWT
- `POST /api/auth/register/` - Registrar novo usuário

### Usuários
- `GET /api/users/me/` - Obter perfil do usuário atual
- `PUT /api/users/me/` - Atualizar perfil do usuário atual
- `POST /api/users/change-password/` - Alterar senha
- `GET /api/users/` - Listar usuários (requer permissão)

### Projetos
- `GET /api/projects/` - Listar projetos
- `POST /api/projects/` - Criar novo projeto
- `GET /api/projects/{id}/` - Obter detalhes de um projeto
- `PUT /api/projects/{id}/` - Atualizar projeto
- `DELETE /api/projects/{id}/` - Excluir projeto
- `GET /api/projects/{id}/members/` - Listar membros de um projeto
- `POST /api/projects/{id}/members/` - Adicionar membro ao projeto
- `DELETE /api/projects/{id}/members/{user_id}/` - Remover membro do projeto
- `GET /api/projects/stats/` - Obter estatísticas de projetos

### Tarefas
- `GET /api/tasks/` - Listar tarefas
- `POST /api/tasks/` - Criar nova tarefa
- `GET /api/tasks/{id}/` - Obter detalhes de uma tarefa
- `PUT /api/tasks/{id}/` - Atualizar tarefa
- `DELETE /api/tasks/{id}/` - Excluir tarefa
- `POST /api/tasks/{id}/comments/` - Adicionar comentário a uma tarefa
- `GET /api/tasks/{id}/comments/` - Listar comentários de uma tarefa
- `POST /api/tasks/{id}/time-entries/` - Registrar tempo gasto em uma tarefa
- `GET /api/tasks/{id}/time-entries/` - Listar registros de tempo de uma tarefa

## Modelos de Dados

### Usuário
- Estende o modelo de usuário padrão do Django
- Campos adicionais: biografia, avatar, telefone, configurações

### Projeto
- Nome, descrição, data de início/término
- Status, categoria
- Dono (owner) e membros

### Membro do Projeto
- Relacionamento entre Usuário e Projeto
- Papel no projeto (role)
- Data de entrada

### Tarefa
- Título, descrição, data de vencimento
- Projeto, responsável
- Status, prioridade
- Estimativa de horas
- Tags

### Comentário
- Tarefa relacionada
- Autor, conteúdo, data
- Arquivos anexados (opcional)

### Tempo Registrado
- Tarefa relacionada
- Usuário, descrição
- Tempo gasto
- Data

## Tecnologias Utilizadas

- **Django 4.2**: Framework web Python de alto nível
- **Django REST Framework**: Toolkit para construção de APIs RESTful
- **djangorestframework-simplejwt**: Implementação de tokens JWT
- **django-cors-headers**: Suporte a CORS
- **drf-yasg**: Documentação automática da API com Swagger
- **Pillow**: Processamento de imagens
- **psycopg2-binary**: Adaptador PostgreSQL
- **python-dotenv**: Gerenciamento de variáveis de ambiente

## Instalação e Execução

### Pré-requisitos
- Python 3.10+
- pip
- Ambiente virtual (recomendado)

### Configuração do Ambiente
1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd app20/backend
   ```

2. Crie e ative um ambiente virtual:
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate
   
   # Linux/Mac
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na pasta `backend` com o seguinte conteúdo:
     ```
     DEBUG=True
     SECRET_KEY=sua-chave-secreta-aqui
     DATABASE_URL=sqlite:///db.sqlite3
     ALLOWED_HOSTS=localhost,127.0.0.1
     CORS_ALLOWED_ORIGINS=http://localhost:3000
     ```

5. Execute as migrações:
   ```bash
   python manage.py migrate
   ```

6. Crie um superusuário:
   ```bash
   python manage.py createsuperuser
   ```

### Executando o Servidor

```bash
python manage.py runserver
```

O servidor estará disponível em `http://localhost:8000`.
A documentação da API estará disponível em `http://localhost:8000/swagger/`.

### Usando Docker (opcional)

Se preferir usar Docker:

```bash
# Na pasta raiz do projeto
docker-compose up -d backend
```

## Testes

Para executar os testes:

```bash
python manage.py test
```

## Padrões e Boas Práticas

- **Arquitetura em camadas**: Modelos, serializers, views e lógica de negócio
- **Validação rigorosa**: Validação de dados em serializers
- **Permissions**: Controle de acesso granular por endpoint
- **API RESTful**: Adesão aos princípios REST
- **Documentação**: Documentação automática com Swagger/OpenAPI 