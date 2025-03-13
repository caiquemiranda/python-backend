import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
    ResponsiveContainer,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    Tooltip,
    CartesianGrid,
    Cell
} from 'recharts';

/**
 * Componente para exibir um mapa de calor (heatmap)
 */
const HeatMap = ({
    data,
    xCategories,
    yCategories,
    title,
    xKey = 'x',
    yKey = 'y',
    valueKey = 'value',
    minColor = '#e5f5f9',
    maxColor = '#005073',
    neutralColor = '#FFFFFF',
    cellSize = 30
}) => {
    // Processar dados para o formato esperado pelo ScatterChart
    const chartData = useMemo(() => {
        if (!data || !data.length) return [];

        // Transformar os dados em formato de mapa de calor
        return data.map(item => ({
            x: xCategories.indexOf(item[xKey]),
            y: yCategories.indexOf(item[yKey]),
            z: Math.abs(item[valueKey]), // O valor absoluto para determinar o tamanho do ponto
            value: item[valueKey], // O valor real para determinar a cor
            xLabel: item[xKey],
            yLabel: item[yKey]
        }));
    }, [data, xKey, yKey, valueKey, xCategories, yCategories]);

    // Função para gerar cores com base no valor
    const getColor = (value) => {
        // Valor entre -1 e 1 para correlações
        if (value === 0) return neutralColor;

        if (value > 0) {
            // Correlação positiva - tons de azul
            const intensity = value; // Valor entre 0 e 1
            const r = Math.round(229 - (229 - 0) * intensity);
            const g = Math.round(245 - (245 - 80) * intensity);
            const b = Math.round(249 - (249 - 115) * intensity);
            return `rgb(${r}, ${g}, ${b})`;
        } else {
            // Correlação negativa - tons de vermelho
            const intensity = Math.abs(value); // Valor entre 0 e 1
            const r = Math.round(229 + (255 - 229) * intensity);
            const g = Math.round(245 - 245 * intensity);
            const b = Math.round(249 - 249 * intensity);
            return `rgb(${r}, ${g}, ${b})`;
        }
    };

    // Customização do tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (!active || !payload || !payload.length) return null;

        const data = payload[0].payload;
        return (
            <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
                <p className="font-medium text-gray-700 mb-1">
                    {data.xLabel} × {data.yLabel}
                </p>
                <p className="text-gray-700">
                    <span className="font-medium">
                        {data.value.toFixed(2)}
                    </span>
                </p>
            </div>
        );
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            {title && <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>}

            <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                        margin={{ top: 20, right: 20, bottom: 70, left: 70 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                            dataKey="x"
                            name="X"
                            type="number"
                            tickFormatter={(value) => xCategories[value] || ''}
                            tick={{ fill: '#666', angle: -45, textAnchor: 'end' }}
                            allowDuplicatedCategory={false}
                            domain={[0, xCategories.length - 1]}
                            ticks={[...Array(xCategories.length).keys()]}
                        />
                        <YAxis
                            dataKey="y"
                            name="Y"
                            type="number"
                            tickFormatter={(value) => yCategories[value] || ''}
                            tick={{ fill: '#666' }}
                            allowDuplicatedCategory={false}
                            domain={[0, yCategories.length - 1]}
                            ticks={[...Array(yCategories.length).keys()]}
                        />
                        <ZAxis
                            dataKey="z"
                            range={[cellSize, cellSize]}
                            domain={[0, 1]}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Scatter data={chartData} shape="square">
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={getColor(entry.value)}
                                />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
            </div>

            {/* Legenda de cores */}
            <div className="mt-4">
                <p className="text-sm text-gray-700 mb-2">Correlação:</p>
                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Negativa</span>
                    <div className="w-2/3 h-2 mx-2 rounded" style={{
                        background: `linear-gradient(to right, rgb(255, 0, 0), ${neutralColor}, ${maxColor})`
                    }}></div>
                    <span className="text-xs text-gray-600">Positiva</span>
                </div>
            </div>
        </div>
    );
};

HeatMap.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    xCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
    yCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string,
    xKey: PropTypes.string,
    yKey: PropTypes.string,
    valueKey: PropTypes.string,
    minColor: PropTypes.string,
    maxColor: PropTypes.string,
    neutralColor: PropTypes.string,
    cellSize: PropTypes.number
};

export default HeatMap; 