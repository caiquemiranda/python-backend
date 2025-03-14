/**
 * Componente para upload de arquivos
 * Permite aos usuários fazer upload de imagens e documentos
 * com visualização prévia e validação
 */
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaImage, FaFile, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import fileService from '../../services/fileService';
import './FileUpload.css';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'image', // padrão para imagem
        tags: ''
    });
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    // Manipula a seleção de arquivo
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        // Validação de tamanho (10MB máximo)
        if (selectedFile.size > 10 * 1024 * 1024) {
            toast.error('O arquivo é muito grande. O tamanho máximo é 10MB.');
            return;
        }

        setFile(selectedFile);

        // Determina o tipo de arquivo
        const fileType = selectedFile.type.startsWith('image/')
            ? 'image'
            : selectedFile.type.includes('pdf')
                ? 'document'
                : 'other';

        setFormData(prev => ({ ...prev, type: fileType }));

        // Cria uma prévia para imagens
        if (fileType === 'image') {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            // Para documentos, mostra apenas o nome
            setPreview(null);
        }
    };

    // Manipula mudanças nos campos do formulário
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Remove o arquivo selecionado
    const handleRemoveFile = () => {
        setFile(null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Envia o arquivo para o servidor
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            toast.error('Por favor, selecione um arquivo para upload.');
            return;
        }

        if (!formData.title.trim()) {
            toast.error('Por favor, forneça um título para o arquivo.');
            return;
        }

        try {
            setLoading(true);

            // Prepara os dados para envio
            const uploadData = new FormData();
            uploadData.append('file', file);
            uploadData.append('title', formData.title);
            uploadData.append('description', formData.description);
            uploadData.append('file_type', formData.type);

            if (formData.tags.trim()) {
                // Converte tags em formato adequado para o backend
                const tagsArray = formData.tags
                    .split(',')
                    .map(tag => tag.trim())
                    .filter(tag => tag);

                uploadData.append('tags', JSON.stringify(tagsArray));
            }

            // Envia para o servidor
            const response = await fileService.uploadFile(uploadData);

            toast.success('Arquivo enviado com sucesso!');

            // Redireciona para a página de detalhes do arquivo
            navigate(`/files/${response.data.id}`);
        } catch (error) {
            console.error('Erro ao fazer upload:', error);
            toast.error(error.response?.data?.message || 'Erro ao fazer upload do arquivo.');
        } finally {
            setLoading(false);
        }
    };

    // Renderiza a prévia do arquivo
    const renderPreview = () => {
        if (!file) return null;

        if (preview) {
            return (
                <div className="file-preview">
                    <img src={preview} alt="Preview" className="preview-image" />
                </div>
            );
        }

        return (
            <div className="file-preview file-icon">
                {formData.type === 'document' ? (
                    <FaFile size={48} />
                ) : (
                    <FaFile size={48} />
                )}
                <p>{file.name}</p>
                <p className="file-size">{formatFileSize(file.size)}</p>
            </div>
        );
    };

    // Formata o tamanho do arquivo para exibição
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="file-upload">
            <h2>Upload de Arquivo</h2>

            <form onSubmit={handleSubmit} className="upload-form">
                <div className="form-grid">
                    <div className="form-left">
                        <div className="form-group">
                            <label htmlFor="title">Título *</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Digite um título para o arquivo"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Descrição</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Descreva o arquivo (opcional)"
                                rows={4}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="type">Tipo de Arquivo</label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleInputChange}
                            >
                                <option value="image">Imagem</option>
                                <option value="document">Documento</option>
                                <option value="other">Outro</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="tags">Tags</label>
                            <input
                                type="text"
                                id="tags"
                                name="tags"
                                value={formData.tags}
                                onChange={handleInputChange}
                                placeholder="Separe as tags por vírgulas"
                            />
                            <small>Ex: trabalho, projeto, importante</small>
                        </div>
                    </div>

                    <div className="form-right">
                        <div className="file-drop-area">
                            {file ? (
                                <>
                                    {renderPreview()}
                                    <button
                                        type="button"
                                        className="remove-file-btn"
                                        onClick={handleRemoveFile}
                                    >
                                        <FaTimes />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="file-message">
                                        <FaUpload size={32} />
                                        <p>Arraste e solte um arquivo aqui ou clique para selecionar</p>
                                        <p className="file-types">
                                            <FaImage /> Imagens (JPG, PNG, GIF) &nbsp;
                                            <FaFile /> Documentos (PDF, DOC)
                                        </p>
                                        <p className="file-limit">Tamanho máximo: 10MB</p>
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="file-input"
                                        accept="image/*,.pdf,.doc,.docx"
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/files')}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading || !file}
                    >
                        {loading ? 'Enviando...' : 'Enviar Arquivo'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FileUpload; 