import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaHeart, FaCode } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="footer-title">App de Notas</h3>
                        <p className="footer-description">
                            Uma aplicação simples e segura para armazenar e compartilhar suas anotações.
                        </p>
                    </div>

                    <div className="footer-section">
                        <h3 className="footer-title">Links</h3>
                        <ul className="footer-links">
                            <li>
                                <Link to="/" className="footer-link">Início</Link>
                            </li>
                            <li>
                                <Link to="/notes" className="footer-link">Minhas Notas</Link>
                            </li>
                            <li>
                                <Link to="/about" className="footer-link">Sobre</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h3 className="footer-title">Tecnologias</h3>
                        <ul className="footer-tech">
                            <li>React</li>
                            <li>FastAPI</li>
                            <li>SQLite</li>
                            <li>JWT</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">
                        &copy; {currentYear} App de Notas. Todos os direitos reservados.
                    </p>
                    <div className="footer-icons">
                        <a href="https://github.com" className="footer-icon" target="_blank" rel="noopener noreferrer">
                            <FaGithub />
                        </a>
                        <span className="footer-made-with">
                            Feito com <FaHeart className="heart-icon" /> e <FaCode />
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 