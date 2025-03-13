# App12: Formulário React enviando dados para FastAPI

Este projeto demonstra como criar um formulário no React que envia dados para um backend FastAPI e exibe os dados recebidos.

## O que o projeto faz

O projeto consiste em:
- Um backend FastAPI que recebe dados de um formulário e os armazena em memória.
- Um frontend React com um formulário completo para envio de dados do usuário.
- Validação de formulário tanto no frontend quanto no backend.
- Exibição dos dados cadastrados em uma lista.

## O que o projeto ensina

- Como criar modelos de dados no FastAPI usando Pydantic.
- Como criar um formulário completo no React com diferentes tipos de campos (texto, número, checkbox).
- Como validar dados de formulário no React.
- Como enviar dados de formulário para uma API usando Axios.
- Como gerenciar o estado de um formulário no React.
- Como exibir notificações de sucesso/erro usando react-toastify.
- Como alternar a exibição de componentes condicionalmente.

## Como executar o projeto

### Backend (FastAPI)

1. Navegue até a pasta do backend:
```
cd app12/backend
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

4. Execute o servidor FastAPI:
```
python main.py
```

O servidor estará rodando em `http://localhost:8000`. Você pode acessar a documentação interativa da API em `http://localhost:8000/docs`.

### Frontend (React)

1. Em um novo terminal, navegue até a pasta do frontend:
```
cd app12/frontend
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

## Recursos e Funcionalidades

- **Formulário Completo**: Nome, email, idade, interesses (checkboxes) e comentário (opcional).
- **Validação de Dados**: Tanto no frontend quanto no backend com Pydantic.
- **Notificações**: Mensagens de sucesso ou erro ao enviar o formulário.
- **Lista de Usuários**: Visualização de todos os usuários cadastrados.
- **Interface Responsiva**: Layout adaptável a diferentes tamanhos de tela.

## Notas

- Os dados são armazenados apenas em memória, então serão perdidos quando o servidor for reiniciado.
- Este projeto usa a porta 8000 para o backend e a porta 3000 para o frontend por padrão. 