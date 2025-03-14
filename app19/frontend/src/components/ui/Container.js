/**
 * Componente de container reutilizável
 * Fornece um container estilizado para conteúdo
 */
import React from 'react';
import PropTypes from 'prop-types';
import './Container.css';

/**
 * Componente de container reutilizável
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Conteúdo do container
 * @param {boolean} props.fluid - Se o container deve ocupar toda a largura disponível
 * @param {string} props.className - Classes CSS adicionais
 */
const Container = ({ children, fluid = false, className = '' }) => {
    return (
        <div className={`container ${fluid ? 'container-fluid' : ''} ${className}`}>
            {children}
        </div>
    );
};

Container.propTypes = {
    children: PropTypes.node.isRequired,
    fluid: PropTypes.bool,
    className: PropTypes.string,
};

export default Container; 