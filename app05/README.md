# App 5 - Autenticação Simples com Flask

## O que este projeto faz
Este projeto implementa um sistema de autenticação de usuários utilizando Flask, incluindo registro, login, logout e proteção de rotas. Os usuários autenticados podem criar, editar e excluir posts em uma área protegida.

## O que este projeto ensina
- Como implementar autenticação de usuários com Flask
- Como proteger rotas utilizando decoradores personalizados
- Como gerenciar sessões de usuário
- Como criptografar senhas para armazenamento seguro
- Como implementar um sistema de permissões básico
- Como criar um fluxo completo de autenticação (registro, login, logout)
- Como validar dados de formulários
- Como usar flash messages para feedback ao usuário

## Conceitos importantes
- **Autenticação de usuários**: Processo de verificar identidade
- **Hashing de senhas**: Segurança para armazenamento de credenciais
- **Decoradores em Python**: Adicionar funcionalidades a funções existentes
- **Sessões**: Mecanismo para manter estado entre requisições
- **Flash Messages**: Sistema de feedback temporário para o usuário
- **CSRF**: Prevenção contra ataques de falsificação de requisição
- **SQLite**: Banco de dados leve para armazenar usuários e posts

## Como rodar o projeto

### Pré-requisitos
- Python 3.x instalado
- pip (gerenciador de pacotes do Python)

### Passos para executar
1. Navegue até a pasta do projeto:
   ```
   cd app5
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

5. Fluxo de uso:
   - Registre-se como um novo usuário
   - Faça login com suas credenciais
   - Acesse o painel para gerenciar seus posts
   - Crie, edite e exclua posts
   - Faça logout quando terminar

## Funcionalidades implementadas
- Registro de novos usuários
- Login/logout de usuários
- Proteção de rotas (apenas usuários autenticados)
- Criptografia de senhas
- Validação de formulários
- Criação, edição e exclusão de posts
- Permissões básicas (usuários só podem editar/excluir seus próprios posts)
- Mensagens de feedback para o usuário

## Estrutura do banco de dados
O aplicativo utiliza SQLite com as seguintes tabelas:

```sql
CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    usuario_id INTEGER NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
)
```

## Estrutura do projeto
- `app.py`: Código principal da aplicação
- `templates/`: Diretório de templates HTML
  - `base.html`: Template base
  - `index.html`: Página inicial
  - `login.html`: Formulário de login
  - `registrar.html`: Formulário de registro
  - `painel.html`: Painel do usuário (área protegida)
  - `formulario_post.html`: Formulário para criar/editar posts
- `users.db`: Banco de dados SQLite (criado automaticamente)

## Próximos passos
Após entender este exemplo de autenticação com Flask, você estará pronto para avançar para o próximo projeto, onde implementaremos um sistema de upload de arquivos. 