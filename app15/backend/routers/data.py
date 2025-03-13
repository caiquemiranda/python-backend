from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
from faker import Faker

from ..schemas import (
    KPI, 
    TimeSeriesData, 
    TimeSeriesPoint, 
    CategoryData, 
    CategoryPoint, 
    CorrelationData,
    CorrelationPoint,
    DashboardMetrics
)

router = APIRouter()
fake = Faker()

# Função auxiliar para gerar dados aleatórios
def generate_time_series(days: int = 30, categories: List[str] = None):
    if categories is None:
        categories = ["Vendas", "Visitas", "Conversões"]
    
    result = []
    end_date = datetime.now()
    start_date = end_date - timedelta(days=days)
    
    for category in categories:
        base_value = random.uniform(100, 1000)
        trend = random.uniform(0.8, 1.2)  # Tendência: < 1 decrescente, > 1 crescente
        noise = random.uniform(0.05, 0.2)  # Ruído para simular variações
        
        date_range = pd.date_range(start=start_date, end=end_date, freq='D')
        
        for i, date in enumerate(date_range):
            # Valor com tendência e ruído
            value = base_value * (trend ** (i/10)) * (1 + random.uniform(-noise, noise))
            
            # Adicionar efeito de sazonalidade semanal
            if date.weekday() >= 5:  # Final de semana
                value *= random.uniform(0.7, 0.9)  # Redução no final de semana
                
            result.append(
                TimeSeriesPoint(
                    timestamp=date,
                    value=round(value, 2),
                    category=category
                )
            )
    
    return result

def generate_categories(categories: List[str] = None, with_subcategories: bool = False):
    if categories is None:
        categories = [
            "Produtos", "Serviços", "Marketing", 
            "Vendas", "Suporte", "Desenvolvimento"
        ]
    
    result = []
    
    if with_subcategories:
        for category in categories:
            total = 0
            subcategories = [f"{category} - {fake.word().capitalize()}" for _ in range(random.randint(3, 5))]
            
            for subcategory in subcategories:
                value = random.uniform(50, 500)
                total += value
                result.append(
                    CategoryPoint(
                        category=subcategory,
                        value=round(value, 2)
                    )
                )
    else:
        for category in categories:
            result.append(
                CategoryPoint(
                    category=category,
                    value=round(random.uniform(100, 1000), 2)
                )
            )
    
    return result

def generate_kpis():
    kpis = []
    
    # Receita
    current_revenue = round(random.uniform(100000, 200000), 2)
    previous_revenue = round(current_revenue * random.uniform(0.8, 1.2), 2)
    revenue_change = ((current_revenue - previous_revenue) / previous_revenue) * 100
    
    kpis.append(
        KPI(
            name="Receita Total",
            value=current_revenue,
            previous_value=previous_revenue,
            change_percentage=round(revenue_change, 2),
            trend="up" if revenue_change > 0 else "down",
            format="currency"
        )
    )
    
    # Novos Clientes
    current_customers = random.randint(150, 300)
    previous_customers = random.randint(100, 250)
    customers_change = ((current_customers - previous_customers) / previous_customers) * 100
    
    kpis.append(
        KPI(
            name="Novos Clientes",
            value=current_customers,
            previous_value=previous_customers,
            change_percentage=round(customers_change, 2),
            trend="up" if customers_change > 0 else "down",
            format="number"
        )
    )
    
    # Taxa de Conversão
    current_rate = round(random.uniform(1, 5), 2)
    previous_rate = round(random.uniform(1, 5), 2)
    rate_change = ((current_rate - previous_rate) / previous_rate) * 100
    
    kpis.append(
        KPI(
            name="Taxa de Conversão",
            value=current_rate,
            previous_value=previous_rate,
            change_percentage=round(rate_change, 2),
            trend="up" if rate_change > 0 else "down",
            format="percentage"
        )
    )
    
    # Custo de Aquisição
    current_cac = round(random.uniform(50, 150), 2)
    previous_cac = round(random.uniform(50, 150), 2)
    cac_change = ((current_cac - previous_cac) / previous_cac) * 100
    
    kpis.append(
        KPI(
            name="CAC",
            value=current_cac,
            previous_value=previous_cac,
            change_percentage=round(cac_change, 2),
            trend="down" if cac_change < 0 else "up",  # Menor é melhor para CAC
            format="currency"
        )
    )
    
    return kpis

def generate_correlation(x_categories: List[str] = None, y_categories: List[str] = None):
    if x_categories is None:
        x_categories = ["Preço", "Qualidade", "Marketing", "Suporte", "Inovação"]
    
    if y_categories is None:
        y_categories = ["Vendas", "Satisfação", "Retenção", "Crescimento", "ROI"]
    
    result = []
    
    for x in x_categories:
        for y in y_categories:
            # Gerar correlação entre -1 e 1
            value = round(random.uniform(-1, 1), 2)
            result.append(
                CorrelationPoint(
                    x=x,
                    y=y,
                    value=value
                )
            )
    
    return result, x_categories, y_categories

# Endpoints para o dashboard

@router.get("/kpis", response_model=DashboardMetrics)
async def get_kpis():
    """
    Retorna os KPIs principais para o dashboard
    """
    kpis = generate_kpis()
    return DashboardMetrics(kpis=kpis)

@router.get("/timeseries", response_model=TimeSeriesData)
async def get_time_series(days: int = 30, category: str = None):
    """
    Retorna dados de série temporal para gráficos de linha e área
    """
    categories = [category] if category else None
    data = generate_time_series(days=days, categories=categories)
    return TimeSeriesData(data=data)

@router.get("/categories", response_model=CategoryData)
async def get_categories(with_subcategories: bool = False):
    """
    Retorna dados categóricos para gráficos de barra e pizza
    """
    data = generate_categories(with_subcategories=with_subcategories)
    return CategoryData(data=data)

@router.get("/correlation", response_model=CorrelationData)
async def get_correlation():
    """
    Retorna dados de correlação para mapas de calor
    """
    data, x_categories, y_categories = generate_correlation()
    return CorrelationData(
        data=data,
        x_categories=x_categories,
        y_categories=y_categories
    )

@router.get("/dashboard", response_model=Dict[str, Any])
async def get_dashboard_data():
    """
    Retorna todos os dados necessários para o dashboard em uma única chamada
    """
    kpis = generate_kpis()
    time_series = generate_time_series(days=30)
    categories = generate_categories()
    corr_data, x_cats, y_cats = generate_correlation()
    
    return {
        "kpis": DashboardMetrics(kpis=kpis),
        "time_series": TimeSeriesData(data=time_series),
        "categories": CategoryData(data=categories),
        "correlation": CorrelationData(
            data=corr_data,
            x_categories=x_cats,
            y_categories=y_cats
        )
    } 