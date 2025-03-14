/**
 * Componente de alerta reutilizável
 * Exibe mensagens de feedback ao usuário
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaTimes } from 'react-icons/fa';
import './Alert.css';

/**
 * Componente de alerta reutilizável
 * @param {Object} props - Propriedades do componente
 * @param {string} props.type - Tipo do alerta (info, success, warning, danger)
 * @param {React.ReactNode} props.children - Conteúdo do alerta
 * @param {boolean} props.dismissible - Se o alerta pode ser fechado
 * @param {number} props.autoClose - Tempo em milissegundos para fechar automaticamente (0 para não fechar)
 * @param {Function} props.onClose - Função a ser chamada ao fechar o alerta
 * @param {string} props.className - Classes CSS adicionais
 */
const Alert = ({
    type = 'info',
    children,
    dismissible = false,
    autoClose = 0,
    onClose,
    className = '',
}) => {
    const [visible, setVisible] = useState(true);

    // Ícone baseado no tipo de alerta
    const getIcon = () => {
        switch (type) {
            case 'success':
                return <FaCheckCircle className="alert-icon" />;
            case 'warning':
                return <FaExclamationTriangle className="alert-icon" />;
            case 'danger':
                return <FaTimesCircle className="alert-icon" />;
            case 'info':
            default:
                return <FaInfoCircle className="alert-icon" />;
        }
    };

    // Fecha o alerta
    const handleClose = () => {
        setVisible(false);
        if (onClose) onClose();
    };

    // Fecha automaticamente após o tempo especificado
    useEffect(() => {
        if (autoClose > 0) {
            const timer = setTimeout(() => {
                handleClose();
            }, autoClose);

            return () => clearTimeout(timer);
        }
    }, [autoClose]);

    // Não renderiza se não estiver visível
    if (!visible) return null;

    return (
        <div className={`alert alert-${type} ${className}`} role="alert">
            <div className="alert-content">
                {getIcon()}
                <div className="alert-message">{children}</div>
            </div>

            {dismissible && (
                <button
                    type="button"
                    className="alert-close"
                    aria-label="Fechar"
                    onClick={handleClose}
                >
                    <FaTimes />
                </button>
            )}
        </div>
    );
};

Alert.propTypes = {
    type: PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
    children: PropTypes.node.isRequired,
    dismissible: PropTypes.bool,
    autoClose: PropTypes.number,
    onClose: PropTypes.func,
    className: PropTypes.string,
};

export default Alert; 