import React from 'react';
import { FaEdit, FaTrash, FaCheckCircle, FaCircle } from 'react-icons/fa';
import './TarefaList.css';

const TarefaList = ({ tarefas, onExcluir, onEditar, onAlternarStatus }) => {
    // Função para formatar a data
    const formatarData = (dataString) => {
        const data = new Date(dataString);
        return data.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Cores para cada prioridade
    const corPrioridade = {
        alta: '#ff4d4f',
        média: '#faad14',
        baixa: '#52c41a'
    };

    return (
        <div className="tarefa-list">
            {tarefas.length === 0 ? (
                <div className="tarefa-vazia">
                    <p>Nenhuma tarefa encontrada.</p>
                    <p className="dica">Adicione uma nova tarefa usando o formulário acima.</p>
                </div>
            ) : (
                <div className="tarefa-grid">
                    {tarefas.map((tarefa) => (
                        <div
                            key={tarefa.id}
                            className={`tarefa-card ${tarefa.concluida ? 'concluida' : ''}`}
                        >
                            <div
                                className="prioridade-tag"
                                style={{ backgroundColor: corPrioridade[tarefa.prioridade] }}
                            >
                                {tarefa.prioridade}
                            </div>

                            <h3>{tarefa.titulo}</h3>
                            <p className="descricao">{tarefa.descricao || 'Sem descrição'}</p>

                            <div className="tarefa-meta">
                                <span className="data-criacao">Criada em: {formatarData(tarefa.data_criacao)}</span>
                            </div>

                            <div className="tarefa-acoes">
                                <button
                                    className="botao-status"
                                    onClick={() => onAlternarStatus(tarefa.id)}
                                    title={tarefa.concluida ? "Marcar como pendente" : "Marcar como concluída"}
                                >
                                    {tarefa.concluida ? <FaCheckCircle /> : <FaCircle />}
                                </button>

                                <button
                                    className="botao-editar"
                                    onClick={() => onEditar(tarefa)}
                                    title="Editar tarefa"
                                >
                                    <FaEdit />
                                </button>

                                <button
                                    className="botao-excluir"
                                    onClick={() => onExcluir(tarefa.id)}
                                    title="Excluir tarefa"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TarefaList; 