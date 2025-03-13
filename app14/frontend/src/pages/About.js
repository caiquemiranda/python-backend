import React from 'react';
import { FaClipboardList, FaUserShield, FaExchangeAlt, FaGlobe, FaTasks } from 'react-icons/fa';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <div className="about-header">
                <h1>Sobre o App de Notas</h1>
                <p className="about-subtitle">
                    Uma aplicação completa para gerenciamento de notas com autenticação segura
                </p>
            </div>

            <section className="about-section">
                <h2 className="section-title">Visão Geral</h2>
                <p>
                    O App de Notas é uma aplicação web moderna desenvolvida como demonstração de uma
                    arquitetura completa com frontend em React e backend em FastAPI.
                    O aplicativo permite que os usuários criem, editem, excluam e compartilhem notas,
                    com um sistema de autenticação seguro utilizando JWT (JSON Web Tokens).
                </p>
            </section>

            <section className="about-section">
                <h2 className="section-title">Recursos Principais</h2>
                <div className="features-container">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <FaClipboardList />
                        </div>
                        <h3>Gerenciamento de Notas</h3>
                        <p>
                            Crie, edite, visualize e exclua suas notas com uma interface intuitiva e responsiva.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <FaUserShield />
                        </div>
                        <h3>Autenticação Segura</h3>
                        <p>
                            Sistema de login e registro com autenticação JWT, garantindo a segurança dos seus dados.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <FaExchangeAlt />
                        </div>
                        <h3>Controle de Privacidade</h3>
                        <p>
                            Decida se suas notas são privadas ou públicas, controlando quem pode vê-las.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <FaGlobe />
                        </div>
                        <h3>Compartilhamento</h3>
                        <p>
                            Compartilhe suas notas com o mundo tornando-as públicas na página inicial.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <FaTasks />
                        </div>
                        <h3>Organização</h3>
                        <p>
                            Mantenha suas anotações organizadas em um só lugar e acesse-as de qualquer dispositivo.
                        </p>
                    </div>
                </div>
            </section>

            <section className="about-section">
                <h2 className="section-title">Tecnologias Utilizadas</h2>
                <div className="tech-stack">
                    <div className="tech-column">
                        <h3>Frontend</h3>
                        <ul className="tech-list">
                            <li>React (Hooks e Context API)</li>
                            <li>React Router para navegação</li>
                            <li>Axios para comunicação com API</li>
                            <li>React Toastify para notificações</li>
                            <li>CSS responsivo</li>
                        </ul>
                    </div>

                    <div className="tech-column">
                        <h3>Backend</h3>
                        <ul className="tech-list">
                            <li>FastAPI (framework Python)</li>
                            <li>SQLAlchemy ORM</li>
                            <li>JWT para autenticação</li>
                            <li>SQLite para armazenamento</li>
                            <li>Pydantic para validação de dados</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="about-section">
                <h2 className="section-title">Como Usar</h2>
                <div className="usage-steps">
                    <div className="step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                            <h3>Registre-se</h3>
                            <p>Crie sua conta com nome de usuário, email e senha.</p>
                        </div>
                    </div>

                    <div className="step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                            <h3>Faça Login</h3>
                            <p>Acesse sua conta com suas credenciais.</p>
                        </div>
                    </div>

                    <div className="step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                            <h3>Crie Notas</h3>
                            <p>Adicione suas anotações, incluindo título e conteúdo.</p>
                        </div>
                    </div>

                    <div className="step">
                        <div className="step-number">4</div>
                        <div className="step-content">
                            <h3>Gerencie Privacidade</h3>
                            <p>Escolha se sua nota será privada ou pública.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-section contact-section">
                <h2 className="section-title">Contato</h2>
                <p>
                    Este aplicativo foi desenvolvido como um projeto de demonstração.
                    Para mais informações ou sugestões, entre em contato pelo email:
                    <a href="mailto:contato@appnotas.com" className="email-link">
                        contato@appnotas.com
                    </a>
                </p>
            </section>
        </div>
    );
};

export default About; 