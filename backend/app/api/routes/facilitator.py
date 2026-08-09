"""Facilitator intelligence endpoints."""
from fastapi import APIRouter
from ...services.summary_service import build_summary
router = APIRouter(tags=["facilitator"])

@router.get("/facilitator/session-summary")
def facilitator_summary() -> dict: return build_summary()
