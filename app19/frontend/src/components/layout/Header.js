/**
 * Componente de cabeçalho da aplicação
 * Exibe o menu de navegação e controles de autenticação
 */
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaCloudUploadAlt, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import './Header.css';

/**
 * Componente de cabeçalho com navegação responsiva
 */
const Header = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    // Alterna o estado do menu móvel
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    // Fecha o menu após clicar em um link
    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className="header">
            <div className="container header-container">
                {/* Logo */}
                <Link to="/" className="logo" onClick={closeMenu}>
                    <FaCloudUploadAlt className="logo-icon" />
                    <span className="logo-text">FileShare</span>
                </Link>

                {/* Botão do menu móvel */}
                <button className="mobile-menu-button" onClick={toggleMenu} aria-label="Menu">
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Navegação principal */}
                <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                                Início
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/files" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                                Arquivos
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                                Sobre
                            </NavLink>
                        </li>
                        {isAuthenticated && (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                                        Dashboard
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/upload" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                                        Upload
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Navegação de autenticação */}
                    <ul className="auth-nav">
                        {/* Alternador de tema */}
                        <li className="nav-item theme-toggle-item">
                            <ThemeToggle />
                        </li>
                        
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/profile" className="nav-link user-link" onClick={closeMenu}>
                                        <FaUser className="nav-icon" />
                                        <span>{user?.username || 'Perfil'}</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <button className="nav-link logout-button" onClick={() => { logout(); closeMenu(); }}>
                                        <FaSignOutAlt className="nav-icon" />
                                        <span>Sair</span>
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                                        <FaSignInAlt className="nav-icon" />
                                        <span>Entrar</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/register" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} onClick={closeMenu}>
                                        <FaUserPlus className="nav-icon" />
                                        <span>Registrar</span>
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header; 