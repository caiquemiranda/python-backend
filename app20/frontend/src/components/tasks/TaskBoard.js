/**
 * Componente de quadro de tarefas (estilo Kanban) para gerenciar tarefas
 * por arrastar e soltar entre diferentes colunas de status.
 */
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { taskService } from '../../services/api';
import TaskCard from './TaskCard';
import LoadingSpinner from '../common/LoadingSpinner';
import { FaPlus } from 'react-icons/fa';
import '../../styles/taskboard.css';

const TaskBoard = ({ projectId, onCreateTask }) => {
    // Estados para armazenar as tarefas e controlar o carregamento
    const [columns, setColumns] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Configuração das colunas e seus títulos
    const columnDefinitions = {
        backlog: { title: 'Backlog', order: 1 },
        todo: { title: 'A Fazer', order: 2 },
        in_progress: { title: 'Em Andamento', order: 3 },
        review: { title: 'Em Revisão', order: 4 },
        completed: { title: 'Concluído', order: 5 },
        cancelled: { title: 'Cancelado', order: 6 }
    };

    // Carrega as tarefas do projeto quando o componente monta ou o projectId muda
    useEffect(() => {
        const fetchTasks = async () => {
            if (!projectId) return;

            try {
                setLoading(true);
                const response = await taskService.getProjectTasks(projectId);
                const tasks = response.data.results || response.data;

                // Inicializa as colunas com arrays vazios
                const initialColumns = Object.keys(columnDefinitions).reduce((acc, key) => {
                    acc[key] = [];
                    return acc;
                }, {});

                // Distribui as tarefas nas colunas apropriadas
                const groupedTasks = tasks.reduce((acc, task) => {
                    const column = task.status;
                    if (acc[column]) {
                        acc[column].push(task);
                    }
                    return acc;
                }, initialColumns);

                // Ordena as tarefas em cada coluna por prioridade e ordem
                Object.keys(groupedTasks).forEach(column => {
                    groupedTasks[column].sort((a, b) => {
                        if (a.priority !== b.priority) {
                            return b.priority - a.priority; // Maior prioridade primeiro
                        }
                        return a.order - b.order; // Menor ordem primeiro
                    });
                });

                setColumns(groupedTasks);
            } catch (err) {
                console.error('Erro ao carregar tarefas:', err);
                setError('Não foi possível carregar as tarefas. Por favor, tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [projectId]);

    /**
     * Manipula eventos de arrastar e soltar
     * @param {Object} result - Resultado do evento de arrastar e soltar
     */
    const onDragEnd = async (result) => {
        const { source, destination, draggableId } = result;

        // Caso: Não houve destino (solto fora de uma coluna válida)
        if (!destination) return;

        // Caso: A tarefa foi solta na mesma posição
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) return;

        // Obtém coluna de origem e destino
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];

        if (source.droppableId === destination.droppableId) {
            // Reordenando na mesma coluna
            const newTasks = Array.from(sourceColumn);
            const [movedTask] = newTasks.splice(source.index, 1);
            newTasks.splice(destination.index, 0, movedTask);

            // Atualiza ordem das tarefas
            const updatedTasks = newTasks.map((task, index) => ({
                ...task,
                order: index
            }));

            // Atualiza o estado
            setColumns({
                ...columns,
                [source.droppableId]: updatedTasks
            });

            // Atualiza a ordem no backend para a tarefa movida
            try {
                await taskService.updateTask(movedTask.id, {
                    order: destination.index
                });
            } catch (error) {
                console.error('Erro ao atualizar ordem da tarefa:', error);
                // Rollback se falhar
                fetchTasks();
            }
        } else {
            // Movendo entre colunas
            const sourceTasks = Array.from(sourceColumn);
            const destTasks = Array.from(destColumn);
            const [movedTask] = sourceTasks.splice(source.index, 1);

            // Atualiza o status da tarefa
            const updatedTask = {
                ...movedTask,
                status: destination.droppableId
            };

            destTasks.splice(destination.index, 0, updatedTask);

            // Atualiza o estado
            setColumns({
                ...columns,
                [source.droppableId]: sourceTasks,
                [destination.droppableId]: destTasks
            });

            // Atualiza o status no backend
            try {
                await taskService.changeTaskStatus(
                    draggableId,
                    destination.droppableId
                );
            } catch (error) {
                console.error('Erro ao atualizar status da tarefa:', error);
                // Rollback se falhar
                fetchTasks();
            }
        }
    };

    /**
     * Função para buscar as tarefas
     */
    const fetchTasks = async () => {
        if (!projectId) return;

        try {
            setLoading(true);
            const response = await taskService.getProjectTasks(projectId);
            const tasks = response.data.results || response.data;

            // Inicializa as colunas com arrays vazios
            const initialColumns = Object.keys(columnDefinitions).reduce((acc, key) => {
                acc[key] = [];
                return acc;
            }, {});

            // Distribui as tarefas nas colunas apropriadas
            const groupedTasks = tasks.reduce((acc, task) => {
                const column = task.status;
                if (acc[column]) {
                    acc[column].push(task);
                }
                return acc;
            }, initialColumns);

            // Ordena as tarefas em cada coluna por prioridade e ordem
            Object.keys(groupedTasks).forEach(column => {
                groupedTasks[column].sort((a, b) => {
                    if (a.priority !== b.priority) {
                        return b.priority - a.priority; // Maior prioridade primeiro
                    }
                    return a.order - b.order; // Menor ordem primeiro
                });
            });

            setColumns(groupedTasks);
        } catch (err) {
            console.error('Erro ao carregar tarefas:', err);
            setError('Não foi possível carregar as tarefas. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="task-board">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="board-columns">
                    {Object.entries(columnDefinitions)
                        .sort((a, b) => a[1].order - b[1].order)
                        .map(([columnId, column]) => (
                            <div key={columnId} className="board-column">
                                <div className="column-header">
                                    <h3>{column.title}</h3>
                                    <span className="task-count">{columns[columnId].length}</span>
                                </div>
                                <Droppable droppableId={columnId}>
                                    {(provided, snapshot) => (
                                        <div
                                            className={`task-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                        >
                                            {columns[columnId].map((task, index) => (
                                                <Draggable
                                                    key={task.id.toString()}
                                                    draggableId={task.id.toString()}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`task-card-container ${snapshot.isDragging ? 'dragging' : ''}`}
                                                        >
                                                            <TaskCard task={task} />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}

                                            {/* Botão para adicionar tarefa em cada coluna */}
                                            {columnId === 'todo' && (
                                                <button
                                                    className="add-task-button"
                                                    onClick={() => onCreateTask(columnId)}
                                                >
                                                    <FaPlus /> Nova Tarefa
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default TaskBoard; 