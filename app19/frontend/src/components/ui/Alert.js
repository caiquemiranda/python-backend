/**
 * Componente de alerta reutilizável
 * Fornece um componente para exibir mensagens de feedback ao usuário
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Alert.css';

const Alert = ({
    children,
    variant = 'primary',
    dismissible = false,
    onDismiss,
    autoClose = false,
    autoCloseTime = 5000,
    icon,
    className = '',
    ...props
}) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let timer;
        if (autoClose && visible) {
            timer = setTimeout(() => {
                setVisible(false);
                if (onDismiss) onDismiss();
            }, autoCloseTime);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [autoClose, autoCloseTime, visible, onDismiss]);

    const handleDismiss = () => {
        setVisible(false);
        if (onDismiss) onDismiss();
    };

    if (!visible) return null;

    return (
        <div
            className={`alert alert-${variant} ${dismissible ? 'alert-dismissible' : ''} ${className}`}
            role="alert"
            {...props}
        >
            {icon && <span className="alert-icon">{icon}</span>}
            <div className="alert-content">{children}</div>
            {dismissible && (
                <button
                    type="button"
                    className="alert-close"
                    aria-label="Fechar"
                    onClick={handleDismiss}
                >
                    <span aria-hidden="true">&times;</span>
                </button>
            )}
        </div>
    );
};

Alert.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
    dismissible: PropTypes.bool,
    onDismiss: PropTypes.func,
    autoClose: PropTypes.bool,
    autoCloseTime: PropTypes.number,
    icon: PropTypes.node,
    className: PropTypes.string
};

export default Alert; 