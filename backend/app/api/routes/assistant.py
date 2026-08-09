"""Lumi AI concierge endpoint."""
from fastapi import APIRouter
from ...schemas import ChatRequest
from ...services.lumi_service import chat
router = APIRouter(tags=["assistant"])

@router.post("/assistant/chat")
def assistant_chat(payload: ChatRequest) -> dict: return chat(payload.message)
