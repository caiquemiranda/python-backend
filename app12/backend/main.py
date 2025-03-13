from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

# Modelo Pydantic para validar os dados do formulário
class FormularioUsuario(BaseModel):
    nome: str
    email: str
    idade: int
    interesses: List[str]
    comentario: Optional[str] = None

# Lista para armazenar os dados recebidos (simulando um banco de dados)
dados_usuarios = []

app = FastAPI(title="API de Formulário")

# Configuração de CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, limite para a origem do seu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    """Endpoint raiz para verificar se a API está funcionando"""
    return {"mensagem": "API de Formulário está funcionando!"}

@app.post("/api/usuarios")
def criar_usuario(usuario: FormularioUsuario):
    """Endpoint para receber e armazenar dados do formulário"""
    # Adiciona o usuário à lista
    dados_usuarios.append(usuario.dict())
    return {"status": "sucesso", "mensagem": "Dados recebidos com sucesso!"}

@app.get("/api/usuarios")
def listar_usuarios():
    """Retorna todos os usuários cadastrados"""
    return dados_usuarios

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 