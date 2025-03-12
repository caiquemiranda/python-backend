#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Testes para as funções de segurança
"""

import pytest
from jose import jwt

from app.core.security import create_access_token, verify_password, get_password_hash
from app.core.config import settings


def test_verify_password():
    """Testa a verificação de senha."""
    hashed_password = get_password_hash("testpassword")
    assert verify_password("testpassword", hashed_password)
    assert not verify_password("wrongpassword", hashed_password)


def test_get_password_hash():
    """Testa a geração de hash de senha."""
    hashed_password = get_password_hash("testpassword")
    assert hashed_password != "testpassword"
    assert isinstance(hashed_password, str)


def test_create_access_token():
    """Testa a criação de token de acesso JWT."""
    user_id = 1
    token = create_access_token(user_id)
    assert token
    
    # Decodifica o token para verificar o payload
    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
    assert "sub" in payload
    assert payload["sub"] == str(user_id)
    assert "exp" in payload 