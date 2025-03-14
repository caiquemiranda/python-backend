/**
 * Componente de spinner de carregamento.
 * Exibe um indicador visual enquanto os dados estão sendo carregados.
 */
import React from 'react';
import '../../styles/loading.css';

const LoadingSpinner = ({ size = 'medium', text = 'Carregando...' }) => {
    const sizeClass = {
        small: 'spinner-sm',
        medium: 'spinner-md',
        large: 'spinner-lg'
    }[size] || 'spinner-md';

    return (
        <div className="loading-container">
            <div className={`loading-spinner ${sizeClass}`}>
                <div className="spinner-border">
                    <div className="spinner-circle"></div>
                </div>
            </div>
            {text && <p className="loading-text">{text}</p>}
        </div>
    );
};

export default LoadingSpinner; 