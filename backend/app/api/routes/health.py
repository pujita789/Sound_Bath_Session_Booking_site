"""Operational health endpoint."""
from fastapi import APIRouter
from ...config import settings
router = APIRouter(tags=["operations"])

@router.get("/health")
def health() -> dict:
    return {"status": "ok", "database": settings.resolved_database_path.name, "llm_configured": bool(settings.openai_api_key)}
