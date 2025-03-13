import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { notesService } from '../services/api';
import { FaArrowLeft, FaSave, FaTimes, FaLock, FaGlobe } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Notes.css';

const NoteForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    // Estado do formulário
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        is_public: false
    });
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(isEditMode);
    const [error, setError] = useState(null);

    // Se for modo de edição, carrega os dados da nota
    useEffect(() => {
        if (isEditMode) {
            const fetchNote = async () => {
                try {
                    setFetchLoading(true);
                    const data = await notesService.getNote(id);
                    setFormData({
                        title: data.title,
                        content: data.content,
                        is_public: data.is_public
                    });
                    setError(null);
                } catch (err) {
                    console.error('Erro ao carregar nota para edição:', err);
                    setError('Não foi possível carregar os dados da nota. Tente novamente mais tarde.');
                    toast.error('Erro ao carregar nota para edição.');
                } finally {
                    setFetchLoading(false);
                }
            };

            fetchNote();
        }
    }, [id, isEditMode]);

    // Atualiza os dados do formulário quando o usuário digita
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // Valida o formulário
    const validateForm = () => {
        if (!formData.title.trim()) {
            toast.error('O título da nota é obrigatório.');
            return false;
        }

        if (!formData.content.trim()) {
            toast.error('O conteúdo da nota é obrigatório.');
            return false;
        }

        return true;
    };

    // Processa o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setLoading(true);

            try {
                if (isEditMode) {
                    // Atualiza uma nota existente
                    await notesService.updateNote(id, formData);
                    toast.success('Nota atualizada com sucesso!');
                } else {
                    // Cria uma nova nota
                    await notesService.createNote(formData);
                    toast.success('Nota criada com sucesso!');
                }

                // Redireciona para a lista de notas
                navigate('/notes');

            } catch (err) {
                console.error('Erro ao salvar nota:', err);
                const errorMessage = isEditMode
                    ? 'Erro ao atualizar nota. Tente novamente.'
                    : 'Erro ao criar nota. Tente novamente.';
                toast.error(errorMessage);
            } finally {
                setLoading(false);
            }
        }
    };

    if (fetchLoading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Carregando dados da nota...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="note-form-container">
                <div className="note-form-header">
                    <Link to="/notes" className="back-link">
                        <FaArrowLeft /> Voltar para Notas
                    </Link>
                </div>
                <div className="error-container">
                    <p className="error-message">{error}</p>
                    <button onClick={() => navigate('/notes')} className="retry-btn">
                        Voltar para Minhas Notas
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="note-form-container">
            <div className="note-form-header">
                <Link to="/notes" className="back-link">
                    <FaArrowLeft /> Voltar para Notas
                </Link>
                <h1>{isEditMode ? 'Editar Nota' : 'Nova Nota'}</h1>
            </div>

            <form onSubmit={handleSubmit} className="note-form">
                <div className="form-group">
                    <label htmlFor="title">Título</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Digite o título da nota"
                        disabled={loading}
                        maxLength="100"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Conteúdo</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Digite o conteúdo da nota"
                        disabled={loading}
                        required
                    />
                </div>

                <div className="form-checkbox">
                    <input
                        type="checkbox"
                        id="is_public"
                        name="is_public"
                        checked={formData.is_public}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <label htmlFor="is_public">
                        {formData.is_public ? (
                            <>
                                <FaGlobe /> Tornar esta nota pública (qualquer pessoa pode ver)
                            </>
                        ) : (
                            <>
                                <FaLock /> Manter esta nota privada (apenas você pode ver)
                            </>
                        )}
                    </label>
                </div>

                <div className="form-buttons">
                    <Link to="/notes" className="cancel-btn">
                        <FaTimes /> Cancelar
                    </Link>
                    <button type="submit" className="save-btn" disabled={loading}>
                        <FaSave /> {loading ? 'Salvando...' : 'Salvar Nota'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NoteForm; 