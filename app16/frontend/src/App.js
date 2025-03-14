/**
 * Componente principal da aplicação React.
 * Consome a API do backend Django e exibe os dados recebidos.
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    // Estados para armazenar a mensagem da API e o status de carregamento
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // URL base da API (deve ser ajustada para a porta correta do Django)
    const API_URL = 'http://localhost:8000/api/hello/';

    // Efeito que será executado ao montar o componente
    useEffect(() => {
        // Função assíncrona para buscar dados da API
        const fetchMessage = async () => {
            try {
                setLoading(true);
                // Faz a requisição para a API
                const response = await axios.get(API_URL);
                // Armazena os dados no estado
                setMessage(response.data);
                setError(null);
            } catch (err) {
                // Em caso de erro, armazena a mensagem de erro
                setError('Erro ao conectar com a API. Verifique se o backend está rodando.');
                console.error('Erro ao buscar dados:', err);
            } finally {
                setLoading(false);
            }
        };

        // Chama a função de busca
        fetchMessage();
    }, []); // Array vazio significa que o efeito roda apenas uma vez ao montar o componente

    return (
        <div className="container">
            <header className="header">
                <h1>App16 - Integração Django e React</h1>
                <p>Exemplo simples de comunicação entre frontend React e backend Django</p>
            </header>

            {/* Exibe o indicador de carregamento enquanto os dados estão sendo buscados */}
            {loading && <p>Carregando dados da API...</p>}

            {/* Exibe a mensagem de erro, se houver */}
            {error && (
                <div className="message-container" style={{ borderColor: 'red', backgroundColor: '#ffeded' }}>
                    <div className="message-heading" style={{ color: 'red' }}>Erro:</div>
                    <div className="message-content">{error}</div>
                </div>
            )}

            {/* Exibe os dados recebidos da API, se houver */}
            {!loading && !error && message && (
                <div className="message-container">
                    <div className="message-heading">Mensagem da API:</div>
                    <div className="message-content">{message.message}</div>
                    <div className="message-content">{message.info}</div>
                </div>
            )}

            <section className="info-section">
                <h2>Sobre este Projeto</h2>
                <p>
                    Este é um exemplo básico de integração entre Django e React.
                    O backend fornece uma API simples que retorna uma mensagem de "Hello World",
                    e o frontend consome essa API e exibe a mensagem recebida.
                </p>
                <p>
                    Para que tudo funcione corretamente, certifique-se de que tanto o servidor Django
                    quanto o servidor de desenvolvimento do React estejam rodando nas portas corretas.
                </p>
            </section>
        </div>
    );
}

export default App; 