/**
 * Componente FileDetail - Exibe detalhes de um arquivo.
 * 
 * Este componente mostra informações detalhadas sobre um arquivo,
 * incluindo uma prévia do conteúdo quando possível.
 */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { fileService } from '../../services/api';
import './FileDetail.css';

// Configuração necessária para o react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FileDetail = ({ fileId }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const navigate = useNavigate();

    // Carrega os detalhes do arquivo quando o componente é montado
    useEffect(() => {
        fetchFileDetails();
    }, [fileId]);

    // Função para buscar os detalhes do arquivo
    const fetchFileDetails = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fileService.getFile(fileId);
            setFile(response.data);
        } catch (err) {
            console.error('Erro ao buscar detalhes do arquivo:', err);
            setError('Não foi possível carregar os detalhes do arquivo. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    // Função para excluir o arquivo
    const handleDelete = async () => {
        if (window.confirm(`Tem certeza que deseja excluir o arquivo "${file.title}"?`)) {
            try {
                await fileService.deleteFile(fileId);
                navigate('/files');
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

    // Função para lidar com o carregamento do PDF
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    // Renderiza o conteúdo do arquivo com base no tipo
    const renderFileContent = () => {
        if (!file) return null;

        if (file.is_image) {
            return (
                <div className="file-preview image-preview">
                    <img src={file.file_url} alt={file.title} />
                </div>
            );
        } else if (file.is_document && file.content_type === 'application/pdf') {
            return (
                <div className="file-preview pdf-preview">
                    <Document
                        file={file.file_url}
                        onLoadSuccess={onDocumentLoadSuccess}
                        onLoadError={(error) => console.error('Erro ao carregar PDF:', error)}
                        loading={<div className="pdf-loading">Carregando PDF...</div>}
                    >
                        <Page pageNumber={1} scale={1.2} />
                    </Document>
                    {numPages && <p className="pdf-page-info">Página 1 de {numPages}</p>}
                </div>
            );
        } else {
            return (
                <div className="file-preview generic-preview">
                    <i className={
                        file.content_type.includes('pdf')
                            ? 'fas fa-file-pdf'
                            : file.content_type.includes('word')
                                ? 'fas fa-file-word'
                                : 'fas fa-file-alt'
                    }></i>
                    <p>Prévia não disponível para este tipo de arquivo.</p>
                    <a
                        href={file.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                    >
                        <i className="fas fa-download"></i> Baixar Arquivo
                    </a>
                </div>
            );
        }
    };

    if (loading) {
        return (
            <div className="file-detail-loading">
                <i className="fas fa-spinner fa-spin"></i>
                <p>Carregando detalhes do arquivo...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger">
                <i className="fas fa-exclamation-circle"></i> {error}
                <button
                    className="btn btn-primary btn-sm ml-3"
                    onClick={fetchFileDetails}
                >
                    Tentar novamente
                </button>
            </div>
        );
    }

    if (!file) {
        return (
            <div className="file-detail-not-found">
                <i className="fas fa-exclamation-triangle"></i>
                <p>Arquivo não encontrado.</p>
                <Link to="/files" className="btn btn-primary">
                    Voltar para a lista de arquivos
                </Link>
            </div>
        );
    }

    return (
        <div className="file-detail">
            <div className="file-detail-header">
                <div className="file-detail-title">
                    <h2>{file.title}</h2>
                    <div className="file-type-badge">
                        {file.file_type === 'image'
                            ? 'Imagem'
                            : file.file_type === 'document'
                                ? 'Documento'
                                : 'Outro'}
                    </div>
                </div>

                <div className="file-detail-actions">
                    <Link to="/files" className="btn btn-secondary">
                        <i className="fas fa-arrow-left"></i> Voltar
                    </Link>
                    <a
                        href={file.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        download
                    >
                        <i className="fas fa-download"></i> Baixar
                    </a>
                    <button
                        className="btn btn-danger"
                        onClick={handleDelete}
                    >
                        <i className="fas fa-trash-alt"></i> Excluir
                    </button>
                </div>
            </div>

            <div className="file-detail-content">
                <div className="file-detail-preview">
                    {renderFileContent()}
                </div>

                <div className="file-detail-info">
                    <div className="card">
                        <h3>Informações do Arquivo</h3>

                        {file.description && (
                            <div className="info-group">
                                <h4>Descrição</h4>
                                <p>{file.description}</p>
                            </div>
                        )}

                        <div className="info-group">
                            <h4>Detalhes Técnicos</h4>
                            <ul className="info-list">
                                <li>
                                    <span className="info-label">Tamanho:</span>
                                    <span className="info-value">{file.file_size_display}</span>
                                </li>
                                <li>
                                    <span className="info-label">Tipo de Conteúdo:</span>
                                    <span className="info-value">{file.content_type}</span>
                                </li>
                                <li>
                                    <span className="info-label">Data de Upload:</span>
                                    <span className="info-value">{formatDate(file.uploaded_at)}</span>
                                </li>
                                <li>
                                    <span className="info-label">Última Atualização:</span>
                                    <span className="info-value">{formatDate(file.updated_at)}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileDetail; 