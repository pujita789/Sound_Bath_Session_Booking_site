"""Human assistance request endpoints."""
from fastapi import APIRouter
from ...repositories.assistance_repository import acknowledge_request, create_request, list_requests
from ...schemas import AssistanceRequestCreate
router = APIRouter(tags=["assistance"])

@router.get("/assistance")
def assistance() -> list[dict]: return list_requests()

@router.post("/assistance", status_code=201)
def create(payload: AssistanceRequestCreate) -> dict: return create_request(payload)

@router.patch("/assistance/{request_id}")
def acknowledge(request_id: str) -> dict: return acknowledge_request(request_id)
