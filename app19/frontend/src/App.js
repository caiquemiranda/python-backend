/**
 * Componente principal da aplicação
 * Configura rotas, temas e autenticação
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Contextos
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Componentes de Layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Páginas
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import FileUploadPage from './pages/FileUploadPage';
import FileListPage from './pages/FileListPage';
import FileDetailPage from './pages/FileDetailPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

// Componentes de autenticação
import PrivateRoute from './components/auth/PrivateRoute';

// Estilos
import './styles/variables.css';
import './styles/reset.css';
import './styles/global.css';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Componente principal da aplicação
 * Configura provedores de contexto, roteamento e layout global
 */
const App = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    <div className="app">
                        <Header />
                        <main className="main-content">
                            <Routes>
                                {/* Rotas públicas */}
                                <Route path="/" element={<HomePage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                                <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                                {/* Rotas protegidas */}
                                <Route path="/dashboard" element={
                                    <PrivateRoute>
                                        <DashboardPage />
                                    </PrivateRoute>
                                } />

                                <Route path="/files/upload" element={
                                    <PrivateRoute>
                                        <FileUploadPage />
                                    </PrivateRoute>
                                } />

                                <Route path="/files" element={
                                    <PrivateRoute>
                                        <FileListPage />
                                    </PrivateRoute>
                                } />

                                <Route path="/files/:id" element={
                                    <PrivateRoute>
                                        <FileDetailPage />
                                    </PrivateRoute>
                                } />

                                <Route path="/profile" element={
                                    <PrivateRoute>
                                        <ProfilePage />
                                    </PrivateRoute>
                                } />

                                {/* Rota para não encontrado */}
                                <Route path="/not-found" element={<NotFoundPage />} />

                                {/* Redireciona para não encontrado */}
                                <Route path="*" element={<Navigate to="/not-found" replace />} />
                            </Routes>
                        </main>
                        <Footer />

                        {/* Configuração do Toast para notificações */}
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App; 