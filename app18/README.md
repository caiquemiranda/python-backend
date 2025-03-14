# App18 - Aplicação React com Autenticação

Uma aplicação fullstack que demonstra a implementação de um sistema de autenticação completo com React no frontend e Django REST Framework no backend.

## Descrição do Projeto

Este projeto é uma aplicação fullstack com um frontend em React e um backend em Django Rest Framework que implementa um sistema de autenticação completo, com registro de usuários, login, e rotas protegidas. A aplicação serve como um exemplo educacional de como estruturar um projeto moderno com gerenciamento de estado e navegação.

### O que você aprenderá com este projeto

- Estruturação de uma aplicação React e Django
- Implementação de autenticação com JWT (JSON Web Tokens)
- Criação e proteção de rotas com React Router
- Gerenciamento de estado com Context API
- Formulários e validação em React
- Comunicação com APIs RESTful
- Desenvolvimento de backend com Django Rest Framework

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
app18/
├── backend/         # Backend da aplicação (Django Rest Framework)
│   ├── authentication/ # App para autenticação de usuários
│   ├── core/        # Configurações do projeto Django
│   ├── users/       # App para gerenciamento de usuários
│   ├── manage.py    # Script de gerenciamento Django
│   └── requirements.txt # Dependências do backend
│
└── frontend/        # Aplicação React
    ├── public/      # Arquivos públicos
    └── src/         # Código fonte React
        ├── components/  # Componentes reutilizáveis
        │   ├── auth/    # Componentes relacionados à autenticação
        │   └── layout/  # Componentes de layout (Header, Footer, etc.)
        ├── contexts/    # Contextos React (AuthContext)
        ├── pages/       # Páginas da aplicação
        └── services/    # Serviços para comunicação com a API
```

## Funcionalidades

- **Autenticação de usuários**: Registro e login
- **Rotas protegidas**: Acesso restrito a usuários autenticados
- **Gerenciamento de perfil**: Visualização e edição de informações do usuário
- **Dashboard**: Área administrativa para usuários autenticados
- **Navegação responsiva**: Interface adaptável para diferentes dispositivos

## Tecnologias Utilizadas

### Frontend
- React 18
- React Router 6
- Axios (para requisições HTTP)
- JWT Decode (para decodificação de tokens)
- React Icons
- CSS moderno (Flexbox e Grid)

### Backend
- Django 4.2
- Django Rest Framework
- Django REST Framework SimpleJWT
- Django CORS Headers
- Pillow (para processamento de imagens)

## Requisitos

- Node.js 14+
- npm ou yarn
- Python 3.10+
- pip

## Instalação e Execução

### Frontend

1. Navegue até o diretório do frontend:
   ```
   cd app18/frontend
   ```

2. Instale as dependências:
   ```
   npm install
   # ou
   yarn install
   ```

3. Inicie o servidor de desenvolvimento:
   ```
   npm start
   # ou
   yarn start
   ```

A aplicação frontend estará disponível em `http://localhost:3000/`.

### Backend

1. Navegue até o diretório do backend:
   ```
   cd app18/backend
   ```

2. Crie um ambiente virtual:
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

4. Execute as migrações:
   ```
   python manage.py migrate
   ```

5. Crie um superusuário (opcional):
   ```
   python manage.py createsuperuser
   ```

6. Inicie o servidor de desenvolvimento:
   ```
   python manage.py runserver
   ```

O backend estará disponível em `http://localhost:8000/`.
A API estará disponível em `http://localhost:8000/api/`.
A interface de administração estará disponível em `http://localhost:8000/admin/`.

## Configuração

### Frontend
Para conectar a aplicação a um backend, você precisa configurar a URL da API no arquivo de serviços. Por padrão, a aplicação espera que o backend esteja disponível em `http://localhost:8000/api/`.

### Backend
O backend está configurado para aceitar requisições CORS do frontend. Se você precisar alterar a configuração, edite o arquivo `settings.py` na pasta `core`.

## Endpoints da API

Esta aplicação backend implementa os seguintes endpoints:

- `POST /api/auth/register/` - Registrar novo usuário
- `POST /api/auth/token/` - Obter token JWT
- `POST /api/auth/token/refresh/` - Renovar token JWT
- `GET /api/auth/profile/` - Obter perfil do usuário
- `PATCH /api/auth/profile/` - Atualizar perfil do usuário
- `GET /api/users/` - Listar usuários (requer autenticação)
- `GET /api/users/{id}/` - Obter detalhes de um usuário (requer autenticação)

## Modelos de Dados

### Usuário
O modelo de usuário estende o modelo padrão do Django (`AbstractUser`) e adiciona campos adicionais:

- `bio` - Biografia do usuário (TextField)
- `avatar` - Imagem de perfil (ImageField)
- `phone` - Número de telefone (CharField)
- `created_at` - Data de criação (DateTimeField)
- `updated_at` - Data de atualização (DateTimeField)

## Características do Backend

### Autenticação com JWT
O sistema utiliza tokens JWT (JSON Web Tokens) para autenticação, oferecendo:
- Tokens de acesso com curta duração
- Tokens de atualização para renovar o acesso
- Proteção contra CSRF

### Validação de dados
- Validação completa de entradas com serializers
- Feedback claro de erros para o frontend
- Proteção contra dados maliciosos

### Permissões
- Sistema de permissões baseado em autenticação
- Proteção de endpoints sensíveis
- Verificação de propriedade de recursos

### CORS (Cross-Origin Resource Sharing)
- Configuração segura para permitir requisições do frontend
- Controle de origem, métodos e cabeçalhos permitidos

## Características do Frontend

### Context API
- Gerenciamento de estado centralizado com AuthContext
- Hooks personalizados para acesso ao estado
- Persistência de estado após atualizações da página

### Formulários com validação
- Validação em tempo real de campos de formulário
- Feedback visual para usuários
- Tratamento adequado de erros da API

### Proteção de rotas
- Roteamento condicional baseado em estado de autenticação
- Redirecionamento automático para login
- Preservação da URL desejada após login

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

---

Desenvolvido como projeto educacional para demonstrar conceitos de autenticação e roteamento em aplicações fullstack com React e Django. 