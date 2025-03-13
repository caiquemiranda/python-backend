import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { notesService } from '../services/api';
import { FaPlus, FaEye, FaEdit, FaTrash, FaStickyNote, FaLock, FaGlobe } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Notes.css';

const NotesList = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Carrega as notas quando o componente é montado
    useEffect(() => {
        fetchNotes();
    }, []);

    // Função para buscar as notas do usuário
    const fetchNotes = async () => {
        try {
            setLoading(true);
            const data = await notesService.getAllNotes();
            setNotes(data);
            setError(null);
        } catch (err) {
            console.error('Erro ao carregar notas:', err);
            setError('Não foi possível carregar suas notas. Tente novamente mais tarde.');
            toast.error('Erro ao carregar suas notas.');
        } finally {
            setLoading(false);
        }
    };

    // Função para excluir uma nota
    const handleDeleteNote = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta nota?')) {
            try {
                await notesService.deleteNote(id);
                // Atualiza a lista de notas removendo a nota excluída
                setNotes(notes.filter(note => note.id !== id));
                toast.success('Nota excluída com sucesso!');
            } catch (err) {
                console.error('Erro ao excluir nota:', err);
                toast.error('Erro ao excluir nota. Tente novamente.');
            }
        }
    };

    // Formata a data para exibição
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(date);
    };

    return (
        <div className="notes-container">
            <div className="notes-header">
                <h1>Minhas Notas</h1>
                <Link to="/notes/new" className="add-note-btn">
                    <FaPlus /> Nova Nota
                </Link>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Carregando suas notas...</p>
                </div>
            ) : error ? (
                <div className="error-container">
                    <p className="error-message">{error}</p>
                    <button onClick={fetchNotes} className="retry-btn">Tentar Novamente</button>
                </div>
            ) : notes.length === 0 ? (
                <div className="empty-notes">
                    <FaStickyNote className="empty-icon" />
                    <h2>Você ainda não tem notas</h2>
                    <p>Crie sua primeira nota para começar.</p>
                    <Link to="/notes/new" className="create-first-note-btn">
                        <FaPlus /> Criar Primeira Nota
                    </Link>
                </div>
            ) : (
                <div className="notes-list">
                    {notes.map((note) => (
                        <div key={note.id} className="note-item">
                            <div className="note-item-header">
                                <h3 className="note-item-title">{note.title}</h3>
                                <div className="note-item-visibility">
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

                            <p className="note-item-preview">
                                {note.content.length > 150
                                    ? `${note.content.substring(0, 150)}...`
                                    : note.content}
                            </p>

                            <div className="note-item-footer">
                                <span className="note-item-date">
                                    Criada em: {formatDate(note.created_at)}
                                </span>

                                <div className="note-item-actions">
                                    <Link to={`/notes/${note.id}`} className="view-btn" title="Ver nota">
                                        <FaEye />
                                    </Link>

                                    <Link to={`/notes/${note.id}/edit`} className="edit-btn" title="Editar nota">
                                        <FaEdit />
                                    </Link>

                                    <button
                                        onClick={() => handleDeleteNote(note.id)}
                                        className="delete-btn"
                                        title="Excluir nota"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotesList; 