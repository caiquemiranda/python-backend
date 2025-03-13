import React, { useState, useEffect } from 'react';
import './TarefaForm.css';

const TarefaForm = ({ tarefaAtual, onSubmit, onCancelar }) => {
    // Estado inicial do formulário
    const estadoInicial = {
        titulo: '',
        descricao: '',
        prioridade: 'média',
        concluida: false
    };

    // Estado do formulário
    const [formData, setFormData] = useState(estadoInicial);

    // Estado para controlar se estamos editando
    const [editando, setEditando] = useState(false);

    // Atualiza o formulário quando a tarefa atual muda
    useEffect(() => {
        if (tarefaAtual) {
            setFormData(tarefaAtual);
            setEditando(true);
        } else {
            setFormData(estadoInicial);
            setEditando(false);
        }
    }, [tarefaAtual]);

    // Manipula mudanças nos campos do formulário
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Manipula o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validação básica
        if (!formData.titulo.trim()) {
            alert('O título da tarefa é obrigatório');
            return;
        }

        onSubmit(formData);

        // Limpa o formulário apenas se não estiver editando ou após resetar
        if (!editando) {
            setFormData(estadoInicial);
        }
    };

    // Cancela a edição
    const handleCancelar = () => {
        setFormData(estadoInicial);
        setEditando(false);
        onCancelar();
    };

    return (
        <div className="tarefa-form-container">
            <h2>{editando ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>

            <form onSubmit={handleSubmit} className="tarefa-form">
                <div className="form-group">
                    <label htmlFor="titulo">Título*</label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        placeholder="Digite o título da tarefa"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="descricao">Descrição</label>
                    <textarea
                        id="descricao"
                        name="descricao"
                        value={formData.descricao}
                        onChange={handleChange}
                        placeholder="Descreva os detalhes da tarefa"
                        rows="3"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="prioridade">Prioridade</label>
                        <select
                            id="prioridade"
                            name="prioridade"
                            value={formData.prioridade}
                            onChange={handleChange}
                        >
                            <option value="baixa">Baixa</option>
                            <option value="média">Média</option>
                            <option value="alta">Alta</option>
                        </select>
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="concluida"
                                checked={formData.concluida}
                                onChange={handleChange}
                            />
                            Tarefa concluída
                        </label>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-salvar">
                        {editando ? 'Atualizar' : 'Salvar'}
                    </button>

                    {editando && (
                        <button
                            type="button"
                            className="btn-cancelar"
                            onClick={handleCancelar}
                        >
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default TarefaForm; 