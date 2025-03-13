# Frontend do Dashboard Analytics

Este é o frontend da aplicação Dashboard Analytics, construído com React e Recharts para visualização de dados.

## Estrutura do Projeto

```
frontend/
  ├── public/               # Arquivos públicos estáticos
  ├── src/                  # Código fonte
  │   ├── components/       # Componentes React
  │   │   ├── Dashboard.jsx # Componente principal do dashboard
  │   │   ├── Home.jsx      # Página inicial
  │   │   ├── KPICard.jsx   # Componente para exibir KPIs
  │   │   └── charts/       # Componentes de gráficos
  │   │       ├── AreaChart.jsx   # Gráfico de área
  │   │       ├── BarChart.jsx    # Gráfico de barras
  │   │       ├── HeatMap.jsx     # Mapa de calor para correlações
  │   │       ├── LineChart.jsx   # Gráfico de linha
  │   │       └── PieChart.jsx    # Gráfico de pizza/donut
  │   ├── hooks/            # Custom hooks
  │   │   └── useDashboard.js # Hook para gerenciar dados do dashboard
  │   ├── services/         # Serviços para comunicação com a API
  │   │   └── api.js        # Serviço de API
  │   ├── App.jsx           # Componente principal com roteamento
  │   ├── index.js          # Ponto de entrada da aplicação
  │   └── index.css         # Estilos globais
  ├── package.json          # Dependências e scripts
  └── README.md             # Documentação
```

## Componentes Implementados

### Dashboard

O componente principal que organiza todas as visualizações e gerencia os filtros do dashboard.

### KPICard

Componente para exibir indicadores-chave de desempenho (KPIs) em cards, incluindo:
- Valor atual
- Comparação com período anterior
- Indicador visual de tendência (positivo/negativo)

### Gráficos

- **LineChart**: Gráfico de linha para visualizar tendências ao longo do tempo
- **AreaChart**: Gráfico de área para visualizar volumes acumulados
- **BarChart**: Gráfico de barras para comparações entre categorias
- **PieChart**: Gráfico de pizza/donut para visualizar proporções
- **HeatMap**: Mapa de calor para visualizar correlações entre variáveis

### Hook Personalizado - useDashboard

Hook que centraliza toda a lógica de:
- Carregamento de dados
- Gerenciamento de estados (loading, erro)
- Filtragem de dados
- Atualização de configurações

## Funcionalidades Implementadas

- Visualização de KPIs com comparação com períodos anteriores
- Gráficos interativos com tooltips personalizados
- Filtragem por período de tempo
- Opção para visualizar subcategorias
- Visualização condicional de análise de correlação
- Layout responsivo para diferentes tamanhos de tela
- Tratamento de estados de carregamento e erro

## Tecnologias Utilizadas

- React (Hooks, Context)
- React Router para navegação
- Recharts para visualização de dados
- Tailwind CSS para estilos
- Axios para comunicação com API
- React Icons para ícones

## Como Executar

1. Instale as dependências:
```bash
npm install
# ou
yarn
```

2. Inicie o servidor de desenvolvimento:
```bash
npm start
# ou
yarn start
```

O aplicativo estará disponível em http://localhost:3000. 