from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from routers import data

# Inicialização do aplicativo FastAPI
app = FastAPI(
    title="Dashboard API",
    description="API para fornecer dados para o dashboard de visualização",
    version="1.0.0"
)

# Configuração de CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Adiciona os routers para as diferentes partes da API
app.include_router(data.router, prefix="/api", tags=["Dashboard Data"])

# Rota raiz
@app.get("/")
async def root():
    """
    Rota raiz para verificar se a API está funcionando.
    """
    return {"message": "Bem-vindo à API do Dashboard!", "status": "online"}

# Rota de verificação de saúde (health check)
@app.get("/health")
async def health_check():
    """
    Rota para verificar a saúde da API.
    """
    return JSONResponse(
        content={"status": "healthy", "version": app.version},
        status_code=200
    )

# Para executar o servidor diretamente com Python
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 