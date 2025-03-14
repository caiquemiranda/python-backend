/**
 * Componente de seleção reutilizável
 * Fornece um campo de seleção estilizado
 */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './Select.css';

/**
 * Componente de seleção reutilizável
 * @param {Object} props - Propriedades do componente
 * @param {string} props.id - ID do campo
 * @param {string} props.name - Nome do campo
 * @param {string|number} props.value - Valor selecionado
 * @param {Function} props.onChange - Função chamada ao alterar o valor
 * @param {Function} props.onBlur - Função chamada ao perder o foco
 * @param {Array} props.options - Opções de seleção
 * @param {string} props.placeholder - Texto de placeholder
 * @param {boolean} props.disabled - Se o campo está desabilitado
 * @param {string} props.className - Classes CSS adicionais
 * @param {Object} props.rest - Outras propriedades a serem passadas para o elemento
 * @param {React.Ref} ref - Referência para o elemento
 */
const Select = forwardRef(({
    id,
    name,
    value,
    onChange,
    onBlur,
    options = [],
    placeholder = 'Selecione uma opção',
    disabled = false,
    className = '',
    ...rest
}, ref) => {
    return (
        <select
            ref={ref}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={`form-control select ${className}`}
            {...rest}
        >
            {placeholder && (
                <option value="" disabled>
                    {placeholder}
                </option>
            )}

            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
});

Select.displayName = 'Select';

Select.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.string.isRequired,
        })
    ),
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

export default Select; 