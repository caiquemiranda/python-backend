/**
 * Componentes de grid reutilizáveis
 * Fornece componentes para criar layouts em grid
 */
import React from 'react';
import PropTypes from 'prop-types';
import './Grid.css';

/**
 * Componente de linha de grid
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Conteúdo da linha
 * @param {string} props.className - Classes CSS adicionais
 */
export const Row = ({ children, className = '' }) => {
    return <div className={`row ${className}`}>{children}</div>;
};

Row.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

/**
 * Componente de coluna de grid
 * @param {Object} props - Propriedades do componente
 * @param {React.ReactNode} props.children - Conteúdo da coluna
 * @param {number} props.xs - Número de colunas em telas extra pequenas
 * @param {number} props.sm - Número de colunas em telas pequenas
 * @param {number} props.md - Número de colunas em telas médias
 * @param {number} props.lg - Número de colunas em telas grandes
 * @param {number} props.xl - Número de colunas em telas extra grandes
 * @param {string} props.className - Classes CSS adicionais
 */
export const Col = ({
    children,
    xs,
    sm,
    md,
    lg,
    xl,
    className = '',
}) => {
    // Constrói as classes de tamanho de coluna
    const colClasses = [
        xs && `col-xs-${xs}`,
        sm && `col-sm-${sm}`,
        md && `col-md-${md}`,
        lg && `col-lg-${lg}`,
        xl && `col-xl-${xl}`,
        !xs && !sm && !md && !lg && !xl && 'col',
    ]
        .filter(Boolean)
        .join(' ');

    return <div className={`${colClasses} ${className}`}>{children}</div>;
};

Col.propTypes = {
    children: PropTypes.node.isRequired,
    xs: PropTypes.number,
    sm: PropTypes.number,
    md: PropTypes.number,
    lg: PropTypes.number,
    xl: PropTypes.number,
    className: PropTypes.string,
}; 