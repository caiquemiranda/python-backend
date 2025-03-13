from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from datetime import datetime, date

# Esquemas para métricas e KPIs
class KPI(BaseModel):
    name: str
    value: float
    previous_value: Optional[float] = None
    change_percentage: Optional[float] = None
    trend: Optional[str] = None  # 'up', 'down', 'stable'
    format: Optional[str] = None  # 'percentage', 'currency', 'number'
    
    class Config:
        schema_extra = {
            "example": {
                "name": "Receita Total",
                "value": 120500.50,
                "previous_value": 110200.75,
                "change_percentage": 9.35,
                "trend": "up",
                "format": "currency"
            }
        }

# Esquema para dados temporais (gráficos de linha, área)
class TimeSeriesPoint(BaseModel):
    timestamp: datetime
    value: float
    category: Optional[str] = None
    
    class Config:
        schema_extra = {
            "example": {
                "timestamp": "2023-04-15T10:30:00",
                "value": 42.5,
                "category": "Vendas"
            }
        }

class TimeSeriesData(BaseModel):
    data: List[TimeSeriesPoint]
    
    class Config:
        schema_extra = {
            "example": {
                "data": [
                    {"timestamp": "2023-04-15T10:30:00", "value": 42.5, "category": "Vendas"},
                    {"timestamp": "2023-04-16T10:30:00", "value": 45.2, "category": "Vendas"},
                    {"timestamp": "2023-04-17T10:30:00", "value": 51.0, "category": "Vendas"}
                ]
            }
        }

# Esquema para dados categóricos (gráficos de barra, pizza)
class CategoryPoint(BaseModel):
    category: str
    value: float
    
    class Config:
        schema_extra = {
            "example": {
                "category": "Produtos A",
                "value": 150.75
            }
        }

class CategoryData(BaseModel):
    data: List[CategoryPoint]
    
    class Config:
        schema_extra = {
            "example": {
                "data": [
                    {"category": "Produtos A", "value": 150.75},
                    {"category": "Produtos B", "value": 230.50},
                    {"category": "Produtos C", "value": 95.20}
                ]
            }
        }

# Esquema para dados de correlação (mapa de calor)
class CorrelationPoint(BaseModel):
    x: str  # categoria x
    y: str  # categoria y
    value: float  # valor da correlação
    
    class Config:
        schema_extra = {
            "example": {
                "x": "Preço",
                "y": "Vendas",
                "value": 0.75
            }
        }

class CorrelationData(BaseModel):
    data: List[CorrelationPoint]
    x_categories: List[str]
    y_categories: List[str]
    
    class Config:
        schema_extra = {
            "example": {
                "data": [
                    {"x": "Preço", "y": "Vendas", "value": 0.75},
                    {"x": "Preço", "y": "Satisfação", "value": -0.32},
                    {"x": "Qualidade", "y": "Vendas", "value": 0.90}
                ],
                "x_categories": ["Preço", "Qualidade", "Marketing"],
                "y_categories": ["Vendas", "Satisfação", "Retenção"]
            }
        }

# Esquema para resposta de múltiplas métricas
class DashboardMetrics(BaseModel):
    kpis: List[KPI]
    
    class Config:
        schema_extra = {
            "example": {
                "kpis": [
                    {
                        "name": "Receita Total",
                        "value": 120500.50,
                        "previous_value": 110200.75,
                        "change_percentage": 9.35,
                        "trend": "up",
                        "format": "currency"
                    },
                    {
                        "name": "Novos Clientes",
                        "value": 245,
                        "previous_value": 210,
                        "change_percentage": 16.67,
                        "trend": "up",
                        "format": "number"
                    }
                ]
            }
        } 