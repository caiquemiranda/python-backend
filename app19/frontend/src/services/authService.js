/**
 * Serviço para gerenciar autenticação e autorização
 * Fornece métodos para login, registro, gerenciamento de tokens e verificação de autenticação
 */
import axios from 'axios';
import jwt_decode from 'jwt-decode';

// URL base da API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Chaves para armazenamento no localStorage
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user_info';

/**
 * Serviço de autenticação
 */
const authService = {
    /**
     * Realiza o login do usuário
     * @param {string} username - Nome de usuário
     * @param {string} password - Senha
     * @returns {Promise} - Promise com a resposta da API
     */
    login: async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/token/`, {
                username,
                password
            });

            if (response.data.access) {
                // Armazena tokens e informações do usuário
                localStorage.setItem(TOKEN_KEY, response.data.access);
                localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refresh);

                // Decodifica o token para obter informações do usuário
                const user = jwt_decode(response.data.access);
                localStorage.setItem(USER_KEY, JSON.stringify(user));
            }

            return response;
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            throw error;
        }
    },

    /**
     * Registra um novo usuário
     * @param {Object} userData - Dados do usuário (nome, email, senha, etc.)
     * @returns {Promise} - Promise com a resposta da API
     */
    register: async (userData) => {
        try {
            const response = await axios.post(`${API_URL}/auth/register/`, userData);
            return response;
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            throw error;
        }
    },

    /**
     * Realiza o logout do usuário
     */
    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },

    /**
     * Verifica se o usuário está autenticado
     * @returns {boolean} - Verdadeiro se o usuário estiver autenticado
     */
    isAuthenticated: () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) return false;

        try {
            const decoded = jwt_decode(token);
            const currentTime = Date.now() / 1000;

            // Verifica se o token não expirou
            if (decoded.exp < currentTime) {
                // Token expirado, tenta renovar
                authService.refreshToken();
                return false;
            }

            return true;
        } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
            return false;
        }
    },

    /**
     * Renova o token de acesso usando o token de atualização
     * @returns {Promise} - Promise com o resultado da renovação
     */
    refreshToken: async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
        if (!refreshToken) return Promise.reject('Nenhum token de atualização disponível');

        try {
            const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
                refresh: refreshToken
            });

            if (response.data.access) {
                localStorage.setItem(TOKEN_KEY, response.data.access);

                // Atualiza as informações do usuário
                const user = jwt_decode(response.data.access);
                localStorage.setItem(USER_KEY, JSON.stringify(user));

                return response;
            }
        } catch (error) {
            console.error('Erro ao renovar token:', error);
            // Se não conseguir renovar, faz logout
            authService.logout();
            throw error;
        }
    },

    /**
     * Obtém o token de autenticação atual
     * @returns {string|null} - Token de autenticação ou null
     */
    getToken: () => {
        return localStorage.getItem(TOKEN_KEY);
    },

    /**
     * Obtém as informações do usuário atual
     * @returns {Object|null} - Informações do usuário ou null
     */
    getCurrentUser: () => {
        const userStr = localStorage.getItem(USER_KEY);
        if (!userStr) return null;

        try {
            return JSON.parse(userStr);
        } catch (error) {
            console.error('Erro ao obter informações do usuário:', error);
            return null;
        }
    },

    /**
     * Obtém os cabeçalhos de autenticação para requisições
     * @returns {Object} - Cabeçalhos de autenticação
     */
    getAuthHeader: () => {
        const token = authService.getToken();
        if (token) {
            return { Authorization: `Bearer ${token}` };
        }
        return {};
    },

    /**
     * Atualiza o perfil do usuário
     * @param {Object} userData - Dados atualizados do usuário
     * @returns {Promise} - Promise com a resposta da API
     */
    updateProfile: async (userData) => {
        try {
            const response = await axios.patch(`${API_URL}/auth/profile/`, userData, {
                headers: authService.getAuthHeader()
            });
            return response;
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            throw error;
        }
    },

    /**
     * Altera a senha do usuário
     * @param {string} oldPassword - Senha atual
     * @param {string} newPassword - Nova senha
     * @returns {Promise} - Promise com a resposta da API
     */
    changePassword: async (oldPassword, newPassword) => {
        try {
            const response = await axios.post(
                `${API_URL}/auth/change-password/`,
                { old_password: oldPassword, new_password: newPassword },
                { headers: authService.getAuthHeader() }
            );
            return response;
        } catch (error) {
            console.error('Erro ao alterar senha:', error);
            throw error;
        }
    }
};

// Exporta o serviço e a função getAuthHeader para uso em outros serviços
export default authService;
export const getAuthHeader = authService.getAuthHeader; 