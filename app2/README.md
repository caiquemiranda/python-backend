# App 2 - CRUD com Arquivos Locais

## O que este projeto faz
Este projeto implementa um gerenciador de tarefas completo com operações CRUD (Create, Read, Update, Delete) sem utilizar banco de dados. Os dados são armazenados em arquivos JSON no sistema de arquivos local.

## O que este projeto ensina
- Como implementar operações CRUD completas em Python
- Como armazenar e recuperar dados em arquivos JSON
- Como criar uma API HTTP simples com rotas para diferentes operações
- Como processar diferentes métodos HTTP (GET, POST, PUT, DELETE)
- Como criar uma interface web simples para interagir com a API
- Como manipular dados JSON em Python
- Como lidar com formulários e validações básicas

## Conceitos importantes
- **Persistência de dados**: Armazenamento em arquivos JSON
- **API REST**: Rotas que correspondem a operações em recursos
- **Métodos HTTP**: GET (ler), POST (criar), PUT (atualizar), DELETE (remover)
- **CRUD**: Create, Read, Update, Delete - operações básicas de qualquer aplicação de dados
- **Roteamento**: Encaminhar requisições para diferentes manipuladores com base na URL

## Como rodar o projeto

### Pré-requisitos
- Python 3.x instalado

### Passos para executar
1. Navegue até a pasta do projeto:
   ```
   cd app2
   ```

2. Execute o script do servidor:
   ```
   python app.py
   ```

3. Abra seu navegador e acesse:
   ```
   http://localhost:8000
   ```

4. Use a interface para:
   - Visualizar todas as tarefas
   - Adicionar novas tarefas
   - Marcar tarefas como concluídas
   - Excluir tarefas

5. Para encerrar o servidor, pressione `Ctrl+C` no terminal

## Estrutura do projeto
- `app.py`: Contém todo o código do servidor e a lógica CRUD
- `dados/`: Diretório criado automaticamente para armazenar o arquivo JSON
- `dados/tarefas.json`: Arquivo onde as tarefas são armazenadas

## API Endpoints
O projeto fornece uma API REST simples:

- `GET /api/tarefas`: Lista todas as tarefas
- `GET /api/tarefas/{id}`: Obtém uma tarefa específica por ID
- `POST /api/tarefas`: Cria uma nova tarefa
- `PUT /api/tarefas/{id}`: Atualiza uma tarefa existente
- `DELETE /api/tarefas/{id}`: Remove uma tarefa

## Compreendendo o código
- `carregar_tarefas()`: Lê tarefas do arquivo JSON
- `salvar_tarefas()`: Salva tarefas no arquivo JSON
- `criar_tarefa()`, `ler_tarefa()`, `atualizar_tarefa()`, `deletar_tarefa()`: Implementam as operações CRUD
- `CRUDHandler`: Classe que herda de `SimpleHTTPRequestHandler` e implementa o tratamento das requisições HTTP

## Próximos passos
Após entender esse exemplo de aplicação CRUD com armazenamento em arquivos, você estará pronto para avançar para o próximo projeto, onde criaremos uma mini API usando Flask, um framework web popular para Python.