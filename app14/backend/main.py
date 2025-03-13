from fastapi import Depends, FastAPI, HTTPException, status, Form
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta

from database import get_db, create_tables, UserDB, NoteDB
from models import User, UserCreate, Token, Note, NoteCreate, NoteUpdate
from auth import (
    get_password_hash, 
    authenticate_user, 
    create_access_token, 
    get_current_active_user,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

# Inicializa o FastAPI
app = FastAPI(title="API de Notas com Autenticação JWT")

# Configuração de CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, limite para a origem do seu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cria as tabelas no banco de dados
create_tables()

# Rota para registro de novos usuários
@app.post("/users/", response_model=User, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    # Verifica se o usuário já existe
    db_user_by_username = db.query(UserDB).filter(UserDB.username == user.username).first()
    if db_user_by_username:
        raise HTTPException(status_code=400, detail="Nome de usuário já registrado")
    
    db_user_by_email = db.query(UserDB).filter(UserDB.email == user.email).first()
    if db_user_by_email:
        raise HTTPException(status_code=400, detail="Email já registrado")
    
    # Cria o novo usuário
    hashed_password = get_password_hash(user.password)
    db_user = UserDB(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        full_name=user.full_name
    )
    
    # Salva no banco de dados
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Retorna o usuário sem a senha
    return User(
        id=db_user.id,
        username=db_user.username,
        email=db_user.email,
        full_name=db_user.full_name,
        is_active=db_user.is_active,
        created_at=db_user.created_at
    )

# Rota para login e obtenção do token
@app.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Autentica o usuário
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Nome de usuário ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Define o período de validade do token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    # Cria o token JWT
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

# Rota para obter dados do usuário atual
@app.get("/users/me/", response_model=User)
def read_users_me(current_user: UserDB = Depends(get_current_active_user)):
    return User(
        id=current_user.id,
        username=current_user.username,
        email=current_user.email,
        full_name=current_user.full_name,
        is_active=current_user.is_active,
        created_at=current_user.created_at
    )

# Rota para criar uma nova nota
@app.post("/notes/", response_model=Note, status_code=status.HTTP_201_CREATED)
def create_note(note: NoteCreate, current_user: UserDB = Depends(get_current_active_user), db: Session = Depends(get_db)):
    # Cria a nova nota
    db_note = NoteDB(
        title=note.title,
        content=note.content,
        is_public=note.is_public,
        owner_id=current_user.id
    )
    
    # Salva no banco de dados
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    
    # Retorna a nota criada
    return Note(
        id=db_note.id,
        title=db_note.title,
        content=db_note.content,
        is_public=db_note.is_public,
        created_at=db_note.created_at,
        updated_at=db_note.updated_at,
        owner_id=db_note.owner_id,
        owner_username=current_user.username
    )

# Rota para obter todas as notas do usuário
@app.get("/notes/", response_model=List[Note])
def read_notes(
    skip: int = 0, 
    limit: int = 100, 
    current_user: UserDB = Depends(get_current_active_user), 
    db: Session = Depends(get_db)
):
    # Busca as notas do usuário
    notes = db.query(NoteDB).filter(NoteDB.owner_id == current_user.id).offset(skip).limit(limit).all()
    
    # Retorna as notas encontradas
    return [
        Note(
            id=note.id,
            title=note.title,
            content=note.content,
            is_public=note.is_public,
            created_at=note.created_at,
            updated_at=note.updated_at,
            owner_id=note.owner_id,
            owner_username=current_user.username
        ) 
        for note in notes
    ]

# Rota para obter uma nota específica
@app.get("/notes/{note_id}", response_model=Note)
def read_note(
    note_id: int, 
    current_user: UserDB = Depends(get_current_active_user), 
    db: Session = Depends(get_db)
):
    # Busca a nota no banco de dados
    note = db.query(NoteDB).filter(NoteDB.id == note_id).first()
    
    # Verifica se a nota existe
    if note is None:
        raise HTTPException(status_code=404, detail="Nota não encontrada")
    
    # Verifica se o usuário é o proprietário ou se a nota é pública
    if note.owner_id != current_user.id and not note.is_public:
        raise HTTPException(status_code=403, detail="Acesso negado a esta nota")
    
    # Retorna a nota
    return Note(
        id=note.id,
        title=note.title,
        content=note.content,
        is_public=note.is_public,
        created_at=note.created_at,
        updated_at=note.updated_at,
        owner_id=note.owner_id,
        owner_username=note.owner.username
    )

# Rota para atualizar uma nota
@app.put("/notes/{note_id}", response_model=Note)
def update_note(
    note_id: int, 
    note_update: NoteUpdate, 
    current_user: UserDB = Depends(get_current_active_user), 
    db: Session = Depends(get_db)
):
    # Busca a nota no banco de dados
    db_note = db.query(NoteDB).filter(NoteDB.id == note_id).first()
    
    # Verifica se a nota existe
    if db_note is None:
        raise HTTPException(status_code=404, detail="Nota não encontrada")
    
    # Verifica se o usuário é o proprietário
    if db_note.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Não autorizado a editar esta nota")
    
    # Atualiza os campos da nota
    if note_update.title is not None:
        db_note.title = note_update.title
    if note_update.content is not None:
        db_note.content = note_update.content
    if note_update.is_public is not None:
        db_note.is_public = note_update.is_public
        
    # Atualiza a data de modificação
    db_note.updated_at = datetime.now()
    
    # Salva as alterações
    db.commit()
    db.refresh(db_note)
    
    # Retorna a nota atualizada
    return Note(
        id=db_note.id,
        title=db_note.title,
        content=db_note.content,
        is_public=db_note.is_public,
        created_at=db_note.created_at,
        updated_at=db_note.updated_at,
        owner_id=db_note.owner_id,
        owner_username=current_user.username
    )

# Rota para excluir uma nota
@app.delete("/notes/{note_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_note(
    note_id: int, 
    current_user: UserDB = Depends(get_current_active_user), 
    db: Session = Depends(get_db)
):
    # Busca a nota no banco de dados
    db_note = db.query(NoteDB).filter(NoteDB.id == note_id).first()
    
    # Verifica se a nota existe
    if db_note is None:
        raise HTTPException(status_code=404, detail="Nota não encontrada")
    
    # Verifica se o usuário é o proprietário
    if db_note.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Não autorizado a excluir esta nota")
    
    # Exclui a nota
    db.delete(db_note)
    db.commit()
    
    # Retorna sem conteúdo (204)
    return None

# Rota para buscar notas públicas
@app.get("/notes/public/", response_model=List[Note])
def read_public_notes(
    skip: int = 0, 
    limit: int = 20, 
    db: Session = Depends(get_db)
):
    # Busca as notas públicas
    public_notes = db.query(NoteDB).filter(NoteDB.is_public == True).offset(skip).limit(limit).all()
    
    # Retorna as notas encontradas
    return [
        Note(
            id=note.id,
            title=note.title,
            content=note.content,
            is_public=note.is_public,
            created_at=note.created_at,
            updated_at=note.updated_at,
            owner_id=note.owner_id,
            owner_username=note.owner.username
        ) 
        for note in public_notes
    ]

# Rota raiz para verificar se a API está funcionando
@app.get("/")
def read_root():
    return {"message": "API de Notas com Autenticação JWT está funcionando!"}

# Para iniciar o servidor
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 