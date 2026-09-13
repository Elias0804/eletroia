from typing import Literal

from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=128)
    city: str = Field(..., min_length=2, max_length=120)
    role: Literal["cliente", "tecnico"] = "cliente"


class UserLogin(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6, max_length=128)


class UserOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    city: str
    role: Literal["cliente", "tecnico"]
