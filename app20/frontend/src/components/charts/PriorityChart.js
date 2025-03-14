/**
 * Componente de gráfico para visualizar a distribuição de tarefas por prioridade.
 * Utiliza Chart.js para renderizar um gráfico de barras com cores e legendas.
 */
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import '../../styles/charts.css';

// Registra os componentes necessários do Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const PriorityChart = ({ data = [] }) => {
    // Mapeamento de prioridade para cores e labels em português
    const priorityMap = {
        1: { color: '#28a745', label: 'Baixa' },
        2: { color: '#007bff', label: 'Média' },
        3: { color: '#ffc107', label: 'Alta' },
        4: { color: '#dc3545', label: 'Urgente' }
    };

    // Transforma os dados para o formato do Chart.js
    const chartData = {
        labels: data.map(item => priorityMap[item.priority]?.label || `Prioridade ${item.priority}`),
        datasets: [
            {
                label: 'Tarefas por Prioridade',
                data: data.map(item => item.count),
                backgroundColor: data.map(item => priorityMap[item.priority]?.color || '#6c757d'),
                borderColor: data.map(item => priorityMap[item.priority]?.color || '#6c757d'),
                borderWidth: 1,
            },
        ],
    };

    // Opções para personalizar o gráfico
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.dataset.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce((a, b) => a + b, 0);
                        const percentage = Math.round((value / total) * 100);
                        return `${label}: ${value} (${percentage}%)`;
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0 // Só mostra números inteiros
                }
            }
        }
    };

    // Se não houver dados, exibe uma mensagem
    if (data.length === 0) {
        return (
            <div className="chart-empty">
                <p>Sem dados disponíveis para exibir.</p>
            </div>
        );
    }

    return (
        <div className="chart-container priority-chart">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default PriorityChart; 