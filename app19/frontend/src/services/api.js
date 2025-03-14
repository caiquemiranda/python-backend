/**
 * Configuração do cliente Axios para comunicação com a API
 */
import axios from 'axios';

/**
 * Instância do Axios configurada para comunicação com a API
 * Inclui configurações de timeout, baseURL e interceptadores para tratamento de erros
 */
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Interceptador para requisições
api.interceptors.request.use(
    (config) => {
        // Você pode modificar a configuração da requisição aqui
        return config;
    },
    (error) => {
        // Tratamento de erros na requisição
        return Promise.reject(error);
    }
);

// Interceptador para respostas
api.interceptors.response.use(
    (response) => {
        // Tratamento de respostas bem-sucedidas
        return response;
    },
    async (error) => {
        // Tratamento de erros nas respostas

        // Se o erro for de rede ou o servidor não responder
        if (!error.response) {
            console.error('Erro de rede ou servidor não disponível:', error.message);
            return Promise.reject(error);
        }

        // Tratamento específico para diferentes códigos de status
        switch (error.response.status) {
            case 401: // Não autorizado
                // Se não for uma requisição de login ou refresh token
                if (
                    !error.config.url.includes('/api/auth/token/') &&
                    !error.config.url.includes('/api/auth/token/refresh/')
                ) {
                    console.error('Erro de autenticação:', error.response.data);
                    // Aqui você pode implementar um redirecionamento para a página de login
                    // ou tentar renovar o token automaticamente
                }
                break;

            case 403: // Proibido
                console.error('Acesso proibido:', error.response.data);
                break;

            case 404: // Não encontrado
                console.error('Recurso não encontrado:', error.response.data);
                break;

            case 500: // Erro interno do servidor
                console.error('Erro interno do servidor:', error.response.data);
                break;

            default:
                console.error(`Erro ${error.response.status}:`, error.response.data);
        }

        return Promise.reject(error);
    }
);

export default api;