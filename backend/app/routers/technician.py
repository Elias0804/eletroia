from fastapi import APIRouter

from ..schemas.technician import TechnicianCreate, TechnicianOut
from ..services.technician import create_technician, list_technicians

router = APIRouter(prefix="/technicians", tags=["Técnicos"])


@router.get("/", response_model=list[TechnicianOut])
def get_technicians() -> list[TechnicianOut]:
    return list_technicians()


@router.post("/", response_model=TechnicianOut)
def create(payload: TechnicianCreate) -> TechnicianOut:
    return create_technician(payload)
