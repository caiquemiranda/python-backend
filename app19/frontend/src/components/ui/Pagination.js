/**
 * Componente de paginação reutilizável
 * Fornece controles de navegação para dados paginados
 */

import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    siblingCount = 1,
    className = '',
    ...props
}) => {
    // Não renderiza se houver apenas uma página
    if (totalPages <= 1) return null;

    // Função para gerar o array de páginas a serem exibidas
    const generatePaginationItems = () => {
        const items = [];

        // Sempre mostra a primeira página
        items.push(1);

        // Calcula o intervalo de páginas a serem exibidas
        const leftSibling = Math.max(currentPage - siblingCount, 2);
        const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1);

        // Adiciona elipses à esquerda se necessário
        if (leftSibling > 2) {
            items.push('...');
        }

        // Adiciona páginas entre os irmãos
        for (let i = leftSibling; i <= rightSibling; i++) {
            items.push(i);
        }

        // Adiciona elipses à direita se necessário
        if (rightSibling < totalPages - 1) {
            items.push('...');
        }

        // Sempre mostra a última página se houver mais de uma
        if (totalPages > 1) {
            items.push(totalPages);
        }

        return items;
    };

    const paginationItems = generatePaginationItems();

    return (
        <nav aria-label="Navegação de páginas" className={`pagination-container ${className}`} {...props}>
            <ul className="pagination">
                {/* Botão Anterior */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Anterior"
                    >
                        &laquo;
                    </button>
                </li>

                {/* Itens de paginação */}
                {paginationItems.map((item, index) => (
                    <li
                        key={index}
                        className={`page-item ${item === currentPage ? 'active' : ''} ${item === '...' ? 'disabled' : ''}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => item !== '...' && onPageChange(item)}
                            disabled={item === '...'}
                        >
                            {item}
                        </button>
                    </li>
                ))}

                {/* Botão Próximo */}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        aria-label="Próximo"
                    >
                        &raquo;
                    </button>
                </li>
            </ul>
        </nav>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    siblingCount: PropTypes.number,
    className: PropTypes.string
};

export default Pagination; 