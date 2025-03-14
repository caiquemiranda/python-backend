/**
 * Componente de cartão de tarefa para exibir tarefas em listas, quadros e painéis.
 * Mostra informações básicas da tarefa e fornece acesso rápido a ações.
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import {
    FaCalendarAlt, FaExclamationTriangle, FaUser,
    FaRegClock, FaTag, FaEllipsisV
} from 'react-icons/fa';
import '../../styles/taskcard.css';

const TaskCard = ({ task, showActions = true }) => {
    // Mapeia a prioridade para uma classe CSS e texto
    const priorityMap = {
        1: { class: 'priority-low', text: 'Baixa' },
        2: { class: 'priority-medium', text: 'Média' },
        3: { class: 'priority-high', text: 'Alta' },
        4: { class: 'priority-urgent', text: 'Urgente' }
    };

    // Mapeia o status para uma classe CSS e texto
    const statusMap = {
        'backlog': { class: 'status-backlog', text: 'Backlog' },
        'todo': { class: 'status-todo', text: 'A Fazer' },
        'in_progress': { class: 'status-in-progress', text: 'Em Andamento' },
        'review': { class: 'status-review', text: 'Em Revisão' },
        'completed': { class: 'status-completed', text: 'Concluída' },
        'cancelled': { class: 'status-cancelled', text: 'Cancelada' }
    };

    // Formata a data de vencimento
    const formatDueDate = (date) => {
        if (!date) return 'Sem data';
        return format(new Date(date), "dd 'de' MMMM", { locale: pt });
    };

    return (
        <div className={`task-card ${statusMap[task.status]?.class || ''} ${task.is_overdue ? 'overdue' : ''}`}>
            {/* Indicador de prioridade */}
            <div className={`priority-indicator ${priorityMap[task.priority]?.class || ''}`}></div>

            <div className="task-card-content">
                {/* Cabeçalho com título e menu de ações */}
                <div className="task-card-header">
                    <Link to={`/tasks/${task.id}`} className="task-title">
                        {task.title}
                    </Link>

                    {showActions && (
                        <div className="task-actions">
                            <button className="task-action-button">
                                <FaEllipsisV />
                            </button>
                        </div>
                    )}
                </div>

                {/* Projeto da tarefa */}
                <div className="task-project">
                    <Link to={`/projects/${task.project}`}>
                        {task.project_name}
                    </Link>
                </div>

                {/* Tags */}
                {task.tags && task.tags.length > 0 && (
                    <div className="task-tags">
                        {task.tags.slice(0, 3).map(tag => (
                            <span
                                key={tag.id}
                                className="task-tag"
                                style={{ backgroundColor: tag.color }}
                            >
                                <FaTag /> {tag.name}
                            </span>
                        ))}
                        {task.tags.length > 3 && (
                            <span className="tag-count">+{task.tags.length - 3}</span>
                        )}
                    </div>
                )}

                {/* Informações extras */}
                <div className="task-card-footer">
                    {/* Data de vencimento */}
                    <div className="task-due-date">
                        <FaCalendarAlt />
                        <span className={task.is_overdue ? 'overdue' : ''}>
                            {formatDueDate(task.due_date)}
                            {task.is_overdue && <FaExclamationTriangle className="overdue-icon" />}
                        </span>
                    </div>

                    {/* Responsável */}
                    {task.assigned_to && (
                        <div className="task-assignee">
                            <FaUser />
                            {task.assigned_to.avatar_url ? (
                                <img
                                    src={task.assigned_to.avatar_url}
                                    alt={task.assigned_to.name}
                                    className="assignee-avatar"
                                />
                            ) : (
                                <span>{task.assigned_to.name}</span>
                            )}
                        </div>
                    )}

                    {/* Comentários */}
                    {task.comment_count > 0 && (
                        <div className="task-comments">
                            <FaRegClock />
                            <span>{task.comment_count}</span>
                        </div>
                    )}

                    {/* Status */}
                    <div className={`task-status ${statusMap[task.status]?.class || ''}`}>
                        {statusMap[task.status]?.text || task.status}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskCard; 