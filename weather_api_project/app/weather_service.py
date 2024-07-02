import requests
from flask import current_app


def get_weather_by_coordinates(lat, lon):
    api_key = current_app.config['WEATHER_API_KEY']
    base_url = "http://api.openweathermap.org/data/2.5/weather"
    params = {'lat': lat, 'lon': lon, 'appid': api_key, 'units': 'metric'}
    response = requests.get(base_url, params=params)
    return response.json()
