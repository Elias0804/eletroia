from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "EletroIA"
    app_description: str = "Assistência técnica inteligente para aparelhos elétricos e eletrônicos."
    version: str = "0.1.0"
    debug: bool = True
    api_prefix: str = "/api"

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
