/**
 * Componente Footer - Rodapé da aplicação.
 */
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} Sistema de Autenticação</p>
                <p>App18 - Exemplo de autenticação com Django e React</p>
            </div>
        </footer>
    );
};

export default Footer; 