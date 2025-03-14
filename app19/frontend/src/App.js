/**
 * Componente principal da aplicação
 * Define as rotas e a estrutura básica da aplicação
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Contextos
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Componentes de layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Páginas
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import FileListPage from './pages/FileListPage';
import FileDetailPage from './pages/FileDetailPage';
import FileUploadPage from './pages/FileUploadPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

// Componente de rota protegida
import PrivateRoute from './components/auth/PrivateRoute';

// Estilos globais
import './App.css';

const App = () => {
    return (
        <Router>
            <ThemeProvider>
                <AuthProvider>
                    <div className="app">
                        <Header />
                        <main className="main-content">
                            <Routes>
                                {/* Rotas públicas */}
                                <Route path="/" element={<HomePage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                                <Route path="/files" element={<FileListPage />} />
                                <Route path="/files/:id" element={<FileDetailPage />} />
                                <Route path="/about" element={<AboutPage />} />

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
                                <Route
                                    path="/upload"
                                    element={
                                        <PrivateRoute>
                                            <FileUploadPage />
                                        </PrivateRoute>
                                    }
                                />

                                {/* Rotas de termos e privacidade */}
                                <Route path="/terms" element={<AboutPage section="terms" />} />
                                <Route path="/privacy" element={<AboutPage section="privacy" />} />

                                {/* Rota para página não encontrada */}
                                <Route path="/404" element={<NotFoundPage />} />

                                {/* Redireciona qualquer rota não definida para 404 */}
                                <Route path="*" element={<Navigate to="/404" replace />} />
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
                </AuthProvider>
            </ThemeProvider>
        </Router>
    );
};

export default App; 