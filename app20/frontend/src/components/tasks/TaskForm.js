/**
 * Componente de formulário para criação e edição de tarefas
 * Utiliza Formik para gerenciamento de formulário e Yup para validação
 */
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaSave, FaTrash, FaTimes, FaPlus, FaTag } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { projectService, taskService, userService } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import '../../styles/forms.css';

// Schema de validação para o formulário de tarefa
const TaskSchema = Yup.object().shape({
    title: Yup.string()
        .required('Título é obrigatório')
        .min(3, 'Título deve ter pelo menos 3 caracteres')
        .max(100, 'Título deve ter no máximo 100 caracteres'),
    description: Yup.string()
        .required('Descrição é obrigatória')
        .min(5, 'Descrição deve ter pelo menos 5 caracteres'),
    due_date: Yup.date()
        .nullable()
        .min(new Date(new Date().setHours(0, 0, 0, 0)), 'Data de vencimento deve ser futura'),
    priority: Yup.string()
        .required('Prioridade é obrigatória'),
    status: Yup.string()
        .required('Status é obrigatório'),
    project: Yup.number()
        .required('Projeto é obrigatório'),
    estimated_hours: Yup.number()
        .nullable()
        .min(0, 'Horas estimadas deve ser um número positivo')
        .max(1000, 'Valor muito alto para horas estimadas'),
});

/**
 * Componente de formulário de tarefa
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.task - Tarefa a ser editada (opcional)
 * @param {Number} props.projectId - ID do projeto (opcional, para pré-selecionar)
 * @param {Function} props.onSubmitSuccess - Função a ser chamada após envio bem-sucedido
 * @param {Function} props.onCancel - Função a ser chamada ao cancelar
 */
