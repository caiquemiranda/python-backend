import logging
from pathlib import Path

from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.v1.api import api_router
from app.core.config import settings
from app.db.base import Base, engine

# Configurar o logger
log_file = Path("app/logs/app.log")
log_file.parent.mkdir(exist_ok=True)
logging.basicConfig(
    filename=log_file,
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# Cria as tabelas do banco de dados
Base.metadata.create_all(bind=engine)

# Cria a aplicação FastAPI
app = FastAPI(
    title="API Avançada com Autenticação",
    description="API RESTful com autenticação JWT, CRUD e relacionamentos",
    version="0.1.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
)

# Configuração de CORS
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Incluir as rotas da API
app.include_router(api_router, prefix=settings.API_V1_STR)

# Handlers de exceções
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """
    Handler para erros de validação da requisição.
    """
    logger.error(f"Erro de validação: {exc}")
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": exc.errors(), "body": exc.body},
    )

@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """
    Handler global para exceções não tratadas.
    """
    logger.error(f"Erro não tratado: {exc}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "Ocorreu um erro interno no servidor."},
    )

# Rota inicial
@app.get("/")
def read_root():
    """
    Rota raiz da API.
    """
    return {
        "message": "Bem-vindo à API avançada com autenticação!",
        "docs_url": f"/docs",
        "version": "0.1.0",
    } 