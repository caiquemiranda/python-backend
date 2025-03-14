/**
 * Componente de carregamento (spinner)
 * Fornece um indicador visual de carregamento
 */

import React from 'react';
import PropTypes from 'prop-types';
import './Spinner.css';

const Spinner = ({
    size = 'md',
    variant = 'primary',
    fullPage = false,
    text = '',
    className = '',
    ...props
}) => {
    const spinnerClasses = [
        'spinner',
        `spinner-${size}`,
        `spinner-${variant}`,
        fullPage ? 'spinner-fullpage' : '',
        className
    ].filter(Boolean).join(' ');

    if (fullPage) {
        return (
            <div className="spinner-overlay">
                <div className={spinnerClasses} {...props}>
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Carregando...</span>
                    </div>
                    {text && <div className="spinner-text">{text}</div>}
                </div>
            </div>
        );
    }

    return (
        <div className={spinnerClasses} {...props}>
            <div className="spinner-border" role="status">
                <span className="sr-only">Carregando...</span>
            </div>
            {text && <div className="spinner-text">{text}</div>}
        </div>
    );
};

Spinner.propTypes = {
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
    fullPage: PropTypes.bool,
    text: PropTypes.string,
    className: PropTypes.string
};

export default Spinner;
