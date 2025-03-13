import uvicorn
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import engine, Base
from app.routes.tasks import router as tasks_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Gerenciador de Tarefas API",
    description="API para gerenciamento de tarefas com FastAPI e SQLite",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """
    Handler global para exceções não tratadas.
    
    Args:
        request: Request atual.
        exc: Exceção capturada.
        
    Returns:
        JSONResponse: Resposta de erro formatada.
    """

    return JSONResponse(
        status_code=500,
        content={"message": "Ocorreu um erro interno no servidor.", "detail": str(exc)},
    )

app.include_router(tasks_router)

@app.get("/")
async def root():
    """
    Rota raiz da API.
    
    Returns:
        dict: Mensagem de boas-vindas e informações básicas da API.
    """

    return {
        "message": "Bem-vindo à API de Gerenciamento de Tarefas!",
        "docs": "/docs",
        "version": "0.1.0"
    }

if __name__ == "__main__":

    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True) 
    