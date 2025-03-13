import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

/**
 * Componente para exibir um gráfico de barras
 */
const BarChart = ({
    data,
    title,
    xKey = 'category',
    yKey = 'value',
    categoryKey = null,
    horizontal = false,
    stacked = false,
    colors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6']
}) => {
    // Processar dados para formato adequado ao Recharts
    const chartData = useMemo(() => {
        if (!data || !data.length) return [];

        // Se não há uma chave de categoria ou ela não existe nos dados,
        // assumimos que os dados já estão no formato correto
        if (!categoryKey || data[0][categoryKey] === undefined) {
            return data;
        }

        // Caso contrário, agrupamos por categoria (xKey)
        const groupedData = data.reduce((acc, curr) => {
            const key = curr[xKey];

            if (!acc[key]) {
                acc[key] = { [xKey]: key };
            }

            acc[key][curr[categoryKey]] = curr[yKey];
            return acc;
        }, {});

        return Object.values(groupedData);
    }, [data, xKey, yKey, categoryKey]);

    // Extrair categorias únicas para criar as barras do gráfico
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
                    <RechartsBarChart
                        data={chartData}
                        layout={horizontal ? 'vertical' : 'horizontal'}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

                        {/* Eixos X e Y são invertidos quando o gráfico é horizontal */}
                        {horizontal ? (
                            <>
                                <YAxis
                                    dataKey={xKey}
                                    type="category"
                                    tick={{ fill: '#666' }}
                                    tickLine={{ stroke: '#ccc' }}
                                    width={150}
                                />
                                <XAxis
                                    type="number"
                                    tick={{ fill: '#666' }}
                                    tickLine={{ stroke: '#ccc' }}
                                    tickFormatter={formatValue}
                                />
                            </>
                        ) : (
                            <>
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
                            </>
                        )}

                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ paddingTop: 10 }} />

                        {categories.map((category, index) => (
                            <Bar
                                key={category || 'value'}
                                dataKey={category || yKey}
                                name={category || 'Valor'}
                                fill={colors[index % colors.length]}
                                stackId={stacked ? 'stack' : undefined}
                                barSize={horizontal ? 20 : 40}
                                radius={[4, 4, 0, 0]}
                            />
                        ))}
                    </RechartsBarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

BarChart.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string,
    xKey: PropTypes.string,
    yKey: PropTypes.string,
    categoryKey: PropTypes.string,
    horizontal: PropTypes.bool,
    stacked: PropTypes.bool,
    colors: PropTypes.arrayOf(PropTypes.string)
};

export default BarChart; 