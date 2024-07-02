import os

class Config:
    WEATHER_API_KEY = os.getenv(
        'WEATHER_API_KEY', 'my_api_key')
