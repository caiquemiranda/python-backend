# App14 - Frontend da Aplicação de Notas

Este é o frontend da aplicação de notas com autenticação JWT. Desenvolvido em React, permite criar, visualizar, editar e excluir notas, além de compartilhá-las publicamente.

## Tecnologias Utilizadas

- React 18
- React Router v6
- Axios para requisições HTTP
- React Toastify para mensagens de feedback
- React Icons para ícones
- Context API para gerenciamento de estado global

## Estrutura de Arquivos

```
frontend/
  ├── public/
  │   ├── index.html
  │   └── ...
  ├── src/
  │   ├── components/           # Componentes reutilizáveis
  │   │   ├── Navbar.js         # Barra de navegação
  │   │   ├── Navbar.css
  │   │   ├── Footer.js         # Rodapé da aplicação
  │   │   ├── Footer.css
  │   │   └── PrivateRoute.js   # Proteção de rotas privadas
  │   ├── context/
  │   │   └── AuthContext.js    # Contexto de autenticação
  │   ├── pages/                # Páginas da aplicação
  │   │   ├── Home.js           # Página inicial
  │   │   ├── Home.css
  │   │   ├── Login.js          # Página de login
  │   │   ├── Register.js       # Página de registro
  │   │   ├── NotesList.js      # Lista de notas do usuário
  │   │   ├── NoteDetail.js     # Detalhes de uma nota
  │   │   ├── NoteForm.js       # Form para criar/editar notas
  │   │   ├── About.js          # Página sobre o aplicativo
  │   │   ├── About.css
  │   │   ├── NotFound.js       # Página de erro 404
  │   │   ├── NotFound.css
  │   │   ├── Notes.css
  │   │   └── AuthForms.css
  │   ├── services/
  │   │   └── api.js            # Serviços para comunicação com a API
  │   ├── App.js                # Componente principal com rotas
  │   ├── App.css               # Estilos globais
  │   └── index.js              # Ponto de entrada
  ├── package.json
  └── README.md
```

## Funcionalidades

- **Autenticação**:
  - Registro de usuários
  - Login e logout
  - Proteção de rotas privadas

- **Gerenciamento de Notas**:
  - Listar todas as notas do usuário
  - Visualizar detalhes de uma nota
  - Criar uma nova nota
  - Editar notas existentes
  - Excluir notas
  - Definir notas como públicas ou privadas

- **Interface**:
  - Barra de navegação responsiva 
  - Rodapé com informações da aplicação
  - Página inicial com exibição de notas públicas
  - Página "Sobre" com informações do aplicativo
  - Página de erro 404 personalizada
  - Interface responsiva para diferentes tamanhos de tela
  - Mensagens de feedback usando toasts

## Como Executar

1. Certifique-se de que o backend da aplicação esteja em execução
2. Instale as dependências:
   ```
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```
   npm start
   ```
4. Acesse `http://localhost:3000` no seu navegador

## Comunicação com o Backend

A comunicação com o backend é feita através de requisições HTTP utilizando o Axios. O token JWT é automaticamente incluído nos cabeçalhos das requisições quando o usuário está autenticado.

## Design da Interface

A interface segue um design minimalista e responsivo, com foco na usabilidade. Utiliza uma paleta de cores baseada em roxo (#6200ea) como cor principal, com elementos de feedback visuais claros para ações do usuário.

- **Componentes principais**:
  - Navbar: Barra de navegação superior com links adaptados ao estado de autenticação
  - Footer: Rodapé com informações e links úteis
  - Formulários: Designs consistentes com validação e feedback
  - Cards: Utilizados para exibir notas e recursos
  - Botões: Estilizados de acordo com suas ações (primária, secundária, perigo)

- **Recursos de UI/UX**:
  - Mensagens de feedback para ações do usuário via toasts
  - Indicadores de carregamento
  - Confirmações para ações destrutivas
  - Páginas de erro customizadas
  - Animações sutis para melhorar a experiência do usuário 