/**
 * Serviço para gerenciar operações relacionadas a arquivos
 * Fornece métodos para listar, buscar, fazer upload, atualizar e excluir arquivos
 */
import axios from 'axios';
import { getAuthHeader } from './authService';

// URL base da API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

/**
 * Serviço para gerenciar operações de arquivos
 */
const fileService = {
    /**
     * Obtém a lista de todos os arquivos
     * @param {Object} params - Parâmetros de consulta (filtros, ordenação, etc.)
     * @returns {Promise} - Promise com a resposta da API
     */
    getFiles: async (params = {}) => {
        try {
            const response = await axios.get(`${API_URL}/files/`, {
                headers: getAuthHeader(),
                params
            });
            return response;
        } catch (error) {
            console.error('Erro ao buscar arquivos:', error);
            throw error;
        }
    },

    /**
     * Obtém detalhes de um arquivo específico
     * @param {string|number} id - ID do arquivo
     * @returns {Promise} - Promise com a resposta da API
     */
    getFileById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/files/${id}/`, {
                headers: getAuthHeader()
            });
            return response;
        } catch (error) {
            console.error(`Erro ao buscar arquivo ${id}:`, error);
            throw error;
        }
    },

    /**
     * Faz upload de um novo arquivo
     * @param {FormData} formData - Dados do arquivo e metadados
     * @returns {Promise} - Promise com a resposta da API
     */
    uploadFile: async (formData) => {
        try {
            const response = await axios.post(`${API_URL}/files/`, formData, {
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response;
        } catch (error) {
            console.error('Erro ao fazer upload do arquivo:', error);
            throw error;
        }
    },

    /**
     * Atualiza os metadados de um arquivo existente
     * @param {string|number} id - ID do arquivo
     * @param {Object} data - Dados atualizados
     * @returns {Promise} - Promise com a resposta da API
     */
    updateFile: async (id, data) => {
        try {
            const response = await axios.patch(`${API_URL}/files/${id}/`, data, {
                headers: getAuthHeader()
            });
            return response;
        } catch (error) {
            console.error(`Erro ao atualizar arquivo ${id}:`, error);
            throw error;
        }
    },

    /**
     * Exclui um arquivo
     * @param {string|number} id - ID do arquivo
     * @returns {Promise} - Promise com a resposta da API
     */
    deleteFile: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/files/${id}/`, {
                headers: getAuthHeader()
            });
            return response;
        } catch (error) {
            console.error(`Erro ao excluir arquivo ${id}:`, error);
            throw error;
        }
    },

    /**
     * Obtém a URL para download de um arquivo
     * @param {string|number} id - ID do arquivo
     * @returns {string} - URL para download
     */
    getDownloadUrl: (id) => {
        return `${API_URL}/files/${id}/download/`;
    },

    /**
     * Busca arquivos por termo de pesquisa
     * @param {string} searchTerm - Termo de pesquisa
     * @returns {Promise} - Promise com a resposta da API
     */
    searchFiles: async (searchTerm) => {
        try {
            const response = await axios.get(`${API_URL}/files/search/`, {
                headers: getAuthHeader(),
                params: { q: searchTerm }
            });
            return response;
        } catch (error) {
            console.error('Erro ao pesquisar arquivos:', error);
            throw error;
        }
    },

    /**
     * Obtém arquivos por tipo
     * @param {string} fileType - Tipo de arquivo (image, document, etc.)
     * @returns {Promise} - Promise com a resposta da API
     */
    getFilesByType: async (fileType) => {
        try {
            const response = await axios.get(`${API_URL}/files/`, {
                headers: getAuthHeader(),
                params: { file_type: fileType }
            });
            return response;
        } catch (error) {
            console.error(`Erro ao buscar arquivos do tipo ${fileType}:`, error);
            throw error;
        }
    },

    /**
     * Obtém estatísticas de arquivos (contagem por tipo, tamanho total, etc.)
     * @returns {Promise} - Promise com a resposta da API
     */
    getFileStats: async () => {
        try {
            const response = await axios.get(`${API_URL}/files/stats/`, {
                headers: getAuthHeader()
            });
            return response;
        } catch (error) {
            console.error('Erro ao buscar estatísticas de arquivos:', error);
            throw error;
        }
    }
};

export default fileService; 