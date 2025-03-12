# App 1 - Servidor HTTP Básico com Python Puro

## O que este projeto faz
Este projeto implementa um servidor HTTP básico usando apenas a biblioteca padrão do Python, sem frameworks externos. O servidor responde a requisições GET e retorna páginas HTML para diferentes rotas.

## O que este projeto ensina
- Como criar um servidor web básico usando o módulo `http.server` do Python
- Como processar requisições HTTP GET
- Como definir rotas diferentes no servidor
- Como retornar conteúdo HTML com status codes apropriados
- Como lidar com erros 404 para rotas não encontradas

## Conceitos importantes
- **Socket TCP**: Base de comunicação para transferência de dados na internet
- **Protocolo HTTP**: Métodos como GET, POST, etc. para comunicação web
- **Status Codes HTTP**: 200 OK, 404 Not Found, etc.
- **Content-Type**: Especificação do tipo de conteúdo na resposta

## Como rodar o projeto

### Pré-requisitos
- Python 3.x instalado

### Passos para executar
1. Navegue até a pasta do projeto:
   ```
   cd app1
   ```

2. Execute o script do servidor:
   ```
   python simple_http_server.py
   ```

3. Abra seu navegador e acesse:
   ```
   http://localhost:8000
   ```

4. Para testar as diferentes rotas, visite:
   - http://localhost:8000/info
   - http://localhost:8000/sobre
   - Qualquer outra rota mostrará uma página 404

5. Para encerrar o servidor, pressione `Ctrl+C` no terminal

## Compreendendo o código
- `MeuHandler`: Uma classe que herda de `SimpleHTTPRequestHandler` e implementa o método `do_GET`
- O método `do_GET` verifica o caminho da URL (`self.path`) e retorna o conteúdo apropriado
- A função `iniciar_servidor()` configura o socket TCP para escutar na porta 8000

## Próximos passos
Após entender esse exemplo básico, você estará pronto para avançar para o próximo projeto, onde implementaremos operações CRUD (Create, Read, Update, Delete) usando arquivos locais. 