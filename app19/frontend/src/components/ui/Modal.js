/**
 * Componente de modal reutilizável
 * Fornece um diálogo modal para exibir conteúdo em sobreposição à página
 */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

/**
 * Componente Modal reutilizável
 * @param {Object} props - Propriedades do componente
 */
const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    closeOnEsc = true,
    closeOnOverlayClick = true,
    showCloseButton = true,
    className = '',
    ...props
}) => {
    const modalRef = useRef(null);

    // Fecha o modal ao pressionar ESC
    useEffect(() => {
        const handleEsc = (event) => {
            if (closeOnEsc && isOpen && event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            // Impede o scroll da página quando o modal está aberto
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose, closeOnEsc]);

    // Fechar ao clicar fora do modal
    const handleOverlayClick = (event) => {
        if (
            closeOnOverlayClick &&
            modalRef.current &&
            !modalRef.current.contains(event.target)
        ) {
            onClose();
        }
    };

    // Se o modal não estiver aberto, não renderiza nada
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div
                ref={modalRef}
                className={`modal modal-${size} ${className}`}
                {...props}
            >
                <div className="modal-header">
                    <h3 className="modal-title">{title}</h3>
                    {showCloseButton && (
                        <button
                            type="button"
                            className="modal-close"
                            onClick={onClose}
                            aria-label="Fechar"
                        >
                            &times;
                        </button>
                    )}
                </div>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
    closeOnEsc: PropTypes.bool,
    closeOnOverlayClick: PropTypes.bool,
    showCloseButton: PropTypes.bool,
    className: PropTypes.string
};

/**
 * Componente para o rodapé do modal
 */
const ModalFooter = ({ children, className = '', ...props }) => {
    return (
        <div className={`modal-footer ${className}`} {...props}>
            {children}
        </div>
    );
};

ModalFooter.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

Modal.Footer = ModalFooter;

export default Modal; 