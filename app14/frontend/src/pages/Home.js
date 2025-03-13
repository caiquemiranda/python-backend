import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { notesService } from '../services/api';
import { FaPlus, FaStickyNote, FaLock, FaUserPlus } from 'react-icons/fa';
import './Home.css';

const Home = () => {
    const { isAuthenticated, user } = useAuth();
    const [publicNotes, setPublicNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Carrega as notas públicas quando o componente é montado
    useEffect(() => {
        const fetchPublicNotes = async () => {
            try {
                setLoading(true);
                const data = await notesService.getPublicNotes();
                setPublicNotes(data);
                setError(null);
            } catch (err) {
                console.error('Erro ao carregar notas públicas:', err);
                setError('Não foi possível carregar as notas públicas. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchPublicNotes();
    }, []);

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
        <div className="home-container">
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Bem-vindo ao App de Notas</h1>
                    <p>Um lugar simples e seguro para armazenar e compartilhar suas anotações.</p>

                    {isAuthenticated ? (
                        <div className="hero-actions">
                            <Link to="/notes" className="btn-primary">
                                <FaStickyNote /> Ver Minhas Notas
                            </Link>
                            <Link to="/notes/new" className="btn-secondary">
                                <FaPlus /> Criar Nova Nota
                            </Link>
                        </div>
                    ) : (
                        <div className="hero-actions">
                            <Link to="/login" className="btn-primary">
                                <FaLock /> Entrar
                            </Link>
                            <Link to="/register" className="btn-secondary">
                                <FaUserPlus /> Registrar
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <section className="public-notes-section">
                <div className="section-header">
                    <h2>Notas Públicas Recentes</h2>
                    {isAuthenticated && (
                        <Link to="/notes/new" className="btn-outline">
                            <FaPlus /> Criar Nota
                        </Link>
                    )}
                </div>

                {loading ? (
                    <div className="loading-message">Carregando notas públicas...</div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : publicNotes.length === 0 ? (
                    <div className="empty-message">
                        <FaStickyNote className="empty-icon" />
                        <p>Nenhuma nota pública disponível no momento.</p>
                        {isAuthenticated && (
                            <p>
                                Seja o primeiro a compartilhar uma nota pública. <Link to="/notes/new">Criar agora</Link>
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="notes-grid">
                        {publicNotes.map((note) => (
                            <div key={note.id} className="note-card">
                                <div className="note-content">
                                    <h3 className="note-title">{note.title}</h3>
                                    <p className="note-preview">
                                        {note.content.length > 120
                                            ? `${note.content.substring(0, 120)}...`
                                            : note.content}
                                    </p>
                                </div>
                                <div className="note-footer">
                                    <span className="note-author">Por: {note.owner_username}</span>
                                    <span className="note-date">{formatDate(note.created_at)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="features-section">
                <h2>Recursos do App de Notas</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📝</div>
                        <h3>Crie Notas</h3>
                        <p>Crie e edite suas anotações de forma rápida e intuitiva.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🔒</div>
                        <h3>Privacidade</h3>
                        <p>Mantenha suas notas privadas ou compartilhe-as publicamente.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">📱</div>
                        <h3>Acesso Fácil</h3>
                        <p>Acesse suas notas de qualquer dispositivo com conexão à internet.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🔄</div>
                        <h3>Sincronização</h3>
                        <p>Suas notas são automaticamente sincronizadas na nuvem.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home; 