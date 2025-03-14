/**
 * Componente de rota privada
 * Protege rotas que exigem autenticação, redirecionando usuários não autenticados para a página de login
 */
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Componente que protege rotas que exigem autenticação
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Componentes filhos a serem renderizados se autenticado
 * @returns {React.ReactNode} - Componente filho ou redirecionamento
 */
const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    // Mostra um indicador de carregamento enquanto verifica a autenticação
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Verificando autenticação...</p>
            </div>
        );
    }

    // Se não estiver autenticado, redireciona para a página de login
    // Armazena a localização atual para redirecionar de volta após o login
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Se estiver autenticado, renderiza os componentes filhos
    return children;
};

export default PrivateRoute; 