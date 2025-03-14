/**
 * Contexto de autenticação
 * Gerencia o estado de autenticação do usuário e fornece métodos para login, logout e verificação de autenticação
 */
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import jwt_decode from 'jwt-decode';
import api from '../services/api';

// Criação do contexto
const AuthContext = createContext({});

/**
 * Provider do contexto de autenticação
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Componentes filhos
 */
export const AuthProvider = ({ children }) => {
    // Estado para armazenar dados do usuário e tokens
    const [user, setUser] = useState(null);
    const [tokens, setTokens] = useState(null);
    const [loading, setLoading] = useState(true);

    // Efeito para carregar tokens do localStorage ao iniciar
    useEffect(() => {
        const loadStoredAuth = async () => {
            const storedTokens = localStorage.getItem('@FileShare:tokens');

            if (storedTokens) {
                try {
                    const parsedTokens = JSON.parse(storedTokens);

                    // Verifica se o token de acesso expirou
                    const decodedToken = jwt_decode(parsedTokens.access);
                    const currentTime = Date.now() / 1000;

                    if (decodedToken.exp > currentTime) {
                        // Token válido, configura o cabeçalho de autorização
                        api.defaults.headers.common['Authorization'] = `Bearer ${parsedTokens.access}`;
                        setTokens(parsedTokens);

                        // Carrega os dados do usuário
                        try {
                            const response = await api.get('/api/auth/profile/');
                            setUser(response.data);
                        } catch (error) {
                            console.error('Erro ao carregar perfil:', error);
                            localStorage.removeItem('@FileShare:tokens');
                        }
                    } else {
                        // Token expirado, tenta renovar
                        try {
                            const response = await api.post('/api/auth/token/refresh/', {
                                refresh: parsedTokens.refresh
                            });

                            const newTokens = {
                                access: response.data.access,
                                refresh: parsedTokens.refresh
                            };

                            localStorage.setItem('@FileShare:tokens', JSON.stringify(newTokens));
                            api.defaults.headers.common['Authorization'] = `Bearer ${newTokens.access}`;
                            setTokens(newTokens);

                            // Carrega os dados do usuário
                            const userResponse = await api.get('/api/auth/profile/');
                            setUser(userResponse.data);
                        } catch (refreshError) {
                            // Falha ao renovar token, remove dados armazenados
                            console.error('Erro ao renovar token:', refreshError);
                            localStorage.removeItem('@FileShare:tokens');
                        }
                    }
                } catch (error) {
                    // Erro ao processar tokens, remove dados armazenados
                    console.error('Erro ao processar tokens armazenados:', error);
                    localStorage.removeItem('@FileShare:tokens');
                }
            }

            setLoading(false);
        };

        loadStoredAuth();
    }, []);

    /**
     * Função para realizar login
     * @param {Object} credentials - Credenciais do usuário
     * @param {string} credentials.email - Email do usuário
     * @param {string} credentials.password - Senha do usuário
     */
    const login = async (credentials) => {
        try {
            setLoading(true);

            // Faz a requisição de login
            const response = await api.post('/api/auth/token/', credentials);
            const { access, refresh } = response.data;

            // Armazena os tokens
            const newTokens = { access, refresh };
            localStorage.setItem('@FileShare:tokens', JSON.stringify(newTokens));

            // Configura o cabeçalho de autorização
            api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
            setTokens(newTokens);

            // Carrega os dados do usuário
            const userResponse = await api.get('/api/auth/profile/');
            setUser(userResponse.data);

            toast.success('Login realizado com sucesso!');
            return true;
        } catch (error) {
            let errorMessage = 'Erro ao fazer login. Verifique suas credenciais.';

            if (error.response) {
                if (error.response.status === 401) {
                    errorMessage = 'Email ou senha incorretos.';
                } else if (error.response.data && error.response.data.detail) {
                    errorMessage = error.response.data.detail;
                }
            }

            toast.error(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Função para realizar registro de novo usuário
     * @param {Object} userData - Dados do usuário
     */
    const register = async (userData) => {
        try {
            setLoading(true);

            // Faz a requisição de registro
            await api.post('/api/auth/register/', userData);

            toast.success('Registro realizado com sucesso! Faça login para continuar.');
            return true;
        } catch (error) {
            let errorMessage = 'Erro ao registrar. Verifique os dados informados.';

            if (error.response && error.response.data) {
                // Formata as mensagens de erro da API
                const errors = error.response.data;
                const errorMessages = [];

                for (const field in errors) {
                    if (Array.isArray(errors[field])) {
                        errorMessages.push(`${field}: ${errors[field].join(' ')}`);
                    }
                }

                if (errorMessages.length > 0) {
                    errorMessage = errorMessages.join('\n');
                }
            }

            toast.error(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    };

    /**
     * Função para realizar logout
     */
    const logout = () => {
        localStorage.removeItem('@FileShare:tokens');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
        setTokens(null);
        toast.info('Logout realizado com sucesso!');
    };

    /**
     * Função para atualizar o perfil do usuário
     * @param {Object} profileData - Dados do perfil a serem atualizados
     */
    const updateProfile = async (profileData) => {
        try {
            setLoading(true);

            // Faz a requisição de atualização de perfil
            const response = await api.patch('/api/auth/profile/', profileData);

            setUser(response.data);
            toast.success('Perfil atualizado com sucesso!');
            return true;
        } catch (error) {
            let errorMessage = 'Erro ao atualizar perfil.';

            if (error.response && error.response.data) {
                // Formata as mensagens de erro da API
                const errors = error.response.data;
                const errorMessages = [];

                for (const field in errors) {
                    if (Array.isArray(errors[field])) {
                        errorMessages.push(`${field}: ${errors[field].join(' ')}`);
                    }
                }

                if (errorMessages.length > 0) {
                    errorMessage = errorMessages.join('\n');
                }
            }

            toast.error(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Valor do contexto
    const value = {
        user,
        tokens,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        updateProfile
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook para usar o contexto de autenticação
 * @returns {Object} Contexto de autenticação
 */
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }

    return context;
};

export default AuthContext;