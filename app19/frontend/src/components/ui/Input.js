/**
 * Componente de entrada de texto reutilizável
 * Fornece um campo de entrada estilizado com suporte para diferentes tipos
 */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './Input.css';

/**
 * Componente de entrada de texto reutilizável
 * @param {Object} props - Propriedades do componente
 * @param {string} props.type - Tipo do campo (text, email, password, etc.)
 * @param {string} props.id - ID do campo
 * @param {string} props.name - Nome do campo
 * @param {string} props.value - Valor do campo
 * @param {Function} props.onChange - Função chamada ao alterar o valor
 * @param {Function} props.onBlur - Função chamada ao perder o foco
 * @param {string} props.placeholder - Texto de placeholder
 * @param {boolean} props.disabled - Se o campo está desabilitado
 * @param {boolean} props.readOnly - Se o campo é somente leitura
 * @param {string} props.className - Classes CSS adicionais
 * @param {Object} props.rest - Outras propriedades a serem passadas para o elemento
 * @param {React.Ref} ref - Referência para o elemento
 */
const Input = forwardRef(({
    type = 'text',
    id,
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    disabled = false,
    readOnly = false,
    className = '',
    ...rest
}, ref) => {
    return (
        <input
            ref={ref}
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            className={`form-control ${className}`}
            {...rest}
        />
    );
});

Input.displayName = 'Input';

Input.propTypes = {
    type: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    className: PropTypes.string,
};

export default Input; 