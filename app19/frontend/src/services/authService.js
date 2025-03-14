/**
 * Serviço para gerenciamento de autenticação
 * Contém métodos para login, logout, registro e gerenciamento de tokens
 */
import api from './api';
import jwtDecode from 'jwt-decode';

// Chaves para armazenamento no localStorage
const ACCESS_TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_INFO_KEY = 'user_info';

/**
 * Classe de serviço para operações de autenticação
 */
const AuthService = {
    /**
     * Realiza o login do usuário
     * @param {Object} credentials - Dados de login (email/username e senha)
     * @returns {Promise} Promise com o resultado da requisição
     */
    login: async (credentials) => {
        try {
            const response = await api.post('/api/auth/token/', credentials);
            const { access, refresh, user } = response.data;

            // Salva tokens e informações do usuário
            localStorage.setItem(ACCESS_TOKEN_KEY, access);
            localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
            localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));

            // Configura token no cabeçalho para futuras requisições
            api.defaults.headers.common['Authorization'] = `Bearer ${access}`;

            return user;
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            throw error;
        }
    },

    /**
     * Registra um novo usuário
     * @param {Object} userData - Dados do usuário (nome, email, senha, etc.)
     * @returns {Promise} Promise com o resultado da requisição
     */
    register: async (userData) => {
        try {
            const response = await api.post('/api/auth/register/', userData);
            return response.data;
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            throw error;
        }
    },

    /**
     * Realiza o logout do usuário
     */
    logout: () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(USER_INFO_KEY);

        // Remove o token de autorização do cabeçalho
        delete api.defaults.headers.common['Authorization'];
    },

    /**
     * Atualiza o token de acesso usando o token de atualização
     * @returns {Promise} Promise com o novo token
     */
    refreshToken: async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

        if (!refreshToken) {
            throw new Error('Token de atualização não encontrado');
        }

        try {
            const response = await api.post('/api/auth/token/refresh/', {
                refresh: refreshToken
            });

            const { access } = response.data;
            localStorage.setItem(ACCESS_TOKEN_KEY, access);

            // Atualiza o token no cabeçalho
            api.defaults.headers.common['Authorization'] = `Bearer ${access}`;

            return access;
        } catch (error) {
            console.error('Erro ao atualizar token:', error);
            AuthService.logout(); // Força logout se não conseguir atualizar
            throw error;
        }
    },

    /**
     * Verifica se o usuário está autenticado
     * @returns {boolean} True se o usuário estiver autenticado
     */
    isAuthenticated: () => {
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);

        if (!token) {
            return false;
        }

        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            // Verifica se o token não expirou
            return decoded.exp > currentTime;
        } catch (error) {
            return false;
        }
    },

    /**
     * Obtém os dados do usuário atual
     * @returns {Object|null} Dados do usuário ou null se não estiver autenticado
     */
    getCurrentUser: () => {
        try {
            const userStr = localStorage.getItem(USER_INFO_KEY);

            if (userStr) {
                return JSON.parse(userStr);
            }

            return null;
        } catch (error) {
            console.error('Erro ao obter usuário atual:', error);
            return null;
        }
    },

    /**
     * Atualiza as informações do usuário no armazenamento local
     * @param {Object} userData - Novos dados do usuário
     */
    updateUserInfo: (userData) => {
        localStorage.setItem(USER_INFO_KEY, JSON.stringify(userData));
    },

    /**
     * Obtém o cabeçalho de autorização para requisições
     * @returns {Object} Cabeçalho de autorização ou objeto vazio
     */
    getAuthHeader: () => {
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);

        if (token) {
            return { Authorization: `Bearer ${token}` };
        }

        return {};
    },

    /**
     * Solicita redefinição de senha
     * @param {string} email - Email do usuário
     * @returns {Promise} Promise com o resultado da requisição
     */
    requestPasswordReset: async (email) => {
        try {
            const response = await api.post('/api/auth/password-reset/', { email });
            return response.data;
        } catch (error) {
            console.error('Erro ao solicitar redefinição de senha:', error);
            throw error;
        }
    },

    /**
     * Redefine a senha usando o token recebido por email
     * @param {Object} resetData - Dados para redefinição (token, nova senha)
     * @returns {Promise} Promise com o resultado da requisição
     */
    resetPassword: async (resetData) => {
        try {
            const response = await api.post('/api/auth/password-reset/confirm/', resetData);
            return response.data;
        } catch (error) {
            console.error('Erro ao redefinir senha:', error);
            throw error;
        }
    }
};

// Configura o token de autenticação se ele existir no localStorage
const token = localStorage.getItem(ACCESS_TOKEN_KEY);
if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default AuthService; 