/**
 * Página de detalhes do projeto
 * Mostra informações completas do projeto, lista de tarefas e membros
 * Permite gerenciar tarefas e membros do projeto
 */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    FaPlus, FaEdit, FaUserPlus, FaTrash, FaCheck,
    FaClock, FaExclamationCircle, FaChartBar
} from 'react-icons/fa';
import { projectService, taskService, userService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import TaskCard from '../../components/tasks/TaskCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Modal from '../../components/common/Modal';
import ProjectForm from '../../components/projects/ProjectForm';
import TaskForm from '../../components/tasks/TaskForm';
import StatusChart from '../../components/charts/StatusChart';
import PriorityChart from '../../components/charts/PriorityChart';
import '../../styles/project-detail.css';

const ProjectDetail = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [stats, setStats] = useState(null);

    // Estados para modais
    const [showEditModal, setShowEditModal] = useState(false);
    const [showNewTaskModal, setShowNewTaskModal] = useState(false);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);

    // Estados para adicionar membros
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedRole, setSelectedRole] = useState('member');
    const [searchLoading, setSearchLoading] = useState(false);

    // Carrega o projeto e suas tarefas
    useEffect(() => {
        const fetchProjectData = async () => {
            setLoading(true);
            try {
                // Busca detalhes do projeto
                const projectResponse = await projectService.getById(projectId);
                setProject(projectResponse.data);

                // Busca as tarefas do projeto
                const tasksResponse = await taskService.getAll({ project: projectId });
                setTasks(tasksResponse.data);

                // Busca os membros do projeto
                const membersResponse = await projectService.getMembers(projectId);
                setMembers(membersResponse.data);

                // Busca estatísticas do projeto
                const statsResponse = await projectService.getStats(projectId);
                setStats(statsResponse.data);
            } catch (err) {
                console.error('Erro ao carregar projeto:', err);
                setError('Não foi possível carregar os dados do projeto.');
            } finally {
                setLoading(false);
            }
        };

        fetchProjectData();
    }, [projectId]);

    /**
     * Verifica se o usuário atual é o proprietário do projeto
     * @returns {Boolean} - True se for proprietário
     */
    const isOwner = () => {
        if (!project || !user) return false;
        return project.owner === user.id;
    };

    /**
     * Verifica se o usuário atual é um administrador do projeto
     * @returns {Boolean} - True se for administrador
     */
    const isAdmin = () => {
        if (!members || !user) return false;
        const userMember = members.find(member => member.user.id === user.id);
        return userMember && (userMember.role === 'admin' || userMember.role === 'owner');
    };

    /**
     * Verifica se o usuário atual é membro do projeto
     * @returns {Boolean} - True se for membro
     */
    const isMember = () => {
        if (!members || !user) return false;
        return members.some(member => member.user.id === user.id);
    };

    /**
     * Após edição do projeto, atualiza os dados
     */
    const handleProjectUpdate = async () => {
        try {
            const response = await projectService.getById(projectId);
            setProject(response.data);
            setShowEditModal(false);
        } catch (err) {
            console.error('Erro ao atualizar projeto:', err);
            setError('Erro ao atualizar o projeto.');
        }
    };

    /**
     * Após adicionar uma tarefa, atualiza a lista de tarefas
     */
    const handleTaskCreated = async () => {
        try {
            const response = await taskService.getAll({ project: projectId });
            setTasks(response.data);
            setShowNewTaskModal(false);
        } catch (err) {
            console.error('Erro ao carregar tarefas:', err);
            setError('Erro ao carregar as tarefas atualizadas.');
        }
    };

    /**
     * Busca usuários para adicionar ao projeto
     */
    const handleSearchUsers = async () => {
        if (!searchTerm.trim()) return;

        setSearchLoading(true);
        try {
            const response = await userService.search(searchTerm);

            // Filtra usuários que já são membros
            const filteredResults = response.data.filter(user =>
                !members.some(member => member.user.id === user.id)
            );

            setSearchResults(filteredResults);
        } catch (err) {
            console.error('Erro ao buscar usuários:', err);
            setError('Erro ao buscar usuários.');
        } finally {
            setSearchLoading(false);
        }
    };

    /**
     * Adiciona um usuário como membro do projeto
     * @param {Number} userId - ID do usuário a ser adicionado
     */
    const handleAddMember = async (userId) => {
        try {
            await projectService.addMember(projectId, {
                user_id: userId,
                role: selectedRole
            });

            // Atualiza a lista de membros
            const membersResponse = await projectService.getMembers(projectId);
            setMembers(membersResponse.data);

            // Limpa os resultados da busca
            setSearchResults([]);
            setSearchTerm('');
        } catch (err) {
            console.error('Erro ao adicionar membro:', err);
            setError('Erro ao adicionar membro ao projeto.');
        }
    };

    /**
     * Remove um membro do projeto
     * @param {Number} userId - ID do usuário a ser removido
     */
    const handleRemoveMember = async (userId) => {
        if (!window.confirm('Tem certeza que deseja remover este membro do projeto?')) {
            return;
        }

        try {
            await projectService.removeMember(projectId, userId);

            // Atualiza a lista de membros
            setMembers(members.filter(member => member.user.id !== userId));
        } catch (err) {
            console.error('Erro ao remover membro:', err);
            setError('Erro ao remover membro do projeto.');
        }
    };

    /**
     * Exclui o projeto após confirmação
     */
    const handleDeleteProject = async () => {
        if (!window.confirm('Tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita.')) {
            return;
        }

        try {
            await projectService.delete(projectId);
            navigate('/projects');
        } catch (err) {
            console.error('Erro ao excluir projeto:', err);
            setError('Não foi possível excluir o projeto. Verifique se não há tarefas dependentes.');
        }
    };

    if (loading) {
        return <LoadingSpinner text="Carregando detalhes do projeto..." />;
    }

    if (error) {
        return (
            <div className="error-container">
                <div className="error-message">
                    <FaExclamationCircle />
                    <p>{error}</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => window.location.reload()}
                    >
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="error-container">
                <div className="error-message">
                    <FaExclamationCircle />
                    <p>Projeto não encontrado ou você não tem permissão para acessá-lo.</p>
                    <Link to="/projects" className="btn btn-primary">
                        Ver Todos os Projetos
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="project-detail-container">
            <div className="project-header">
                <div className="project-title">
                    <h1>{project.name}</h1>
                    <div className="project-tags">
                        <span className={`project-status status-${project.status}`}>
                            {project.status === 'not_started' && 'Não Iniciado'}
                            {project.status === 'in_progress' && 'Em Andamento'}
                            {project.status === 'completed' && 'Concluído'}
                            {project.status === 'on_hold' && 'Em Espera'}
                            {project.status === 'cancelled' && 'Cancelado'}
                        </span>
                        <span className="project-category">{project.category_name}</span>
                    </div>
                </div>

                {(isOwner() || isAdmin()) && (
                    <div className="project-actions">
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowNewTaskModal(true)}
                        >
                            <FaPlus /> Nova Tarefa
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => setShowEditModal(true)}
                        >
                            <FaEdit /> Editar
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => setShowAddMemberModal(true)}
                        >
                            <FaUserPlus /> Adicionar Membro
                        </button>
                        {isOwner() && (
                            <button
                                className="btn btn-danger"
                                onClick={handleDeleteProject}
                            >
                                <FaTrash /> Excluir
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className="project-content">
                <div className="project-info">
                    <div className="project-description">
                        <h2>Descrição</h2>
                        <p>{project.description}</p>
                    </div>

                    <div className="project-dates">
                        <div>
                            <strong>Data de Início:</strong>
                            <span>{new Date(project.start_date).toLocaleDateString()}</span>
                        </div>
                        <div>
                            <strong>Data de Término:</strong>
                            <span>{new Date(project.end_date).toLocaleDateString()}</span>
                        </div>
                    </div>

                    {stats && (
                        <div className="project-stats">
                            <h2>Estatísticas do Projeto</h2>
                            <div className="stats-row">
                                <div className="stat-item">
                                    <FaCheck className="stat-icon" />
                                    <div className="stat-value">{stats.completed_tasks}</div>
                                    <div className="stat-label">Tarefas Concluídas</div>
                                </div>
                                <div className="stat-item">
                                    <FaClock className="stat-icon" />
                                    <div className="stat-value">{stats.hours_logged || 0}</div>
                                    <div className="stat-label">Horas Registradas</div>
                                </div>
                                <div className="stat-item">
                                    <FaChartBar className="stat-icon" />
                                    <div className="stat-value">{stats.completion_percentage}%</div>
                                    <div className="stat-label">Progresso</div>
                                </div>
                            </div>

                            <div className="charts-container">
                                <div className="chart-item">
                                    <h3>Tarefas por Status</h3>
                                    <StatusChart data={stats.tasks_by_status} />
                                </div>
                                <div className="chart-item">
                                    <h3>Tarefas por Prioridade</h3>
                                    <PriorityChart data={stats.tasks_by_priority} />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="project-sidebar">
                    <div className="project-members">
                        <h2>Membros da Equipe</h2>
                        <ul className="members-list">
                            {members.map(member => (
                                <li key={member.user.id} className="member-item">
                                    <div className="member-info">
                                        <div className="member-avatar">
                                            {member.user.first_name.charAt(0)}
                                        </div>
                                        <div className="member-details">
                                            <div className="member-name">
                                                {member.user.first_name} {member.user.last_name}
                                            </div>
                                            <div className="member-role">
                                                {member.role === 'owner' && 'Proprietário'}
                                                {member.role === 'admin' && 'Administrador'}
                                                {member.role === 'member' && 'Membro'}
                                            </div>
                                        </div>
                                    </div>

                                    {(isOwner() || (isAdmin() && member.role !== 'owner')) &&
                                        member.user.id !== user.id && (
                                            <button
                                                className="btn-icon"
                                                onClick={() => handleRemoveMember(member.user.id)}
                                                title="Remover membro"
                                            >
                                                <FaTrash />
                                            </button>
                                        )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="project-tasks">
                <h2>Tarefas do Projeto</h2>

                {tasks.length === 0 ? (
                    <div className="empty-tasks">
                        <p>Nenhuma tarefa foi adicionada a este projeto.</p>
                        {(isOwner() || isAdmin()) && (
                            <button
                                className="btn btn-primary"
                                onClick={() => setShowNewTaskModal(true)}
                            >
                                <FaPlus /> Adicionar Tarefa
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="tasks-grid">
                        {tasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                link={`/tasks/${task.id}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modal para editar projeto */}
            <Modal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                title="Editar Projeto"
            >
                <ProjectForm
                    project={project}
                    onSubmitSuccess={handleProjectUpdate}
                    onCancel={() => setShowEditModal(false)}
                />
            </Modal>

            {/* Modal para adicionar tarefa */}
            <Modal
                isOpen={showNewTaskModal}
                onClose={() => setShowNewTaskModal(false)}
                title="Nova Tarefa"
            >
                <TaskForm
                    projectId={projectId}
                    onSubmitSuccess={handleTaskCreated}
                    onCancel={() => setShowNewTaskModal(false)}
                />
            </Modal>

            {/* Modal para adicionar membro */}
            <Modal
                isOpen={showAddMemberModal}
                onClose={() => setShowAddMemberModal(false)}
                title="Adicionar Membro ao Projeto"
            >
                <div className="add-member-form">
                    <div className="search-container">
                        <div className="search-input-group">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar por nome ou email"
                            />
                            <button
                                className="btn btn-primary"
                                onClick={handleSearchUsers}
                                disabled={searchLoading}
                            >
                                {searchLoading ? 'Buscando...' : 'Buscar'}
                            </button>
                        </div>

                        <div className="role-selector">
                            <label>Função:</label>
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                            >
                                <option value="member">Membro</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </div>
                    </div>

                    {searchResults.length > 0 ? (
                        <ul className="search-results">
                            {searchResults.map(user => (
                                <li key={user.id} className="search-result-item">
                                    <div className="user-info">
                                        <div className="user-avatar">
                                            {user.first_name.charAt(0)}
                                        </div>
                                        <div className="user-details">
                                            <div className="user-name">
                                                {user.first_name} {user.last_name}
                                            </div>
                                            <div className="user-email">{user.email}</div>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={() => handleAddMember(user.id)}
                                    >
                                        <FaUserPlus /> Adicionar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        searchTerm && !searchLoading && (
                            <div className="no-results">
                                <p>Nenhum usuário encontrado. Tente outra busca.</p>
                            </div>
                        )
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default ProjectDetail; 