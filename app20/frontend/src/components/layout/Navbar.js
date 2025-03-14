/**
 * Componente de barra de navegação para ser exibido no topo de todas as páginas.
 * Inclui links de navegação, menu de usuário e opções de tema.
 */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUserCircle, FaTasks, FaSignOutAlt, FaUserCog, FaList } from 'react-icons/fa';
import { MdDashboard, MdLightMode, MdDarkMode, MdMenu, MdClose } from 'react-icons/md';
import '../../styles/navbar.css';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    /**
     * Função para lidar com o logout do usuário
     */
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    /**
     * Alterna a exibição do menu mobile
     */
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        // Fecha o menu de perfil quando o menu mobile é aberto/fechado
        setIsProfileMenuOpen(false);
    };

    /**
     * Alterna a exibição do menu de perfil
     */
    const toggleProfileMenu = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo e nome do projeto */}
                <div className="navbar-logo">
                    <Link to="/">TaskForge</Link>
                </div>

                {/* Botão do menu mobile */}
                <div className="navbar-menu-button" onClick={toggleMenu}>
                    {isMenuOpen ? <MdClose /> : <MdMenu />}
                </div>

                {/* Links de navegação */}
                <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                                <MdDashboard /> Dashboard
                            </Link>
                            <Link to="/projects" onClick={() => setIsMenuOpen(false)}>
                                <FaList /> Projetos
                            </Link>
                            <Link to="/tasks" onClick={() => setIsMenuOpen(false)}>
                                <FaTasks /> Tarefas
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                                Sobre
                            </Link>
                            <Link to="/features" onClick={() => setIsMenuOpen(false)}>
                                Funcionalidades
                            </Link>
                        </>
                    )}
                </div>

                {/* Menu do usuário */}
                <div className="navbar-user">
                    {isAuthenticated ? (
                        <div className="user-dropdown">
                            <div className="user-info" onClick={toggleProfileMenu}>
                                {user.avatar_url ? (
                                    <img
                                        src={user.avatar_url}
                                        alt={user.name}
                                        className="avatar"
                                    />
                                ) : (
                                    <FaUserCircle className="avatar-icon" />
                                )}
                                <span className="user-name">{user.name}</span>
                            </div>

                            {/* Menu dropdown do perfil */}
                            {isProfileMenuOpen && (
                                <div className="dropdown-menu">
                                    <Link to="/profile" onClick={() => setIsProfileMenuOpen(false)}>
                                        <FaUserCog /> Perfil
                                    </Link>
                                    <hr />
                                    <button onClick={handleLogout}>
                                        <FaSignOutAlt /> Sair
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <Link to="/login" className="login-button">
                                Entrar
                            </Link>
                            <Link to="/register" className="register-button">
                                Registrar
                            </Link>
                        </div>
                    )}

                    {/* Alternador de tema claro/escuro */}
                    <button className="theme-toggle">
                        {user?.dark_mode ? <MdLightMode /> : <MdDarkMode />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 