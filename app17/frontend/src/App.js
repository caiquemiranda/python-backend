/**
 * Componente principal da aplicação.
 * Gerencia as rotas e o layout comum a todas as páginas.
 */
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Componentes
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';

// Páginas
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';
import TaskDetail from './pages/TaskDetail';
import CategoryList from './pages/CategoryList';
import CategoryForm from './pages/CategoryForm';
import NotFound from './pages/NotFound';

// Estilos
import './App.css';

function App() {
    return (
        <div className="app">
            <Header />
            <div className="app-container">
                <Sidebar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<TaskList />} />
                        <Route path="/tasks" element={<TaskList />} />
                        <Route path="/tasks/new" element={<TaskForm />} />
                        <Route path="/tasks/edit/:id" element={<TaskForm />} />
                        <Route path="/tasks/:id" element={<TaskDetail />} />
                        <Route path="/categories" element={<CategoryList />} />
                        <Route path="/categories/new" element={<CategoryForm />} />
                        <Route path="/categories/edit/:id" element={<CategoryForm />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default App; 