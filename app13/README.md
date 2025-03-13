# App13: CRUD Completo com Flask e React

Este projeto demonstra como criar um aplicativo web fullstack de gerenciamento de tarefas com um CRUD completo (Create, Read, Update, Delete) utilizando Flask no backend e React no frontend.

## O que o projeto faz

O projeto consiste em:
- Um backend Flask que implementa uma API RESTful com operações CRUD para gerenciar tarefas.
- Um banco de dados SQLite para persistência de dados usando SQLAlchemy.
- Um frontend React que permite aos usuários:
  - Visualizar a lista de tarefas
  - Adicionar novas tarefas
  - Editar tarefas existentes
  - Excluir tarefas
  - Marcar tarefas como concluídas ou pendentes

## O que o projeto ensina

- **Backend (Flask)**:
  - Como estruturar uma API RESTful com Flask
  - Como configurar e utilizar SQLAlchemy para persistência de dados
  - Como implementar operações CRUD completas
  - Como lidar com erros e exceções em uma API

- **Frontend (React)**:
  - Como organizar componentes de React de forma modular
  - Como utilizar hooks como useState e useEffect
  - Como implementar formulários controlados
  - Como se comunicar com uma API backend
  - Como gerenciar estado global em uma aplicação React

## Como executar o projeto

### Backend (Flask)

1. Navegue até a pasta do backend:
```
cd app13/backend
```

2. Crie um ambiente virtual (opcional, mas recomendado):
```
python -m venv venv
venv\Scripts\activate  # No Windows
source venv/bin/activate  # No Linux/Mac
```

3. Instale as dependências:
```
pip install -r requirements.txt
```

4. Execute o servidor Flask:
```
python app.py
```

O servidor estará rodando em `http://localhost:5000`. O banco de dados SQLite será criado automaticamente no primeiro uso.

### Frontend (React)

1. Em um novo terminal, navegue até a pasta do frontend:
```
cd app13/frontend
```

2. Instale as dependências:
```
npm install
```

3. Execute o servidor de desenvolvimento React:
```
npm start
```

O aplicativo React estará rodando em `http://localhost:3000`.

## Estrutura do Banco de Dados

O projeto utiliza SQLAlchemy com SQLite para gerenciar tarefas com os seguintes campos:
- `id`: Identificador único (chave primária)
- `titulo`: Título da tarefa (obrigatório)
- `descricao`: Descrição detalhada da tarefa (opcional)
- `concluida`: Status de conclusão da tarefa (boolean)
- `prioridade`: Nível de prioridade ('baixa', 'média', 'alta')
- `data_criacao`: Data e hora de criação da tarefa

## Recursos e Funcionalidades

- **Formulário de Tarefas**: Interface intuitiva para criar e editar tarefas
- **Listagem de Tarefas**: Visualização em grade com informações detalhadas
- **Gerenciamento Completo**: Criar, ler, atualizar e excluir tarefas
- **Status de Conclusão**: Marcar tarefas como concluídas ou pendentes com um clique
- **Níveis de Prioridade**: Categorizar tarefas por prioridade (alta, média, baixa)
- **Dados de Exemplo**: Opção para adicionar tarefas de exemplo para testes
- **Interface Responsiva**: Layout adaptável a diferentes tamanhos de tela

## Rotas da API

- `GET /api/tarefas`: Retorna a lista de todas as tarefas
- `GET /api/tarefas/<id>`: Retorna os detalhes de uma tarefa específica
- `POST /api/tarefas`: Cria uma nova tarefa
- `PUT /api/tarefas/<id>`: Atualiza uma tarefa existente
- `DELETE /api/tarefas/<id>`: Exclui uma tarefa
- `PATCH /api/tarefas/<id>/alternar-status`: Alterna o status de conclusão de uma tarefa
- `POST /api/tarefas/exemplo`: Adiciona tarefas de exemplo para demonstração

## Notas

- O banco de dados SQLite é criado no diretório do backend e é persistente entre reinicializações do servidor.
- Para uma aplicação em produção, considere usar um banco de dados mais robusto como PostgreSQL ou MySQL. 