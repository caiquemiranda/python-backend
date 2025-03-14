/**
 * Componente principal da aplicação que configura o roteamento
 * e os contextos globais.
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layouts
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Páginas de Autenticação
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Páginas Públicas
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';

// Páginas do Dashboard
import Dashboard from './pages/projects/Dashboard';
import ProjectList from './pages/projects/ProjectList';
import ProjectDetail from './pages/projects/ProjectDetail';
import ProjectForm from './pages/projects/ProjectForm';

// Páginas de Tarefas
import TaskList from './pages/tasks/TaskList';
import TaskDetail from './pages/tasks/TaskDetail';
import TaskForm from './pages/tasks/TaskForm';

// Páginas de Usuário
import Profile from './pages/users/Profile';
import ProfileEdit from './pages/users/ProfileEdit';

// Estilos globais
import './styles/global.css';

/**
 * Componente de rota protegida que verifica se o usuário está autenticado
 * antes de renderizar o componente da rota.
 */
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    // Exibe uma tela de carregamento enquanto verificamos a autenticação
    if (loading) {
        return <div className="loading-page">Carregando...</div>;
    }

    // Redireciona para a página de login se não estiver autenticado
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Renderiza o componente filho se estiver autenticado
    return children;
};

/**
 * Componente principal da aplicação
 */
const App = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    <Navbar />
                    <main className="main-content">
                        <Routes>
                            {/* Rotas públicas */}
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/features" element={<Features />} />

                            {/* Rotas de autenticação */}
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/forgot-password" element={<ForgotPassword />} />

                            {/* Rotas protegidas - Dashboard */}
                            <Route path="/dashboard" element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            } />

                            {/* Rotas protegidas - Projetos */}
                            <Route path="/projects" element={
                                <ProtectedRoute>
                                    <ProjectList />
                                </ProtectedRoute>
                            } />
                            <Route path="/projects/new" element={
                                <ProtectedRoute>
                                    <ProjectForm isNew={true} />
                                </ProtectedRoute>
                            } />
                            <Route path="/projects/:id" element={
                                <ProtectedRoute>
                                    <ProjectDetail />
                                </ProtectedRoute>
                            } />
                            <Route path="/projects/:id/edit" element={
                                <ProtectedRoute>
                                    <ProjectForm isNew={false} />
                                </ProtectedRoute>
                            } />

                            {/* Rotas protegidas - Tarefas */}
                            <Route path="/tasks" element={
                                <ProtectedRoute>
                                    <TaskList />
                                </ProtectedRoute>
                            } />
                            <Route path="/tasks/new" element={
                                <ProtectedRoute>
                                    <TaskForm isNew={true} />
                                </ProtectedRoute>
                            } />
                            <Route path="/tasks/:id" element={
                                <ProtectedRoute>
                                    <TaskDetail />
                                </ProtectedRoute>
                            } />
                            <Route path="/tasks/:id/edit" element={
                                <ProtectedRoute>
                                    <TaskForm isNew={false} />
                                </ProtectedRoute>
                            } />

                            {/* Rotas protegidas - Perfil de usuário */}
                            <Route path="/profile" element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            } />
                            <Route path="/profile/edit" element={
                                <ProtectedRoute>
                                    <ProfileEdit />
                                </ProtectedRoute>
                            } />

                            {/* Rota para páginas não encontradas */}
                            <Route path="*" element={<Navigate to="/" />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App; 