/**
 * Componente de gráfico para visualizar a distribuição de tarefas por status.
 * Utiliza Chart.js para renderizar um gráfico de pizza com cores e legendas.
 */
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../../styles/charts.css';

// Registra os componentes necessários do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const StatusChart = ({ data = [] }) => {
    // Mapeamento de status para cores e labels em português
    const statusMap = {
        'backlog': { color: '#6c757d', label: 'Backlog' },
        'todo': { color: '#007bff', label: 'A Fazer' },
        'in_progress': { color: '#ffc107', label: 'Em Andamento' },
        'review': { color: '#17a2b8', label: 'Em Revisão' },
        'completed': { color: '#28a745', label: 'Concluídas' },
        'cancelled': { color: '#dc3545', label: 'Canceladas' }
    };

    // Transforma os dados para o formato do Chart.js
    const chartData = {
        labels: data.map(item => statusMap[item.status]?.label || item.status),
        datasets: [
            {
                data: data.map(item => item.count),
                backgroundColor: data.map(item => statusMap[item.status]?.color || '#6c757d'),
                borderColor: data.map(item => statusMap[item.status]?.color || '#6c757d'),
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
                position: 'right',
                labels: {
                    boxWidth: 15,
                    padding: 15,
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                        const percentage = Math.round((value / total) * 100);
                        return `${label}: ${value} (${percentage}%)`;
                    }
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
        <div className="chart-container status-chart">
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default StatusChart; 