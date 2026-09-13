from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .core.config import get_settings
from .routers.auth import router as auth_router
from .routers.diagnostic import router as diagnostic_router
from .routers.technician import router as technician_router

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    description=settings.app_description,
    version=settings.version,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix=settings.api_prefix)
app.include_router(diagnostic_router, prefix=settings.api_prefix)
app.include_router(technician_router, prefix=settings.api_prefix)


@app.get("/", tags=["Root"])
def read_root() -> dict:
    return {
        "message": "Bem-vindo ao backend EletroIA.",
        "description": settings.app_description,
        "version": settings.version,
    }
