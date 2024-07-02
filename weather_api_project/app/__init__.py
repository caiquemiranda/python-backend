# app/__init__.py

from flask import Flask


def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')

    from .routes import weather_bp
    app.register_blueprint(weather_bp)

    return app
