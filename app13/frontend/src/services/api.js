import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Configuração do axios
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Serviços para tarefas
const tarefasService = {
    // Buscar todas as tarefas
    listarTarefas: async () => {
        try {
            const response = await api.get('/tarefas');
            return response.data;
        } catch (error) {
            console.error('Erro ao listar tarefas:', error);
            throw error;
        }
    },

    // Buscar uma tarefa específica
    obterTarefa: async (id) => {
        try {
            const response = await api.get(`/tarefas/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao obter tarefa ${id}:`, error);
            throw error;
        }
    },

    // Criar uma nova tarefa
    criarTarefa: async (tarefa) => {
        try {
            const response = await api.post('/tarefas', tarefa);
            return response.data;
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
            throw error;
        }
    },

    // Atualizar uma tarefa existente
    atualizarTarefa: async (id, tarefa) => {
        try {
            const response = await api.put(`/tarefas/${id}`, tarefa);
            return response.data;
        } catch (error) {
            console.error(`Erro ao atualizar tarefa ${id}:`, error);
            throw error;
        }
    },

    // Excluir uma tarefa
    excluirTarefa: async (id) => {
        try {
            const response = await api.delete(`/tarefas/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao excluir tarefa ${id}:`, error);
            throw error;
        }
    },

    // Alternar status de conclusão de uma tarefa
    alternarStatusTarefa: async (id) => {
        try {
            const response = await api.patch(`/tarefas/${id}/alternar-status`);
            return response.data;
        } catch (error) {
            console.error(`Erro ao alternar status da tarefa ${id}:`, error);
            throw error;
        }
    },

    // Adicionar tarefas de exemplo
    adicionarTarefasExemplo: async () => {
        try {
            const response = await api.post('/tarefas/exemplo');
            return response.data;
        } catch (error) {
            console.error('Erro ao adicionar tarefas de exemplo:', error);
            throw error;
        }
    }
};

export default tarefasService; 