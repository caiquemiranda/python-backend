/**
 * Componente Header - Cabeçalho da aplicação.
 * 
 * Exibe o menu de navegação e informações do usuário autenticado.
 */
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    // Função para lidar com o logout
    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <h1>
                            <i className="fas fa-lock"></i> Auth System
                        </h1>
                    </Link>
                </div>

                <nav className="nav">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>

                        {isAuthenticated ? (
                            <>
                                <li>
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="/profile">Perfil</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="nav-btn">
                                        <i className="fas fa-sign-out-alt"></i> Sair
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register" className="btn-register">Registrar</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>

            {isAuthenticated && user && (
                <div className="user-bar">
                    <div className="container">
                        <div className="user-info">
                            <span>Bem-vindo, {user.first_name} {user.last_name}</span>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header; 