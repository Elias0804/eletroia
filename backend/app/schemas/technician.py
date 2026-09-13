from typing import List, Literal

from pydantic import BaseModel, Field


class TechnicianCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: str = Field(..., min_length=5, max_length=150)
    phone: str = Field(..., min_length=8, max_length=40)
    city: str = Field(..., min_length=2, max_length=120)
    state: str = Field(..., min_length=2, max_length=2)
    specialty: str = Field(..., min_length=2, max_length=120)
    specialties: List[str] = Field(default_factory=list)
    equipments: List[str] = Field(default_factory=list)
    years_experience: int = Field(default=1, ge=0, le=80)
    availability: str = Field(default="Disponível para atendimento")
    bio: str = Field(..., min_length=20, max_length=1000)
    rating: float = Field(default=4.8, ge=0.0, le=5.0)
    role: Literal["tecnico"] = "tecnico"


class TechnicianOut(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    city: str
    state: str
    specialty: str
    specialties: List[str]
    equipments: List[str]
    years_experience: int
    availability: str
    bio: str
    rating: float
    role: Literal["tecnico"]
