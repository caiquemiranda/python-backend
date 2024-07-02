import os

class Config:
    WEATHER_API_KEY = os.getenv(
        'WEATHER_API_KEY', '9b7b6cd37b416a117df3281103df8412')
