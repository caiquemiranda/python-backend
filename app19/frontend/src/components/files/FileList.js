/**
 * Componente FileList - Lista de arquivos.
 * 
 * Este componente exibe uma lista de arquivos com opções para visualizar,
 * editar e excluir cada arquivo.
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fileService } from '../../services/api';
import './FileList.css';

const FileList = ({ files, onDelete, onRefresh, filterType }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fileList, setFileList] = useState(files || []);

    // Carrega os arquivos quando o componente é montado ou quando filterType muda
    useEffect(() => {
        if (!files) {
            fetchFiles();
        } else {
            setFileList(files);
        }
    }, [files, filterType]);

    // Função para buscar arquivos da API
    const fetchFiles = async () => {
        setLoading(true);
        setError(null);

        try {
            let response;

            if (filterType === 'image') {
                response = await fileService.getImages();
            } else if (filterType === 'document') {
                response = await fileService.getDocuments();
            } else if (filterType) {
                response = await fileService.filterByType(filterType);
            } else {
                response = await fileService.getAllFiles();
            }

            setFileList(response.data.results || response.data);
        } catch (err) {
            console.error('Erro ao buscar arquivos:', err);
            setError('Não foi possível carregar os arquivos. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    // Função para excluir um arquivo
    const handleDelete = async (id, title) => {
        if (window.confirm(`Tem certeza que deseja excluir o arquivo "${title}"?`)) {
            try {
                await fileService.deleteFile(id);

                // Atualiza a lista de arquivos
                setFileList(fileList.filter(file => file.id !== id));

                // Notifica o componente pai
                if (onDelete) {
                    onDelete(id);
                }
            } catch (err) {
                console.error('Erro ao excluir arquivo:', err);
                alert('Erro ao excluir o arquivo. Tente novamente.');
            }
        }
    };

    // Função para formatar a data
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Renderiza um ícone com base no tipo de arquivo
    const renderFileIcon = (file) => {
        if (file.is_image) {
            return <i className="fas fa-image"></i>;
        } else if (file.is_document) {
            if (file.content_type.includes('pdf')) {
                return <i className="fas fa-file-pdf"></i>;
            } else if (file.content_type.includes('word')) {
                return <i className="fas fa-file-word"></i>;
            } else {
                return <i className="fas fa-file-alt"></i>;
            }
        } else {
            return <i className="fas fa-file"></i>;
        }
    };

    if (loading) {
        return (
            <div className="file-list-loading">
                <i className="fas fa-spinner fa-spin"></i>
                <p>Carregando arquivos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger">
                <i className="fas fa-exclamation-circle"></i> {error}
                <button
                    className="btn btn-primary btn-sm ml-3"
                    onClick={fetchFiles}
                >
                    Tentar novamente
                </button>
            </div>
        );
    }

    if (fileList.length === 0) {
        return (
            <div className="file-list-empty">
                <i className="fas fa-folder-open"></i>
                <p>Nenhum arquivo encontrado.</p>
                {onRefresh && (
                    <button
                        className="btn btn-primary"
                        onClick={onRefresh}
                    >
                        Fazer Upload
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="file-list">
            <div className="file-list-header">
                <h3>
                    {filterType === 'image'
                        ? 'Imagens'
                        : filterType === 'document'
                            ? 'Documentos'
                            : 'Todos os Arquivos'}
                </h3>
                {onRefresh && (
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={onRefresh}
                    >
                        <i className="fas fa-sync-alt"></i> Atualizar
                    </button>
                )}
            </div>

            <div className="file-grid">
                {fileList.map(file => (
                    <div key={file.id} className="file-card">
                        <div className="file-card-header">
                            <div className="file-icon">
                                {renderFileIcon(file)}
                            </div>
                            <div className="file-type-badge">
                                {file.file_type === 'image'
                                    ? 'Imagem'
                                    : file.file_type === 'document'
                                        ? 'Documento'
                                        : 'Outro'}
                            </div>
                        </div>

                        <div className="file-card-body">
                            <h4 className="file-title">{file.title}</h4>
                            {file.description && (
                                <p className="file-description">{file.description}</p>
                            )}
                            <p className="file-meta">
                                <span className="file-size">{file.file_size_display}</span>
                                <span className="file-date">{formatDate(file.uploaded_at)}</span>
                            </p>
                        </div>

                        <div className="file-card-footer">
                            <Link
                                to={`/files/${file.id}`}
                                className="btn btn-info btn-sm"
                                title="Ver detalhes"
                            >
                                <i className="fas fa-eye"></i>
                            </Link>
                            <a
                                href={file.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary btn-sm"
                                title="Baixar arquivo"
                            >
                                <i className="fas fa-download"></i>
                            </a>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(file.id, file.title)}
                                title="Excluir arquivo"
                            >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FileList; 