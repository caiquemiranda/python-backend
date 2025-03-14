/**
 * Componente de botão reutilizável
 * Fornece um botão estilizado com várias variantes e tamanhos
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Button.css';

/**
 * Componente de botão reutilizável
 * @param {Object} props - Propriedades do componente
 * @param {string} props.variant - Variante do botão (primary, secondary, success, danger, outline)
 * @param {string} props.size - Tamanho do botão (sm, md, lg)
 * @param {string} props.to - URL para Link (React Router)
 * @param {string} props.href - URL para link externo
 * @param {boolean} props.fullWidth - Se o botão deve ocupar toda a largura disponível
 * @param {boolean} props.disabled - Se o botão está desabilitado
 * @param {Function} props.onClick - Função a ser chamada ao clicar no botão
 * @param {React.ReactNode} props.children - Conteúdo do botão
 * @param {string} props.className - Classes CSS adicionais
 * @param {Object} props.rest - Outras propriedades a serem passadas para o elemento
 */
const Button = ({
    variant = 'primary',
    size = 'md',
    to,
    href,
    fullWidth,
    disabled,
    onClick,
    children,
    className = '',
    ...rest
}) => {
    // Classes CSS do botão
    const buttonClasses = `
    btn 
    btn-${variant} 
    btn-${size} 
    ${fullWidth ? 'btn-full-width' : ''} 
    ${className}
  `.trim();

    // Se for um link interno (React Router)
    if (to) {
        return (
            <Link
                to={to}
                className={buttonClasses}
                onClick={onClick}
                {...rest}
            >
                {children}
            </Link>
        );
    }

    // Se for um link externo
    if (href) {
        return (
            <a
                href={href}
                className={buttonClasses}
                onClick={onClick}
                target="_blank"
                rel="noopener noreferrer"
                {...rest}
            >
                {children}
            </a>
        );
    }

    // Se for um botão normal
    return (
        <button
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
            type={rest.type || 'button'}
            {...rest}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'outline']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    to: PropTypes.string,
    href: PropTypes.string,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Button; 