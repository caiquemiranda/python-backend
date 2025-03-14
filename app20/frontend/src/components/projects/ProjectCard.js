/**
 * Componente de cartão de projeto para exibir projetos em listas e painéis.
 * Mostra informações básicas do projeto e fornece acesso rápido a ações.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import {
    FaCalendarAlt, FaUserFriends, FaTasks,
    FaEllipsisV, FaArchive
} from 'react-icons/fa';
import '../../styles/projectcard.css';

const ProjectCard = ({ project, showActions = true }) => {
    // Mapeia o status para uma classe CSS e texto
    const statusMap = {
        'planning': { class: 'status-planning', text: 'Planejamento' },
        'in_progress': { class: 'status-in-progress', text: 'Em Andamento' },
        'paused': { class: 'status-paused', text: 'Pausado' },
        'completed': { class: 'status-completed', text: 'Concluído' },
        'cancelled': { class: 'status-cancelled', text: 'Cancelado' }
    };

    // Formata a data 
    const formatDate = (date) => {
        if (!date) return 'Não definida';
        return format(new Date(date), "dd 'de' MMMM, yyyy", { locale: pt });
    };

    return (
        <div className={`project-card ${statusMap[project.status]?.class || ''} ${project.is_archived ? 'archived' : ''}`}>
            <div className="project-card-content">
                {/* Cabeçalho com título e menu de ações */}
                <div className="project-card-header">
                    <Link to={`/projects/${project.id}`} className="project-title">
                        {project.name}
                        {project.is_archived && <FaArchive className="archive-icon" title="Arquivado" />}
                    </Link>

                    {showActions && (
                        <div className="project-actions">
                            <button className="project-action-button">
                                <FaEllipsisV />
                            </button>
                        </div>
                    )}
                </div>

                {/* Descrição do projeto */}
                {project.description && (
                    <div className="project-description">
                        {project.description.length > 100
                            ? `${project.description.substring(0, 100)}...`
                            : project.description}
                    </div>
                )}

                {/* Barra de progresso */}
                <div className="progress-container">
                    <div className="progress-text">
                        <span>Progresso</span>
                        <span>{project.progress}%</span>
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${project.progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Informações extras */}
                <div className="project-card-footer">
                    {/* Status */}
                    <div className={`project-status ${statusMap[project.status]?.class || ''}`}>
                        {statusMap[project.status]?.text || project.status}
                    </div>

                    {/* Datas */}
                    <div className="project-dates">
                        <div className="project-date">
                            <FaCalendarAlt />
                            <span>Início: {formatDate(project.start_date)}</span>
                        </div>
                        {project.end_date && (
                            <div className="project-date">
                                <FaCalendarAlt />
                                <span>Término: {formatDate(project.end_date)}</span>
                            </div>
                        )}
                    </div>

                    {/* Estatísticas */}
                    <div className="project-stats">
                        <div className="project-stat">
                            <FaUserFriends />
                            <span>{project.member_count} membros</span>
                        </div>
                        <div className="project-stat">
                            <FaTasks />
                            <span>
                                {project.completed_task_count}/{project.task_count} tarefas
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard; 