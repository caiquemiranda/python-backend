import os
from pydantic import BaseSettings
from typing import Optional, List, Dict, Any, Union

class Settings(BaseSettings):
    # Configurações da API
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "Dashboard Analytics API"
    PROJECT_DESCRIPTION: str = "API para fornecimento de dados analíticos para dashboard"
    API_VERSION: str = "0.1.0"
    
    # Configurações CORS
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:3000"]
    
    # Configurações do servidor
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # Configurações de ambiente
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"
    
    # Configurações específicas para geração de dados
    RANDOM_SEED: Optional[int] = 42  # Definir como None para seed aleatória
    DEFAULT_DAYS_RANGE: int = 30
    
    # Cache
    CACHE_ENABLED: bool = True
    CACHE_TIMEOUT: int = 300  # 5 minutos em segundos
    
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()

# Configurações específicas para cada ambiente
ENVIRONMENT_SETTINGS: Dict[str, Dict[str, Any]] = {
    "development": {
        "DEBUG": True,
        "CACHE_ENABLED": False,
    },
    "testing": {
        "DEBUG": True,
        "CACHE_ENABLED": False,
        "RANDOM_SEED": 42,  # Fixar seed para testes
    },
    "production": {
        "DEBUG": False,
        "CACHE_ENABLED": True,
        "CACHE_TIMEOUT": 600,  # 10 minutos em segundos
    }
}

# Aplicar configurações específicas do ambiente
if settings.ENVIRONMENT in ENVIRONMENT_SETTINGS:
    for key, value in ENVIRONMENT_SETTINGS[settings.ENVIRONMENT].items():
        setattr(settings, key, value)

# Formatos disponíveis para exportação de dados
EXPORT_FORMATS = {
    "csv": "text/csv",
    "json": "application/json",
    "excel": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
}

# Configurações de cores para gráficos
CHART_COLORS = {
    "primary": "#3498db",
    "secondary": "#2ecc71",
    "danger": "#e74c3c",
    "warning": "#f39c12",
    "info": "#1abc9c",
    "dark": "#34495e",
}

# Categorias padrão para gráficos
DEFAULT_CATEGORIES = [
    "Vendas", "Marketing", "Suporte", 
    "Desenvolvimento", "Recursos Humanos", "Financeiro"
]

# Métricas disponíveis para exibição
AVAILABLE_METRICS = {
    "receita": {
        "name": "Receita",
        "description": "Receita total gerada",
        "format": "currency",
    },
    "clientes": {
        "name": "Novos Clientes",
        "description": "Número de novos clientes",
        "format": "number",
    },
    "conversao": {
        "name": "Taxa de Conversão",
        "description": "Percentual de conversão de leads para clientes",
        "format": "percentage",
    },
    "cac": {
        "name": "Custo de Aquisição (CAC)",
        "description": "Custo médio para adquirir um novo cliente",
        "format": "currency",
    },
    "ltv": {
        "name": "Valor do Cliente (LTV)",
        "description": "Valor médio de vida do cliente",
        "format": "currency",
    },
    "retencao": {
        "name": "Taxa de Retenção",
        "description": "Percentual de clientes que permanecem ativos",
        "format": "percentage",
    },
}

def get_settings() -> Settings:
    """
    Retorna as configurações da aplicação.
    Esta função é usada como uma dependência no FastAPI.
    """
    return settings 