const TaskForm = ({ task = null, projectId = null, onSubmitSuccess, onCancel }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState([]);

    const isEditMode = !!task;

    // Valores iniciais para o formulário
    const initialValues = task ? {
        title: task.title || '',
        description: task.description || '',
        due_date: task.due_date ? new Date(task.due_date).toISOString().slice(0, 10) : '',
        priority: task.priority || 'medium',
        status: task.status || 'todo',
        project: task.project || (projectId ? Number(projectId) : ''),
        assigned_to: task.assigned_to || '',
        estimated_hours: task.estimated_hours || '',
        tags: task.tags || [],
    } : {
        title: '',
        description: '',
        due_date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().slice(0, 10),
        priority: 'medium',
        status: 'todo',
        project: projectId ? Number(projectId) : '',
        assigned_to: '',
        estimated_hours: '',
        tags: [],
    };

    // Carrega os projetos e usuários ao montar o componente
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Busca projetos
                const projectsResponse = await projectService.getAll();
                setProjects(projectsResponse.data);

                // Busca usuários
                const usersResponse = await userService.getAll();
                setUsers(usersResponse.data);

                // Se estiver editando, carrega as tags da tarefa
                if (task && task.tags) {
                    setTags(task.tags);
                }
            } catch (err) {
                console.error('Erro ao carregar dados:', err);
                setError('Não foi possível carregar os dados necessários para o formulário.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [task]);

    /**
     * Manipula o envio do formulário
     * @param {Object} values - Valores do formulário
     * @param {Object} actions - Ações do Formik
     */
    const handleSubmit = async (values, { setSubmitting }) => {
        setLoading(true);
        setError('');

        // Adiciona as tags ao objeto de valores
        const taskData = {
            ...values,
            tags: tags,
        };

        try {
            if (isEditMode) {
                // Atualiza a tarefa existente
                await taskService.update(task.id, taskData);
            } else {
                // Cria uma nova tarefa
                await taskService.create(taskData);
            }

            // Chama o callback de sucesso
            if (onSubmitSuccess) {
                onSubmitSuccess();
            } else {
                // Se não houver callback, navega para o projeto
                navigate(`/projects/${values.project}`);
            }
        } catch (err) {
            console.error('Erro ao salvar tarefa:', err);

            // Define a mensagem de erro com base na resposta
            if (err.response && err.response.data) {
                const errors = err.response.data;
                const errorMessage = Object.keys(errors)
                    .map(key => `${key}: ${errors[key].join(' ')}`)
                    .join('; ');
                setError(errorMessage);
            } else {
                setError('Ocorreu um erro ao salvar a tarefa. Por favor, tente novamente.');
            }
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    /**
     * Confirma e executa a exclusão da tarefa
     */
    const handleDelete = async () => {
        if (!task || !task.id) return;

        if (window.confirm('Tem certeza que deseja excluir esta tarefa? Esta ação não pode ser desfeita.')) {
            setLoading(true);
            try {
                await taskService.delete(task.id);
                if (task.project) {
                    navigate(`/projects/${task.project}`);
                } else {
                    navigate('/tasks');
                }
            } catch (err) {
                console.error('Erro ao excluir tarefa:', err);
                setError('Não foi possível excluir a tarefa.');
            } finally {
                setLoading(false);
            }
        }
    };

    /**
     * Adiciona uma tag à lista
     */
    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    /**
     * Remove uma tag da lista
     * @param {String} tagToRemove - Tag a ser removida
     */
    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    /**
     * Manipula o pressionamento de tecla no campo de tag
     * @param {Event} e - Evento de teclado
     */
    const handleTagKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            handleAddTag();
        }
    };

    if (loading && !isEditMode) {
        return <LoadingSpinner text="Carregando dados..." />;
    }

    return (
        <div className="form-container">
            <h2 className="form-title">
                {isEditMode ? 'Editar Tarefa' : 'Nova Tarefa'}
            </h2>

            {error && (
                <div className="form-error-message">
                    {error}
                </div>
            )}

            <Formik
                initialValues={initialValues}
                validationSchema={TaskSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ isSubmitting, isValid, dirty, values, setFieldValue }) => (
                    <Form className="form">
                        <div className="form-group">
                            <label htmlFor="title">Título</label>
                            <Field
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Digite o título da tarefa"
                            />
                            <ErrorMessage name="title" component="div" className="field-error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Descrição</label>
                            <Field
                                as="textarea"
                                id="description"
                                name="description"
                                rows="4"
                                placeholder="Descreva a tarefa detalhadamente"
                            />
                            <ErrorMessage name="description" component="div" className="field-error" />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="project">Projeto</label>
                                <Field
                                    as="select"
                                    id="project"
                                    name="project"
                                >
                                    <option value="">Selecione um projeto</option>
                                    {projects.map(project => (
                                        <option key={project.id} value={project.id}>
                                            {project.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="project" component="div" className="field-error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="due_date">Data de Vencimento</label>
                                <Field
                                    type="date"
                                    id="due_date"
                                    name="due_date"
                                />
                                <ErrorMessage name="due_date" component="div" className="field-error" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="priority">Prioridade</label>
                                <Field
                                    as="select"
                                    id="priority"
                                    name="priority"
                                >
                                    <option value="low">Baixa</option>
                                    <option value="medium">Média</option>
                                    <option value="high">Alta</option>
                                    <option value="urgent">Urgente</option>
                                </Field>
                                <ErrorMessage name="priority" component="div" className="field-error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <Field
                                    as="select"
                                    id="status"
                                    name="status"
                                >
                                    <option value="todo">A Fazer</option>
                                    <option value="in_progress">Em Andamento</option>
                                    <option value="review">Em Revisão</option>
                                    <option value="done">Concluída</option>
                                </Field>
                                <ErrorMessage name="status" component="div" className="field-error" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="assigned_to">Responsável</label>
                                <Field
                                    as="select"
                                    id="assigned_to"
                                    name="assigned_to"
                                >
                                    <option value="">Não atribuído</option>
                                    {users.map(user => (
                                        <option key={user.id} value={user.id}>
                                            {user.first_name} {user.last_name} ({user.username})
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="assigned_to" component="div" className="field-error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="estimated_hours">Horas Estimadas</label>
                                <Field
                                    type="number"
                                    id="estimated_hours"
                                    name="estimated_hours"
                                    min="0"
                                    step="0.5"
                                    placeholder="Estimativa em horas"
                                />
                                <ErrorMessage name="estimated_hours" component="div" className="field-error" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Tags</label>
                            <div className="tags-input">
                                {tags.map(tag => (
                                    <div key={tag} className="tag">
                                        <FaTag /> {tag}
                                        <span
                                            className="tag-remove"
                                            onClick={() => handleRemoveTag(tag)}
                                        >
                                            ×
                                        </span>
                                    </div>
                                ))}
                                <input
                                    type="text"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={handleTagKeyPress}
                                    placeholder="Adicionar tag... (pressione Enter)"
                                />
                                <button
                                    type="button"
                                    className="btn btn-sm"
                                    onClick={handleAddTag}
                                >
                                    <FaPlus />
                                </button>
                            </div>
                            <small>Separe as tags com vírgula ou pressione Enter.</small>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onCancel}
                                disabled={isSubmitting}
                            >
                                <FaTimes /> Cancelar
                            </button>

                            {isEditMode && (
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDelete}
                                    disabled={isSubmitting}
                                >
                                    <FaTrash /> Excluir
                                </button>
                            )}

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={isSubmitting || !(isValid && dirty)}
                            >
                                <FaSave /> {isSubmitting ? 'Salvando...' : 'Salvar'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default TaskForm; 