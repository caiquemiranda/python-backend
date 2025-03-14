/**
 * Componente de card reutilizável
 * Fornece um container estilizado para conteúdo
 */
import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

/**
 * Componente de card reutilizável
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Conteúdo do card
 * @param {string} props.title - Título do card
 * @param {React.ReactNode} props.header - Conteúdo do cabeçalho do card
 * @param {React.ReactNode} props.footer - Conteúdo do rodapé do card
 * @param {string} props.className - Classes CSS adicionais
 */
const Card = ({ children, title, header, footer, className = '' }) => {
    return (
        <div className={`card ${className}`}>
            {/* Cabeçalho do card */}
            {(header || title) && (
                <div className="card-header">
                    {header || (title && <h3 className="card-title">{title}</h3>)}
                </div>
            )}

            {/* Corpo do card */}
            <div className="card-body">
                {children}
            </div>

            {/* Rodapé do card */}
            {footer && (
                <div className="card-footer">
                    {footer}
                </div>
            )}
        </div>
    );
};

Card.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    header: PropTypes.node,
    footer: PropTypes.node,
    className: PropTypes.string,
};

export default Card; 