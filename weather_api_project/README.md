# API de Consulta de Clima

Esta é uma API REST simples desenvolvida em Flask para consultar dados climáticos de uma API pública (OpenWeatherMap) e fornecer informações de clima atual para diferentes localizações baseadas em coordenadas geográficas (latitude e longitude).

## Funcionalidades

- Consulta de dados climáticos atuais com base em coordenadas geográficas.
- Retorno dos dados em formato JSON.

## Requisitos

- Python 3.x
- Flask
- requests

## Instalação e Execução

1. **Clonar o repositório:**

```bash
git clone https://github.com/caiquemiranda/weather_api_project.git
cd weather-api-project
 ```

2. **Instalar as dependências:**

```bash	
pip install -r requirements.txt
```

3. **Configurar a chave da API OpenWeatherMap:**

Exporte sua chave da API como variável de ambiente. Substitua your_api_key_here pela sua chave da API OpenWeatherMap:
    
```bash
export WEATHER_API_KEY='your_api_key_here'
```

Em Windows, use o comando set:

```bash
set WEATHER_API_KEY=your_api_key_here
```

4. **Executar a aplicação:**

```python
python run.py
```


## Exemplo de Resposta da API

A resposta da API será retornada em formato JSON, seguindo o padrão da API OpenWeatherMap. Exemplo de resposta:

```json
{
  "coord": {
    "lon": -122.4194,
    "lat": 37.7749
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 16.77,
    "feels_like": 16.2,
    "temp_min": 15.71,
    "temp_max": 18.62,
    "pressure": 1020,
    "humidity": 82
  },
  "visibility": 10000,
  "wind": {
    "speed": 1.54,
    "deg": 318,
    "gust": 2.68
  },
  "clouds": {
    "all": 1
  },
  "dt": 1634226321,
  "sys": {
    "type": 2,
    "id": 2017833,
    "country": "US",
    "sunrise": 1634205243,
    "sunset": 1634250514
  },
  "timezone": -25200,
  "id": 5391959,
  "name": "San Francisco",
  "cod": 200
}
```


## Considerações
- Esta aplicação foi desenvolvida como um exemplo simples de utilização do Flask para criar uma API de consulta de clima.

- Certifique-se de respeitar os limites de chamadas da API OpenWeatherMap.

- Para fins de produção, considere implementar mecanismos de cache e tratamento de erros mais robustos.


Este `README.md` fornece informações básicas sobre como configurar, instalar, executar e utilizar sua API de consulta de clima, além de fornecer um exemplo de resposta da API. Você pode personalizá-lo conforme necessário para incluir mais detalhes ou instruções específicas do seu projeto.
