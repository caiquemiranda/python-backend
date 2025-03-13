import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [mensagem, setMensagem] = useState('Carregando...');
    const [erro, setErro] = useState(null);

    useEffect(() => {
        // Função para buscar mensagem do backend
        const fetchMensagem = async () => {
            try {
                const resposta = await axios.get('http://localhost:5000/api/mensagem');
                setMensagem(resposta.data.mensagem);
            } catch (error) {
                console.error('Erro ao buscar mensagem:', error);
                setErro('Não foi possível conectar ao backend. Verifique se o servidor Flask está rodando.');
            }
        };

        fetchMensagem();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>App11: Flask + React</h1>
                <div className="card">
                    <h2>Mensagem do Backend:</h2>
                    {erro ? (
                        <p className="erro">{erro}</p>
                    ) : (
                        <p className="mensagem">{mensagem}</p>
                    )}
                </div>
            </header>
        </div>
    );
}

export default App; 