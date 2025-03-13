import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaSignOutAlt, FaHome, FaLock, FaUserPlus, FaStickyNote } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    // Função para fazer logout
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <FaStickyNote className="brand-icon" />
                    <span>App14 - Notas</span>
                </Link>

                <div className="nav-links">
                    <Link to="/" className="nav-link">
                        <FaHome /> Início
                    </Link>

                    {isAuthenticated ? (
                        // Links para usuários autenticados
                        <>
                            <Link to="/notes" className="nav-link">
                                <FaStickyNote /> Minhas Notas
                            </Link>

                            <div className="nav-user">
                                <span className="username">
                                    <FaUser /> {user?.username}
                                </span>

                                <button className="logout-btn" onClick={handleLogout}>
                                    <FaSignOutAlt /> Sair
                                </button>
                            </div>
                        </>
                    ) : (
                        // Links para usuários não autenticados
                        <>
                            <Link to="/login" className="nav-link">
                                <FaLock /> Login
                            </Link>

                            <Link to="/register" className="nav-link">
                                <FaUserPlus /> Registrar
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 