import React, { useState } from 'react';
import useDashboard from '../hooks/useDashboard';
import KPICard from './KPICard';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import PieChart from './charts/PieChart';
import AreaChart from './charts/AreaChart';
import HeatMap from './charts/HeatMap';
import { FaChartLine, FaChartBar, FaSpinner, FaExclamationTriangle, FaChartPie, FaChartArea, FaThermometerHalf } from 'react-icons/fa';

/**
 * Componente principal do Dashboard
 */
const Dashboard = () => {
    const {
        kpis,
        timeSeriesData,
        categoryData,
        correlationData,
        loading,
        error,
        timeRange,
        updateTimeRange,
        updateSubcategoriesConfig,
    } = useDashboard();

    const [useSubcategories, setUseSubcategories] = useState(false);

    // Estado para controlar a visualização do mapa de calor
    const [showCorrelation, setShowCorrelation] = useState(false);

    // Opções para filtro de período
    const timeRangeOptions = [
        { value: 7, label: '7 dias' },
        { value: 15, label: '15 dias' },
        { value: 30, label: '30 dias' },
        { value: 60, label: '60 dias' },
        { value: 90, label: '90 dias' },
    ];

    // Handler para alteração de período
    const handleTimeRangeChange = (e) => {
        const days = parseInt(e.target.value, 10);
        updateTimeRange(days);
    };

    // Handler para alteração de subcategorias
    const handleSubcategoriesChange = (e) => {
        const useSubcats = e.target.checked;
        setUseSubcategories(useSubcats);
        updateSubcategoriesConfig(useSubcats);
    };

    // Renderiza o estado de carregamento
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
                <FaSpinner className="animate-spin text-blue-500 text-4xl mb-4" />
                <p className="text-gray-600">Carregando dados do dashboard...</p>
            </div>
        );
    }

    // Renderiza mensagem de erro
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
                <FaExclamationTriangle className="text-red-500 text-4xl mb-4" />
                <p className="text-red-600 font-medium">{error}</p>
                <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    onClick={() => window.location.reload()}
                >
                    Tentar novamente
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Cabeçalho */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                </div>
            </header>

            {/* Conteúdo principal */}
            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Filtros */}
                <div className="mb-8 flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg shadow">
                    <div>
                        <label htmlFor="timeRange" className="block text-sm font-medium text-gray-700 mb-1">
                            Período:
                        </label>
                        <select
                            id="timeRange"
                            value={timeRange}
                            onChange={handleTimeRangeChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            {timeRangeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="ml-6">
                        <label htmlFor="showSubcategories" className="flex items-center">
                            <input
                                type="checkbox"
                                id="showSubcategories"
                                checked={useSubcategories}
                                onChange={handleSubcategoriesChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">Exibir subcategorias</span>
                        </label>
                    </div>

                    <div className="ml-6">
                        <label htmlFor="showCorrelation" className="flex items-center">
                            <input
                                type="checkbox"
                                id="showCorrelation"
                                checked={showCorrelation}
                                onChange={(e) => setShowCorrelation(e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">Exibir análise de correlação</span>
                        </label>
                    </div>
                </div>

                {/* Cards de KPIs */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FaChartLine className="mr-2" />
                        Indicadores-Chave
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {kpis.map((kpi, index) => (
                            <KPICard key={index} kpi={kpi} />
                        ))}
                    </div>
                </div>

                {/* Gráficos de Tendência */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FaChartLine className="mr-2" />
                        Tendências
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Gráfico de linhas */}
                        <LineChart
                            data={timeSeriesData.data}
                            title="Evolução Temporal"
                            xKey="timestamp"
                            yKey="value"
                            categoryKey="category"
                        />

                        {/* Gráfico de área */}
                        <AreaChart
                            data={timeSeriesData.data}
                            title="Acumulado por Período"
                            xKey="timestamp"
                            yKey="value"
                            categoryKey="category"
                            stacked={true}
                        />
                    </div>
                </div>

                {/* Gráficos de Distribuição */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <FaChartPie className="mr-2" />
                        Distribuição
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Gráfico de barras */}
                        <BarChart
                            data={categoryData.data}
                            title="Comparativo por Categoria"
                            xKey="category"
                            yKey="value"
                            horizontal={true}
                        />

                        {/* Gráfico de pizza */}
                        <PieChart
                            data={categoryData.data}
                            title="Distribuição por Categoria"
                            categoryKey="category"
                            valueKey="value"
                            donut={true}
                        />
                    </div>
                </div>

                {/* Análise de Correlação */}
                {showCorrelation && correlationData.data.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                            <FaThermometerHalf className="mr-2" />
                            Análise de Correlação
                        </h2>

                        <div className="grid grid-cols-1 gap-6">
                            <HeatMap
                                data={correlationData.data}
                                xCategories={correlationData.x_categories}
                                yCategories={correlationData.y_categories}
                                title="Matriz de Correlação"
                                xKey="x"
                                yKey="y"
                                valueKey="value"
                            />
                        </div>
                    </div>
                )}
            </main>

            {/* Rodapé */}
            <footer className="bg-white shadow-inner py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-500 text-sm">
                        Dashboard de Análise - Versão 1.0.0 - {new Date().getFullYear()}
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard; 