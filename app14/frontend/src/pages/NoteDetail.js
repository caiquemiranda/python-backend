import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { notesService } from '../services/api';
import { FaArrowLeft, FaEdit, FaTrash, FaLock, FaGlobe } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Notes.css';

const NoteDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Carrega os detalhes da nota quando o componente é montado
    useEffect(() => {
        const fetchNoteDetails = async () => {
            try {
                setLoading(true);
                const data = await notesService.getNote(id);
                setNote(data);
                setError(null);
            } catch (err) {
                console.error('Erro ao carregar detalhes da nota:', err);
                setError('Não foi possível carregar os detalhes da nota. Tente novamente mais tarde.');
                toast.error('Erro ao carregar detalhes da nota.');
            } finally {
                setLoading(false);
            }
        };

        fetchNoteDetails();
    }, [id]);

    // Função para excluir a nota
    const handleDeleteNote = async () => {
        if (window.confirm('Tem certeza que deseja excluir esta nota?')) {
            try {
                await notesService.deleteNote(id);
                toast.success('Nota excluída com sucesso!');
                navigate('/notes');
            } catch (err) {
                console.error('Erro ao excluir nota:', err);
                toast.error('Erro ao excluir nota. Tente novamente.');
            }
        }
    };

    // Formata a data para exibição
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';

        const date = new Date(dateString);
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Carregando detalhes da nota...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="note-details-container">
                <div className="note-details-header">
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

    if (!note) {
        return (
            <div className="note-details-container">
                <div className="note-details-header">
                    <Link to="/notes" className="back-link">
                        <FaArrowLeft /> Voltar para Notas
                    </Link>
                </div>
                <div className="error-container">
                    <p className="error-message">Nota não encontrada ou sem permissão para visualizar.</p>
                    <button onClick={() => navigate('/notes')} className="retry-btn">
                        Voltar para Minhas Notas
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="note-details-container">
            <div className="note-details-header">
                <Link to="/notes" className="back-link">
                    <FaArrowLeft /> Voltar para Notas
                </Link>
                <div className="note-details-actions">
                    <Link to={`/notes/${id}/edit`} className="btn-primary">
                        <FaEdit /> Editar
                    </Link>
                    <button onClick={handleDeleteNote} className="btn-secondary">
                        <FaTrash /> Excluir
                    </button>
                </div>
            </div>

            <div className="note-details-content">
                <div className="note-details-title-section">
                    <h1 className="note-details-title">{note.title}</h1>
                    <div className="note-details-meta">
                        <div className="note-details-dates">
                            <span>Criado em: {formatDate(note.created_at)}</span>
                            {note.updated_at && (
                                <span>Atualizado em: {formatDate(note.updated_at)}</span>
                            )}
                        </div>
                        {note.is_public ? (
                            <span className="public-badge">
                                <FaGlobe /> Pública
                            </span>
                        ) : (
                            <span className="private-badge">
                                <FaLock /> Privada
                            </span>
                        )}
                    </div>
                </div>
                <div className="note-details-body">
                    {note.content}
                </div>
            </div>
        </div>
    );
};

export default NoteDetail; 