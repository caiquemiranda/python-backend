#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
Schemas para Tokens
Este módulo define os schemas Pydantic para validação e serialização de tokens de autenticação.
"""

from typing import Optional

from pydantic import BaseModel


class Token(BaseModel):
    """Schema para token de acesso."""
    access_token: str
    token_type: str


class TokenPayload(BaseModel):
    """Schema para payload do token JWT."""
    sub: Optional[int] = None
    exp: Optional[int] = None 