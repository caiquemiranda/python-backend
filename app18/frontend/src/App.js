/**
 * Componente principal da aplicação.
 * 
 * Define as rotas e a estrutura básica da aplicação.
 */
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';

// Componentes de layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Páginas públicas
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Páginas protegidas
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';

// Componente para rotas protegidas
const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useContext(AuthContext);

    // Enquanto verifica a autenticação, mostra um indicador de carregamento
    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Carregando...</p>
            </div>
        );
    }

    // Se não estiver autenticado, redireciona para o login
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Se estiver autenticado, renderiza o componente filho
    return children;
};

const App = () => {
    return (
        <div className="app">
            <Header />
            <main className="main-content">
                <Routes>
                    {/* Rotas públicas */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Rotas protegidas */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <DashboardPage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <ProfilePage />
                            </PrivateRoute>
                        }
                    />

                    {/* Rota para páginas não encontradas */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
};

export default App; 