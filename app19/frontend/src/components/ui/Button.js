/**
 * Componente de botão reutilizável
 * Fornece um botão estilizado com várias variantes e tamanhos
 */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
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
const Button = forwardRef(({
    children,
    type = 'button',
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    onClick,
    className = '',
    ...props
}, ref) => {
    const buttonClasses = [
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        fullWidth ? 'btn-block' : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            ref={ref}
            type={type}
            className={buttonClasses}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
});

Button.displayName = 'Button';

Button.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link', 'outline-primary', 'outline-secondary', 'outline-success', 'outline-danger', 'outline-warning', 'outline-info', 'outline-light', 'outline-dark']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string
};

export default Button; 