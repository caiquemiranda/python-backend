/**
 * Página de dashboard.
 * 
 * Exibe informações e funcionalidades disponíveis para usuários autenticados.
 */
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import './DashboardPage.css';

const DashboardPage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="dashboard-page">
            <div className="container">
                <h1 className="page-title">Dashboard</h1>

                <div className="dashboard-welcome">
                    <div className="welcome-card">
                        <div className="welcome-icon">
                            <i className="fas fa-user-circle"></i>
                        </div>
                        <div className="welcome-content">
                            <h2>Bem-vindo, {user?.first_name}!</h2>
                            <p>Você está autenticado e tem acesso a todas as funcionalidades do sistema.</p>
                        </div>
                    </div>
                </div>

                <div className="dashboard-stats">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-shield-alt"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Status da Conta</h3>
                            <p className="stat-value">Ativa</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-calendar-alt"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Data de Registro</h3>
                            <p className="stat-value">
                                {user?.date_joined ? new Date(user.date_joined).toLocaleDateString('pt-BR') : 'N/A'}
                            </p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fas fa-clock"></i>
                        </div>
                        <div className="stat-content">
                            <h3>Último Login</h3>
                            <p className="stat-value">
                                {user?.last_login ? new Date(user.last_login).toLocaleDateString('pt-BR') : 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="dashboard-actions">
                    <h2 className="section-title">Ações Rápidas</h2>

                    <div className="action-grid">
                        <div className="action-card">
                            <div className="action-icon">
                                <i className="fas fa-user-edit"></i>
                            </div>
                            <h3>Editar Perfil</h3>
                            <p>Atualize suas informações pessoais</p>
                            <a href="/profile" className="btn btn-primary">Ir para Perfil</a>
                        </div>

                        <div className="action-card">
                            <div className="action-icon">
                                <i className="fas fa-key"></i>
                            </div>
                            <h3>Alterar Senha</h3>
                            <p>Mantenha sua conta segura</p>
                            <a href="/profile" className="btn btn-primary">Alterar Senha</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage; 