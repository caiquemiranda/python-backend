# App16 - Integração Django e React

Este projeto demonstra uma integração simples entre um backend Django (com Django REST Framework) e um frontend React. A aplicação é um exemplo básico de "Hello World" que mostra como os dois frameworks podem se comunicar.

## O que este projeto ensina

- **Configuração básica do Django REST Framework**: Como configurar um backend Django com DRF para fornecer APIs RESTful.
- **Configuração básica do React**: Como criar uma aplicação React que consome dados de uma API.
- **Integração entre Frontend e Backend**: Como fazer o frontend React se comunicar com o backend Django.
- **CORS (Cross-Origin Resource Sharing)**: Como configurar o CORS para permitir que o frontend acesse a API.
- **Estrutura de projeto organizada**: Como organizar um projeto fullstack com frontend e backend separados.

## Estrutura do Projeto

```
app16/
├── backend/                # Aplicação Django
│   ├── core/               # Projeto Django principal
│   │   ├── api/            # Aplicação da API
│   │   │   ├── __init__.py
│   │   │   ├── urls.py     # URLs da API
│   │   │   └── views.py    # Views da API
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py     # Configurações do Django
│   │   ├── urls.py         # URLs principais
│   │   └── wsgi.py
│   ├── manage.py           # Script de gestão do Django
│   └── requirements.txt    # Dependências do backend
│
└── frontend/               # Aplicação React
    ├── public/
    │   └── index.html      # HTML principal
    ├── src/
    │   ├── App.js          # Componente principal React
    │   ├── index.css       # Estilos CSS
    │   └── index.js        # Ponto de entrada React
    └── package.json        # Dependências do frontend
```

## Como executar o projeto

### Backend (Django)

1. Navegue até a pasta do backend:
   ```bash
   cd app16/backend
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
   python manage.py migrate
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   python manage.py runserver
   ```
   
   O servidor estará disponível em http://localhost:8000/

6. Para testar a API diretamente, acesse:
   ```
   http://localhost:8000/api/hello/
   ```

### Frontend (React)

1. Navegue até a pasta do frontend:
   ```bash
   cd app16/frontend
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

## Observações importantes

- Certifique-se de que o backend esteja rodando antes de iniciar o frontend, caso contrário, o frontend exibirá uma mensagem de erro.
- O CORS está configurado para permitir todas as origens (CORS_ALLOW_ALL_ORIGINS = True), o que é adequado apenas para desenvolvimento. Em um ambiente de produção, esta configuração deve ser ajustada.
- Este é um projeto de exemplo simplificado para fins educacionais e não representa as melhores práticas para aplicações em produção.

## Próximos passos

Após entender este exemplo básico, você pode expandir este projeto:

1. Adicionar mais endpoints à API
2. Implementar autenticação
3. Adicionar um banco de dados mais robusto
4. Implementar formulários e funcionalidades CRUD
5. Melhorar a estilização e experiência do usuário 