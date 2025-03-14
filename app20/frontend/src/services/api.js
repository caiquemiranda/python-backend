/**
 * Configuração e utilitários para chamadas à API.
 * Este arquivo configura o Axios para comunicação com o backend
 * e gerencia os tokens de autenticação.
 */
import axios from 'axios';

// URL base da API - pode ser configurada através de variáveis de ambiente
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

/**
 * Instância do Axios configurada para se comunicar com nossa API
 */
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Interceptor para adicionar o token de autenticação às requisições,
 * se o usuário estiver autenticado
 */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * Interceptor para lidar com respostas
 * Isso inclui a renovação de token quando necessário
 * e o tratamento de erros comuns
 */
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Se o erro for 401 (não autorizado) e não for uma tentativa de refresh
        if (error.response.status === 401 && !originalRequest._retry && originalRequest.url !== '/users/token/refresh/') {
            originalRequest._retry = true;

            try {
                // Tenta renovar o token
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('Sem refresh token');
                }

                const response = await axios.post(`${API_URL}/users/token/refresh/`, {
                    refresh: refreshToken,
                });

                const { access } = response.data;

                // Atualiza o token no localStorage
                localStorage.setItem('token', access);

                // Atualiza o cabeçalho de autorização da requisição original
                originalRequest.headers.Authorization = `Bearer ${access}`;

                // Refaz a requisição original
                return api(originalRequest);
            } catch (refreshError) {
                // Se não conseguir renovar o token, faz logout
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');

                // Redireciona para a página de login
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

/**
 * Funções de autenticação
 */
export const authService = {
    /**
     * Faz login do usuário
     * @param {Object} credentials - Credenciais de login (username e password)
     * @returns {Promise} Promessa com os dados do usuário e tokens
     */
    login: async (credentials) => {
        try {
            const response = await api.post('/users/token/', credentials);
            const { access, refresh, user } = response.data;

            // Salva tokens e informações do usuário
            localStorage.setItem('token', access);
            localStorage.setItem('refreshToken', refresh);
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Registra um novo usuário
     * @param {Object} userData - Dados do usuário a ser registrado
     * @returns {Promise} Promessa com a resposta da API
     */
    register: (userData) => {
        return api.post('/users/register/', userData);
    },

    /**
     * Faz logout do usuário
     */
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    },

    /**
     * Verifica se o usuário está autenticado
     * @returns {Boolean} Verdadeiro se o usuário estiver autenticado
     */
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    /**
     * Obtém o usuário atual
     * @returns {Object|null} Dados do usuário ou null se não estiver autenticado
     */
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    /**
     * Atualiza o perfil do usuário
     * @param {Object} userData - Novos dados do usuário
     * @returns {Promise} Promessa com a resposta da API
     */
    updateProfile: (userData) => {
        return api.put('/users/update-profile/', userData);
    },

    /**
     * Altera a senha do usuário
     * @param {Object} passwordData - Objeto com senhas antiga e nova
     * @returns {Promise} Promessa com a resposta da API
     */
    changePassword: (passwordData) => {
        return api.post('/users/change-password/', passwordData);
    },
};

/**
 * Serviço para gerenciamento de projetos
 */
export const projectService = {
    /**
     * Lista todos os projetos acessíveis ao usuário
     * @param {Object} filters - Filtros opcionais
     * @returns {Promise} Promessa com a lista de projetos
     */
    getProjects: (filters = {}) => {
        return api.get('/projects/', { params: filters });
    },

    /**
     * Obtém projetos do usuário atual
     * @param {Object} filters - Filtros opcionais
     * @returns {Promise} Promessa com a lista de projetos
     */
    getMyProjects: (filters = {}) => {
        return api.get('/projects/my-projects/', { params: filters });
    },

    /**
     * Obtém um projeto pelo ID
     * @param {Number} id - ID do projeto
     * @returns {Promise} Promessa com os dados do projeto
     */
    getProject: (id) => {
        return api.get(`/projects/${id}/`);
    },

    /**
     * Cria um novo projeto
     * @param {Object} projectData - Dados do novo projeto
     * @returns {Promise} Promessa com a resposta da API
     */
    createProject: (projectData) => {
        return api.post('/projects/', projectData);
    },

    /**
     * Atualiza um projeto existente
     * @param {Number} id - ID do projeto
     * @param {Object} projectData - Novos dados do projeto
     * @returns {Promise} Promessa com a resposta da API
     */
    updateProject: (id, projectData) => {
        return api.put(`/projects/${id}/`, projectData);
    },

    /**
     * Exclui um projeto
     * @param {Number} id - ID do projeto
     * @returns {Promise} Promessa com a resposta da API
     */
    deleteProject: (id) => {
        return api.delete(`/projects/${id}/`);
    },

    /**
     * Lista os membros de um projeto
     * @param {Number} projectId - ID do projeto
     * @returns {Promise} Promessa com a lista de membros
     */
    getProjectMembers: (projectId) => {
        return api.get(`/projects/${projectId}/members/`);
    },

    /**
     * Adiciona um membro a um projeto
     * @param {Number} projectId - ID do projeto
     * @param {Object} memberData - Dados do novo membro
     * @returns {Promise} Promessa com a resposta da API
     */
    addProjectMember: (projectId, memberData) => {
        return api.post(`/projects/${projectId}/members/`, memberData);
    },

    /**
     * Remove um membro de um projeto
     * @param {Number} projectId - ID do projeto
     * @param {Number} userId - ID do usuário a ser removido
     * @returns {Promise} Promessa com a resposta da API
     */
    removeProjectMember: (projectId, userId) => {
        return api.delete(`/projects/${projectId}/members/`, {
            data: { user_id: userId }
        });
    },

    /**
     * Lista as categorias de projetos
     * @returns {Promise} Promessa com a lista de categorias
     */
    getCategories: () => {
        return api.get('/projects/categories/');
    },
};

/**
 * Serviço para gerenciamento de tarefas
 */
export const taskService = {
    /**
     * Lista todas as tarefas acessíveis ao usuário
     * @param {Object} filters - Filtros opcionais
     * @returns {Promise} Promessa com a lista de tarefas
     */
    getTasks: (filters = {}) => {
        return api.get('/tasks/tasks/', { params: filters });
    },

    /**
     * Obtém tarefas do usuário atual
     * @param {Object} filters - Filtros opcionais
     * @returns {Promise} Promessa com a lista de tarefas
     */
    getMyTasks: (filters = {}) => {
        return api.get('/tasks/tasks/my-tasks/', { params: filters });
    },

    /**
     * Obtém tarefas de um projeto específico
     * @param {Number} projectId - ID do projeto
     * @param {Object} filters - Filtros opcionais
     * @returns {Promise} Promessa com a lista de tarefas
     */
    getProjectTasks: (projectId, filters = {}) => {
        return api.get('/tasks/tasks/by-project/', {
            params: {
                project_id: projectId,
                ...filters
            }
        });
    },

    /**
     * Obtém uma tarefa pelo ID
     * @param {Number} id - ID da tarefa
     * @returns {Promise} Promessa com os dados da tarefa
     */
    getTask: (id) => {
        return api.get(`/tasks/tasks/${id}/`);
    },

    /**
     * Cria uma nova tarefa
     * @param {Object} taskData - Dados da nova tarefa
     * @returns {Promise} Promessa com a resposta da API
     */
    createTask: (taskData) => {
        return api.post('/tasks/tasks/', taskData);
    },

    /**
     * Atualiza uma tarefa existente
     * @param {Number} id - ID da tarefa
     * @param {Object} taskData - Novos dados da tarefa
     * @returns {Promise} Promessa com a resposta da API
     */
    updateTask: (id, taskData) => {
        return api.put(`/tasks/tasks/${id}/`, taskData);
    },

    /**
     * Exclui uma tarefa
     * @param {Number} id - ID da tarefa
     * @returns {Promise} Promessa com a resposta da API
     */
    deleteTask: (id) => {
        return api.delete(`/tasks/tasks/${id}/`);
    },

    /**
     * Altera o status de uma tarefa
     * @param {Number} id - ID da tarefa
     * @param {String} status - Novo status
     * @returns {Promise} Promessa com a resposta da API
     */
    changeTaskStatus: (id, status) => {
        return api.post(`/tasks/tasks/${id}/change-status/`, { status });
    },

    /**
     * Lista os comentários de uma tarefa
     * @param {Number} taskId - ID da tarefa
     * @returns {Promise} Promessa com a lista de comentários
     */
    getTaskComments: (taskId) => {
        return api.get('/tasks/comments/', { params: { task: taskId } });
    },

    /**
     * Adiciona um comentário a uma tarefa
     * @param {Object} commentData - Dados do novo comentário
     * @returns {Promise} Promessa com a resposta da API
     */
    addComment: (commentData) => {
        return api.post('/tasks/comments/', commentData);
    },

    /**
     * Atualiza um comentário
     * @param {Number} id - ID do comentário
     * @param {Object} commentData - Novos dados do comentário
     * @returns {Promise} Promessa com a resposta da API
     */
    updateComment: (id, commentData) => {
        return api.put(`/tasks/comments/${id}/`, commentData);
    },

    /**
     * Exclui um comentário
     * @param {Number} id - ID do comentário
     * @returns {Promise} Promessa com a resposta da API
     */
    deleteComment: (id) => {
        return api.delete(`/tasks/comments/${id}/`);
    },

    /**
     * Lista as tags disponíveis
     * @returns {Promise} Promessa com a lista de tags
     */
    getTags: () => {
        return api.get('/tasks/tags/');
    },

    /**
     * Lista os registros de tempo de uma tarefa
     * @param {Number} taskId - ID da tarefa
     * @returns {Promise} Promessa com a lista de registros de tempo
     */
    getTaskTimeEntries: (taskId) => {
        return api.get('/tasks/time-entries/', { params: { task: taskId } });
    },

    /**
     * Adiciona um registro de tempo a uma tarefa
     * @param {Object} timeEntryData - Dados do novo registro de tempo
     * @returns {Promise} Promessa com a resposta da API
     */
    addTimeEntry: (timeEntryData) => {
        return api.post('/tasks/time-entries/', timeEntryData);
    },

    /**
     * Obtém registros de tempo do usuário atual
     * @param {Object} filters - Filtros opcionais
     * @returns {Promise} Promessa com a lista de registros de tempo
     */
    getMyTimeEntries: (filters = {}) => {
        return api.get('/tasks/time-entries/my-entries/', { params: filters });
    },
};

export default api; 