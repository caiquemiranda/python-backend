import json
import os
from typing import Dict, List, Any, Union
from datetime import datetime, date
import pandas as pd
import numpy as np

# Função para serializar tipos complexos em JSON
class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (datetime, date)):
            return obj.isoformat()
        elif isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return super().default(obj)

def json_serialize(obj: Any) -> str:
    """
    Serializa objetos Python para JSON, lidando com tipos complexos como datetime e numpy arrays
    """
    return json.dumps(obj, cls=DateTimeEncoder)

def format_currency(value: float, currency: str = "R$") -> str:
    """
    Formata um valor como moeda
    """
    return f"{currency} {value:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")

def format_percentage(value: float, decimal_places: int = 2) -> str:
    """
    Formata um valor como percentual
    """
    return f"{value:.{decimal_places}f}%".replace(".", ",")

def calculate_change(current: float, previous: float) -> Dict[str, Union[float, str]]:
    """
    Calcula a mudança percentual entre dois valores e determina a tendência
    """
    if previous == 0:
        return {
            "percentage": 0.0,
            "trend": "stable"
        }
    
    change = ((current - previous) / previous) * 100
    
    return {
        "percentage": round(change, 2),
        "trend": "up" if change > 0 else "down" if change < 0 else "stable"
    }

def normalize_data(data: List[float], min_val: float = 0, max_val: float = 1) -> List[float]:
    """
    Normaliza uma lista de valores para o intervalo desejado (padrão 0-1)
    """
    if not data:
        return []
    
    min_data = min(data)
    max_data = max(data)
    
    if min_data == max_data:
        return [min_val] * len(data)
    
    return [min_val + (x - min_data) * (max_val - min_val) / (max_data - min_data) for x in data]

def moving_average(data: List[float], window: int = 3) -> List[float]:
    """
    Calcula a média móvel para uma lista de valores
    """
    if len(data) < window:
        return data
    
    result = []
    for i in range(len(data)):
        if i < window - 1:
            result.append(sum(data[:i+1]) / (i+1))
        else:
            result.append(sum(data[i-window+1:i+1]) / window)
    
    return result

def resample_time_series(df: pd.DataFrame, date_column: str, value_column: str, freq: str = 'D') -> pd.DataFrame:
    """
    Reamostra uma série temporal para a frequência desejada
    
    Args:
        df: DataFrame com os dados
        date_column: Nome da coluna com as datas
        value_column: Nome da coluna com os valores
        freq: Frequência para reamostragem ('D' para diário, 'W' para semanal, 'M' para mensal)
    
    Returns:
        DataFrame com os dados reamostrados
    """
    df_copy = df.copy()
    df_copy[date_column] = pd.to_datetime(df_copy[date_column])
    df_copy = df_copy.set_index(date_column)
    
    return df_copy[value_column].resample(freq).mean().reset_index()

def get_random_color(index: int = None) -> str:
    """
    Retorna uma cor hexadecimal aleatória ou de uma paleta pré-definida
    
    Args:
        index: Índice para escolher uma cor da paleta. Se None, retorna uma cor aleatória.
    
    Returns:
        String com a cor no formato hexadecimal (#RRGGBB)
    """
    palette = [
        "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
        "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf",
        "#aec7e8", "#ffbb78", "#98df8a", "#ff9896", "#c5b0d5"
    ]
    
    if index is not None and 0 <= index < len(palette):
        return palette[index]
    
    if index is not None and index >= len(palette):
        # Gerar cores adicionais além da paleta
        r = (index * 67) % 255
        g = (index * 111) % 255
        b = (index * 193) % 255
        return f"#{r:02x}{g:02x}{b:02x}"
    
    # Cor aleatória
    r = np.random.randint(0, 256)
    g = np.random.randint(0, 256)
    b = np.random.randint(0, 256)
    return f"#{r:02x}{g:02x}{b:02x}" 