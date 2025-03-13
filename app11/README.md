# App11: Comunicação Básica entre Flask e React

Este projeto demonstra como configurar uma aplicação web fullstack com comunicação básica entre um backend Flask e um frontend React.

## O que o projeto faz

O projeto consiste em:
- Um backend Flask que expõe uma API simples com um endpoint que retorna uma mensagem.
- Um frontend React que consome essa API e exibe a mensagem recebida do backend.

## O que o projeto ensina

- Configuração básica de um servidor Flask com CORS habilitado
- Configuração básica de uma aplicação React
- Como fazer requisições HTTP do frontend para o backend usando Axios
- Como lidar com estados no React usando hooks (useState, useEffect)
- Tratamento básico de erros de comunicação

## Como executar o projeto

### Backend (Flask)

1. Navegue até a pasta do backend:
```
cd app11/backend
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

O servidor estará rodando em `http://localhost:5000`.

### Frontend (React)

1. Em um novo terminal, navegue até a pasta do frontend:
```
cd app11/frontend
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

## Notas

- Certifique-se de que o backend esteja rodando antes de iniciar o frontend.
- Se encontrar problemas com CORS, verifique se o backend está configurado corretamente para permitir requisições do frontend.
- Este projeto usa a porta 5000 para o backend e a porta 3000 para o frontend por padrão. 