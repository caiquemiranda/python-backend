from sqlalchemy import create_engine, Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
import os

# Cria o diretório do banco de dados se não existir
os.makedirs(os.path.dirname(os.path.abspath(__file__)) + "/db", exist_ok=True)

# Configuração do banco de dados SQLite
SQLALCHEMY_DATABASE_URL = "sqlite:///" + os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "db/app.db"
)

# Criação do engine SQLAlchemy
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Criação da sessão
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Declaração da base para os modelos
Base = declarative_base()

# Modelo SQLAlchemy para o usuário
class UserDB(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.now)

    # Relacionamento: um usuário pode ter muitas notas
    notes = relationship("NoteDB", back_populates="owner")

# Modelo SQLAlchemy para as notas
class NoteDB(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), index=True)
    content = Column(Text)
    is_public = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.now)
    updated_at = Column(DateTime, nullable=True)
    owner_id = Column(Integer, ForeignKey("users.id"))

    # Relacionamento: uma nota pertence a um usuário
    owner = relationship("UserDB", back_populates="notes")


# Função para obter uma sessão do banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Cria as tabelas no banco de dados
def create_tables():
    Base.metadata.create_all(bind=engine) 