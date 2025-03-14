/**
 * Componente de rodapé para exibir informações sobre a aplicação,
 * links úteis e direitos autorais.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import '../../styles/footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3 className="footer-title">TaskForge</h3>
                    <p className="footer-description">
                        Um sistema completo de gerenciamento de projetos e tarefas,
                        desenvolvido para facilitar o trabalho em equipe e a organização de projetos.
                    </p>
                </div>

                <div className="footer-section">
                    <h3 className="footer-title">Links Úteis</h3>
                    <ul className="footer-links">
                        <li><Link to="/">Início</Link></li>
                        <li><Link to="/about">Sobre</Link></li>
                        <li><Link to="/features">Funcionalidades</Link></li>
                        <li><Link to="/register">Registrar</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 className="footer-title">Recursos</h3>
                    <ul className="footer-links">
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><Link to="/projects">Projetos</Link></li>
                        <li><Link to="/tasks">Tarefas</Link></li>
                        <li><a href="https://github.com/seu-usuario/taskforge" target="_blank" rel="noopener noreferrer">Documentação</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3 className="footer-title">Siga-nos</h3>
                    <div className="social-links">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <FaGithub />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <FaLinkedin />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <FaTwitter />
                        </a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {currentYear} TaskForge. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer; 