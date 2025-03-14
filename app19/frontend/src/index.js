/**
 * Ponto de entrada principal da aplicação React
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Cria a raiz React no elemento com ID 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o componente App
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// Mede o desempenho da aplicação (opcional)
reportWebVitals(); 