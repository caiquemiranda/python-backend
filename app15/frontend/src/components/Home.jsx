import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartBar, FaChartLine, FaChartPie, FaTable, FaDownload, FaUser } from 'react-icons/fa';

/**
 * Componente de página inicial do aplicativo
 */
const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Cabeçalho */}
            <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard Analytics</h1>
                    <p className="text-blue-100">Visualize e analise seus dados de forma interativa</p>
                </div>
            </header>

            {/* Conteúdo principal */}
            <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Seção de destaque */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-10">
                    <div className="md:flex">
                        <div className="md:flex-1 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Transforme dados em insights</h2>
                            <p className="text-gray-600 mb-6">
                                Nosso dashboard interativo oferece visualizações poderosas e análises em tempo real para ajudar você a tomar decisões baseadas em dados.
                            </p>
                            <Link
                                to="/dashboard"
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FaChartBar className="mr-2" />
                                Acessar Dashboard
                            </Link>
                        </div>
                        <div className="md:flex-1 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center p-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white flex flex-col items-center text-center">
                                    <FaChartLine className="text-3xl mb-2" />
                                    <span>Análise de Tendências</span>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white flex flex-col items-center text-center">
                                    <FaChartPie className="text-3xl mb-2" />
                                    <span>Distribuição de Dados</span>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white flex flex-col items-center text-center">
                                    <FaTable className="text-3xl mb-2" />
                                    <span>Métricas Detalhadas</span>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white flex flex-col items-center text-center">
                                    <FaDownload className="text-3xl mb-2" />
                                    <span>Exportação de Dados</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recursos */}
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recursos disponíveis</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {/* Recurso 1 */}
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                            <FaChartLine className="text-xl text-blue-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Visualizações Interativas</h3>
                        <p className="text-gray-600">
                            Explore seus dados através de gráficos interativos que permitem filtrar, selecionar e aprofundar nas informações.
                        </p>
                    </div>

                    {/* Recurso 2 */}
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <FaChartPie className="text-xl text-green-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">KPIs em Tempo Real</h3>
                        <p className="text-gray-600">
                            Acompanhe seus indicadores-chave de desempenho em tempo real com atualizações automáticas e comparação com períodos anteriores.
                        </p>
                    </div>

                    {/* Recurso 3 */}
                    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                            <FaUser className="text-xl text-purple-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Análise Personalizada</h3>
                        <p className="text-gray-600">
                            Personalize seus relatórios e visualizações de acordo com suas necessidades específicas de negócio.
                        </p>
                    </div>
                </div>

                {/* CTA final */}
                <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden">
                    <div className="p-8 text-center">
                        <h2 className="text-2xl font-bold text-white mb-4">Pronto para começar?</h2>
                        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                            Acesse agora o dashboard completo e descubra insights valiosos a partir dos seus dados.
                        </p>
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-gray-900 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                        >
                            Explorar Dashboard
                        </Link>
                    </div>
                </div>
            </main>

            {/* Rodapé */}
            <footer className="bg-white shadow-inner py-8 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-500 text-sm">
                        Dashboard Analytics - Versão 1.0.0 - {new Date().getFullYear()}
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home; 