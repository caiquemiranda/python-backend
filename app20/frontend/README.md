# Frontend do Sistema de Gerenciamento de Projetos e Tarefas

Frontend desenvolvido com React para fornecer uma interface moderna e intuitiva para o sistema de gerenciamento de projetos e tarefas.

## Estrutura do Projeto

O frontend está organizado da seguinte forma:

```
src/
├── components/        # Componentes reutilizáveis
│   ├── common/        # Componentes comuns (botões, formulários, etc.)
│   ├── layout/        # Componentes de layout (Navbar, Sidebar, etc.)
│   ├── projects/      # Componentes relacionados a projetos
│   └── tasks/         # Componentes relacionados a tarefas
├── context/           # Contextos do React para gerenciamento de estado
│   ├── AuthContext.js # Contexto de autenticação
│   └── ...
├── pages/             # Páginas da aplicação
│   ├── auth/          # Páginas de autenticação (login, registro)
│   ├── projects/      # Páginas de projetos
│   ├── tasks/         # Páginas de tarefas
│   └── user/          # Páginas de usuário (perfil)
├── services/          # Serviços para comunicação com API
│   ├── api.js         # Configuração do Axios e rotas base
│   └── ...
├── styles/            # Estilos globais e componentes
├── utils/             # Funções utilitárias
├── App.js             # Componente principal
└── index.js           # Ponto de entrada
```

## Funcionalidades Principais

### Autenticação
- Login e registro de usuários
- Recuperação de senha
- Gerenciamento de tokens JWT
- Rotas protegidas

### Gerenciamento de Usuários
- Visualização e edição de perfil
- Alteração de senha
- Avatar de usuário

### Gerenciamento de Projetos
- Lista de projetos com filtragem
- Página de detalhes do projeto
- Criação, edição e exclusão de projetos
- Gerenciamento de membros da equipe
- Visualização de estatísticas

### Gerenciamento de Tarefas
- Lista de tarefas com filtragem
- Visualização de detalhes da tarefa
- Criação, edição e exclusão de tarefas
- Comentários em tarefas
- Tags e etiquetas
- Registro de tempo

### Interface
- Design responsivo
- Tema claro/escuro
- Componentes reutilizáveis
- Feedback visual para ações
- Modal para formulários e confirmações

## Componentes Principais

### Autenticação
- `Login.js`: Formulário de login com validação
- `Register.js`: Formulário de registro com validação
- `ForgotPassword.js`: Recuperação de senha
- `AuthContext.js`: Contexto de autenticação

### Layout
- `Navbar.js`: Barra de navegação com menu responsivo
- `Sidebar.js`: Menu lateral com navegação
- `Footer.js`: Rodapé da aplicação

### Projetos
- `ProjectList.js`: Lista de projetos com filtragem
- `ProjectDetail.js`: Detalhes do projeto com estatísticas
- `ProjectForm.js`: Formulário para criação/edição

### Tarefas
- `TaskList.js`: Lista de tarefas
- `TaskDetail.js`: Detalhes da tarefa
- `TaskForm.js`: Formulário para criação/edição
- `KanbanBoard.js`: Visualização Kanban das tarefas

### Usuário
- `Profile.js`: Página de perfil do usuário
- `ProfileEdit.js`: Formulário de edição de perfil

### Comum
- `Modal.js`: Modal reutilizável
- `LoadingSpinner.js`: Indicador de carregamento
- `ErrorBoundary.js`: Captura de erros
- `Pagination.js`: Componente de paginação

## Tecnologias Utilizadas

- **React 18**: Biblioteca JavaScript para interfaces
- **React Router 6**: Roteamento no lado do cliente
- **Axios**: Cliente HTTP para comunicação com a API
- **Formik e Yup**: Gerenciamento e validação de formulários
- **React Icons**: Conjunto de ícones
- **date-fns**: Manipulação de datas
- **CSS moderno**: Flexbox, Grid, Variáveis CSS

## Instalação e Execução

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Configuração do Ambiente
1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   cd app20/frontend
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configure o ambiente:
   - Crie um arquivo `.env` na pasta `frontend` com o seguinte conteúdo:
     ```
     REACT_APP_API_URL=http://localhost:8000/api
     ```

### Executando o Servidor de Desenvolvimento

```bash
npm start
# ou
yarn start
```

A aplicação estará disponível em `http://localhost:3000`.

### Construindo para Produção

```bash
npm run build
# ou
yarn build
```

### Usando Docker (opcional)

Se preferir usar Docker:

```bash
# Na pasta raiz do projeto
docker-compose up -d frontend
```

## Boas Práticas Implementadas

- **Componentização**: Componentes pequenos e reutilizáveis
- **Hooks**: Uso de hooks do React para gerenciamento de estado
- **Context API**: Gerenciamento de estado global
- **Validação**: Validação completa de formulários
- **Acessibilidade**: Componentes acessíveis
- **Responsividade**: Design adaptável a diferentes tamanhos de tela
- **Tratamento de Erros**: Feedback claro para o usuário

## Interação com o Backend

O frontend se comunica com o backend através de chamadas à API REST usando o Axios. Principais características:

- Interceptadores para incluir tokens de autenticação
- Renovação automática de tokens expirados
- Tratamento centralizado de erros
- Serviços específicos para diferentes recursos (usuários, projetos, tarefas)

## Temas e Estilos

A aplicação utiliza variáveis CSS para facilitar a personalização e implementação de temas:

```css
:root {
  --color-primary: #3498db;
  --color-secondary: #2ecc71;
  --color-background: #f8f9fa;
  --color-text: #333;
  /* ... mais variáveis ... */
}

[data-theme="dark"] {
  --color-background: #222;
  --color-text: #eee;
  /* ... mais variáveis ... */
}
```

## Depuração e Desenvolvimento

Para facilitar o desenvolvimento:

- Configuração para React Dev Tools
- Mensagens de log detalhadas durante o desenvolvimento
- Console.log condicionais apenas em ambiente de desenvolvimento 