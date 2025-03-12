# App 6 - Sistema de Upload de Arquivos com Flask

## O que este projeto faz
Este projeto implementa um sistema completo de upload e gerenciamento de arquivos utilizando Flask. Os usuários podem fazer upload, visualizar, baixar, editar informações e excluir arquivos através de uma interface web intuitiva.

## O que este projeto ensina
- Como implementar upload de arquivos em uma aplicação web
- Como armazenar arquivos de forma segura no servidor
- Como gerenciar metadados de arquivos em um banco de dados
- Como implementar validação de tipos de arquivos
- Como criar uma interface de arrastar e soltar (drag and drop)
- Como gerar nomes de arquivos únicos para evitar conflitos
- Como lidar com visualização de diferentes tipos de arquivos
- Como implementar funcionalidades de download e exclusão

## Conceitos importantes
- **Upload de arquivos**: Técnicas para enviar arquivos do cliente para o servidor
- **MIME types**: Identificação de tipos de arquivos
- **UUID**: Geração de identificadores únicos para arquivos
- **Interface drag-and-drop**: Melhorando a experiência do usuário
- **Validação de arquivo**: Verificando extensões e tamanhos permitidos
- **Armazenamento de metadados**: Separando dados do arquivo e informações sobre ele

## Como rodar o projeto

### Pré-requisitos
- Python 3.x instalado
- pip (gerenciador de pacotes do Python)

### Passos para executar
1. Navegue até a pasta do projeto:
   ```
   cd app6
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
   - Visualize a lista de arquivos disponíveis
   - Faça upload de novos arquivos
   - Veja detalhes de cada arquivo
   - Edite descrições de arquivos
   - Faça download de arquivos
   - Exclua arquivos quando necessário

## Funcionalidades implementadas
- Lista de arquivos com informações básicas
- Formulário de upload com suporte a arrastar e soltar
- Validação de tipos de arquivos permitidos
- Visualização detalhada de arquivos
- Download de arquivos
- Edição de descrições
- Exclusão de arquivos
- Pré-visualização para arquivos de imagem

## Estrutura do banco de dados
O aplicativo utiliza SQLite com a seguinte tabela:

```sql
CREATE TABLE arquivos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_original TEXT NOT NULL,
    nome_armazenado TEXT NOT NULL,
    tipo_arquivo TEXT,
    tamanho INTEGER,
    descricao TEXT,
    data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
```

## Estrutura do projeto
- `app.py`: Código principal da aplicação
- `templates/`: Diretório de templates HTML
  - `base.html`: Template base
  - `index.html`: Lista de arquivos
  - `upload.html`: Formulário de upload
  - `detalhes.html`: Visualização detalhada de arquivo
  - `editar.html`: Formulário para editar descrição
- `uploads/`: Diretório onde os arquivos são armazenados
- `arquivos.db`: Banco de dados SQLite (criado automaticamente)

## Limitações e segurança
- O tamanho máximo do upload está definido em 16 MB
- Apenas determinados tipos de arquivos são permitidos
- Os arquivos são armazenados com nomes únicos para evitar conflitos
- Validação é feita tanto no cliente quanto no servidor 