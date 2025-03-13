import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import TarefaForm from './components/TarefaForm';
import TarefaList from './components/TarefaList';
import tarefasService from './services/api';
import './App.css';

function App() {
    // Estado para armazenar a lista de tarefas
    const [tarefas, setTarefas] = useState([]);

    // Estado para armazenar a tarefa que está sendo editada
    const [tarefaAtual, setTarefaAtual] = useState(null);

    // Estado para controlar quando estamos carregando dados
    const [carregando, setCarregando] = useState(true);

    // Estado para controlar quando ocorreu um erro no carregamento
    const [erro, setErro] = useState(null);

    // Função para carregar as tarefas do backend
    const carregarTarefas = async () => {
        try {
            setCarregando(true);
            const data = await tarefasService.listarTarefas();
            setTarefas(data);
            setErro(null);
        } catch (error) {
            console.error('Erro ao carregar tarefas:', error);
            setErro('Não foi possível carregar as tarefas. Verifique se o servidor está rodando.');
        } finally {
            setCarregando(false);
        }
    };

    // Carrega as tarefas quando o componente é montado
    useEffect(() => {
        carregarTarefas();
    }, []);

    // Função para manipular a submissão do formulário (criar ou atualizar tarefa)
    const handleSubmitTarefa = async (tarefa) => {
        try {
            if (tarefaAtual) {
                // Atualizar tarefa existente
                await tarefasService.atualizarTarefa(tarefaAtual.id, tarefa);
                toast.success('Tarefa atualizada com sucesso!');
            } else {
                // Criar nova tarefa
                await tarefasService.criarTarefa(tarefa);
                toast.success('Tarefa criada com sucesso!');
            }

            // Recarrega a lista de tarefas
            carregarTarefas();

            // Limpa o formulário
            setTarefaAtual(null);
        } catch (error) {
            console.error('Erro ao salvar tarefa:', error);
            toast.error('Ocorreu um erro ao salvar a tarefa.');
        }
    };

    // Função para excluir uma tarefa
    const handleExcluirTarefa = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
            try {
                await tarefasService.excluirTarefa(id);
                toast.success('Tarefa excluída com sucesso!');

                // Recarrega a lista de tarefas
                carregarTarefas();
            } catch (error) {
                console.error('Erro ao excluir tarefa:', error);
                toast.error('Ocorreu um erro ao excluir a tarefa.');
            }
        }
    };

    // Função para iniciar a edição de uma tarefa
    const handleEditarTarefa = (tarefa) => {
        setTarefaAtual(tarefa);
    };

    // Função para cancelar a edição de uma tarefa
    const handleCancelarEdicao = () => {
        setTarefaAtual(null);
    };

    // Função para alternar o status de conclusão de uma tarefa
    const handleAlternarStatus = async (id) => {
        try {
            await tarefasService.alternarStatusTarefa(id);

            // Recarrega a lista de tarefas
            carregarTarefas();
        } catch (error) {
            console.error('Erro ao alternar status da tarefa:', error);
            toast.error('Ocorreu um erro ao mudar o status da tarefa.');
        }
    };

    // Função para adicionar tarefas de exemplo
    const handleAdicionarExemplos = async () => {
        try {
            await tarefasService.adicionarTarefasExemplo();
            toast.success('Tarefas de exemplo adicionadas com sucesso!');

            // Recarrega a lista de tarefas
            carregarTarefas();
        } catch (error) {
            console.error('Erro ao adicionar tarefas de exemplo:', error);
            toast.error('Ocorreu um erro ao adicionar tarefas de exemplo.');
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <div className="container">
                    <h1>App13: Gerenciador de Tarefas</h1>
                    <p>CRUD completo com Flask e React</p>
                </div>
            </header>

            <main className="container">
                <TarefaForm
                    tarefaAtual={tarefaAtual}
                    onSubmit={handleSubmitTarefa}
                    onCancelar={handleCancelarEdicao}
                />

                <div className="flex-row space-between">
                    <h2>Lista de Tarefas</h2>

                    {tarefas.length === 0 && !carregando && !erro && (
                        <button
                            className="btn-exemplos"
                            onClick={handleAdicionarExemplos}
                        >
                            Adicionar Tarefas de Exemplo
                        </button>
                    )}
                </div>

                {carregando ? (
                    <div className="loading">Carregando tarefas...</div>
                ) : erro ? (
                    <div className="error">{erro}</div>
                ) : (
                    <TarefaList
                        tarefas={tarefas}
                        onExcluir={handleExcluirTarefa}
                        onEditar={handleEditarTarefa}
                        onAlternarStatus={handleAlternarStatus}
                    />
                )}
            </main>

            <footer className="App-footer">
                <div className="container">
                    <p>App13 - CRUD com Flask e React &copy; 2023</p>
                </div>
            </footer>
        </div>
    );
}

export default App; 