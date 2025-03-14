# App18 - Aplicação React com Autenticação

Uma aplicação React que demonstra a implementação de um sistema de autenticação e rotas protegidas.

## Descrição do Projeto

Este projeto é uma aplicação frontend desenvolvida em React que implementa um sistema de autenticação completo, com registro de usuários, login, e rotas protegidas. A aplicação serve como um exemplo educacional de como estruturar um projeto React moderno com gerenciamento de estado e navegação.

### O que você aprenderá com este projeto

- Estruturação de uma aplicação React
- Implementação de autenticação com JWT (JSON Web Tokens)
- Criação e proteção de rotas com React Router
- Gerenciamento de estado com Context API
- Formulários e validação em React
- Comunicação com APIs RESTful

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

```
app18/
├── backend/         # Backend da aplicação (não incluído neste repositório)
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

- React 18
- React Router 6
- Axios (para requisições HTTP)
- JWT Decode (para decodificação de tokens)
- React Icons
- CSS moderno (Flexbox e Grid)

## Requisitos

- Node.js 14+
- npm ou yarn

## Instalação e Execução

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

A aplicação estará disponível em `http://localhost:3000/`.

## Configuração

Para conectar a aplicação a um backend, você precisa configurar a URL da API no arquivo de serviços. Por padrão, a aplicação espera que o backend esteja disponível em `http://localhost:8000/api/`.

## Integração com Backend

Esta aplicação frontend foi projetada para trabalhar com uma API RESTful que implementa os seguintes endpoints:

- `POST /api/auth/register/` - Registrar novo usuário
- `POST /api/auth/token/` - Obter token JWT
- `POST /api/auth/token/refresh/` - Renovar token JWT
- `GET /api/auth/profile/` - Obter perfil do usuário
- `PATCH /api/auth/profile/` - Atualizar perfil do usuário

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests com melhorias.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

---

Desenvolvido como projeto educacional para demonstrar conceitos de autenticação e roteamento em React. 