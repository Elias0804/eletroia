from fastapi import APIRouter, HTTPException

from ..schemas.user import UserCreate, UserLogin, UserOut
from ..services.auth import login_user, register_user

router = APIRouter(prefix="/auth", tags=["Autenticação"])


@router.post("/register", response_model=UserOut)
def register(payload: UserCreate) -> UserOut:
    return register_user(payload)


@router.post("/login", response_model=UserOut)
def login(payload: UserLogin) -> UserOut:
    user = login_user(payload)
    if user is None:
        raise HTTPException(status_code=401, detail="Credenciais inválidas.")
    return user
