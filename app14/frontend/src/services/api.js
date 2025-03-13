import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Função para obter o token do localStorage
const getToken = () => localStorage.getItem('token');

// Configuração do axios
const api = axios.create({
    baseURL: API_URL,
});

// Adiciona o token JWT em todas as requisições se estiver disponível
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Serviços para autenticação
const authService = {
    // Registrar um novo usuário
    register: async (userData) => {
        try {
            const response = await api.post('/users/', userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { detail: 'Erro ao registrar usuário' };
        }
    },

    // Login de usuário
    login: async (username, password) => {
        try {
            // O FastAPI espera um FormData para o endpoint de token
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            const response = await axios.post(`${API_URL}/token`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Salva o token no localStorage
            localStorage.setItem('token', response.data.access_token);
            return response.data;
        } catch (error) {
            throw error.response?.data || { detail: 'Erro ao realizar login' };
        }
    },

    // Obter dados do usuário atual
    getCurrentUser: async () => {
        try {
            const response = await api.get('/users/me/');
            return response.data;
        } catch (error) {
            throw error.response?.data || { detail: 'Erro ao obter dados do usuário' };
        }
    },

    // Logout (remove o token do localStorage)
    logout: () => {
        localStorage.removeItem('token');
    },

    // Verifica se o usuário está autenticado
    isAuthenticated: () => {
        return !!getToken();
    }
};

// Serviços para notas
const notesService = {
    // Listar todas as notas do usuário
    getAllNotes: async () => {
        try {
            const response = await api.get('/notes/');
            return response.data;
        } catch (error) {
            throw error.response?.data || { detail: 'Erro ao listar notas' };
        }
    },

    // Obter uma nota específica
    getNote: async (id) => {
        try {
            const response = await api.get(`/notes/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || { detail: 'Erro ao obter nota' };
        }
    },

    // Criar uma nova nota
    createNote: async (noteData) => {
        try {
            const response = await api.post('/notes/', noteData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { detail: 'Erro ao criar nota' };
        }
    },

    // Atualizar uma nota existente
    updateNote: async (id, noteData) => {
        try {
            const response = await api.put(`/notes/${id}`, noteData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { detail: 'Erro ao atualizar nota' };
        }
    },

    // Excluir uma nota
    deleteNote: async (id) => {
        try {
            await api.delete(`/notes/${id}`);
            return true;
        } catch (error) {
            throw error.response?.data || { detail: 'Erro ao excluir nota' };
        }
    },

    // Listar notas públicas
    getPublicNotes: async () => {
        try {
            const response = await api.get('/notes/public/');
            return response.data;
        } catch (error) {
            throw error.response?.data || { detail: 'Erro ao listar notas públicas' };
        }
    }
};

export { authService, notesService }; 