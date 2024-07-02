from flask import Blueprint, request, jsonify, current_app
from .weather_service import get_weather_by_coordinates

weather_bp = Blueprint('weather', __name__)


@weather_bp.route('/weather', methods=['GET'])
def weather():
    lat = request.args.get('lat')
    lon = request.args.get('lon')

    if not lat or not lon:
        return jsonify({'error': 'Latitude and longitude parameters are required'}), 400

    try:
        lat = float(lat)
        lon = float(lon)
    except ValueError:
        return jsonify({'error': 'Latitude and longitude must be numeric'}), 400

    weather_data = get_weather_by_coordinates(lat, lon)
    return jsonify(weather_data)
