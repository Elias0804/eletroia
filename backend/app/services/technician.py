import uuid
from typing import Dict, List

from fastapi import HTTPException

from ..schemas.technician import TechnicianCreate, TechnicianOut

_TECHNICIANS: Dict[str, TechnicianOut] = {}


def list_technicians() -> List[TechnicianOut]:
    return list(_TECHNICIANS.values())


def create_technician(payload: TechnicianCreate) -> TechnicianOut:
    email_key = payload.email.lower()
    if any(tech.email.lower() == email_key for tech in _TECHNICIANS.values()):
        raise HTTPException(status_code=400, detail="Técnico já cadastrado.")

    tech_id = str(uuid.uuid4())
    technician = TechnicianOut(
        id=tech_id,
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        city=payload.city,
        state=payload.state,
        specialty=payload.specialty,
        specialties=payload.specialties,
        equipments=payload.equipments,
        years_experience=payload.years_experience,
        availability=payload.availability,
        bio=payload.bio,
        rating=payload.rating,
        role=payload.role,
    )
    _TECHNICIANS[tech_id] = technician
    return technician
