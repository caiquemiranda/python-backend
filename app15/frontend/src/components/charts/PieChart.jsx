import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

/**
 * Componente para exibir um gráfico de pizza/donut
 */
const PieChart = ({
    data,
    title,
    categoryKey = 'category',
    valueKey = 'value',
    colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#34495e', '#1abc9c', '#d35400'],
    donut = true,
    legendPosition = 'bottom',
}) => {
    // Processar os dados para o formato esperado pelo Recharts
    const chartData = useMemo(() => {
        if (!data || !data.length) return [];

        return data.map(item => ({
            name: item[categoryKey],
            value: item[valueKey]
        }));
    }, [data, categoryKey, valueKey]);

    // Calcular o valor total para percentuais
    const total = useMemo(() => {
        if (!chartData.length) return 0;
        return chartData.reduce((sum, item) => sum + item.value, 0);
    }, [chartData]);

    // Formatar valores no tooltip
    const formatValue = (value) => {
        if (typeof value !== 'number') return value;
        return new Intl.NumberFormat('pt-BR').format(value);
    };

    // Calcular percentual
    const calculatePercentage = (value) => {
        if (!total) return 0;
        return ((value / total) * 100).toFixed(1);
    };

    // Customização do tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (!active || !payload || !payload.length) return null;

        const data = payload[0];
        return (
            <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
                <p className="font-medium text-gray-700">{data.name}</p>
                <p className="text-gray-700">
                    <span className="font-medium">{formatValue(data.value)}</span>
                    <span className="ml-2 text-sm text-gray-500">
                        ({calculatePercentage(data.value)}%)
                    </span>
                </p>
            </div>
        );
    };

    // Renderização personalizada da legenda
    const renderCustomizedLegend = (props) => {
        const { payload } = props;

        return (
            <ul className={`flex flex-wrap ${legendPosition === 'bottom' ? 'justify-center' : 'flex-col'} gap-2 mt-4`}>
                {payload.map((entry, index) => (
                    <li key={`item-${index}`} className="flex items-center">
                        <div
                            className="w-3 h-3 mr-2 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm text-gray-700">{entry.value}</span>
                        <span className="text-xs text-gray-500 ml-1">
                            ({calculatePercentage(chartData.find(item => item.name === entry.value).value)}%)
                        </span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            {title && <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>}

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={90}
                            innerRadius={donut ? 60 : 0}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[index % colors.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            content={renderCustomizedLegend}
                            verticalAlign={legendPosition}
                            layout={legendPosition === 'bottom' ? 'horizontal' : 'vertical'}
                            align={legendPosition === 'right' ? 'right' : 'center'}
                        />
                    </RechartsPieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

PieChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string,
    categoryKey: PropTypes.string,
    valueKey: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
    donut: PropTypes.bool,
    legendPosition: PropTypes.oneOf(['bottom', 'right'])
};

export default PieChart; 