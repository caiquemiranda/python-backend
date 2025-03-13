import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
    AreaChart as RechartsAreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

/**
 * Componente para exibir um gráfico de área
 */
const AreaChart = ({
    data,
    title,
    xKey = 'timestamp',
    yKey = 'value',
    categoryKey = 'category',
    dateFormat = true,
    stacked = false,
    colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6']
}) => {
    // Processar dados para formato adequado ao Recharts
    const chartData = useMemo(() => {
        if (!data || !data.length) return [];

        // Se os dados já estiverem agrupados por categoria, retorná-los como estão
        if (!categoryKey || data[0][categoryKey] === undefined) {
            return data.map(item => ({
                ...item,
                // Formatar data se necessário
                [xKey]: dateFormat && typeof item[xKey] === 'string'
                    ? new Date(item[xKey]).toLocaleDateString('pt-BR')
                    : item[xKey]
            }));
        }

        // Caso contrário, agrupar os dados por data e categorias
        const groupedByDate = data.reduce((acc, curr) => {
            const date = dateFormat && typeof curr[xKey] === 'string'
                ? new Date(curr[xKey]).toLocaleDateString('pt-BR')
                : curr[xKey];

            if (!acc[date]) {
                acc[date] = { [xKey]: date };
            }

            acc[date][curr[categoryKey]] = curr[yKey];
            return acc;
        }, {});

        return Object.values(groupedByDate);
    }, [data, xKey, yKey, categoryKey, dateFormat]);

    // Extrair categorias únicas para criar as áreas do gráfico
    const categories = useMemo(() => {
        if (!data || !data.length || !categoryKey) return [null];

        const uniqueCategories = [...new Set(data.map(item => item[categoryKey]))];
        return uniqueCategories.length > 0 ? uniqueCategories : [null];
    }, [data, categoryKey]);

    // Formatar valores no tooltip
    const formatValue = (value) => {
        if (typeof value !== 'number') return value;
        return new Intl.NumberFormat('pt-BR').format(value);
    };

    // Customização do tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload || !payload.length) return null;

        return (
            <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
                <p className="font-medium text-gray-700 mb-2">{label}</p>
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center mb-1">
                        <div
                            className="w-3 h-3 mr-2 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-gray-700">{entry.name}: </span>
                        <span className="ml-1 font-medium">{formatValue(entry.value)}</span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            {title && <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>}

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsAreaChart
                        data={chartData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                            dataKey={xKey}
                            tick={{ fill: '#666' }}
                            tickLine={{ stroke: '#ccc' }}
                        />
                        <YAxis
                            tick={{ fill: '#666' }}
                            tickLine={{ stroke: '#ccc' }}
                            tickFormatter={formatValue}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ paddingTop: 10 }} />

                        {categories.map((category, index) => (
                            <Area
                                key={category || 'value'}
                                type="monotone"
                                dataKey={category || yKey}
                                name={category || 'Valor'}
                                stackId={stacked ? "1" : undefined}
                                stroke={colors[index % colors.length]}
                                fill={colors[index % colors.length]}
                                fillOpacity={0.6}
                            />
                        ))}
                    </RechartsAreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

AreaChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string,
    xKey: PropTypes.string,
    yKey: PropTypes.string,
    categoryKey: PropTypes.string,
    dateFormat: PropTypes.bool,
    stacked: PropTypes.bool,
    colors: PropTypes.arrayOf(PropTypes.string)
};

export default AreaChart; 