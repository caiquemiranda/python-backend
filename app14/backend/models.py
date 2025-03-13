from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime

# Modelo para criar um novo usuário
class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=6)
    full_name: Optional[str] = None

# Modelo para dados do usuário (sem a senha)
class User(BaseModel):
    id: int
    username: str
    email: EmailStr
    full_name: Optional[str] = None
    is_active: bool = True
    created_at: datetime

    class Config:
        orm_mode = True

# Modelo para login
class UserLogin(BaseModel):
    username: str
    password: str

# Modelo para representar um token JWT
class Token(BaseModel):
    access_token: str
    token_type: str

# Modelo para os dados contidos no token
class TokenData(BaseModel):
    username: Optional[str] = None

# Modelo para uma nova nota
class NoteCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=100)
    content: str = Field(..., min_length=1)
    is_public: bool = False

# Modelo para atualizar uma nota existente
class NoteUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=100)
    content: Optional[str] = Field(None, min_length=1)
    is_public: Optional[bool] = None

# Modelo para exibir uma nota
class Note(BaseModel):
    id: int
    title: str
    content: str
    is_public: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    owner_id: int
    owner_username: str

    class Config:
        orm_mode = True 