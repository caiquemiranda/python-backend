# App 3 - Mini API com Flask Básico

## O que este projeto faz
Este projeto implementa uma API REST simples utilizando o framework Flask. A API permite gerenciar um catálogo de produtos com operações básicas de CRUD (Create, Read, Update, Delete).

## O que este projeto ensina
- Como criar uma API web com o framework Flask
- Como definir rotas e endpoints em uma aplicação Flask
- Como trabalhar com requisições e respostas HTTP (GET, POST, PUT, DELETE)
- Como retornar dados em formato JSON
- Como manipular parâmetros de URL e dados de requisição
- Como definir códigos de status HTTP adequados para cada resposta

## Conceitos importantes
- **Flask**: Um micro-framework web para Python
- **Decoradores em Python**: Como `@app.route()` para definir rotas
- **API REST**: Princípios de design e implementação
- **JSON**: Formato de intercâmbio de dados
- **Status Codes HTTP**: 200 OK, 201 Created, 404 Not Found, etc.

## Como rodar o projeto

### Pré-requisitos
- Python 3.x instalado
- pip (gerenciador de pacotes do Python)

### Passos para executar
1. Navegue até a pasta do projeto:
   ```
   cd app3
   ```

2. Instale as dependências:
   ```
   pip install -r requirements.txt
   ```

3. Execute o aplicativo Flask:
   ```
   python app.py
   ```

4. Abra seu navegador e acesse:
   ```
   http://localhost:8000
   ```

5. Para testar a API, você pode usar:
   - Um navegador para requisições GET
   - Uma ferramenta como Postman, Insomnia ou cURL para os outros métodos (POST, PUT, DELETE)
   - O exemplo de interface web na página inicial

## Testando a API
Você pode testar os endpoints da API usando os seguintes exemplos:

### Listar todos os produtos
```
GET http://localhost:8000/api/produtos
```

### Obter um produto específico
```
GET http://localhost:8000/api/produtos/1
```

### Criar um novo produto
```
POST http://localhost:8000/api/produtos
Content-Type: application/json

{
  "nome": "Câmera Digital",
  "preco": 1200.0,
  "disponivel": true
}
```

### Atualizar um produto
```
PUT http://localhost:8000/api/produtos/1
Content-Type: application/json

{
  "preco": 3200.0
}
```

### Excluir um produto
```
DELETE http://localhost:8000/api/produtos/1
```

## Estrutura do projeto
- `app.py`: Contém todo o código da aplicação Flask e a lógica da API
- `requirements.txt`: Lista de dependências do projeto

## Próximos passos
Após entender este exemplo básico de API com Flask, você estará pronto para avançar para o próximo projeto, onde implementaremos um CRUD completo com Flask e SQLite, adicionando persistência de dados a nossa aplicação. 