/**
 * Componente Sidebar - Barra lateral de navegação.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-content">
                <div className="sidebar-section">
                    <h3>Tarefas</h3>
                    <ul>
                        <li>
                            <Link to="/tasks">
                                <i className="fas fa-list"></i> Listar Todas
                            </Link>
                        </li>
                        <li>
                            <Link to="/tasks/new">
                                <i className="fas fa-plus"></i> Nova Tarefa
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="sidebar-section">
                    <h3>Categorias</h3>
                    <ul>
                        <li>
                            <Link to="/categories">
                                <i className="fas fa-tag"></i> Listar Todas
                            </Link>
                        </li>
                        <li>
                            <Link to="/categories/new">
                                <i className="fas fa-plus"></i> Nova Categoria
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar; 