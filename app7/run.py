#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Script para executar a API
Este é o ponto de entrada principal para executar a aplicação Flask.
"""

from app import create_app

# Cria a aplicação
app = create_app()

if __name__ == '__main__':
    # Executa o servidor Flask
    app.run(host='0.0.0.0', port=5000, debug=True) 