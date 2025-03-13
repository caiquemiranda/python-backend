/**
 * Serviço de API para comunicação com o backend
 */
import axios from 'axios';

// Definição da URL base da API
const API_URL = 'http://localhost:8000';

// Criação da instância do axios com configurações padrão
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const { response } = error;

        if (response) {
            console.error('Erro na API:', response.status, response.data);

            // Personalizar tratamento de erro com base no status
            switch (response.status) {
                case 401:
                    console.error('Erro de autenticação');
                    break;
                case 403:
                    console.error('Erro de permissão');
                    break;
                case 404:
                    console.error('Recurso não encontrado');
                    break;
                case 500:
                    console.error('Erro interno do servidor');
                    break;
                default:
                    console.error('Erro desconhecido');
            }
        } else {
            console.error('Erro de rede ou servidor indisponível');
        }

        return Promise.reject(error);
    }
);

// Serviços da API
const apiService = {
    // Métricas e KPIs
    getKPIs: async () => {
        try {
            const response = await api.get('/api/kpis');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar KPIs:', error);
            throw error;
        }
    },

    // Séries temporais
    getTimeSeries: async (params = { days: 30, category: null }) => {
        try {
            const response = await api.get('/api/timeseries', { params });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar dados temporais:', error);
            throw error;
        }
    },

    // Dados categóricos
    getCategories: async (params = { with_subcategories: false }) => {
        try {
            const response = await api.get('/api/categories', { params });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar dados categóricos:', error);
            throw error;
        }
    },

    // Dados de correlação
    getCorrelation: async () => {
        try {
            const response = await api.get('/api/correlation');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar dados de correlação:', error);
            throw error;
        }
    },

    // Dados completos do dashboard
    getDashboardData: async () => {
        try {
            const response = await api.get('/api/dashboard');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar dados do dashboard:', error);
            throw error;
        }
    },
};

export default apiService; 