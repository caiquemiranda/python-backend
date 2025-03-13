# App 7 - API REST Estruturada com Flask + Blueprints

## O que este projeto faz

Este projeto implementa uma API REST completa utilizando Flask com uma estrutura organizada baseada em Blueprints. A API gerencia um catálogo de produtos, permitindo:

- Listar, criar, atualizar e excluir produtos (CRUD completo)
- Filtrar produtos por categoria e disponibilidade em estoque
- Listar categorias disponíveis
- Filtrar produtos por categoria
- Verificar o status da API através de um endpoint de healthcheck

Todos os dados são armazenados em memória através de um repositório simples, permitindo focar na estruturação do código e organização do projeto.

## O que este projeto ensina

- **Estruturação de projeto**: Como organizar uma aplicação Flask em módulos reutilizáveis
- **Blueprints**: Como usar blueprints para separar e organizar rotas por domínio
- **Padrão Repository**: Implementação do padrão de repositório para abstrair acesso aos dados
- **Validação de dados**: Implementação de validadores para dados de entrada
- **Padronização de respostas**: Como criar um formato consistente para todas as respostas da API
- **Configuração por ambiente**: Como configurar a aplicação para diferentes ambientes (dev, teste, produção)
- **Tratamento de erros**: Implementação de handlers para erros HTTP
- **Documentação de código**: Uso de docstrings e comentários explicativos
- **Boas práticas REST**: Implementação de uma API seguindo princípios REST

## Conceitos importantes

- **Aplicação modular**: Divisão do código em componentes especializados
- **Blueprints**: Forma de organizar aplicações Flask em componentes reutilizáveis
- **API REST**: Princípios de design e estruturação de APIs
- **Padrão de Repositório**: Abstração da camada de acesso a dados
- **Injeção de dependências**: Fornecimento de dependências para os componentes
- **Validação de entrada**: Verificação e sanitização de dados recebidos
- **Configuração por ambiente**: Adaptação da aplicação para diferentes contextos

## Como rodar o projeto

### Pré-requisitos

- Python 3.6 ou superior
- pip (gerenciador de pacotes do Python)
- Ambiente virtual (recomendado)

### Passos para executar

1. Clone o repositório (se aplicável) ou navegue até a pasta do projeto:
   ```
   cd app7
   ```

2. Crie e ative um ambiente virtual (opcional mas recomendado):
   ```
   # No Windows
   python -m venv venv
   venv\Scripts\activate

   # No Linux/Mac
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Instale as dependências:
   ```
   pip install -r requirements.txt
   ```

4. Execute a aplicação:
   ```
   python run.py
   ```

5. A API estará disponível em `http://localhost:5000`

### Endpoints disponíveis

#### Healthcheck

- `GET /api/v1/health/` - Verifica o status da API

#### Produtos

- `GET /api/v1/products/` - Lista todos os produtos
  - Query params: `category`, `in_stock` (true/false)
- `GET /api/v1/products/<id>` - Obtém um produto específico
- `POST /api/v1/products/` - Cria um novo produto
- `PUT /api/v1/products/<id>` - Atualiza um produto existente
- `DELETE /api/v1/products/<id>` - Remove um produto

#### Categorias

- `GET /api/v1/categories/` - Lista todas as categorias disponíveis
- `GET /api/v1/categories/<name>/products` - Lista produtos de uma categoria específica

### Exemplos de uso com cURL

#### Listar todos os produtos:
```bash
curl http://localhost:5000/api/v1/products/
```

#### Criar um novo produto:
```bash
curl -X POST http://localhost:5000/api/v1/products/ \
  -H "Content-Type: application/json" \
  -d '{"name": "Teclado Mecânico", "price": 350.0, "description": "Teclado mecânico RGB", "category": "periféricos"}'
```

#### Obter um produto específico:
```bash
curl http://localhost:5000/api/v1/products/<ID-DO-PRODUTO>
```

#### Atualizar um produto:
```bash
curl -X PUT http://localhost:5000/api/v1/products/<ID-DO-PRODUTO> \
  -H "Content-Type: application/json" \
  -d '{"price": 320.0, "in_stock": false}'
```

#### Excluir um produto:
```bash
curl -X DELETE http://localhost:5000/api/v1/products/<ID-DO-PRODUTO>
```

## Estrutura do projeto

```
app7/
├── app/                    # Pacote principal da aplicação
│   ├── __init__.py         # Inicialização da aplicação Flask
│   ├── api/                # Pacote com as rotas da API
│   │   └── v1/             # Versão 1 da API
│   │       ├── products.py # Rotas para produtos
│   │       ├── categories.py # Rotas para categorias
│   │       └── healthcheck.py # Rota para verificação de saúde
│   ├── config/             # Configurações da aplicação
│   │   └── config.py       # Classes de configuração para diferentes ambientes
│   ├── models/             # Modelos de dados
│   │   ├── product.py      # Modelo de produto
│   │   └── repository.py   # Repositório para armazenar produtos
│   ├── tests/              # Testes da aplicação
│   └── utils/              # Utilidades e helpers
│       ├── validation.py   # Funções de validação
│       └── responses.py    # Funções para padronizar respostas
├── run.py                  # Script para executar a aplicação
└── requirements.txt        # Dependências do projeto
```

## Próximos passos

Após entender a estrutura deste projeto, você estará preparado para avançar para aplicações mais complexas, incluindo:

- Integração com banco de dados reais (SQL ou NoSQL)
- Implementação de autenticação e autorização
- Criação de documentação automática com Swagger/OpenAPI
- Implementação de testes automatizados
- Deploy em ambientes de produção 