import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/api';
import { toast } from 'react-toastify';

// Criação do contexto de autenticação
const AuthContext = createContext();

// Provedor de autenticação para envolver a aplicação
export const AuthProvider = ({ children }) => {
    // Estado para armazenar dados do usuário logado
    const [user, setUser] = useState(null);

    // Estado para controlar se o usuário está autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Estado para controlar quando está carregando dados
    const [loading, setLoading] = useState(true);

    // Carrega o usuário quando o componente é montado
    useEffect(() => {
        const loadUser = async () => {
            if (authService.isAuthenticated()) {
                try {
                    setLoading(true);
                    const userData = await authService.getCurrentUser();
                    setUser(userData);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Erro ao carregar usuário:', error);
                    authService.logout(); // Limpa o token inválido
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    // Função para login
    const login = async (username, password) => {
        try {
            await authService.login(username, password);
            const userData = await authService.getCurrentUser();
            setUser(userData);
            setIsAuthenticated(true);
            return { success: true };
        } catch (error) {
            console.error('Erro no login:', error);
            const errorMessage = error.detail || 'Erro ao fazer login. Verifique suas credenciais.';
            toast.error(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    // Função para registro de usuário
    const register = async (userData) => {
        try {
            await authService.register(userData);
            toast.success('Registro realizado com sucesso! Faça login para continuar.');
            return { success: true };
        } catch (error) {
            console.error('Erro no registro:', error);
            const errorMessage = error.detail || 'Erro ao registrar usuário.';
            toast.error(errorMessage);
            return { success: false, error: errorMessage };
        }
    };

    // Função para logout
    const logout = () => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
        toast.info('Você foi desconectado.');
    };

    // Valores fornecidos pelo contexto
    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}; 