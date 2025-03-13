import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './App.css';

function App() {
    // Estado para armazenar os dados do formulário
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        idade: '',
        interesses: [],
        comentario: ''
    });

    // Estado para armazenar a lista de usuários
    const [usuarios, setUsuarios] = useState([]);

    // Estado para controlar se estamos exibindo a lista de usuários
    const [mostrarLista, setMostrarLista] = useState(false);

    // Opções de interesses disponíveis
    const opcoesInteresses = ['Programação', 'Web Design', 'Banco de Dados', 'Machine Learning', 'DevOps'];

    // Função para lidar com a mudança nos campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Função para lidar com a mudança nos checkboxes de interesses
    const handleInteressesChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            // Adiciona o interesse se estiver marcado
            setFormData(prevData => ({
                ...prevData,
                interesses: [...prevData.interesses, value]
            }));
        } else {
            // Remove o interesse se estiver desmarcado
            setFormData(prevData => ({
                ...prevData,
                interesses: prevData.interesses.filter(interesse => interesse !== value)
            }));
        }
    };

    // Função para enviar o formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação básica
        if (!formData.nome || !formData.email || !formData.idade) {
            toast.error('Por favor, preencha todos os campos obrigatórios');
            return;
        }

        if (formData.interesses.length === 0) {
            toast.error('Por favor, selecione pelo menos um interesse');
            return;
        }

        try {
            // Enviar dados para a API FastAPI
            const response = await axios.post('http://localhost:8000/api/usuarios', {
                ...formData,
                idade: parseInt(formData.idade)
            });

            // Exibir mensagem de sucesso
            toast.success(response.data.mensagem);

            // Limpar o formulário
            setFormData({
                nome: '',
                email: '',
                idade: '',
                interesses: [],
                comentario: ''
            });

            // Atualizar a lista se estiver sendo exibida
            if (mostrarLista) {
                fetchUsuarios();
            }
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            toast.error('Erro ao enviar o formulário. Verifique se o servidor está rodando.');
        }
    };

    // Função para buscar a lista de usuários
    const fetchUsuarios = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/usuarios');
            setUsuarios(response.data);
        } catch (error) {
            console.error('Erro ao buscar usuários:', error);
            toast.error('Erro ao buscar a lista de usuários.');
        }
    };

    // Alternar a exibição da lista de usuários
    const toggleLista = () => {
        setMostrarLista(!mostrarLista);
        if (!mostrarLista) {
            fetchUsuarios();
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>App12: Formulário React + FastAPI</h1>
            </header>

            <main className="container">
                <section className="form-section">
                    <h2>Formulário de Cadastro</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="nome">Nome*</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={formData.nome}
                                onChange={handleChange}
                                placeholder="Digite seu nome"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email*</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Digite seu email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="idade">Idade*</label>
                            <input
                                type="number"
                                id="idade"
                                name="idade"
                                value={formData.idade}
                                onChange={handleChange}
                                placeholder="Digite sua idade"
                                min="1"
                                max="120"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Interesses*</label>
                            <div className="interesses-container">
                                {opcoesInteresses.map(interesse => (
                                    <div key={interesse} className="interesse-item">
                                        <input
                                            type="checkbox"
                                            id={interesse}
                                            name="interesses"
                                            value={interesse}
                                            checked={formData.interesses.includes(interesse)}
                                            onChange={handleInteressesChange}
                                        />
                                        <label htmlFor={interesse}>{interesse}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="comentario">Comentário</label>
                            <textarea
                                id="comentario"
                                name="comentario"
                                value={formData.comentario}
                                onChange={handleChange}
                                placeholder="Deixe um comentário (opcional)"
                                rows="4"
                            />
                        </div>

                        <button type="submit" className="submit-btn">Enviar</button>
                    </form>
                </section>

                <section className="usuarios-section">
                    <button onClick={toggleLista} className="toggle-btn">
                        {mostrarLista ? 'Ocultar Usuários' : 'Mostrar Usuários'}
                    </button>

                    {mostrarLista && (
                        <div className="usuarios-list">
                            <h2>Usuários Cadastrados</h2>
                            {usuarios.length === 0 ? (
                                <p>Nenhum usuário cadastrado.</p>
                            ) : (
                                <ul>
                                    {usuarios.map((usuario, index) => (
                                        <li key={index} className="usuario-card">
                                            <h3>{usuario.nome}</h3>
                                            <p><strong>Email:</strong> {usuario.email}</p>
                                            <p><strong>Idade:</strong> {usuario.idade}</p>
                                            <p><strong>Interesses:</strong> {usuario.interesses.join(', ')}</p>
                                            {usuario.comentario && (
                                                <p><strong>Comentário:</strong> {usuario.comentario}</p>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </section>
            </main>

            <footer className="footer">
                <p>App12 - Exemplo de Formulário com React e FastAPI &copy; 2023</p>
            </footer>
        </div>
    );
}

export default App;