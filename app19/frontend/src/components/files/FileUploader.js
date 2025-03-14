/**
 * Componente FileUploader - Interface para upload de arquivos.
 * 
 * Este componente permite arrastar e soltar arquivos ou selecioná-los
 * através do botão, e envia-os para o servidor através da API.
 */
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { fileService } from '../../services/api';
import './FileUploader.css';

// Esquema de validação para o formulário
const FileUploadSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, 'Título muito curto')
        .max(255, 'Título muito longo')
        .required('Título é obrigatório'),
    description: Yup.string()
        .max(1000, 'Descrição muito longa'),
    file_type: Yup.string()
        .oneOf(['image', 'document', 'other'], 'Tipo de arquivo inválido')
        .required('Tipo de arquivo é obrigatório')
});

const FileUploader = ({ onUploadSuccess }) => {
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [preview, setPreview] = useState(null);
    const [success, setSuccess] = useState(false);

    // Função para lidar com o arquivo selecionado via react-dropzone
    const onDrop = useCallback((acceptedFiles) => {
        // Pega apenas o primeiro arquivo
        const selectedFile = acceptedFiles[0];
        if (selectedFile) {
            setFile(selectedFile);
            setError(null);
            setSuccess(false);

            // Cria URL para preview do arquivo
            const previewURL = URL.createObjectURL(selectedFile);
            setPreview(previewURL);

            // Determina o tipo de arquivo automaticamente
            if (selectedFile.type.startsWith('image/')) {
                // É uma imagem
                document.getElementById('file_type').value = 'image';
            } else if (
                selectedFile.type.startsWith('application/pdf') ||
                selectedFile.type.startsWith('application/msword') ||
                selectedFile.type.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document') ||
                selectedFile.type.startsWith('text/')
            ) {
                // É um documento
                document.getElementById('file_type').value = 'document';
            } else {
                // Outro tipo
                document.getElementById('file_type').value = 'other';
            }
        }
    }, []);

    // Configuração do dropzone
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': [],
            'application/pdf': [],
            'application/msword': [],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [],
            'text/plain': []
        },
        multiple: false
    });

    // Função para enviar o arquivo para o servidor
    const handleSubmit = async (values, { resetForm }) => {
        if (!file) {
            setError('Por favor, selecione um arquivo para upload');
            return;
        }

        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Cria um objeto FormData para enviar o arquivo
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('file_type', values.file_type);
            formData.append('file', file);

            // Envia o arquivo para o servidor
            const response = await fileService.uploadFile(formData);

            // Limpa o formulário e remove o arquivo selecionado
            resetForm();
            setFile(null);
            setPreview(null);
            setSuccess(true);

            // Notifica o componente pai sobre o upload bem-sucedido
            if (onUploadSuccess) {
                onUploadSuccess(response.data);
            }

            // Remove a mensagem de sucesso após 5 segundos
            setTimeout(() => {
                setSuccess(false);
            }, 5000);
        } catch (err) {
            console.error('Erro ao fazer upload:', err);
            setError(err.response?.data?.detail || 'Erro ao fazer upload do arquivo. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="file-uploader">
            <h2>Upload de Arquivo</h2>

            {error && (
                <div className="alert alert-danger">
                    <i className="fas fa-exclamation-circle"></i> {error}
                </div>
            )}

            {success && (
                <div className="alert alert-success">
                    <i className="fas fa-check-circle"></i> Arquivo enviado com sucesso!
                </div>
            )}

            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    file_type: 'other'
                }}
                validationSchema={FileUploadSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form>
                        <div className="dropzone-container">
                            <div
                                {...getRootProps()}
                                className={`dropzone ${isDragActive ? 'active' : ''} ${file ? 'has-file' : ''}`}
                            >
                                <input {...getInputProps()} />

                                {file ? (
                                    <div className="file-preview">
                                        {file.type.startsWith('image/') ? (
                                            <div className="image-preview">
                                                <img src={preview} alt="Preview" />
                                            </div>
                                        ) : (
                                            <div className="document-preview">
                                                <i className={
                                                    file.type.includes('pdf')
                                                        ? 'fas fa-file-pdf'
                                                        : file.type.includes('word')
                                                            ? 'fas fa-file-word'
                                                            : 'fas fa-file-alt'
                                                }></i>
                                                <span>{file.name}</span>
                                            </div>
                                        )}
                                        <p>
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setFile(null);
                                                    setPreview(null);
                                                }}
                                            >
                                                <i className="fas fa-times"></i> Remover
                                            </button>
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <i className="fas fa-cloud-upload-alt"></i>
                                        <p>Arraste e solte um arquivo aqui, ou clique para selecionar</p>
                                        <p className="small">Arquivos suportados: imagens, PDFs e documentos</p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Título*</label>
                            <Field
                                type="text"
                                name="title"
                                id="title"
                                className="form-control"
                                placeholder="Insira um título para o arquivo"
                            />
                            <ErrorMessage name="title" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Descrição</label>
                            <Field
                                as="textarea"
                                name="description"
                                id="description"
                                className="form-control"
                                placeholder="Insira uma descrição (opcional)"
                                rows="3"
                            />
                            <ErrorMessage name="description" component="div" className="error-message" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="file_type">Tipo de Arquivo*</label>
                            <Field
                                as="select"
                                name="file_type"
                                id="file_type"
                                className="form-control"
                            >
                                <option value="image">Imagem</option>
                                <option value="document">Documento</option>
                                <option value="other">Outro</option>
                            </Field>
                            <ErrorMessage name="file_type" component="div" className="error-message" />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            disabled={isSubmitting || isLoading || !file}
                        >
                            {isLoading ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i> Enviando...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-upload"></i> Enviar Arquivo
                                </>
                            )}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FileUploader; 