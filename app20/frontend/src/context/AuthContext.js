/**
 * Contexto de autenticação para gerenciar o estado de autenticação 
 * e fornecer funcionalidades de autenticação para toda a aplicação.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

// Criação do contexto de autenticação
const AuthContext = createContext(null);

/**
 * Provider do contexto de autenticação.
 * Fornece o estado de autenticação e métodos relacionados para os componentes filhos.
 */
export const AuthProvider = ({ children }) => {
    // Estado para armazenar informações do usuário autenticado
    const [user, setUser] = useState(null);
    // Estado para controlar se a verificação inicial foi concluída
    const [loading, setLoading] = useState(true);

    // Efeito para carregar o usuário do localStorage quando o componente é montado
    useEffect(() => {
        const loadUser = () => {
            try {
                // Verifica se há um usuário no localStorage
                const storedUser = authService.getCurrentUser();
                if (storedUser) {
                    setUser(storedUser);
                }
            } catch (error) {
                console.error('Erro ao carregar usuário:', error);
                // Em caso de erro, limpa os dados de autenticação
                authService.logout();
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    /**
     * Função para fazer login do usuário
     * @param {Object} credentials - Credenciais de login (username e password)
     * @returns {Promise} Promessa com os dados do usuário
     */
    const login = async (credentials) => {
        try {
            const loggedUser = await authService.login(credentials);
            setUser(loggedUser);
            return loggedUser;
        } catch (error) {
            throw error;
        }
    };

    /**
     * Função para fazer logout do usuário
     */
    const logout = () => {
        authService.logout();
        setUser(null);
    };

    /**
     * Função para registrar um novo usuário
     * @param {Object} userData - Dados do usuário a ser registrado
     * @returns {Promise} Promessa com a resposta da API
     */
    const register = async (userData) => {
        try {
            await authService.register(userData);
            // Após o registro bem-sucedido, faz login automaticamente
            return await login({
                username: userData.username,
                password: userData.password
            });
        } catch (error) {
            throw error;
        }
    };

    /**
     * Função para atualizar o perfil do usuário
     * @param {Object} userData - Novos dados do usuário
     * @returns {Promise} Promessa com a resposta da API
     */
    const updateProfile = async (userData) => {
        try {
            const response = await authService.updateProfile(userData);
            // Atualiza o usuário no estado e no localStorage
            const updatedUser = { ...user, ...response.data };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return response;
        } catch (error) {
            throw error;
        }
    };

    /**
     * Função para alterar a senha do usuário
     * @param {Object} passwordData - Objeto com senhas antiga e nova
     * @returns {Promise} Promessa com a resposta da API
     */
    const changePassword = (passwordData) => {
        return authService.changePassword(passwordData);
    };

    // Valor do contexto que será fornecido aos componentes filhos
    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        updateProfile,
        changePassword
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Hook personalizado para acessar o contexto de autenticação
 * @returns {Object} Contexto de autenticação
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext; 