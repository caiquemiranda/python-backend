import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/api';

/**
 * Hook personalizado para gerenciar os dados do dashboard
 */
const useDashboard = () => {
    // Estados para armazenar dados e status de carregamento
    const [kpis, setKpis] = useState([]);
    const [timeSeriesData, setTimeSeriesData] = useState({ data: [] });
    const [categoryData, setCategoryData] = useState({ data: [] });
    const [correlationData, setCorrelationData] = useState({
        data: [],
        x_categories: [],
        y_categories: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeRange, setTimeRange] = useState(30); // Padrão: 30 dias
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [withSubcategories, setWithSubcategories] = useState(false);

    /**
     * Carrega todos os dados do dashboard de uma vez
     */
    const loadAllData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await apiService.getDashboardData();

            setKpis(data.kpis.kpis);
            setTimeSeriesData(data.time_series);
            setCategoryData(data.categories);
            setCorrelationData(data.correlation);
        } catch (err) {
            setError('Erro ao carregar dados do dashboard. Tente novamente mais tarde.');
            console.error('Erro ao carregar dados do dashboard:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Carrega apenas os KPIs
     */
    const loadKPIs = useCallback(async () => {
        try {
            const data = await apiService.getKPIs();
            setKpis(data.kpis);
            return data.kpis;
        } catch (err) {
            console.error('Erro ao carregar KPIs:', err);
            throw err;
        }
    }, []);

    /**
     * Carrega dados de séries temporais com filtros
     */
    const loadTimeSeriesData = useCallback(async (days = timeRange, category = null) => {
        try {
            const params = { days };
            if (category) params.category = category;

            const data = await apiService.getTimeSeries(params);
            setTimeSeriesData(data);
            return data;
        } catch (err) {
            console.error('Erro ao carregar séries temporais:', err);
            throw err;
        }
    }, [timeRange]);

    /**
     * Carrega dados categóricos com opção de subcategorias
     */
    const loadCategoryData = useCallback(async (withSubcats = withSubcategories) => {
        try {
            const data = await apiService.getCategories({ with_subcategories: withSubcats });
            setCategoryData(data);
            return data;
        } catch (err) {
            console.error('Erro ao carregar dados categóricos:', err);
            throw err;
        }
    }, [withSubcategories]);

    /**
     * Carrega dados de correlação
     */
    const loadCorrelationData = useCallback(async () => {
        try {
            const data = await apiService.getCorrelation();
            setCorrelationData(data);
            return data;
        } catch (err) {
            console.error('Erro ao carregar dados de correlação:', err);
            throw err;
        }
    }, []);

    /**
     * Altera o intervalo de tempo e recarrega os dados temporais
     */
    const updateTimeRange = useCallback(async (days) => {
        setTimeRange(days);

        // Recarrega os dados temporais com o novo intervalo
        try {
            await loadTimeSeriesData(days);
        } catch (err) {
            // Erro já é tratado dentro de loadTimeSeriesData
        }
    }, [loadTimeSeriesData]);

    /**
     * Altera a configuração de subcategorias e recarrega os dados categóricos
     */
    const updateSubcategoriesConfig = useCallback(async (withSubcats) => {
        setWithSubcategories(withSubcats);

        // Recarrega os dados categóricos com a nova configuração
        try {
            await loadCategoryData(withSubcats);
        } catch (err) {
            // Erro já é tratado dentro de loadCategoryData
        }
    }, [loadCategoryData]);

    /**
     * Carrega todos os dados na montagem do componente
     */
    useEffect(() => {
        loadAllData();
    }, [loadAllData]);

    // Retorno do hook
    return {
        // Dados
        kpis,
        timeSeriesData,
        categoryData,
        correlationData,

        // Estados
        loading,
        error,
        timeRange,
        withSubcategories,
        selectedCategories,

        // Ações
        loadAllData,
        loadKPIs,
        loadTimeSeriesData,
        loadCategoryData,
        loadCorrelationData,
        updateTimeRange,
        updateSubcategoriesConfig,
        setSelectedCategories,
    };
};

export default useDashboard; 