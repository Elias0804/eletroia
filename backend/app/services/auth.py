import uuid
from typing import Dict, Optional

from fastapi import HTTPException

from ..schemas.user import UserCreate, UserLogin, UserOut

_USERS: Dict[str, UserOut] = {}


def register_user(payload: UserCreate) -> UserOut:
    email_key = payload.email.lower()
    if any(user.email.lower() == email_key for user in _USERS.values()):
        raise HTTPException(status_code=400, detail="Usuário já cadastrado.")

    user_id = str(uuid.uuid4())
    user = UserOut(
        id=user_id,
        name=payload.name,
        email=payload.email,
        city=payload.city,
        role=payload.role,
    )
    _USERS[user_id] = user
    return user


def login_user(payload: UserLogin) -> Optional[UserOut]:
    for user in _USERS.values():
        if user.email.lower() == payload.email.lower():
            return user
    return None
