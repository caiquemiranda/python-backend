import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaStickyNote } from 'react-icons/fa';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <div className="not-found-icon">
                    <FaExclamationTriangle />
                </div>
                <h1 className="not-found-title">404</h1>
                <h2 className="not-found-subtitle">Página não encontrada</h2>
                <p className="not-found-message">
                    A página que você está procurando não existe ou foi movida.
                </p>

                <div className="not-found-actions">
                    <Link to="/" className="not-found-btn primary-btn">
                        <FaHome /> Voltar para a Página Inicial
                    </Link>
                    <Link to="/notes" className="not-found-btn secondary-btn">
                        <FaStickyNote /> Minhas Notas
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound; 