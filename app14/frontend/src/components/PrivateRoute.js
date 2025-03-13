import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Componente para proteger rotas que requerem autenticação
const PrivateRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    // Se está carregando, exibe mensagem de carregamento
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Carregando...</p>
            </div>
        );
    }

    // Se não estiver autenticado, redireciona para a página de login
    // caso contrário, renderiza a rota solicitada
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute; 