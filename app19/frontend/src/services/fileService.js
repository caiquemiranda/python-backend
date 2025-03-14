/**
 * Serviço para gerenciamento de arquivos
 * Contém métodos para interagir com a API de arquivos
 */
import api from './api';

/**
 * Classe de serviço para operações com arquivos
 */
const FileService = {
    /**
     * Obtém a lista de todos os arquivos
     * @param {Object} params - Parâmetros de filtro e paginação
     * @returns {Promise} Promise com resultado da requisição
     */
    getFiles: async (params = {}) => {
        try {
            const response = await api.get('/api/files/', { params });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar arquivos:', error);
            throw error;
        }
    },

    /**
     * Obtém arquivos filtrados por tipo
     * @param {string} type - Tipo de arquivo (image, document, other)
     * @returns {Promise} Promise com resultado da requisição
     */
    getFilesByType: async (type) => {
        try {
            const response = await api.get(`/api/files/filter_by_type/`, {
                params: { type }
            });
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar arquivos do tipo ${type}:`, error);
            throw error;
        }
    },

    /**
     * Obtém somente imagens
     * @returns {Promise} Promise com resultado da requisição
     */
    getImages: async () => {
        try {
            const response = await api.get('/api/files/images/');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar imagens:', error);
            throw error;
        }
    },

    /**
     * Obtém somente documentos
     * @returns {Promise} Promise com resultado da requisição
     */
    getDocuments: async () => {
        try {
            const response = await api.get('/api/files/documents/');
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar documentos:', error);
            throw error;
        }
    },

    /**
     * Obtém um arquivo específico pelo ID
     * @param {number} id - ID do arquivo
     * @returns {Promise} Promise com resultado da requisição
     */
    getFile: async (id) => {
        try {
            const response = await api.get(`/api/files/${id}/`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao buscar arquivo com ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * Faz upload de um novo arquivo
     * @param {FormData} formData - Dados do formulário contendo o arquivo
     * @returns {Promise} Promise com resultado da requisição
     */
    uploadFile: async (formData) => {
        try {
            const response = await api.post('/api/files/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao fazer upload do arquivo:', error);
            throw error;
        }
    },

    /**
     * Atualiza um arquivo existente
     * @param {number} id - ID do arquivo
     * @param {FormData} formData - Dados do formulário contendo o arquivo
     * @returns {Promise} Promise com resultado da requisição
     */
    updateFile: async (id, formData) => {
        try {
            const response = await api.put(`/api/files/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Erro ao atualizar arquivo com ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * Atualiza parcialmente um arquivo existente
     * @param {number} id - ID do arquivo
     * @param {Object} data - Dados para atualização parcial
     * @returns {Promise} Promise com resultado da requisição
     */
    patchFile: async (id, data) => {
        try {
            const response = await api.patch(`/api/files/${id}/`, data);
            return response.data;
        } catch (error) {
            console.error(`Erro ao atualizar parcialmente arquivo com ID ${id}:`, error);
            throw error;
        }
    },

    /**
     * Exclui um arquivo
     * @param {number} id - ID do arquivo
     * @returns {Promise} Promise com resultado da requisição
     */
    deleteFile: async (id) => {
        try {
            const response = await api.delete(`/api/files/${id}/`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao excluir arquivo com ID ${id}:`, error);
            throw error;
        }
    }
};

export default FileService; 