/**
 * Contexto de autenticação.
 * 
 * Gerencia o estado de autenticação em toda a aplicação, incluindo
 * login, logout e armazenamento de tokens JWT.
 */
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Criação do contexto
export const AuthContext = createContext();

// URL base da API
const API_URL = 'http://localhost:8000/api';

export const AuthProvider = ({ children }) => {
    // Estados para gerenciar a autenticação
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Efeito para verificar se já existe um token armazenado
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    // Verifica se o token ainda é válido
                    const response = await axios.post(`${API_URL}/token/verify/`, {
                        token
                    });

                    // Se for válido, decodifica o token para obter informações do usuário
                    const decodedToken = jwtDecode(token);

                    // Configura o header de autorização
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                    // Busca os detalhes do usuário
                    const userResponse = await axios.get(`${API_URL}/users/profile/`);

                    // Atualiza o estado
                    setUser(userResponse.data);
                    setIsAuthenticated(true);
                    setError(null);
                } catch (err) {
                    // Em caso de erro (token inválido, expirado, etc.), faz logout
                    console.error('Erro ao verificar token:', err);
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    setUser(null);
                    setIsAuthenticated(false);
                    delete axios.defaults.headers.common['Authorization'];
                }
            }
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    // Função para login
    const login = async (email, password) => {
        setError(null);
        try {
            // Faz a requisição de login
            const response = await axios.post(`${API_URL}/token/`, {
                email,
                password
            });

            // Obtém os tokens
            const { access, refresh } = response.data;

            // Armazena os tokens
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);

            // Configura o header de autorização
            axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;

            // Decodifica o token
            const decodedToken = jwtDecode(access);

            // Busca os detalhes do usuário
            const userResponse = await axios.get(`${API_URL}/users/profile/`);

            // Atualiza o estado
            setUser(userResponse.data);
            setIsAuthenticated(true);
            return true;
        } catch (err) {
            setError(err.response?.data?.detail || 'Erro ao fazer login. Verifique suas credenciais.');
            return false;
        }
    };

    // Função para registro
    const register = async (userData) => {
        setError(null);
        try {
            await axios.post(`${API_URL}/users/register/`, userData);
            return true;
        } catch (err) {
            setError(err.response?.data || 'Erro ao registrar usuário.');
            return false;
        }
    };

    // Função para logout
    const logout = async () => {
        try {
            // Chama a API de logout (opcional, já que JWT é stateless)
            await axios.post(`${API_URL}/users/logout/`);
        } catch (err) {
            console.error('Erro ao fazer logout na API:', err);
        } finally {
            // Remove os tokens do localStorage
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');

            // Remove o header de autorização
            delete axios.defaults.headers.common['Authorization'];

            // Atualiza o estado
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    // Função para atualizar o perfil do usuário
    const updateProfile = async (userData) => {
        setError(null);
        try {
            const response = await axios.patch(`${API_URL}/users/profile/`, userData);
            setUser(response.data);
            return true;
        } catch (err) {
            setError(err.response?.data || 'Erro ao atualizar perfil.');
            return false;
        }
    };

    // Função para alterar a senha
    const changePassword = async (passwordData) => {
        setError(null);
        try {
            await axios.put(`${API_URL}/users/change-password/`, passwordData);
            return true;
        } catch (err) {
            setError(err.response?.data || 'Erro ao alterar senha.');
            return false;
        }
    };

    // Valor do contexto
    const value = {
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout,
        updateProfile,
        changePassword
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}; 