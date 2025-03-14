/**
 * Contexto de autenticação para gerenciar o estado de autenticação do usuário
 * Fornece funções para login, logout, registro e verificação do estado de autenticação
 */
import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';
import jwt_decode from 'jwt-decode';

// Cria o contexto de autenticação
const AuthContext = createContext();

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Estado para armazenar informações do usuário autenticado
    const [user, setUser] = useState(null);
    // Estado para controlar se a autenticação está sendo verificada
    const [loading, setLoading] = useState(true);

    // Efeito para verificar autenticação ao carregar a página
    useEffect(() => {
        // Verifica se há tokens no armazenamento local
        const checkAuth = async () => {
            try {
                const accessToken = localStorage.getItem('access_token');
                const refreshToken = localStorage.getItem('refresh_token');

                if (!accessToken || !refreshToken) {
                    setLoading(false);
                    return;
                }

                // Configura o cabeçalho de autorização para solicitações
                api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                // Verifica se o token é válido obtendo o perfil do usuário
                const response = await api.get('/users/me/');
                setUser(response.data);
            } catch (err) {
                // Tenta atualizar o token se houver erro
                try {
                    await refreshAccessToken();
                } catch (refreshErr) {
                    // Se não conseguir atualizar, faz logout
                    logout();
                }
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    /**
     * Atualiza o token de acesso usando o token de atualização
     * @returns {Promise} - Promessa resolvida/rejeitada com resultado da atualização
     */
    const refreshAccessToken = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');

            if (!refreshToken) {
                throw new Error('Não há token de atualização');
            }

            const response = await api.post('/auth/token/refresh/', {
                refresh: refreshToken
            });

            const { access } = response.data;

            // Salva o novo token de acesso
            localStorage.setItem('access_token', access);

            // Atualiza o cabeçalho de autorização
            api.defaults.headers.common['Authorization'] = `Bearer ${access}`;

            // Obtém informações do usuário novamente
            const userResponse = await api.get('/users/me/');
            setUser(userResponse.data);

            return access;
        } catch (err) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            api.defaults.headers.common['Authorization'] = '';
            setUser(null);
            throw err;
        }
    };

    /**
     * Realiza o login do usuário
     * @param {Object} credentials - Credenciais do usuário (username, password)
     * @returns {Promise} - Promessa resolvida com informações do usuário
     */
    const login = async (credentials) => {
        try {
            const response = await api.post('/auth/token/', credentials);
            const { access, refresh } = response.data;

            // Decodifica o token para obter informações básicas
            const decoded = jwt_decode(access);

            // Salva os tokens no armazenamento local
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            // Configura o cabeçalho de autorização para solicitações futuras
            api.defaults.headers.common['Authorization'] = `Bearer ${access}`;

            // Obtém informações completas do usuário
            const userResponse = await api.get('/users/me/');
            setUser(userResponse.data);

            return userResponse.data;
        } catch (err) {
            throw err;
        }
    };

    /**
     * Registra um novo usuário
     * @param {Object} userData - Dados do novo usuário
     * @returns {Promise} - Promessa resolvida com informações do usuário
     */
    const register = async (userData) => {
        try {
            // Registra o novo usuário
            await api.post('/auth/register/', userData);

            // Após registro bem-sucedido, faz login com as credenciais
            const credentials = {
                username: userData.username,
                password: userData.password
            };

            return await login(credentials);
        } catch (err) {
            throw err;
        }
    };

    /**
     * Realiza o logout do usuário
     */
    const logout = () => {
        // Remove os tokens do armazenamento local
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        // Remove o cabeçalho de autorização
        api.defaults.headers.common['Authorization'] = '';

        // Limpa o estado do usuário
        setUser(null);
    };

    /**
     * Verifica se o usuário está autenticado
     * @returns {Boolean} - Verdadeiro se o usuário estiver autenticado
     */
    const isAuthenticated = () => {
        return !!user;
    };

    // Valores e funções disponíveis no contexto
    const value = {
        user,
        loading,
        login,
        logout,
        register,
        isAuthenticated,
        refreshAccessToken
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext; 