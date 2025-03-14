/**
 * Componente Modal
 * Exibe uma janela modal sobreposta ao conteúdo da página
 */
import React, { useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import '../../styles/modal.css';

/**
 * Componente Modal
 * @param {Object} props - Propriedades do componente
 * @param {Boolean} props.isOpen - Indica se o modal está aberto
 * @param {Function} props.onClose - Função a ser chamada ao fechar o modal
 * @param {String} props.title - Título do modal
 * @param {Node} props.children - Conteúdo do modal
 * @param {String} props.size - Tamanho do modal (small, medium, large)
 */
const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'medium'
}) => {
    const modalRef = useRef(null);

    // Manipula o fechamento do modal ao pressionar a tecla ESC
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden'; // Evita rolagem do fundo
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = ''; // Restaura rolagem ao fechar
        };
    }, [isOpen, onClose]);

    // Fecha o modal ao clicar fora dele
    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleOutsideClick}>
            <div
                className={`modal-container modal-${size}`}
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <button
                        className="modal-close-button"
                        onClick={onClose}
                        aria-label="Fechar"
                    >
                        <FaTimes />
                    </button>
                </div>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal; 