/**
 * Componente Footer - Rodapé da aplicação.
 */
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Gerenciador de Tarefas - App17</p>
        <p>
          Um projeto de demonstração usando Django REST Framework e React
        </p>
      </div>
    </footer>
  );
};

export default Footer; 