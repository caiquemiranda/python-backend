/**
 * Componente Header - Cabeçalho da aplicação.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <h1>
                            <i className="fas fa-tasks"></i> Gerenciador de Tarefas
                        </h1>
                    </Link>
                </div>
                <nav className="nav">
                    <ul>
                        <li>
                            <Link to="/tasks">Tarefas</Link>
                        </li>
                        <li>
                            <Link to="/categories">Categorias</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header; 