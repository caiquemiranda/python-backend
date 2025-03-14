# App17 - Gerenciador de Tarefas com Django e React

Este projeto é um aplicativo de gerenciamento de tarefas completo, desenvolvido com Django REST Framework no backend e React no frontend. Ele implementa operações CRUD (Create, Read, Update, Delete) para tarefas e categorias, com uma interface de usuário moderna e responsiva.

## O que este projeto ensina

- **Desenvolvimento de API RESTful com Django REST Framework**:
  - Criação de modelos relacionados (Tarefas e Categorias)
  - Serialização de dados com DRF
  - ViewSets e Routers para operações CRUD
  - Filtragem, ordenação e busca de dados
  - Endpoints personalizados com actions

- **Desenvolvimento de Frontend com React**:
  - Estrutura de componentes React
  - Gerenciamento de rotas com React Router
  - Formulários com validação usando Formik e Yup
  - Consumo de API REST com Axios
  - Estilização modular com CSS

- **Integração entre Backend e Frontend**:
  - Configuração de CORS
  - Comunicação assíncrona entre cliente e servidor
  - Upload de arquivos
  - Tratamento de erros

## Estrutura do Projeto

```
app17/
├── backend/                # Aplicação Django
│   ├── core/               # Configurações do projeto Django
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py     # Configurações do Django
│   │   ├── urls.py         # URLs principais
│   │   └── wsgi.py
│   ├── tasks/              # Aplicação de tarefas
│   │   ├── __init__.py
│   │   ├── admin.py        # Configuração do admin
│   │   ├── apps.py         # Configuração da aplicação
│   │   ├── models.py       # Modelos de dados
│   │   ├── serializers.py  # Serializers para API
│   │   ├── urls.py         # URLs da API
│   │   └── views.py        # Views da API
│   ├── manage.py           # Script de gestão do Django
│   └── requirements.txt    # Dependências do backend
│
└── frontend/               # Aplicação React
    ├── public/
    │   └── index.html      # HTML principal
    ├── src/
    │   ├── components/     # Componentes reutilizáveis
    │   │   └── layout/     # Componentes de layout
    │   ├── pages/          # Páginas da aplicação
    │   ├── services/       # Serviços para comunicação com API
    │   ├── App.js          # Componente principal
    │   ├── App.css         # Estilos do App
    │   ├── index.js        # Ponto de entrada
    │   └── index.css       # Estilos globais
    └── package.json        # Dependências do frontend
```

## Como executar o projeto

### Backend (Django)

1. Navegue até a pasta do backend:
   ```bash
   cd app17/backend
   ```

2. Recomendável: Crie e ative um ambiente virtual:
   ```bash
   # No Windows
   python -m venv venv
   venv\Scripts\activate
   
   # No Linux/Mac
   python -m venv venv
   source venv/bin/activate
   ```

3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```

4. Execute as migrações do banco de dados:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Crie um superusuário para acessar o admin:
   ```bash
   python manage.py createsuperuser
   ```

6. Inicie o servidor de desenvolvimento:
   ```bash
   python manage.py runserver
   ```
   
   O servidor estará disponível em http://localhost:8000/

7. Acesse o painel administrativo em:
   ```
   http://localhost:8000/admin/
   ```

8. A API estará disponível em:
   ```
   http://localhost:8000/api/
   ```

### Frontend (React)

1. Navegue até a pasta do frontend:
   ```bash
   cd app17/frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
   
   A aplicação estará disponível em http://localhost:3000/

## Funcionalidades

- **Gerenciamento de Tarefas**:
  - Listar todas as tarefas
  - Filtrar tarefas por status, prioridade, categoria
  - Criar novas tarefas
  - Editar tarefas existentes
  - Excluir tarefas
  - Marcar tarefas como concluídas
  - Anexar arquivos às tarefas

- **Gerenciamento de Categorias**:
  - Listar todas as categorias
  - Criar novas categorias
  - Editar categorias existentes
  - Excluir categorias

## Observações importantes

- Certifique-se de que o backend esteja rodando antes de iniciar o frontend
- O CORS está configurado para permitir todas as origens (CORS_ALLOW_ALL_ORIGINS = True), o que é adequado apenas para desenvolvimento
- Este projeto é um exemplo educacional e pode precisar de ajustes adicionais para um ambiente de produção

## Próximos passos

Após dominar este exemplo, você pode expandir o projeto:

1. Adicionar autenticação de usuários
2. Implementar permissões baseadas em papéis
3. Adicionar testes automatizados
4. Implementar recursos avançados como notificações, lembretes, etc.
5. Melhorar a UI/UX com bibliotecas como Material-UI ou Bootstrap 