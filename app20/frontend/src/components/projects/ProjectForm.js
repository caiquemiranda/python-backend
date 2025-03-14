/**
 * Componente de formulário para criação e edição de projetos
 * Utiliza Formik para gerenciamento de formulário e Yup para validação
 */
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaSave, FaTrash, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { projectService } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import '../../styles/forms.css';

// Schema de validação para o formulário de projeto
const ProjectSchema = Yup.object().shape({
    name: Yup.string()
        .required('Nome do projeto é obrigatório')
        .min(3, 'Nome deve ter pelo menos 3 caracteres')
        .max(100, 'Nome deve ter no máximo 100 caracteres'),
    description: Yup.string()
        .required('Descrição é obrigatória')
        .min(10, 'Descrição deve ter pelo menos 10 caracteres')
        .max(500, 'Descrição deve ter no máximo 500 caracteres'),
    start_date: Yup.date()
        .required('Data de início é obrigatória')
        .max(Yup.ref('end_date'), 'Data de início deve ser anterior à data de término'),
    end_date: Yup.date()
        .required('Data de término é obrigatória')
        .min(Yup.ref('start_date'), 'Data de término deve ser posterior à data de início'),
    category: Yup.string()
        .required('Categoria é obrigatória'),
    status: Yup.string()
        .required('Status é obrigatório')
});

/**
 * Componente de formulário de projeto
 * @param {Object} props - Propriedades do componente
 * @param {Object} props.project - Projeto a ser editado (opcional)
 * @param {Function} props.onSubmitSuccess - Função a ser chamada após envio bem-sucedido
 * @param {Function} props.onCancel - Função a ser chamada ao cancelar
 */
const ProjectForm = ({ project = null, onSubmitSuccess, onCancel }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);

    const isEditMode = !!project;

    // Valores iniciais para o formulário
    const initialValues = project ? {
        name: project.name || '',
        description: project.description || '',
        start_date: project.start_date ? new Date(project.start_date).toISOString().slice(0, 10) : '',
        end_date: project.end_date ? new Date(project.end_date).toISOString().slice(0, 10) : '',
        category: project.category || '',
        status: project.status || 'not_started',
    } : {
        name: '',
        description: '',
        start_date: new Date().toISOString().slice(0, 10),
        end_date: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().slice(0, 10),
        category: '',
        status: 'not_started',
    };

    // Busca as categorias disponíveis ao montar o componente
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await projectService.getCategories();
                setCategories(response.data);
            } catch (err) {
                console.error('Erro ao buscar categorias:', err);
                setError('Não foi possível carregar as categorias de projetos.');
            }
        };

        fetchCategories();
    }, []);

    /**
     * Manipula o envio do formulário
     * @param {Object} values - Valores do formulário
     * @param {Object} actions - Ações do Formik
     */
    const handleSubmit = async (values, { setSubmitting }) => {
        setLoading(true);
        setError('');

        try {
            if (isEditMode) {
                // Atualiza o projeto existente
                await projectService.update(project.id, values);
            } else {
                // Cria um novo projeto
                await projectService.create(values);
            }

            // Chama o callback de sucesso
            if (onSubmitSuccess) {
                onSubmitSuccess();
            } else {
                // Se não houver callback, navega para a lista de projetos
                navigate('/projects');
            }
        } catch (err) {
            console.error('Erro ao salvar projeto:', err);

            // Define a mensagem de erro com base na resposta
            if (err.response && err.response.data) {
                const errors = err.response.data;
                const errorMessage = Object.keys(errors)
                    .map(key => `${key}: ${errors[key].join(' ')}`)
                    .join('; ');
                setError(errorMessage);
            } else {
                setError('Ocorreu um erro ao salvar o projeto. Por favor, tente novamente.');
            }
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    /**
     * Confirma e executa a exclusão do projeto
     */
    const handleDelete = async () => {
        if (!project || !project.id) return;

        if (window.confirm('Tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita.')) {
            setLoading(true);
            try {
                await projectService.delete(project.id);
                navigate('/projects');
            } catch (err) {
                console.error('Erro ao excluir projeto:', err);
                setError('Não foi possível excluir o projeto. Verifique se não há tarefas vinculadas.');
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) {
        return <LoadingSpinner text="Processando..." />;
    }

    return (
        <div className="form-container">
            <h2 className="form-title">
                {isEditMode ? 'Editar Projeto' : 'Novo Projeto'}
            </h2>

            {error && (
                <div className="form-error-message">
                    {error}
                </div>
            )}

            <Formik
                initialValues={initialValues}
                validationSchema={ProjectSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ isSubmitting, isValid, dirty }) => (
                    <Form className="form">
                        <div className="form-group">
                            <label htmlFor="name">Nome do Projeto</label>
                            <Field
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Digite o nome do projeto"
                            />
                            <ErrorMessage name="name" component="div" className="field-error" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Descrição</label>
                            <Field
                                as="textarea"
                                id="description"
                                name="description"
                                rows="4"
                                placeholder="Descreva o projeto detalhadamente"
                            />
                            <ErrorMessage name="description" component="div" className="field-error" />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="start_date">Data de Início</label>
                                <Field
                                    type="date"
                                    id="start_date"
                                    name="start_date"
                                />
                                <ErrorMessage name="start_date" component="div" className="field-error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="end_date">Data de Término</label>
                                <Field
                                    type="date"
                                    id="end_date"
                                    name="end_date"
                                />
                                <ErrorMessage name="end_date" component="div" className="field-error" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="category">Categoria</label>
                                <Field
                                    as="select"
                                    id="category"
                                    name="category"
                                >
                                    <option value="">Selecione uma categoria</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </Field>
                                <ErrorMessage name="category" component="div" className="field-error" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <Field
                                    as="select"
                                    id="status"
                                    name="status"
                                >
                                    <option value="not_started">Não Iniciado</option>
                                    <option value="in_progress">Em Andamento</option>
                                    <option value="completed">Concluído</option>
                                    <option value="on_hold">Em Espera</option>
                                    <option value="cancelled">Cancelado</option>
                                </Field>
                                <ErrorMessage name="status" component="div" className="field-error" />
                            </div>
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

export default ProjectForm; 