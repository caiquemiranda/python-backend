import React from 'react';
import PropTypes from 'prop-types';
import { FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';

/**
 * Componente para exibir um KPI em um card
 */
const KPICard = ({ kpi }) => {
    // Helper para formatar o valor baseado no tipo
    const formatValue = (value, format) => {
        if (format === 'currency') {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(value);
        } else if (format === 'percentage') {
            return `${value.toFixed(2).replace('.', ',')}%`;
        } else {
            return new Intl.NumberFormat('pt-BR').format(value);
        }
    };

    // Determinar a cor e ícone com base na tendência
    const getTrendInfo = () => {
        switch (kpi.trend) {
            case 'up':
                return {
                    icon: <FaArrowUp />,
                    color: 'text-green-600',
                    bgColor: 'bg-green-100'
                };
            case 'down':
                return {
                    icon: <FaArrowDown />,
                    color: 'text-red-600',
                    bgColor: 'bg-red-100'
                };
            default:
                return {
                    icon: <FaMinus />,
                    color: 'text-gray-600',
                    bgColor: 'bg-gray-100'
                };
        }
    };

    const { icon, color, bgColor } = getTrendInfo();

    // Algumas métricas como CAC são melhores quando diminuem
    const isPositiveChange = () => {
        if (kpi.name === 'CAC') {
            return kpi.trend === 'down';
        }
        return kpi.trend === 'up';
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex flex-col">
                {/* Título do KPI */}
                <h3 className="text-lg text-gray-700 font-medium mb-2">{kpi.name}</h3>

                {/* Valor principal em destaque */}
                <p className="text-3xl font-bold text-gray-900 mb-2">
                    {formatValue(kpi.value, kpi.format)}
                </p>

                {/* Variação percentual */}
                {kpi.previous_value !== null && kpi.change_percentage !== null && (
                    <div className="flex items-center mt-1">
                        <div className={`flex items-center justify-center p-1 rounded-full ${bgColor} mr-2`}>
                            <span className={color}>{icon}</span>
                        </div>
                        <span className={`${isPositiveChange() ? 'text-green-600' : 'text-red-600'} font-medium`}>
                            {kpi.change_percentage > 0 ? '+' : ''}
                            {kpi.change_percentage.toFixed(2).replace('.', ',')}%
                        </span>
                        <span className="text-gray-500 ml-1 text-sm">vs. anterior</span>
                    </div>
                )}
            </div>
        </div>
    );
};

KPICard.propTypes = {
    kpi: PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        previous_value: PropTypes.number,
        change_percentage: PropTypes.number,
        trend: PropTypes.oneOf(['up', 'down', 'stable']),
        format: PropTypes.oneOf(['percentage', 'currency', 'number'])
    }).isRequired
};

export default KPICard; 