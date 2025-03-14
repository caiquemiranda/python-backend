/**
 * Componente de checkbox reutilizável
 * Fornece um campo de checkbox estilizado
 */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

/**
 * Componente de checkbox reutilizável
 * @param {Object} props - Propriedades do componente
 * @param {string} props.id - ID do campo
 * @param {string} props.name - Nome do campo
 * @param {boolean} props.checked - Se o checkbox está marcado
 * @param {Function} props.onChange - Função chamada ao alterar o valor
 * @param {string} props.label - Texto do label
 * @param {boolean} props.disabled - Se o campo está desabilitado
 * @param {string} props.className - Classes CSS adicionais
 * @param {Object} props.rest - Outras propriedades a serem passadas para o elemento
 * @param {React.Ref} ref - Referência para o elemento
 */
const Checkbox = forwardRef(({
    id,
    name,
    checked,
    onChange,
    label,
    disabled = false,
    className = '',
    ...rest
}, ref) => {
    return (
        <div className={`checkbox-wrapper ${className}`}>
            <label className="checkbox-label">
                <input
                    ref={ref}
                    type="checkbox"
                    id={id}
                    name={name}
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                    className="checkbox-input"
                    {...rest}
                />
                <span className="checkbox-custom"></span>
                {label && <span className="checkbox-text">{label}</span>}
            </label>
        </div>
    );
});

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

export default Checkbox; 