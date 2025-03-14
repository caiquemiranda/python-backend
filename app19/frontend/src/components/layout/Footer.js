/**
 * Componente de rodapé da aplicação
 * Exibe links úteis, informações de contato e direitos autorais
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

/**
 * Componente de rodapé com links e informações de contato
 */
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Seção de informações */}
                    <div className="footer-section">
                        <h3 className="footer-title">FileShare</h3>
                        <p className="footer-description">
                            Uma plataforma moderna para upload, visualização e compartilhamento de arquivos.
                            Gerencie seus documentos e imagens com facilidade e segurança.
                        </p>
                    </div>

                    {/* Seção de links */}
                    <div className="footer-section">
                        <h3 className="footer-title">Links Úteis</h3>
                        <ul className="footer-links">
                            <li>
                                <Link to="/">Início</Link>
                            </li>
                            <li>
                                <Link to="/files">Arquivos</Link>
                            </li>
                            <li>
                                <Link to="/about">Sobre</Link>
                            </li>
                            <li>
                                <Link to="/terms">Termos de Uso</Link>
                            </li>
                            <li>
                                <Link to="/privacy">Política de Privacidade</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Seção de contato */}
                    <div className="footer-section">
                        <h3 className="footer-title">Contato</h3>
                        <ul className="footer-contact">
                            <li>
                                <FaEnvelope className="footer-icon" />
                                <a href="mailto:contato@fileshare.com">contato@fileshare.com</a>
                            </li>
                            <li>
                                <div className="social-links">
                                    <a href="https://github.com/fileshare" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                        <FaGithub />
                                    </a>
                                    <a href="https://twitter.com/fileshare" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                        <FaTwitter />
                                    </a>
                                    <a href="https://linkedin.com/company/fileshare" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                        <FaLinkedin />
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Direitos autorais */}
                <div className="footer-bottom">
                    <p>&copy; {currentYear} FileShare. Todos os direitos reservados.</p>
                    <p>
                        Desenvolvido como projeto educacional para demonstrar a integração entre Django REST Framework e React.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 