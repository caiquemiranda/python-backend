/**
 * Componente de grupo de formulário reutilizável
 * Agrupa um campo de formulário com seu label e mensagens de erro/ajuda
 */
import React from 'react';
import PropTypes from 'prop-types';
import './FormGroup.css';

/**
 * Componente de grupo de formulário reutilizável
 * @param {Object} props - Propriedades do componente
 * @param {string} props.id - ID do campo de formulário
 * @param {string} props.label - Label do campo de formulário
 * @param {React.ReactNode} props.children - Campo de formulário
 * @param {string} props.error - Mensagem de erro
 * @param {string} props.helpText - Texto de ajuda
 * @param {boolean} props.required - Se o campo é obrigatório
 * @param {string} props.className - Classes CSS adicionais
 */
const FormGroup = ({
    id,
    label,
    children,
    error,
    helpText,
    required = false,
    className = '',
}) => {
    return (
        <div className={`form-group ${error ? 'has-error' : ''} ${className}`}>
            {label && (
                <label htmlFor={id} className="form-label">
                    {label}
                    {required && <span className="required-mark">*</span>}
                </label>
            )}

            {children}

            {error && <div className="form-error">{error}</div>}
            {helpText && <div className="form-text">{helpText}</div>}
        </div>
    );
};

FormGroup.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    children: PropTypes.node.isRequired,
    error: PropTypes.string,
    helpText: PropTypes.string,
    required: PropTypes.bool,
    className: PropTypes.string,
};

export default FormGroup; 