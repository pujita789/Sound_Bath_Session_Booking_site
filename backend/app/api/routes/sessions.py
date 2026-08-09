"""Session read endpoints."""
from fastapi import APIRouter, HTTPException
from ...repositories.session_repository import get_session
router = APIRouter(tags=["sessions"])

@router.get("/session")
def session() -> dict:
    result = get_session()
    if not result: raise HTTPException(404, "Session not found")
    return result
