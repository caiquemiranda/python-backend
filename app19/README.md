# FileShare - Sistema de Upload e Visualização de Arquivos

Um projeto fullstack que demonstra a implementação de um sistema de upload e visualização de arquivos (imagens e documentos) usando Django REST Framework para o backend e React para o frontend.

## Descrição do Projeto

FileShare é uma aplicação web que permite aos usuários fazer upload, visualizar e gerenciar arquivos. O sistema suporta diferentes tipos de arquivos, com foco especial em imagens e documentos PDF, oferecendo recursos de visualização prévia diretamente no navegador.

### O que você aprenderá com este projeto

- Desenvolvimento de APIs RESTful com Django REST Framework
- Implementação de autenticação JWT (JSON Web Tokens)
- Upload e gerenciamento de arquivos no Django
- Criação de interfaces modernas com React
- Implementação de visualização prévia de arquivos (imagens e PDFs)
- Organização de código modular e reutilizável
- Integração entre frontend e backend

## Estrutura do Projeto

O projeto está organizado em duas partes principais:

```
app19/
├── backend/         # Aplicação Django REST Framework
│   ├── config/      # Configurações do projeto
│   ├── accounts/    # App para autenticação e usuários
│   ├── files/       # App para gerenciamento de arquivos
│   └── ...
│
└── frontend/        # Aplicação React
    ├── public/      # Arquivos públicos
    └── src/         # Código fonte React
        ├── components/  # Componentes reutilizáveis
        ├── contexts/    # Contextos React (AuthContext, etc.)
        ├── pages/       # Páginas da aplicação
        ├── services/    # Serviços para comunicação com a API
        └── ...
```

## Funcionalidades

- **Autenticação de usuários**: Registro, login e gerenciamento de perfil
- **Upload de arquivos**: Suporte para imagens e documentos
- **Visualização de arquivos**: Preview de imagens e documentos PDF
- **Gerenciamento de arquivos**: Listar, visualizar, atualizar e excluir
- **Categorização**: Organização de arquivos por tipo e tags
- **Interface responsiva**: Experiência consistente em dispositivos móveis e desktop

## Tecnologias Utilizadas

### Backend
- Django 4.2
- Django REST Framework
- Django CORS Headers
- Pillow (para processamento de imagens)
- JWT Authentication
- PostgreSQL (banco de dados)

### Frontend
- React 18
- React Router
- Axios (para requisições HTTP)
- React PDF (para visualização de PDFs)
- React Icons
- Formik e Yup (para formulários e validação)
- CSS moderno (Flexbox e Grid)

## Requisitos

- Python 3.8+
- Node.js 14+
- npm ou yarn
- PostgreSQL (opcional, pode usar SQLite para desenvolvimento)

## Instalação e Execução

### Backend (Django)

1. Navegue até o diretório do backend:
   ```
   cd app19/backend
   ```

2. Crie e ative um ambiente virtual:
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

5. Crie um superusuário (opcional):
   ```
   python manage.py createsuperuser
   ```

6. Inicie o servidor:
   ```
   python manage.py runserver
   ```

O backend estará disponível em `http://localhost:8000/`.

### Frontend (React)

1. Navegue até o diretório do frontend:
   ```
   cd app19/frontend
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

O frontend estará disponível em `http://localhost:3000/`.

## API Endpoints

### Autenticação
- `POST /api/auth/register/` - Registrar novo usuário
- `POST /api/auth/token/` - Obter token JWT
- `POST /api/auth/token/refresh/` - Renovar token JWT
- `GET /api/auth/profile/` - Obter perfil do usuário
- `PATCH /api/auth/profile/` - Atualizar perfil do usuário

### Arquivos
- `GET /api/files/` - Listar arquivos
- `POST /api/files/` - Fazer upload de arquivo
- `GET /api/files/{id}/` - Obter detalhes do arquivo
- `PATCH /api/files/{id}/` - Atualizar metadados do arquivo
- `DELETE /api/files/{id}/` - Excluir arquivo
- `GET /api/files/{id}/download/` - Baixar arquivo
- `GET /api/files/search/` - Pesquisar arquivos
- `GET /api/files/stats/` - Obter estatísticas de arquivos

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

## Contato

Para dúvidas ou sugestões, entre em contato através de [seu-email@exemplo.com].

---

Desenvolvido como projeto educacional para demonstrar a integração entre Django REST Framework e React. 