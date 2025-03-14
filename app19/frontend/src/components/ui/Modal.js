/**
 * Componente de modal reutilizável
 * Fornece um diálogo modal para exibir conteúdo em sobreposição à página
 */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

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

    useEffect(() => {
        const handleEsc = (event) => {
            if (closeOnEsc && event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose, closeOnEsc]);

    const handleOverlayClick = (event) => {
        if (closeOnOverlayClick && event.target === event.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div
                ref={modalRef}
                className={`modal modal-${size} ${className}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                {...props}
            >
                <div className="modal-header">
                    <h5 id="modal-title" className="modal-title">{title}</h5>
                    {showCloseButton && (
                        <button
                            type="button"
                            className="modal-close"
                            aria-label="Fechar"
                            onClick={onClose}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    )}
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

const ModalFooter = ({ children, className = '', ...props }) => {
    return (
        <div className={`modal-footer ${className}`} {...props}>
            {children}
        </div>
    );
};

Modal.Footer = ModalFooter;

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
    size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
    closeOnEsc: PropTypes.bool,
    closeOnOverlayClick: PropTypes.bool,
    showCloseButton: PropTypes.bool,
    className: PropTypes.string
};

ModalFooter.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

export default Modal; 