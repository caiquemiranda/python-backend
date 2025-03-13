import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Contexto de autenticação
import { AuthProvider } from './context/AuthContext';

// Componentes
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

// Páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotesList from './pages/NotesList';
import NoteDetail from './pages/NoteDetail';
import NoteForm from './pages/NoteForm';

// Estilos globais
import './App.css';

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="app">
                    <Navbar />
                    <main className="main-content">
                        <Routes>
                            {/* Rotas públicas */}
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />

                            {/* Rotas protegidas */}
                            <Route element={<PrivateRoute />}>
                                <Route path="/notes" element={<NotesList />} />
                                <Route path="/notes/new" element={<NoteForm />} />
                                <Route path="/notes/:id" element={<NoteDetail />} />
                                <Route path="/notes/:id/edit" element={<NoteForm />} />
                            </Route>
                        </Routes>
                    </main>

                    {/* Configuração do Toast para mensagens de feedback */}
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
                        theme="light"
                    />
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App; 