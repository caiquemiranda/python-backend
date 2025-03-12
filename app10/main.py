#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Ponto de entrada da aplicação FastAPI
Este script inicia o servidor FastAPI.
"""

import uvicorn

if __name__ == "__main__":
    # Executa o servidor com Uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True) 