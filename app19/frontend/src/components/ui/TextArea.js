/**
 * Componente de área de texto reutilizável
 * Fornece um campo de texto multilinha estilizado
 */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './TextArea.css';

/**
 * Componente de área de texto reutilizável
 * @param {Object} props - Propriedades do componente
 * @param {string} props.id - ID do campo
 * @param {string} props.name - Nome do campo
 * @param {string} props.value - Valor do campo
 * @param {Function} props.onChange - Função chamada ao alterar o valor
 * @param {Function} props.onBlur - Função chamada ao perder o foco
 * @param {string} props.placeholder - Texto de placeholder
 * @param {number} props.rows - Número de linhas
 * @param {boolean} props.disabled - Se o campo está desabilitado
 * @param {boolean} props.readOnly - Se o campo é somente leitura
 * @param {string} props.className - Classes CSS adicionais
 * @param {Object} props.rest - Outras propriedades a serem passadas para o elemento
 * @param {React.Ref} ref - Referência para o elemento
 */
const TextArea = forwardRef(({
    id,
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    rows = 4,
    disabled = false,
    readOnly = false,
    className = '',
    ...rest
}, ref) => {
    return (
        <textarea
            ref={ref}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            readOnly={readOnly}
            className={`form-control textarea ${className}`}
            {...rest}
        />
    );
});

TextArea.displayName = 'TextArea';

TextArea.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    placeholder: PropTypes.string,
    rows: PropTypes.number,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    className: PropTypes.string,
};

export default TextArea; 