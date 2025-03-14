/**
 * Página inicial da aplicação.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <div className="hero">
                <div className="container">
                    <h1>Sistema de Autenticação</h1>
                    <p>
                        Um exemplo completo de autenticação usando Django REST Framework e React.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/login" className="btn btn-primary">
                            Entrar
                        </Link>
                        <Link to="/register" className="btn btn-secondary">
                            Criar Conta
                        </Link>
                    </div>
                </div>
            </div>

            <div className="features">
                <div className="container">
                    <h2 className="section-title">Recursos</h2>

                    <div className="feature-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-lock"></i>
                            </div>
                            <h3>Autenticação Segura</h3>
                            <p>
                                Autenticação baseada em JWT (JSON Web Tokens) para maior segurança.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-user-plus"></i>
                            </div>
                            <h3>Registro de Usuários</h3>
                            <p>
                                Processo simples de registro com validação de dados.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-user-shield"></i>
                            </div>
                            <h3>Rotas Protegidas</h3>
                            <p>
                                Acesso controlado a rotas que exigem autenticação.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fas fa-user-edit"></i>
                            </div>
                            <h3>Gerenciamento de Perfil</h3>
                            <p>
                                Edição de informações de perfil e alteração de senha.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tech-stack">
                <div className="container">
                    <h2 className="section-title">Tecnologias Utilizadas</h2>

                    <div className="tech-grid">
                        <div className="tech-item">
                            <h3>Frontend</h3>
                            <ul>
                                <li>React</li>
                                <li>React Router</li>
                                <li>Formik & Yup</li>
                                <li>Axios</li>
                                <li>JWT Decode</li>
                            </ul>
                        </div>

                        <div className="tech-item">
                            <h3>Backend</h3>
                            <ul>
                                <li>Django</li>
                                <li>Django REST Framework</li>
                                <li>Simple JWT</li>
                                <li>PostgreSQL</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage; 