# App15 - Dashboard de Visualização de Dados

Um aplicativo fullstack para visualização de dados com gráficos interativos. O projeto é composto por um backend em FastAPI (Python) e um frontend em React com Recharts para visualização de dados.

## O que o projeto faz

Este dashboard permite visualizar dados em vários formatos de gráficos:
- Gráficos de linha para análise de tendências temporais
- Gráficos de barra para comparações
- Gráficos de pizza para visualização de proporções
- Gráficos de área para mostrar mudanças ao longo do tempo
- Mapas de calor para correlações
- KPIs (Indicadores-chave de desempenho) para métricas importantes

Os dados são alimentados por uma API REST construída com FastAPI, que fornece endpoints para cada tipo de visualização.

## O que o projeto ensina

Este projeto foi desenvolvido com foco didático para demonstrar:

1. **Backend (FastAPI)**:
   - Construção de uma API REST com FastAPI
   - Estruturação de projetos Python
   - Uso de Pydantic para validação de dados
   - Documentação automática da API com Swagger/OpenAPI
   - Geração de dados simulados para visualização

2. **Frontend (React)**:
   - Criação de componentes React
   - Gerenciamento de estado com React Hooks
   - Integração com bibliotecas de gráficos (Recharts)
   - Consumo de APIs com Axios
   - Layouts responsivos com CSS moderno

3. **Integrações**:
   - Comunicação entre aplicações frontend e backend
   - Manipulação e transformação de dados para visualização
   - CORS e segurança em aplicações web

## Como executar o projeto

### Requisitos
- Python 3.8 ou superior
- Node.js 14 ou superior
- npm ou yarn

### Backend (FastAPI)

1. Navegue até a pasta do backend:
```bash
cd app15/backend
```

2. Crie um ambiente virtual (opcional, mas recomendado):
```bash
python -m venv venv
```

3. Ative o ambiente virtual:
   - No Windows:
   ```bash
   venv\Scripts\activate
   ```
   - No macOS/Linux:
   ```bash
   source venv/bin/activate
   ```

4. Instale as dependências:
```bash
pip install -r requirements.txt
```

5. Inicie o servidor de desenvolvimento:
```bash
uvicorn main:app --reload
```

O backend estará disponível em: `http://localhost:8000`
A documentação da API: `http://localhost:8000/docs`

### Frontend (React)

1. Navegue até a pasta do frontend:
```bash
cd app15/frontend
```

2. Instale as dependências:
```bash
npm install
# ou
yarn
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
# ou
yarn start
```

O frontend estará disponível em: `http://localhost:3000`

## Implementação atual

### Backend
O backend da aplicação está desenvolvido usando FastAPI e inclui:
- Endpoints RESTful para fornecer dados para o dashboard
- Modelos de dados usando Pydantic
- Geração de dados simulados para visualização
- Configuração de CORS para permitir requisições do frontend

### Frontend
O frontend da aplicação está desenvolvido usando React e inclui:

1. **Custom Hooks**:
   - `useDashboard`: Gerencia todos os dados do dashboard, estados de carregamento e erros, e funções para atualização de filtros.

2. **Componentes de visualização de dados**:
   - `KPICard`: Exibe KPIs com valor atual, valor anterior e tendência
   - `LineChart`: Gráfico de linha para tendências temporais
   - `BarChart`: Gráfico de barras para comparações entre categorias
   - `PieChart`: Gráfico de pizza/donut para proporções
   - `AreaChart`: Gráfico de área para acumulados ao longo do tempo
   - `HeatMap`: Mapa de calor para correlações entre variáveis

3. **Componentes da aplicação**:
   - `Dashboard`: Organiza e exibe todas as visualizações
   - `Home`: Página inicial com apresentação da aplicação
   - `App`: Configura as rotas da aplicação

4. **Funcionalidades implementadas**:
   - Exibição de KPIs com comparação com períodos anteriores
   - Visualização de dados temporais e categóricos
   - Filtros por período e opções de visualização
   - Tratamento de estados de carregamento e erro
   - Interface responsiva

## Estrutura do Projeto

```
app15/
  ├── backend/                    # Backend FastAPI
  │   ├── main.py                 # Ponto de entrada do FastAPI
  │   ├── schemas.py              # Esquemas Pydantic
  │   ├── routers/                # Rotas da API
  │   │   └── data.py             # Endpoints para dados do dashboard
  │   ├── utils.py                # Funções utilitárias
  │   └── requirements.txt        # Dependências
  │
  ├── frontend/                   # Frontend React
  │   ├── public/
  │   ├── src/
  │   │   ├── components/         # Componentes React
  │   │   │   ├── Dashboard.jsx
  │   │   │   ├── Home.jsx
  │   │   │   ├── KPICard.jsx
  │   │   │   └── charts/
  │   │   │       ├── AreaChart.jsx
  │   │   │       ├── BarChart.jsx
  │   │   │       ├── HeatMap.jsx
  │   │   │       ├── LineChart.jsx
  │   │   │       └── PieChart.jsx
  │   │   ├── hooks/              # Custom hooks
  │   │   │   └── useDashboard.js
  │   │   ├── services/           # Serviços para API
  │   │   │   └── api.js
  │   │   ├── App.jsx             # Componente principal
  │   │   ├── index.js            # Ponto de entrada
  │   │   └── index.css           # Estilos globais
  │   ├── package.json            # Dependências npm
  │   └── README.md               # Documentação frontend
  │
  └── README.md                  # Este arquivo
``` 