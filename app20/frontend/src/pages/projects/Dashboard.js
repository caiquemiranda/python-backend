/**
 * Página de dashboard para exibir uma visão geral dos projetos e tarefas.
 * Exibe estatísticas, projetos recentes e tarefas próximas do vencimento.
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { projectService, taskService } from '../../services/api';
import {
    FaPlus, FaCheck, FaChartLine, FaExclamationTriangle,
    FaRegClock, FaProjectDiagram, FaTasks, FaUsers
} from 'react-icons/fa';
import StatusChart from '../../components/charts/StatusChart';
import PriorityChart from '../../components/charts/PriorityChart';
import TaskCard from '../../components/tasks/TaskCard';
import ProjectCard from '../../components/projects/ProjectCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import '../../styles/dashboard.css';

const Dashboard = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalProjects: 0,
        activeProjects: 0,
        completedProjects: 0,
        totalTasks: 0,
        completedTasks: 0,
        overdueTasks: 0
    });
    const [recentProjects, setRecentProjects] = useState([]);
    const [upcomingTasks, setUpcomingTasks] = useState([]);
    const [taskStatuses, setTaskStatuses] = useState([]);
    const [taskPriorities, setTaskPriorities] = useState([]);
    const [error, setError] = useState(null);

    // Carrega os dados ao montar o componente
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);

                // Obtém estatísticas de projetos
                const projectsResponse = await projectService.getMyProjects();
                const projects = projectsResponse.data.results || projectsResponse.data;

                // Calcula estatísticas de projetos
                const activeProjects = projects.filter(p => p.status === 'in_progress');
                const completedProjects = projects.filter(p => p.status === 'completed');

                // Obtém os projetos mais recentes
                const sortedProjects = [...projects].sort((a, b) =>
                    new Date(b.updated_at) - new Date(a.updated_at)
                ).slice(0, 4);

                // Obtém tarefas do usuário
                const tasksResponse = await taskService.getMyTasks();
                const tasks = tasksResponse.data.results || tasksResponse.data;

                // Calcula estatísticas de tarefas
                const completedTasks = tasks.filter(t => t.status === 'completed');
                const overdueTasks = tasks.filter(t => t.is_overdue);

                // Obtém tarefas próximas do vencimento (não concluídas e ordenadas por data de vencimento)
                const upcoming = tasks
                    .filter(t => t.status !== 'completed' && t.due_date)
                    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
                    .slice(0, 5);

                // Agrupa tarefas por status para o gráfico
                const statusCounts = tasks.reduce((acc, task) => {
                    acc[task.status] = (acc[task.status] || 0) + 1;
                    return acc;
                }, {});

                const statusData = Object.entries(statusCounts).map(([status, count]) => ({
                    status,
                    count
                }));

                // Agrupa tarefas por prioridade para o gráfico
                const priorityCounts = tasks.reduce((acc, task) => {
                    acc[task.priority] = (acc[task.priority] || 0) + 1;
                    return acc;
                }, {});

                const priorityData = Object.entries(priorityCounts).map(([priority, count]) => ({
                    priority: Number(priority),
                    count
                })).sort((a, b) => a.priority - b.priority);

                // Atualiza os estados com os dados obtidos
                setStats({
                    totalProjects: projects.length,
                    activeProjects: activeProjects.length,
                    completedProjects: completedProjects.length,
                    totalTasks: tasks.length,
                    completedTasks: completedTasks.length,
                    overdueTasks: overdueTasks.length
                });

                setRecentProjects(sortedProjects);
                setUpcomingTasks(upcoming);
                setTaskStatuses(statusData);
                setTaskPriorities(priorityData);
            } catch (err) {
                console.error('Erro ao carregar dados do dashboard:', err);
                setError('Não foi possível carregar os dados do dashboard. Por favor, tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Bem-vindo(a), {user.name}!</p>
            </div>

            {/* Estatísticas */}
            <div className="stats-container">
                <div className="stat-card">
                    <div className="stat-icon">
                        <FaProjectDiagram />
                    </div>
                    <div className="stat-info">
                        <h3>{stats.totalProjects}</h3>
                        <p>Projetos</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <FaChartLine />
                    </div>
                    <div className="stat-info">
                        <h3>{stats.activeProjects}</h3>
                        <p>Projetos Ativos</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <FaTasks />
                    </div>
                    <div className="stat-info">
                        <h3>{stats.totalTasks}</h3>
                        <p>Tarefas</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <FaCheck />
                    </div>
                    <div className="stat-info">
                        <h3>{stats.completedTasks}</h3>
                        <p>Tarefas Concluídas</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        <FaExclamationTriangle />
                    </div>
                    <div className="stat-info">
                        <h3>{stats.overdueTasks}</h3>
                        <p>Tarefas Atrasadas</p>
                    </div>
                </div>
            </div>

            {/* Layout de duas colunas para gráficos e listas */}
            <div className="dashboard-grid">
                {/* Coluna da esquerda - Projetos e gráficos */}
                <div className="dashboard-column">
                    {/* Projetos recentes */}
                    <section className="dashboard-section">
                        <div className="section-header">
                            <h2>Projetos Recentes</h2>
                            <Link to="/projects/new" className="button-link">
                                <FaPlus /> Novo Projeto
                            </Link>
                        </div>

                        {recentProjects.length > 0 ? (
                            <div className="projects-grid">
                                {recentProjects.map(project => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </div>
                        ) : (
                            <p className="empty-message">
                                Você não tem projetos ainda. Clique em "Novo Projeto" para começar!
                            </p>
                        )}

                        {recentProjects.length > 0 && (
                            <div className="view-all">
                                <Link to="/projects">Ver todos os projetos</Link>
                            </div>
                        )}
                    </section>

                    {/* Gráfico de status de tarefas */}
                    <section className="dashboard-section chart-section">
                        <h2>Status das Tarefas</h2>
                        <div className="chart-container">
                            <StatusChart data={taskStatuses} />
                        </div>
                    </section>
                </div>

                {/* Coluna da direita - Tarefas e mais gráficos */}
                <div className="dashboard-column">
                    {/* Tarefas próximas */}
                    <section className="dashboard-section">
                        <div className="section-header">
                            <h2>Próximas Tarefas</h2>
                            <Link to="/tasks/new" className="button-link">
                                <FaPlus /> Nova Tarefa
                            </Link>
                        </div>

                        {upcomingTasks.length > 0 ? (
                            <div className="tasks-list">
                                {upcomingTasks.map(task => (
                                    <TaskCard key={task.id} task={task} />
                                ))}
                            </div>
                        ) : (
                            <p className="empty-message">
                                Você não tem tarefas próximas. Clique em "Nova Tarefa" para adicionar!
                            </p>
                        )}

                        {upcomingTasks.length > 0 && (
                            <div className="view-all">
                                <Link to="/tasks">Ver todas as tarefas</Link>
                            </div>
                        )}
                    </section>

                    {/* Gráfico de prioridades de tarefas */}
                    <section className="dashboard-section chart-section">
                        <h2>Prioridades das Tarefas</h2>
                        <div className="chart-container">
                            <PriorityChart data={taskPriorities} />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 